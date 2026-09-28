(() => {
  const getValue = (source, path) =>
    path.split(".").reduce((value, key) => (value == null ? undefined : value[key]), source);

  const applyContent = (content) => {
    document.querySelectorAll("[data-content]").forEach((element) => {
      const value = getValue(content, element.dataset.content || "");
      if (typeof value === "string") element.textContent = value;
    });

    document.querySelectorAll("[data-content-href]").forEach((element) => {
      const value = getValue(content, element.dataset.contentHref || "");
      if (typeof value === "string" && /^(https?:|mailto:|tel:|#)/.test(value)) {
        element.setAttribute("href", value);
      }
    });
  };

  const contentUrl = new URL("content/site.json", document.baseURI);
  fetch(contentUrl, {
    cache: "no-store",
    credentials: "same-origin",
    headers: { Accept: "application/json" },
  })
    .then((response) => {
      if (!response.ok) throw new Error("Content request failed");
      return response.json();
    })
    .then(applyContent)
    .catch(() => {
      // The static HTML already contains the latest published copy.
    });
})();
