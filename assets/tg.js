/*
  Инициализация Telegram Mini App.
  Страница должна работать и без этого файла — здесь только раскрытие
  на всю высоту, цвета рамки Telegram и переход по ссылке startapp.

  SDK Telegram (telegram-web-app.js) намеренно НЕ подключается: это внешний
  файл с telegram.org, а Telegram в России ограничивают — одна зависшая
  загрузка ломает страницу. Вместо SDK события отправляются напрямую тем же
  способом, что и в самом SDK: TelegramWebviewProxy в приложениях,
  postMessage в веб-версии.

  Цвета темы Telegram на страницу НЕ подставляются: дизайн задуман светлым,
  с фирменной палитрой (см. assets/style.css). Вместо этого Telegram красит
  свою шапку в наш синий, чтобы она сливалась с шапкой страницы.

  Полноэкранный режим (requestFullscreen) не используется: в нём кнопки
  Telegram ложатся поверх верха страницы и закрывают панель разделов.
*/
(function () {
  // Параметры запуска Telegram передаёт в адресе только при первом открытии:
  // ?tgWebAppStartParam=… и #tgWebAppData=…&tgWebAppPlatform=…
  var query = new URLSearchParams(location.search);
  var hash = new URLSearchParams(location.hash.slice(1));
  var launched = hash.has("tgWebAppPlatform") || hash.has("tgWebAppData");

  // При переходах внутри мини-аппа параметры из адреса пропадают,
  // поэтому запоминаем, что мы в Telegram, на время сессии.
  try {
    if (launched) sessionStorage.setItem("tgMiniApp", "1");
    else launched = sessionStorage.getItem("tgMiniApp") === "1";
  } catch (e) {}
  if (window.TelegramWebviewProxy) launched = true;
  if (!launched) return;

  function postEvent(type, data) {
    try {
      if (window.TelegramWebviewProxy && window.TelegramWebviewProxy.postEvent) {
        window.TelegramWebviewProxy.postEvent(type, data ? JSON.stringify(data) : "");
      } else if (window.parent !== window) {
        window.parent.postMessage(
          JSON.stringify({ eventType: type, eventData: data || "" }),
          "https://web.telegram.org"
        );
      }
    } catch (e) {}
  }

  postEvent("web_app_ready");
  postEvent("web_app_expand");
  postEvent("web_app_set_header_color", { color: "#1f3fd0" });
  postEvent("web_app_set_background_color", { color: "#ffffff" });

  // Ссылка t.me/<бот>?startapp=<слаг> открывает оглавление (основной
  // мини-апп бота) с меткой <слаг> — переходим сразу на эту инструкцию.
  var start = query.get("tgWebAppStartParam");
  if (!start) {
    var data = new URLSearchParams(hash.get("tgWebAppData") || "");
    start = data.get("start_param");
  }
  if (!start || !/^[a-z0-9][a-z0-9-]{0,63}$/.test(start)) return;

  var script = document.currentScript;
  if (!script || !script.src) return;
  var base = script.src.replace(/assets\/tg\.js(\?.*)?$/, "");
  var target = base + start + "/";
  if (location.href.split(/[?#]/)[0] !== target) location.replace(target);
})();
