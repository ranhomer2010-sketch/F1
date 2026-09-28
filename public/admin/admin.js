(() => {
  const loginView = document.querySelector("[data-login-view]");
  const setupView = document.querySelector("[data-setup-view]");
  const editorView = document.querySelector("[data-editor-view]");
  const loginForm = document.querySelector("[data-login-form]");
  const loginMessage = document.querySelector("[data-login-message]");
  const contentForm = document.querySelector("[data-content-form]");
  const saveButton = document.querySelector("[data-save]");
  const saveStatus = document.querySelector("[data-save-status]");
  const logoutButton = document.querySelector("[data-logout]");

  let content = null;
  let csrfToken = "";
  let dirty = false;

  const getValue = (source, path) =>
    path.split(".").reduce((value, key) => (value == null ? undefined : value[key]), source);

  const setValue = (source, path, value) => {
    const keys = path.split(".");
    const last = keys.pop();
    const target = keys.reduce((current, key) => current[key], source);
    target[last] = value;
  };

  const request = async (action, options = {}) => {
    const response = await fetch(`./api.php?action=${encodeURIComponent(action)}`, {
      credentials: "same-origin",
      cache: "no-store",
      headers: {
        Accept: "application/json",
        ...(options.body ? { "Content-Type": "application/json" } : {}),
        ...(csrfToken ? { "X-CSRF-Token": csrfToken } : {}),
      },
      ...options,
    });
    let payload;
    try {
      payload = await response.json();
    } catch {
      const error = new Error("PHP_UNAVAILABLE");
      error.status = response.status;
      throw error;
    }
    if (!response.ok || payload.ok === false) {
      const error = new Error(payload.message || "Не удалось выполнить запрос.");
      error.status = response.status;
      error.code = payload.code;
      throw error;
    }
    return payload;
  };

  const showOnly = (view) => {
    [loginView, setupView, editorView].forEach((item) => {
      item.hidden = item !== view;
    });
  };

  const createField = (definition) => {
    const label = document.createElement("label");
    if (definition.type === "textarea") label.className = "field-wide";

    const title = document.createElement("span");
    title.textContent = definition.label;
    label.append(title);

    const control = document.createElement(definition.type === "textarea" ? "textarea" : "input");
    if (control instanceof HTMLInputElement) control.type = "text";
    control.name = definition.path;
    control.value = String(getValue(content, definition.path) ?? "");
    control.maxLength = definition.type === "textarea" ? 2500 : 300;
    control.addEventListener("input", () => {
      dirty = true;
      saveStatus.textContent = "Есть несохранённые изменения";
    });
    label.append(control);

    const meta = document.createElement("small");
    meta.className = "field-meta";
    meta.textContent = definition.type === "textarea" ? "До 2500 символов" : "До 300 символов";
    label.append(meta);
    return label;
  };

  const renderEditor = () => {
    contentForm.replaceChildren();
    window.ADMIN_SCHEMA.forEach((section) => {
      const wrapper = document.createElement("section");
      wrapper.className = "content-section";

      const heading = document.createElement("div");
      heading.className = "section-title";
      const title = document.createElement("h2");
      title.textContent = section.title;
      const description = document.createElement("p");
      description.textContent = section.description;
      heading.append(title, description);

      const fields = document.createElement("div");
      fields.className = "section-fields";
      section.fields.forEach((definition) => fields.append(createField(definition)));
      wrapper.append(heading, fields);
      contentForm.append(wrapper);
    });
  };

  const loadEditor = async () => {
    const payload = await request("content");
    content = payload.content;
    csrfToken = payload.csrf;
    dirty = false;
    renderEditor();
    saveStatus.textContent = "Все изменения сохранены";
    showOnly(editorView);
  };

  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    loginMessage.textContent = "";
    const button = loginForm.querySelector("button");
    button.disabled = true;
    try {
      const formData = new FormData(loginForm);
      const payload = await request("login", {
        method: "POST",
        body: JSON.stringify({
          username: formData.get("username"),
          password: formData.get("password"),
        }),
      });
      csrfToken = payload.csrf;
      loginForm.reset();
      await loadEditor();
    } catch (error) {
      loginMessage.textContent = error.message === "PHP_UNAVAILABLE"
        ? "Серверная часть недоступна на этом хостинге."
        : error.message;
    } finally {
      button.disabled = false;
    }
  });

  saveButton.addEventListener("click", async () => {
    if (!content) return;
    const nextContent = structuredClone(content);
    new FormData(contentForm).forEach((value, path) => setValue(nextContent, path, String(value).trim()));

    saveButton.disabled = true;
    saveStatus.textContent = "Сохраняем…";
    try {
      const payload = await request("save", {
        method: "POST",
        body: JSON.stringify({ content: nextContent }),
      });
      content = payload.content;
      csrfToken = payload.csrf;
      dirty = false;
      saveStatus.textContent = "Сохранено. Изменения уже видны на сайте.";
    } catch (error) {
      saveStatus.textContent = error.message;
    } finally {
      saveButton.disabled = false;
    }
  });

  logoutButton.addEventListener("click", async () => {
    try {
      await request("logout", { method: "POST", body: "{}" });
    } finally {
      content = null;
      csrfToken = "";
      showOnly(loginView);
    }
  });

  window.addEventListener("beforeunload", (event) => {
    if (!dirty) return;
    event.preventDefault();
  });

  request("session")
    .then(async (payload) => {
      if (payload.authenticated) {
        csrfToken = payload.csrf;
        await loadEditor();
      } else {
        showOnly(loginView);
      }
    })
    .catch((error) => {
      if (error.code === "ADMIN_NOT_CONFIGURED" || error.message === "PHP_UNAVAILABLE") {
        showOnly(setupView);
      } else {
        loginMessage.textContent = error.message;
        showOnly(loginView);
      }
    });
})();
