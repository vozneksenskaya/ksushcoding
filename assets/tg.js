/*
  Инициализация Telegram Mini App.
  Страница должна работать и без этого файла — здесь только раскрытие
  на весь экран и подхват темы, никакой логики контента.
*/
(function () {
  var tg = window.Telegram && window.Telegram.WebApp;
  if (!tg) return;

  try { tg.ready(); } catch (e) {}
  try { tg.expand(); } catch (e) {}
  if (typeof tg.requestFullscreen === "function") {
    try { tg.requestFullscreen(); } catch (e) {}
  }

  function applyTheme() {
    var p = tg.themeParams || {};
    var root = document.documentElement.style;
    if (p.bg_color) root.setProperty("--paper", p.bg_color);
    if (p.text_color) root.setProperty("--ink", p.text_color);
    if (p.hint_color) root.setProperty("--ink-soft", p.hint_color);
    if (p.link_color) root.setProperty("--accent", p.link_color);
    if (p.secondary_bg_color) root.setProperty("--wash", p.secondary_bg_color);
  }

  applyTheme();
  if (typeof tg.onEvent === "function") {
    tg.onEvent("themeChanged", applyTheme);
  }
  if (typeof tg.setHeaderColor === "function") {
    try { tg.setHeaderColor("secondary_bg_color"); } catch (e) {}
  }
})();
