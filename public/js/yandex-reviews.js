(() => {
  const root = document.querySelector("[data-yandex-reviews]");
  if (!root) return;

  const checkbox = root.querySelector("[data-reviews-consent]");
  const button = root.querySelector("[data-reviews-load]");
  const consentView = root.querySelector("[data-reviews-consent-view]");
  const frameSlot = root.querySelector("[data-reviews-frame]");
  const status = root.querySelector("[data-reviews-status]");
  if (!checkbox || !button || !consentView || !frameSlot) return;

  checkbox.addEventListener("change", () => {
    button.disabled = !checkbox.checked;
  });

  button.addEventListener("click", () => {
    if (!checkbox.checked || root.dataset.loaded === "true") return;

    const iframe = document.createElement("iframe");
    iframe.className = "reviews-iframe";
    iframe.src = root.dataset.widgetUrl;
    iframe.title = "Отзывы о студии на Яндекс Картах";
    iframe.loading = "lazy";
    iframe.referrerPolicy = "strict-origin-when-cross-origin";
    iframe.setAttribute("allow", "fullscreen");
    root.dataset.loaded = "true";
    consentView.hidden = true;
    frameSlot.hidden = false;
    frameSlot.append(iframe);
    if (status) status.textContent = "Отзывы загружены с Яндекс Карт.";
  });
})();
