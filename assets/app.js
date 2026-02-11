(function () {
  const root = document.documentElement;
  const btnTheme = document.getElementById("btnTheme");
  const toast = document.getElementById("toast");
  const year = document.getElementById("year");

  if (year) year.textContent = String(new Date().getFullYear());

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("is-visible");
    window.clearTimeout(showToast._t);
    showToast._t = window.setTimeout(() => toast.classList.remove("is-visible"), 1800);
  }

  function setTheme(theme) {
    if (theme === "light") {
      root.setAttribute("data-theme", "light");
      btnTheme?.setAttribute("aria-pressed", "true");
    } else {
      root.removeAttribute("data-theme");
      btnTheme?.setAttribute("aria-pressed", "false");
    }
    localStorage.setItem("dev_theme", theme);
  }

  const saved = localStorage.getItem("dev_theme");
  if (saved === "light") setTheme("light");

  btnTheme?.addEventListener("click", () => {
    const isLight = root.getAttribute("data-theme") === "light";
    setTheme(isLight ? "dark" : "light");
    showToast(isLight ? "Dark theme enabled" : "Light theme enabled");
  });

  document.querySelectorAll("[data-copy]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const value = btn.getAttribute("data-copy") || "";
      if (!value) return;

      try {
        await navigator.clipboard.writeText(value);
        showToast("Copied");
      } catch {
        const tmp = document.createElement("textarea");
        tmp.value = value;
        document.body.appendChild(tmp);
        tmp.select();
        document.execCommand("copy");
        document.body.removeChild(tmp);
        showToast("Copied");
      }
    });
  });
})();
