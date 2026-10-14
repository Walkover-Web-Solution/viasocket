/* viaSocket "simple-bento": product-led bento. Content and helpers come from "simple". */
(function () {
  'use strict';

  var doc = document;
  var $ = function (s, c) { return (c || doc).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || doc).querySelectorAll(s)); };
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var svg = function (d) { return '<svg viewBox="0 0 24 24" aria-hidden="true">' + d + '</svg>'; };
  var COPY_ICO = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="9" y="9" width="12" height="12" rx="1"/><path d="M5 15H3V3h12v2"/></svg>';

  /* ---------- copy ---------- */
  var toastEl = doc.createElement('div');
  toastEl.className = 'toast'; toastEl.setAttribute('role', 'status'); toastEl.setAttribute('aria-live', 'polite');
  doc.body.appendChild(toastEl);
  var toastT;
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add('on');
    clearTimeout(toastT);
    toastT = setTimeout(function () { toastEl.classList.remove('on'); }, 3200);
  }
  function copyText(text) {
    function legacy() {
      try {
        var t = doc.createElement('textarea');
        t.value = text; t.setAttribute('readonly', ''); t.style.position = 'fixed'; t.style.top = '-1000px';
        doc.body.appendChild(t); t.select();
        var ok = doc.execCommand('copy');
        doc.body.removeChild(t);
        return ok;
      } catch (e) { return false; }
    }
    return new Promise(function (resolve, reject) {
      if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(resolve, function () { legacy() ? resolve() : reject(); });
      else if (legacy()) resolve(); else reject();
    });
  }
  var PROMPT = $('#promptText').textContent.trim();
  /* Clipboard refused: show the prompt, selected, so it can be copied by hand. */
  function manual(text) {
    var box = $('#copy-fb');
    if (!box) {
      box = doc.createElement('div'); box.id = 'copy-fb'; box.className = 'copy-fb'; box.setAttribute('role', 'dialog'); box.setAttribute('aria-label', 'Copy the prompt');
      box.innerHTML = '<p>Your browser blocked copying. The prompt is selected: press Ctrl+C or ⌘C.</p><textarea readonly rows="7"></textarea><button type="button" class="btn">Done</button>';
      doc.body.appendChild(box);
      $('button', box).addEventListener('click', function () { box.hidden = true; });
    }
    box.hidden = false;
    var ta = $('textarea', box); ta.value = typeof text === 'string' ? text : PROMPT; ta.focus(); ta.select();
  }
  // one listener for every "Copy setup prompt" button, including the one the gallery adds later
  doc.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-copy]'); if (!btn) return;
    copyText(PROMPT).then(function () {
      var t = $('.btn-t', btn), was = t.textContent;
      t.textContent = 'Copied'; btn.classList.add('done');
      toast('Copied. Paste it into your AI.');
      setTimeout(function () { t.textContent = was; btn.classList.remove('done'); }, 2400);
    }, manual);
  });

  /* ---------- app icons used across the page ---------- */
  var B = 'https://stuff.thingsofbrand.com/';
  var IC = {
    gmail: ['Gmail', B + 'gmail.com/images/imge_idrA5FDGTH_1763454052978.svg'], calendar: ['Google Calendar', B + 'google.com/images/img7_Google-Calendar.png'],
    drive: ['Google Drive', B + 'google.com/images/img9_googledrive.png'], sheets: ['Google Sheets', B + 'google.com/images/img4_googlesheet.png'],
    forms: ['Google Forms', B + 'google.com/images/imgb_Google_Forms_Logo.png'], slack: ['Slack', B + 'slack.com/images/img668216333e_slack.jpg'],
    hubspot: ['HubSpot', B + 'hubspot.com/images/img61728fea98_hubspot.jpg'], salesforce: ['Salesforce', B + 'salesforce.com/images/img1_salesforce.png'],
    pipedrive: ['Pipedrive', B + 'pipedrive.com/images/img615f7335ac_pipedrive.jpg'], shopify: ['Shopify', B + 'shopify.com/images/img6fb21a1332_shopify.jpg'],
    freshdesk: ['Freshdesk', B + 'freshdesk.com/images/imgf_freshdesk.png'], asana: ['Asana', B + 'asana.com/images/img658df77d87_asana.jpg'],
    notion: ['Notion', B + 'notion.so/images/img667018e3f8_notion.jpg'], teams: ['Microsoft Teams', B + 'microsoft.com/images/img9_Microsoft-Teams-Logo.png'],
    xero: ['Xero', B + 'xero.com/images/img6b682e64a8_xero.jpg'], whatsapp: ['WhatsApp', B + 'viasocket.com/images/imge_whatsapp.svg'],
    stripe: ['Stripe', B + 'stripe.com/images/img67eab239fe_stripe.jpg'], quickbooks: ['QuickBooks', B + 'quickbooks.intuit.com/images/imgf_Screenshot-2025-03-20-141203.png'],
    github: ['GitHub', B + 'github.com/images/img65d45fd9b8_github.jpg'], linkedin: ['LinkedIn', B + 'linkedin.com/images/img60aec4bbba_linkedin.jpg'],
    intercom: ['Intercom', B + 'intercom.com/images/img64da81ea37_intercom.jpg'], trello: ['Trello', B + 'trello.com/images/imge_trello.png']
  };
  function ico(k, cls) { return '<span class="ico' + (cls ? ' ' + cls : '') + '" title="' + IC[k][0] + '"><img src="' + IC[k][1] + '" alt="" loading="lazy" width="16" height="16"></span>'; }

  /* ---------- hero: what it connects to; an icon that does not load is removed, never shown broken ---------- */
  $$('.hero-apps img').forEach(function (img) {
    function drop() { if (img.parentNode) img.parentNode.removeChild(img); }
    if (img.complete) { if (!img.naturalWidth) drop(); } else { img.addEventListener('error', drop); img.addEventListener('load', function () { if (!img.naturalWidth) drop(); }); }
  });

  /* ---------- hero: the window cycles through four apps like yours; the chips and the H1 word follow ---------- */
  var rot = $('[data-rot]'), rotT;
  function setWord(w) {
    if (!rot) return;
    clearTimeout(rotT);
    if (reduced) { rot.textContent = w; return; }
    if (rot.textContent === w) { rot.classList.remove('out'); return; }
    // out slides up (150ms), the new word slides in from below (150ms)
    rot.classList.add('out');
    rotT = setTimeout(function () {
      rot.textContent = w;
      rot.classList.remove('out');
      rot.classList.add('in');
      void rot.offsetWidth;
      rot.classList.remove('in');
    }, 150);
  }
  var hx = $('#hx');
  if (hx) {
    var scenes = $$('.scene', hx), say = $('#hx-say'), shot = $('#hx-panel'), chips = $$('.hx-c', hx);
    // AI agent first: it shows on load, then CRM, support desk, recruiting
    var HWORD = ['AI agent.', 'CRM.', 'support desk.', 'recruiting app.'];
    var SAY = [
      'Your AI agent asks to connect Slack before it posts. Slack’s own consent screen opens on top.',
      'Your CRM’s contact page asks to connect Gmail. Gmail’s own consent screen opens on top, so your app never sees the password.',
      'Your support desk asks to connect Shopify to show the order. Shopify’s own consent screen opens on top.',
      'Your recruiting app asks to connect Google Calendar to find free times. Google’s own consent screen opens on top.'
    ];
    // every 2.4s, held while the pointer or keyboard focus is on the window itself; never with reduced motion
    var AUTO = 2400, OUT = 120, cur = 0, timer = 0, swapT = 0, hover = false, focus = false;
    function arm() {
      clearTimeout(timer);
      if (reduced || hover || focus) return;
      timer = setTimeout(function () {
        if (shot.contains(doc.activeElement)) { focus = true; return; }
        show(cur + 1);
      }, AUTO);
    }
    // one app at a time: the old window, popup and caption fade fully out before the new one fades in
    function show(i) {
      var next = (i + scenes.length) % scenes.length;
      cur = next;
      chips.forEach(function (c, k) { c.setAttribute('aria-pressed', k === next ? 'true' : 'false'); });
      say.textContent = SAY[next];
      setWord(HWORD[next]);
      arm();
      clearTimeout(swapT);
      function enter() {
        scenes.forEach(function (sc, k) { sc.classList.remove('out'); if (k !== next) sc.classList.remove('on'); });
        scenes[next].classList.add('on');
      }
      if (reduced) { enter(); return; }
      var leaving = scenes.filter(function (sc, k) { return k !== next && sc.classList.contains('on'); });
      if (!leaving.length) { enter(); return; }
      leaving.forEach(function (sc) { sc.classList.remove('on'); sc.classList.add('out'); });
      swapT = setTimeout(enter, OUT);
    }
    chips.forEach(function (c, k) { c.addEventListener('click', function () { show(k); }); });
    shot.addEventListener('mouseenter', function () { hover = true; arm(); });
    shot.addEventListener('mouseleave', function () { hover = false; arm(); });
    shot.addEventListener('focusin', function () { focus = true; arm(); });
    shot.addEventListener('focusout', function (e) { if (!shot.contains(e.relatedTarget)) { focus = false; arm(); } });
    arm();
  }

  /* ---------- 2 · use cases ---------- */
  var GAL = [
    { name: 'Hotelator OS', cat: 'apps', type: 'Hotel management', live: true, url: 'https://hotelos.embarko.app', apps: ['whatsapp', 'gmail', 'slack'],
      line: 'Guests book, check in and ask for anything on WhatsApp.',
      what: 'A hotel system for bookings, online check-in and guest requests. Guests do most of it from WhatsApp, and each request reaches the right person on the staff.',
      flows: [['whatsapp', 'Booking confirmation and check-in link', 'Sent on WhatsApp the moment a guest books.'],
              ['whatsapp', 'Guest requests to the right person', '“Two extra towels” goes to housekeeping. “AC isn’t cooling” goes to the engineer.'],
              ['gmail', 'Invoice at check-out', 'Arrives on WhatsApp and email before the guest leaves.']] },
    { name: 'Inbox assistant', cat: 'agents', type: 'AI agent', apps: ['gmail', 'calendar'], line: 'Sorts email, drafts replies and books meetings.',
      flows: [['gmail', 'Finds what needs a reply', 'Searches the inbox and drafts answers for review.'], ['calendar', 'Books the meeting', 'Checks free time and sends the invite.']] },
    { name: 'Demo follow-up agent', cat: 'agents', type: 'AI agent', apps: ['hubspot', 'gmail'], line: 'Follows up after every demo and logs it in the CRM.',
      flows: [['gmail', 'Sends the follow-up', 'From the rep’s own Gmail.'], ['hubspot', 'Logs it on the contact', 'So the deal history stays complete.']] },
    { name: 'AI support agent', cat: 'agents', type: 'AI agent', apps: ['shopify', 'freshdesk', 'gmail'], line: 'Finds the order, closes the ticket and emails the customer.',
      flows: [['shopify', 'Finds the order', 'Status, shipping and delivery date.'], ['freshdesk', 'Updates the ticket', 'With the real status, then marks it solved.'], ['gmail', 'Emails the customer', 'With the tracking link.']] },
    { name: 'Clinic booking app', cat: 'apps', type: 'Booking app', apps: ['calendar', 'whatsapp'], line: 'Patients book a slot and get reminders on WhatsApp.',
      flows: [['calendar', 'Books the slot', 'In the doctor’s own calendar.'], ['whatsapp', 'Sends reminders', 'A day before and an hour before.']] },
    { name: 'Expense approvals', cat: 'internal', type: 'Internal tool', apps: ['xero', 'slack'], line: 'Approved spend becomes a purchase order in Xero.',
      flows: [['xero', 'Creates the purchase order', 'As soon as finance approves.'], ['slack', 'Tells the team', 'Posts it to #finance.']] },
    { name: 'Meeting notes agent', cat: 'agents', type: 'AI agent', apps: ['notion', 'calendar'], line: 'Files notes and action items after every call.',
      flows: [['calendar', 'Knows when a call ends', 'From the user’s calendar.'], ['notion', 'Files the notes', 'With action items on a Notion page.']] },
    { name: 'Integrations page for your SaaS', cat: 'apps', type: 'SaaS feature', apps: ['hubspot', 'salesforce', 'slack'], line: 'Each customer connects their own apps, in your UI.',
      flows: [['hubspot', 'Customers connect their CRM', 'HubSpot or Salesforce, with their own account.'], ['slack', 'Alerts to their Slack', 'Set up per customer.']] }
  ];

  /* ---------- the preview: the real app each use case works in, with the agent at work inside it ----------
     Each scene is a browser window drawn at one fixed size in em (51.2 × 35.6) and scaled to the pane, so it reads as one picture.
     It plays once each time it is shown: data-steps are the waits (ms) before s1, s2 …; .stN / .grN parts appear at step N,
     .hdN parts go, and [data-ty] text types itself in. With reduced motion it shows the finished state. */
  var CKS = svg('<path d="M5 12.5l4.5 4.5L19 7.5"/>');
  var SPARK = svg('<path d="M12 3.5l1.9 4.8 4.8 1.9-4.8 1.9L12 16.9l-1.9-4.8-4.8-1.9 4.8-1.9z"/>');
  var SRCH = svg('<circle cx="11" cy="11" r="6.5"/><path d="M16 16l4 4"/>');
  var LOCK = svg('<rect x="6" y="11" width="12" height="9" rx="1.5"/><path d="M8.5 11V8a3.5 3.5 0 0 1 7 0v3"/>');
  var PEN = svg('<path d="M4 20h4L19.5 8.5l-4-4L4 16z"/>');
  var PLUS = svg('<path d="M12 5v14M5 12h14"/>');
  var DTK = '<svg class="dtk" viewBox="0 0 24 16" aria-hidden="true"><path d="M1 8.5l4 4 8-9M9 11l1.5 1.5 8-9"/></svg>';
  var PTR = '<svg class="ptr" viewBox="0 0 24 24" aria-hidden="true"><path d="M5.5 3l13.5 8.2-6.1 1.4-3.1 5.9z"/></svg>';
  var SPN = '<i class="spn" aria-hidden="true"></i>';
  var AVC = ['#7c8db5', '#b0806e', '#6e9b8a', '#9a7cb0', '#c2995a', '#6f8fa8'];
  function im(k) { return '<img src="' + IC[k][1] + '" alt="" loading="lazy">'; }
  function WIN(url, body, cls) { return '<span class="aw' + (cls ? ' ' + cls : '') + '"><span class="ab"><i></i><i></i><i></i><span class="ab-u">' + LOCK + url + '</span></span><span class="aw-b">' + body + '</span></span>'; }
  function AGT(t) { return '<span class="agt">' + SPARK + t + '</span>'; }
  function TY(n, t) { return '<span class="tw" data-at="' + n + '" data-ty="' + t + '"></span>'; }
  function GR(n, h) { return '<span class="gr' + n + '"><span>' + h + '</span></span>'; }
  function SW(n, a, b) { return '<span class="sw"><span class="hd' + n + '">' + a + '</span><span class="st' + n + '">' + b + '</span></span>'; }
  function AV(t, i) { return '<span class="av" style="--c:' + AVC[i % AVC.length] + '">' + t + '</span>'; }
  function SC(steps, html, focus) { return '<span class="rs" data-steps="' + steps + '"' + (focus ? ' data-focus="' + focus + '"' : '') + '><span class="rc">' + html + '</span></span>'; }
  // a Google-style top bar: logo, name, search, account
  function GTOP(k, name, search, left) { return '<span class="g-top">' + (left || '') + im(k) + '<b class="g-nm">' + name + '</b>' + (search ? '<span class="g-srch">' + SRCH + search + '</span>' : '') + '<span class="g-r">' + AV('R', 0) + '</span></span>'; }
  var BURGER = '<span class="g-bg"><i></i><i></i><i></i></span>';

  var SCN = [];

  // 0 · Hotelator OS (live): the hotel's WhatsApp; a guest asks, the auto-reply answers and housekeeping gets it
  SCN[0] = SC('700,1300,1500', WIN('yourapp.com',
    '<span class="wa">' +
      '<span class="wa-l">' +
        '<span class="wa-lh">' + AV('GP', 5) + '<b>Grand Palms Hotel</b></span>' +
        '<span class="wa-s">' + SRCH + 'Search or start a new chat</span>' +
        '<span class="wa-c on">' + AV('P', 1) + '<span class="wa-cn"><b>Priya · Room 204</b><small>' + SW(1, 'See you at check-in!', 'Can I get two extra towels?') + '</small></span><small class="wa-ct">9:12 PM</small></span>' +
        '<span class="wa-c">' + AV('D', 0) + '<span class="wa-cn"><b>Daniel · Room 118</b><small>Thanks, see you at 7!</small></span><small class="wa-ct">8:40 PM</small></span>' +
        '<span class="wa-c">' + AV('M', 2) + '<span class="wa-cn"><b>Mei · Room 305</b><small>What time is breakfast?</small></span><small class="wa-ct">8:02 PM</small></span>' +
        '<span class="wa-c">' + AV('A', 4) + '<span class="wa-cn"><b>Arun · Room 412</b><small>Late check-out is fine.</small></span><small class="wa-ct">7:15 PM</small></span>' +
        '<span class="wa-c">' + AV('S', 3) + '<span class="wa-cn"><b>Sara · Room 107</b><small>Booked, thank you!</small></span><small class="wa-ct">6:30 PM</small></span>' +
        '<span class="wa-c">' + AV('T', 0) + '<span class="wa-cn"><b>Tom · Room 220</b><small>Is the pool open late?</small></span><small class="wa-ct">5:48 PM</small></span>' +
        '<span class="wa-c">' + AV('E', 5) + '<span class="wa-cn"><b>Elena · Room 310</b><small>Airport pickup at 6, please.</small></span><small class="wa-ct">4:20 PM</small></span>' +
      '</span>' +
      '<span class="wa-r">' +
        '<span class="wa-h">' + AV('P', 1) + '<span class="wa-cn"><b>Priya · Room 204</b><small>online</small></span></span>' +
        '<span class="wa-m">' +
          '<span class="wa-day">Today</span>' +
          '<span class="wa-b out">Welcome to Grand Palms, Priya! Your room is ready.<small>3:05 PM' + DTK + '</small></span>' +
          '<span class="wa-b in">See you at check-in!<small>3:06 PM</small></span>' +
          GR(1, '<span class="wa-b in">Hi! Can I get two extra towels in 204?<small>9:12 PM</small></span>') +
          GR(2, '<span class="wa-b out">Of course! Housekeeping is on the way, about 5 minutes.<small>9:12 PM' + DTK + '</small></span><span class="wa-auto">' + SPARK + 'Hotelator OS · sent to housekeeping</span>') +
          GR(3, '<span class="wa-b in">Thank you!<small>9:13 PM</small></span>') +
        '</span>' +
        '<span class="wa-f"><span>Type a message</span></span>' +
      '</span>' +
    '</span>'), 'r');

  // 1 · Inbox assistant: in Gmail, it sorts what needs a reply and drafts the answer
  SCN[1] = (function () {
    function row(from, sub, snip, time, un, lab) { return '<span class="gm-row' + (un ? ' un' : '') + '"><i class="cbx"></i><span class="gm-fr">' + from + '</span><span class="gm-sb"><b>' + sub + '</b> – ' + snip + '</span>' + (lab ? '<span class="gm-lb st1">To reply</span>' : '') + '<small class="gm-tm">' + time + '</small></span>'; }
    return SC('700,900,2700', WIN('yourapp.com',
      '<span class="gm">' +
        GTOP('gmail', 'Gmail', 'Search mail', BURGER) +
        '<span class="g-main">' +
          '<span class="g-nav"><span class="g-new">' + PEN + 'Compose</span><span class="on"><b>Inbox</b><em>12</em></span><span>Starred</span><span>Snoozed</span><span>Sent</span><span>Drafts<em>3</em></span><span>More</span></span>' +
          '<span class="g-pg gm-list"><span class="gm-tb"><i class="cbx"></i><span>↻</span><span>⋮</span><small>1–50 of 1,284</small></span>' +
            row('Dana Lee', 'Can we talk Thursday?', 'Wanted to go over the proposal before we…', '9:42 AM', 1, 1) +
            row('Stripe', 'Your receipt from Acme', 'Receipt #2231 · $49.00 paid', '9:10 AM') +
            row('Arjun Mehta', 'Re: Q4 hiring plan', 'Sounds good. Can you send the numbers…', '8:55 AM', 1, 1) +
            row('Notion', 'Your weekly digest', '3 pages updated in Northwind', '8:02 AM') +
            row('Lia Chen', 'Pricing question', 'Do you offer annual billing for teams…', 'Oct 12', 1, 1) +
            row('LinkedIn', 'You appeared in 9 searches', 'See who’s looking at your profile', 'Oct 12') +
            row('Google', 'Security alert', 'New sign-in on Mac', 'Oct 11') +
            row('Figma', 'Maya invited you to a file', 'Homepage v3', 'Oct 11') +
            row('Arjun Mehta', 'Interview panel for Riya', 'Can you join on Thursday?', 'Oct 10') +
            row('Calendly', 'New event: Intro call', 'Wed, Oct 14 · 11:00 AM', 'Oct 10') +
            row('Maya Rao', 'Launch checklist', 'Added the last two items for QA', 'Oct 9') +
            row('GitHub', 'Your weekly summary', '14 pull requests merged', 'Oct 9') +
          '</span>' +
        '</span>' +
        '<span class="gm-cmp st2"><span class="gm-ch"><b>Re: Can we talk Thursday?</b><span>–&nbsp;&nbsp;⤢&nbsp;&nbsp;✕</span></span>' +
          '<span class="gm-to">To<span class="gm-chip">Dana Lee</span></span>' +
          '<span class="gm-bd">' + TY(2, 'Hi Dana, Thursday at 3:00 PM works for me. I’ve sent you an invite. Talk then!') + '</span>' +
          '<span class="gm-cf"><span class="gm-send">Send</span>' + AGT('Draft by Inbox assistant') + '</span>' +
          GR(3, '<span class="gm-ok">' + im('calendar') + 'Invite sent · Thu, Oct 15 · 3:00 PM</span>') +
        '</span>' +
      '</span>'), 'r');
  })();

  // 2 · Demo follow-up agent: in HubSpot, the follow-up email shows on the contact and the deal moves on
  SCN[2] = SC('900,1400', WIN('yourapp.com',
    '<span class="hs">' +
      '<span class="hs-top">' + im('hubspot') + '<span class="hs-nav"><span class="on">Contacts</span><span>Deals</span><span>Inbox</span><span>Reports</span></span><span class="g-srch">' + SRCH + 'Search HubSpot</span><span class="g-r">' + AV('R', 0) + '</span></span>' +
      '<span class="hs-main">' +
        '<span class="hs-l">' +
          '<small class="hs-bk">‹ Contacts</small>' +
          '<span class="hs-id">' + AV('LC', 2) + '<span><b>Lia Chen</b><small>Head of Ops at Northwind</small><small>lia@northwind.co</small></span></span>' +
          '<span class="hs-acts"><span><i>✎</i>Note</span><span><i>✉</i>Email</span><span><i>☏</i>Call</span><span><i>☐</i>Task</span><span><i>◷</i>Meet</span></span>' +
          '<span class="hs-ab"><b>About this contact</b>' +
            '<span><small>Lifecycle stage</small>Opportunity</span>' +
            '<span><small>Contact owner</small>Ravi Kumar</span>' +
            '<span><small>Last contacted</small>' + SW(1, 'Today, 3:45 PM', 'Today, 4:05 PM') + '</span>' +
          '</span>' +
        '</span>' +
        '<span class="hs-m">' +
          '<span class="hs-tabs"><span>Overview</span><span class="on">Activities</span><span>Intelligence</span></span>' +
          '<span class="hs-feed">' +
            '<small class="hs-mo">October 2026</small>' +
            GR(1, '<span class="hs-a new"><span class="hs-ah">' + im('gmail') + '<b>Email</b><span>Thanks for today, Lia</span><small>Today, 4:05 PM</small></span>' +
              '<small class="hs-fr">From Ravi Kumar to Lia Chen</small>' +
              '<span class="hs-tx">Great to walk you through it. Here’s the recap and the pricing we talked about…</span>' +
              AGT('Sent and logged by Demo follow-up agent') + '</span>') +
            '<span class="hs-a"><span class="hs-ah">' + im('calendar') + '<b>Meeting</b><span>Product demo</span><small>Today, 3:00 PM</small></span><span class="hs-tx">45 min · Lia Chen, Ravi Kumar, Sam Lee · Completed</span></span>' +
            '<span class="hs-a"><span class="hs-ah"><i class="hs-ni">✎</i><b>Note</b><span>by Ravi Kumar</span><small>Oct 10</small></span><span class="hs-tx">Wants the Slack integration for their support team.</span></span>' +
            '<span class="hs-a"><span class="hs-ah"><i class="hs-ni">☏</i><b>Call</b><span>Intro call</span><small>Oct 6</small></span><span class="hs-tx">20 min · Booked the demo for today.</span></span>' +
          '</span>' +
        '</span>' +
        '<span class="hs-r">' +
          '<span class="hs-card"><b>Deals (1)</b><span class="hs-deal"><b>Northwind · Annual</b><small>Amount: $24,000</small><small>Close date: Oct 31, 2026</small>' +
            '<span class="hs-stg">Stage: ' + SW(2, '<span class="pill">Demo done</span>', '<span class="pill on">Proposal sent</span>') + '</span></span></span>' +
          '<span class="hs-card"><b>Companies (1)</b><span class="hs-co"><i>N</i><span><b>Northwind</b><small>northwind.co</small></span></span></span>' +
        '</span>' +
      '</span>' +
    '</span>'));

  // 3 · AI support agent: in Freshdesk, it looks up the order in Shopify, answers, and solves the ticket
  SCN[3] = SC('800,900,3300', WIN('yourapp.com',
    '<span class="fd">' +
      '<span class="fd-top">' + im('freshdesk') + '<b>Tickets</b><small>› #1042</small><span class="g-srch">' + SRCH + 'Search</span><span class="g-r">' + AV('R', 0) + '</span></span>' +
      '<span class="fd-main">' +
        '<span class="fd-conv">' +
          '<span class="fd-th"><b>Where’s my order #1042?</b><span class="fd-st">' + SW(3, '<span class="pill">Open</span>', '<span class="pill ok">Resolved</span>') + '</span></span>' +
          '<span class="fd-msg">' + AV('MK', 3) + '<span><span class="fd-mh"><b>Maya Kapoor</b><small>reported via email · 9:40 AM</small></span><span class="fd-tx">Hi, I ordered on Oct 6 and it still hasn’t arrived. Where’s my order #1042?</span></span></span>' +
          '<span class="fd-rp"><span class="fd-rh"><b>Reply</b>' + AGT('AI support agent') + '</span>' +
            '<span class="fd-rb">' + TY(2, 'Hi Maya, your order #1042 shipped with UPS on Oct 11 and arrives Thursday, Oct 15. Tracking: 1Z 84A 0F9 03 1234. Sorry for the wait!') + '</span>' +
            '<span class="fd-rf"><span class="fd-send">' + SW(3, 'Send', CKS + 'Sent') + '</span></span></span>' +
        '</span>' +
        '<span class="fd-side">' +
          '<span class="fd-card"><b>Contact</b><span class="fd-ct">' + AV('MK', 3) + '<span><b>Maya Kapoor</b><small>maya@kapoor.design</small></span></span><small>Customer since 2024 · 6 orders</small></span>' +
          '<span class="fd-card st1"><span class="fd-ch">' + im('shopify') + '<b>Shopify</b></span>' +
            '<span class="fd-kv"><small>Order</small><b>#1042</b></span><span class="fd-kv"><small>Status</small><b class="ok">Shipped</b></span>' +
            '<span class="fd-kv"><small>Carrier</small><b>UPS</b></span><span class="fd-kv"><small>Arrives</small><b>Thu, Oct 15</b></span><span class="fd-kv"><small>Total</small><b>$84.00</b></span></span>' +
        '</span>' +
      '</span>' +
    '</span>'), 'r');

  // 4 · Clinic booking app: the reminder reaches the patient on WhatsApp; their tap confirms the slot in the doctor's calendar
  SCN[4] = SC('800,1500,1200',
    '<span class="ph">' +
      '<span class="ph-sb"><b>9:41</b><span>▮▮▮ ◔</span></span>' +
      '<span class="ph-h"><span class="ph-bk">‹</span>' + AV('SC', 2) + '<span class="wa-cn"><b>Sunrise Clinic</b><small>Business account</small></span></span>' +
      '<span class="ph-m">' +
        '<span class="wa-day">Today</span>' +
        GR(1, '<span class="wa-b in ph-q">Hi Aman, a reminder: your check-up with Dr. Mehta is tomorrow, Wed Oct 14 at 10:30 AM.<small>6:00 PM</small>' +
          '<span class="ph-btns"><span class="ph-btn">Confirm' + '<span class="ph-tap st2"></span></span><span class="ph-btn">Reschedule</span></span></span>') +
        GR(2, '<span class="wa-b out">Confirm<small>6:02 PM' + DTK + '</small></span>') +
        GR(3, '<span class="wa-b in">You’re confirmed. See you tomorrow!<small>6:02 PM</small></span>') +
      '</span>' +
      '<span class="ph-f"><span>Message</span></span>' +
    '</span>' +
    WIN('yourapp.com',
      '<span class="gc gc-day">' +
        '<span class="g-top">' + im('calendar') + '<b class="g-nm">Calendar</b><span class="gc-btn">Day ▾</span><span class="g-r">' + AV('DM', 3) + '</span></span>' +
        '<span class="gc-dh"><small>WED</small><b>14</b><span>Dr. Mehta</span></span>' +
        '<span class="gc-body"><span class="gc-hrs"><span><small>9 AM</small></span><span><small>10 AM</small></span><span><small>11 AM</small></span><span><small>12 PM</small></span><span><small>1 PM</small></span><span><small>2 PM</small></span><span><small>3 PM</small></span></span>' +
          '<span class="gc-cols one"><i></i>' +
            '<span class="gc-ev" style="--d:0;--t:0;--h:0.5;--c:var(--gc-3)"><span class="gc-et"><b>Riya Patel · Follow-up</b><small>9 – 9:30am</small></span></span>' +
            '<span class="gc-ev" style="--d:0;--t:0.5;--h:0.5;--c:var(--gc-3)"><span class="gc-et"><b>Omar Khan · Check-up</b><small>9:30 – 10am</small></span></span>' +
            '<span class="gc-ev new" style="--d:0;--t:1.5;--h:0.75;--c:var(--gc-2)"><span class="gc-et"><b>Aman Verma · Check-up</b><small>10:30 – 11:15am · ' + SW(2, 'Not confirmed', CKS + 'Confirmed on WhatsApp') + '</small></span></span>' +
            '<span class="gc-ev" style="--d:0;--t:2.5;--h:0.5;--c:var(--gc-3)"><span class="gc-et"><b>Lena Fischer · New patient</b><small>11:30am – 12pm</small></span></span>' +
            '<span class="gc-ev" style="--d:0;--t:4;--h:0.5;--c:var(--gc-3)"><span class="gc-et"><b>Noah Brooks · Check-up</b><small>1 – 1:30pm</small></span></span>' +
            '<span class="gc-ev" style="--d:0;--t:4.5;--h:0.5;--c:var(--gc-3)"><span class="gc-et"><b>Priya Shah · Follow-up</b><small>1:30 – 2pm</small></span></span>' +
            '<span class="gc-ev" style="--d:0;--t:5.5;--h:0.5;--c:var(--gc-3)"><span class="gc-et"><b>Ana Ruiz · Check-up</b><small>2:30 – 3pm</small></span></span>' +
          '</span>' +
        '</span>' +
        '<span class="gc-note">' + AGT('Booked by Clinic booking app') + '</span>' +
      '</span>', 'cl-cal'));

  // 5 · Expense approvals: the approved request becomes a purchase order in Xero
  SCN[5] = (function () {
    function r(no, ref, to, date, amt, st, cls) { return '<span class="xe-row' + (cls ? ' ' + cls : '') + '"><b>' + no + '</b><span>' + ref + '</span><span>' + to + '</span><span>' + date + '</span><span class="xe-am">' + amt + '</span><span>' + st + '</span></span>'; }
    var OK = '<span class="pill ok">Approved</span>', BL = '<span class="pill">Billed</span>';
    return SC('900,1300', WIN('yourapp.com',
      '<span class="xe">' +
        '<span class="xe-top">' + im('xero') + '<b>Northwind Ltd ▾</b><span class="xe-nav"><span>Home</span><span class="on">Business</span><span>Accounting</span><span>Payroll</span><span>Contacts</span></span><span class="g-r">' + AV('R', 0) + '</span></span>' +
        '<span class="xe-pg">' +
          '<span class="xe-ph"><b>Purchase orders</b><span class="xe-btn">New purchase order</span></span>' +
          '<span class="xe-tabs"><span class="on">All</span><span>Draft</span><span>Awaiting approval</span><span>Approved</span><span>Billed</span></span>' +
          '<span class="xe-tbl">' +
            '<span class="xe-row xe-hd"><span>Number</span><span>Reference</span><span>To</span><span>Date</span><span class="xe-am">Amount</span><span>Status</span></span>' +
            GR(1, r('PO-0042', 'Figma · 10 editor seats', 'Figma, Inc.', '13 Oct 2026', '1,200.00', OK, 'new') + '<span class="xe-by st2">' + AGT('Created by Expense approvals') + '<small>' + im('slack') + 'Approved by Maya Rao · posted to #finance</small></span>') +
            r('PO-0041', 'MacBook Pro 14"', 'Apple', '9 Oct 2026', '2,400.00', OK) +
            r('PO-0040', 'Desk passes', 'WeWork', '2 Oct 2026', '640.00', BL) +
            r('PO-0039', 'Team offsite', 'Hotel Lumen', '28 Sep 2026', '3,150.00', BL) +
            r('PO-0038', 'Annual licence', 'Notion Labs', '21 Sep 2026', '960.00', BL) +
            r('PO-0037', 'Monitors × 4', 'Dell', '14 Sep 2026', '1,280.00', BL) +
            r('PO-0036', 'Event booth', 'SaaS Summit', '2 Sep 2026', '2,200.00', BL) +
          '</span>' +
        '</span>' +
      '</span>'));
  })();

  // 6 · Meeting notes agent: after the call, it writes the notes and action items on the Notion page
  SCN[6] = SC('700,1900,1700,600', WIN('yourapp.com',
    '<span class="nt">' +
      '<span class="no-side">' +
        '<span class="no-ws"><i>N</i><b>Northwind</b></span>' +
        '<span class="no-it">' + SRCH + 'Search</span><span class="no-it">Home</span><span class="no-it">Inbox</span>' +
        '<small>Teamspaces</small>' +
        '<span class="no-it">Roadmap</span><span class="no-it">Hiring</span><span class="no-it">Meeting notes</span><span class="no-it sub on">Weekly sync · Oct 13</span><span class="no-it sub">Design review · Oct 9</span>' +
      '</span>' +
      '<span class="no-pg">' +
        '<span class="no-bar"><small>Meeting notes / Weekly sync · Oct 13</small><span class="g-r">' + AGT('Notes agent') + '<span class="no-av">' + AV('L', 2) + AV('S', 0) + '</span><span>Share</span></span></span>' +
        '<span class="no-doc">' +
          '<b class="no-h1">Weekly sync · Oct 13</b>' +
          '<span class="no-pr"><small>Date</small><span>October 13, 2026 4:00 PM</span></span>' +
          '<span class="no-pr"><small>Attendees</small><span class="no-av">' + AV('L', 2) + AV('S', 0) + AV('M', 1) + AV('R', 4) + AV('A', 3) + '</span></span>' +
          '<span class="no-pr"><small>From</small><span>' + im('calendar') + 'Google Calendar · 45 min</span></span>' +
          '<b class="no-h2">Summary</b>' +
          '<span class="no-li st1">' + TY(1, 'Launch moves to Oct 28 so QA can finish the signup flow.') + '</span>' +
          '<span class="no-li st2">' + TY(2, 'The pricing page goes live with the launch.') + '</span>' +
          '<b class="no-h2 st3">Action items</b>' +
          '<span class="no-td st3"><i></i>Send the pricing deck<span class="no-at">@Lia Chen</span><small>Oct 15</small></span>' +
          '<span class="no-td st4"><i></i>Book the Q4 review<span class="no-at">@Sam Lee</span><small>Oct 17</small></span>' +
          '<span class="no-td st4"><i></i>Update the launch post<span class="no-at">@Maya Rao</span></span>' +
        '</span>' +
      '</span>' +
    '</span>'));

  // 7 · Integrations page for your SaaS: inside your own app, a customer connects Salesforce
  SCN[7] = (function () {
    function c(k, name, desc, btn) { return '<span class="ys-c">' + im(k) + '<b>' + name + '</b><small>' + desc + '</small>' + btn + '</span>'; }
    var ON = '<span class="ys-btn ok">' + CKS + 'Connected</span>', CON = '<span class="ys-btn">Connect</span>';
    var SF = '<span class="ys-sf"><span class="sw"><span class="hd2"><span class="ys-btn pr">Connect<span class="ys-pt st1 hd3">' + PTR + '</span></span></span><span class="st2 hd3"><span class="ys-btn">' + SPN + 'Connecting…</span></span><span class="st3"><span class="ys-btn ok">' + CKS + 'Connected</span></span></span><small class="st3">acme.my.salesforce.com</small></span>';
    return SC('800,800,1600', WIN('yourapp.com',
      '<span class="ys">' +
        '<span class="ys-side"><span class="ys-lg"><i>A</i><b>Acme</b></span><span>Dashboard</span><span>Projects</span><span>Reports</span><span class="on">Settings</span><span class="sub">Profile</span><span class="sub">Team</span><span class="sub">Billing</span><span class="sub on">Integrations</span></span>' +
        '<span class="ys-main"><b class="ys-h">Integrations</b><small>Connect the tools your team already uses.</small>' +
          '<span class="ys-grid">' +
            c('hubspot', 'HubSpot', 'Contacts and deals', ON) +
            c('salesforce', 'Salesforce', 'Accounts and deals', SF) +
            c('slack', 'Slack', 'Alerts in channels', ON) +
            c('notion', 'Notion', 'Notes to pages', CON) +
            c('gmail', 'Gmail', 'Send from Gmail', CON) +
            c('stripe', 'Stripe', 'Payments, invoices', CON) +
          '</span></span>' +
      '</span>'));
  })();

  // under each scene: the integrations it uses and the role each plays — [app, Trigger | Action | Connect, what it does, the scene step it lights up at]
  var USES = {
    0: [['whatsapp', 'Trigger', 'A guest asks for towels', 1], ['whatsapp', 'Action', 'Replies and sends it to housekeeping', 2], ['gmail', 'Action', 'Emails the invoice at check-out']],
    1: [['gmail', 'Trigger', 'New email from Dana', 1], ['gmail', 'Action', 'Labels it and drafts the reply', 2], ['calendar', 'Action', 'Checks Thursday, sends the invite', 3]],
    2: [['hubspot', 'Trigger', 'Demo marked as done', 0], ['gmail', 'Action', 'Sends the follow-up from Ravi’s inbox', 1], ['hubspot', 'Action', 'Logs the email, moves the deal', 2]],
    3: [['freshdesk', 'Trigger', 'New ticket: where’s my order?', 0], ['shopify', 'Action', 'Looks up order #1042', 1], ['freshdesk', 'Action', 'Replies and solves the ticket', 3], ['gmail', 'Action', 'Emails the tracking link', 3]],
    4: [['calendar', 'Trigger', 'Appointment is tomorrow', 1], ['whatsapp', 'Action', 'Sends the reminder', 1], ['whatsapp', 'Trigger', 'Patient taps Confirm', 2], ['calendar', 'Action', 'Marks the slot confirmed', 2]],
    5: [['xero', 'Action', 'Creates purchase order PO-0042', 1], ['slack', 'Action', 'Posts it to #finance', 2]],
    6: [['calendar', 'Trigger', 'The weekly sync ends', 1], ['notion', 'Action', 'Writes the notes and action items', 1]],
    7: [['salesforce', 'Connect', 'A customer links their account', 3], ['hubspot', 'Action', 'Syncs their contacts and deals'], ['slack', 'Action', 'Sends alerts to their channels']],
  };
  function uses(gi) {
    var U = USES[gi];
    return '<ol class="pane-us" style="--n:' + U.length + '" aria-label="What each integration does">' + U.map(function (u) {
      return '<li class="pu"' + (u[3] != null ? ' data-at="' + u[3] + '"' : '') + '><span class="pu-h"><img src="' + IC[u[0]][1] + '" alt="" width="16" height="16"><b>' + IC[u[0]][0] + '</b></span>' +
        '<span class="pu-t"><i class="pu-r' + (u[1] === 'Trigger' ? ' tg' : '') + '">' + u[1] + '</i>' + u[2] + '</span></li>';
    }).join('') + '</ol>';
  }

  // play a scene: steps add s1, s2 …; typed text types at its step; any earlier scene's timers stop
  var sceneT = [];
  function scenePlay(root) {
    sceneT.forEach(clearTimeout); sceneT = [];
    var rs = $('.rs', root); if (!rs) return;
    var steps = (rs.getAttribute('data-steps') || '').split(',').filter(Boolean).map(Number), tys = $$('[data-ty]', rs);
    rs.className = 'rs';
    for (var k = 1; k <= 8; k++) root.classList.remove('s' + k);
    function mark(n) { rs.classList.add('s' + n); root.classList.add('s' + n); }
    tys.forEach(function (t) { t.textContent = ''; t.classList.remove('typing'); });
    if (reduced) {
      steps.forEach(function (d, i) { mark(i + 1); });
      tys.forEach(function (t) { t.textContent = t.getAttribute('data-ty'); });
      return;
    }
    function type(el) {
      var s = el.getAttribute('data-ty'), n = 0;
      el.classList.add('typing');
      (function tick() { el.textContent = s.slice(0, ++n); if (n < s.length) sceneT.push(setTimeout(tick, 24)); else el.classList.remove('typing'); })();
    }
    var at = 0;
    steps.forEach(function (d, i) {
      at += d;
      sceneT.push(setTimeout(function () {
        mark(i + 1);
        tys.filter(function (t) { return Number(t.getAttribute('data-at')) === i + 1; }).forEach(type);
      }, at));
    });
  }
  // the five agents first, then the apps and internal tools; six show first, the rest wait for "View all"
  function galPrompt(a) { return 'Add viaSocket to my project and build this: ' + a.name.toLowerCase() + ' — ' + a.line.replace(/\.$/, '') + '. Use ' + a.apps.map(function (k) { return IC[k][0]; }).join(', ') + ' through viaSocket.\n\n' + PROMPT; }
  function tag(a) { return '<span class="gtag' + (a.live ? ' is-live' : '') + '"><i class="dot' + (a.live ? '' : ' ex') + '" aria-hidden="true"></i>' + (a.live ? 'Live' : 'Example') + '</span>'; }

  /* ---------- the index: a numbered list on the left (agents first, then apps, then internal tools), one preview pane on the right ---------- */
  var IX_ORDER = [3, 1, 2, 6, 0, 4, 7, 5];
  var TABS = [['all', 'All'], ['agents', 'Agents'], ['apps', 'Apps'], ['internal', 'Internal tools']];
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function count(k) { return k === 'all' ? GAL.length : GAL.filter(function (a) { return a.cat === k; }).length; }
  var tabs = $('#tabs'), list = $('#ix-list'), pane = $('#pane'), paneHome = $('#ix-r');
  tabs.innerHTML = TABS.map(function (t, i) {
    return '<button type="button" class="tab" data-k="' + t[0] + '" aria-pressed="' + (i ? 'false' : 'true') + '">' + t[1] + '<sup>' + pad(count(t[0])) + '</sup></button>';
  }).join('');
  list.innerHTML = IX_ORDER.map(function (gi, n) {
    var a = GAL[gi];
    return '<div class="ix-it" role="listitem" data-k="' + a.cat + '"><button type="button" class="row" data-g="' + gi + '" data-n="' + (n + 1) + '" aria-controls="pane" aria-current="false">' +
      '<span class="st' + (a.live ? ' live' : '') + '" role="img" aria-label="' + (a.live ? 'Live' : 'Example') + '"></span><span class="nmw"><span class="nm-t"><span class="nm">' + a.name + '</span><span class="chip">' + a.type + '</span></span><span class="ds">' + a.line + '</span></span>' +
      '<span class="ics" aria-hidden="true">' + a.apps.map(function (k) { return ico(k); }).join('') + '</span></button></div>';
  }).join('');

  // phones: every use case shows its own preview under its name, in its finished state (no playback); the shared pane is hidden there
  var phone = window.matchMedia('(max-width: 760px)'), mBuilt = false;
  function mPreviews() {
    if (mBuilt || !phone.matches) return;
    mBuilt = true;
    $$('.ix-it', list).forEach(function (it) {
      var gi = Number($('.row', it).getAttribute('data-g')), box = doc.createElement('div');
      box.className = 'm-prev';
      box.setAttribute('aria-hidden', 'true');
      box.innerHTML = SCN[gi];
      var rs = $('.rs', box), n = (rs.getAttribute('data-steps') || '').split(',').filter(Boolean).length;
      for (var i = 1; i <= n; i++) rs.classList.add('s' + i);
      $$('[data-ty]', rs).forEach(function (t) { t.textContent = t.getAttribute('data-ty'); });
      $('.row', it).insertAdjacentElement('afterend', box);
    });
  }
  mPreviews();
  if (phone.addEventListener) phone.addEventListener('change', mPreviews); else phone.addListener(mPreviews);

  // the pane: the use case's name and its prompt on top, then the real app it works in, playing
  var active = -1;
  function ixShow(gi) {
    if (gi === active) return;
    active = gi;
    var a = GAL[gi], row = $('.row[data-g="' + gi + '"]', list), n = Number(row.getAttribute('data-n'));
    $$('.row', list).forEach(function (r) { var on = r === row; r.classList.toggle('on', on); r.setAttribute('aria-current', on ? 'true' : 'false'); });
    pane.innerHTML = '<div class="pane-h"><span class="pane-nm">' + a.name + '</span><button type="button" class="pane-cp" data-gcopy>' + COPY_ICO + '<span class="btn-t">Copy prompt</span></button></div>' +
      '<div class="pane-in' + (reduced ? '' : ' swap') + '" aria-hidden="true">' + SCN[gi] + '</div>' +
      '<div class="pane-f">' + uses(gi) + '</div>';
    var cb = $('[data-gcopy]', pane);
    cb.addEventListener('click', function () {
      copyText(galPrompt(a)).then(function () { var t = $('.btn-t', cb), was = t.textContent; t.textContent = 'Copied'; toast('Copied. Paste it into your AI.'); setTimeout(function () { t.textContent = was; }, 2000); }, function () { manual(galPrompt(a)); });
    });
    place();
    scenePlay(pane);
  }

  // wide: the pane sits in its own column; narrow: it opens right under the chosen row
  var narrow = window.matchMedia('(max-width: 900px)');
  function place() {
    if (narrow.matches) {
      var row = $('.row[data-g="' + active + '"]', list);
      if (row && pane.parentNode !== row.parentNode) row.parentNode.appendChild(pane);
    } else if (pane.parentNode !== paneHome) paneHome.appendChild(pane);
  }
  if (narrow.addEventListener) narrow.addEventListener('change', place); else narrow.addListener(place);

  function visibleRows() { return $$('.ix-it', list).filter(function (it) { return !it.hidden; }).map(function (it) { return $('.row', it); }); }
  function filter(k) {
    $$('.tab', tabs).forEach(function (t) { t.setAttribute('aria-pressed', t.getAttribute('data-k') === k ? 'true' : 'false'); });
    $$('.ix-it', list).forEach(function (it) { it.hidden = !(k === 'all' || it.getAttribute('data-k') === k); });
    var rows = visibleRows(), still = rows.some(function (r) { return Number(r.getAttribute('data-g')) === active; });
    if (!still && rows.length) ixShow(Number(rows[0].getAttribute('data-g')));
  }
  tabs.addEventListener('click', function (e) { var b = e.target.closest('[data-k]'); if (b) filter(b.getAttribute('data-k')); });

  // hover swaps after a short pause, so moving across rows towards the pane doesn't flicker through them
  var hoverT = 0;
  list.addEventListener('mouseover', function (e) {
    var r = e.target.closest('.row'); if (!r || narrow.matches) return;
    clearTimeout(hoverT);
    hoverT = setTimeout(function () { ixShow(Number(r.getAttribute('data-g'))); }, 90);
  });
  list.addEventListener('mouseleave', function () { clearTimeout(hoverT); });
  list.addEventListener('focusin', function (e) { var r = e.target.closest('.row'); if (r) ixShow(Number(r.getAttribute('data-g'))); });
  list.addEventListener('click', function (e) { var r = e.target.closest('.row'); if (r) { clearTimeout(hoverT); ixShow(Number(r.getAttribute('data-g'))); } });
  // up and down move through the visible rows
  list.addEventListener('keydown', function (e) {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
    var r = e.target.closest('.row'); if (!r) return;
    var rows = visibleRows(), i = rows.indexOf(r) + (e.key === 'ArrowDown' ? 1 : -1);
    if (rows[i]) { e.preventDefault(); rows[i].focus(); ixShow(Number(rows[i].getAttribute('data-g'))); }
  });

  // wide screens: the shown example moves on by itself; the line under the active row is the timer (CSS), its end moves to the next row.
  // Held while the pointer is over the list or pane, keyboard focus is inside, the section is off screen or the tab is hidden. Never with reduced motion.
  var ix = $('.ix'), hold = {};
  function holdSet(k, on) { if (on) hold[k] = 1; else delete hold[k]; ix.classList.toggle('held', Object.keys(hold).length > 0); }
  function cycleSet() { ix.classList.toggle('cycling', !reduced && !narrow.matches); }
  cycleSet();
  if (narrow.addEventListener) narrow.addEventListener('change', cycleSet); else narrow.addListener(cycleSet);
  list.addEventListener('animationend', function (e) {
    if (e.animationName !== 'ixTimer' || !ix.classList.contains('cycling')) return;
    var rows = visibleRows(), i = rows.indexOf($('.row.on', list)), nx = rows[(i + 1) % rows.length];
    if (nx) ixShow(Number(nx.getAttribute('data-g')));
  });
  ix.addEventListener('mouseenter', function () { holdSet('pointer', true); });
  ix.addEventListener('mouseleave', function () { holdSet('pointer', false); });
  ix.addEventListener('focusin', function (e) { holdSet('focus', e.target.matches(':focus-visible')); });
  ix.addEventListener('focusout', function (e) { if (!ix.contains(e.relatedTarget)) holdSet('focus', false); });
  holdSet('hidden', doc.hidden);
  doc.addEventListener('visibilitychange', function () { holdSet('hidden', doc.hidden); });
  if ('IntersectionObserver' in window) new IntersectionObserver(function (en) { holdSet('away', !en[0].isIntersecting); }, { threshold: 0.35 }).observe(ix);

  /* ---------- sample prompts: what a founder asks their AI to add so their customers get integrations, AI agents and automations; clicking a card copies it with the setup prompt ---------- */
  // what a founder wants their own customers to be able to do: connect apps, use an AI agent, run automations (one of each per row)
  var PR = [
    ['Add integrations to my app so users can connect the tools they already use, like Slack, HubSpot and Gmail.'],
    ['Add a chat assistant to my app that can actually do things in my users’ Gmail, Slack and CRM.'],
    ['My users keep asking for automations. Add a simple “when this happens, do that” builder to my app.'],
    ['Let customers connect their HubSpot or Salesforce and pull their contacts straight into my app.'],
    ['Before my agent touches anyone’s apps, let each user choose what it’s allowed to do.'],
    ['Send each user a short morning summary of their inbox in Slack. Let them switch it on from settings.']
  ];
  var prList = $('#pr-list');
  prList.innerHTML = PR.map(function (p, i) {
    return '<li><button type="button" class="pr-c" data-pr="' + i + '" aria-label="Copy prompt: ' + p[0] + '"><span class="pr-ai" aria-hidden="true"></span><span class="pr-q">' + p[0] + '</span></button></li>';
  }).join('');
  prList.addEventListener('click', function (e) {
    var b = e.target.closest('[data-pr]'); if (!b) return;
    var text = PR[Number(b.getAttribute('data-pr'))][0] + '\n\n' + PROMPT;
    copyText(text).then(function () { toast('Copied. Paste it into your AI.'); }, function () { manual(text); });
  });

  ixShow(IX_ORDER[0]);
  if (!reduced && 'IntersectionObserver' in window) new IntersectionObserver(function (en) { if (en[0].isIntersecting) scenePlay(pane); }, { threshold: 0.35 }).observe($('.ix'));

})();
