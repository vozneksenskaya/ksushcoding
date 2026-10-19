/*
  Инициализация Telegram Mini App.
  Страница должна работать и без этого файла — здесь только раскрытие
  на всю высоту и цвета рамки Telegram, никакой логики контента.

  Цвета темы Telegram на страницу НЕ подставляются: дизайн задуман светлым,
  с фирменной палитрой (см. assets/style.css). Вместо этого Telegram красит
  свою шапку в наш синий, чтобы она сливалась с шапкой страницы.

  Полноэкранный режим (requestFullscreen) не используется: в нём кнопки
  Telegram ложатся поверх верха страницы и закрывают панель разделов.
*/
(function () {
  var tg = window.Telegram && window.Telegram.WebApp;
  if (!tg) return;

  try { tg.ready(); } catch (e) {}
  try { tg.expand(); } catch (e) {}
  if (typeof tg.setHeaderColor === "function") {
    try { tg.setHeaderColor("#1f3fd0"); } catch (e) {}
  }
  if (typeof tg.setBackgroundColor === "function") {
    try { tg.setBackgroundColor("#ffffff"); } catch (e) {}
  }
})();
