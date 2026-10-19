/* Support for visitors (most arrive from ads): the same GTWY chat the old viasocket.com had, opened by our own button. */
(function () {
  'use strict';
  var KEY = 'viasocket_chat_thread', TTL = 60 * 60 * 1000, id;
  try {
    var s = JSON.parse(localStorage.getItem(KEY) || 'null');
    if (s && s.id && Date.now() - s.createdAt < TTL) id = s.id;
    else { id = (crypto.randomUUID ? crypto.randomUUID() : String(Date.now()) + Math.random()); localStorage.setItem(KEY, JSON.stringify({ id: id, createdAt: Date.now() })); }
  } catch (e) { id = String(Date.now()); }
  var sc = document.createElement('script');
  sc.id = 'chatbot-main-script'; sc.async = true; sc.src = 'https://chatbot.gtwy.ai/chatbot.js';
  sc.setAttribute('embedToken', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcmdfaWQiOiIxMjc3IiwiY2hhdGJvdF9pZCI6IjY2NTA2MjhhZDQ4ZTIwZTYxY2Y3MDFhMCIsInVzZXJfaWQiOiJ0ZXN0X3VzZXIifQ.pU9ms9HhiBUKhvJuBUDiue03F2lmFAqBuwd6FCSdvgI');
  sc.setAttribute('bridgeName', 'viasocket_chat'); sc.setAttribute('threadId', id);
  sc.onload = function () { try { window.Chatbot && window.Chatbot.sendData({ bridgeName: 'viasocket_chat', threadId: id, hideIcon: true }); } catch (e) {} };
  document.head.appendChild(sc);
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-chat]'); if (!b) return;
    if (window.Chatbot && window.Chatbot.open) { e.preventDefault(); window.Chatbot.open(); }
  });
})();
