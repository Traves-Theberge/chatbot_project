/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./public/chat.js":
/*!************************!*\
  !*** ./public/chat.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _socketHandler_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./socketHandler.js */ \"./public/socketHandler.js\");\n/* harmony import */ var _sessionHandler_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sessionHandler.js */ \"./public/sessionHandler.js\");\nfunction _typeof(o) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && \"function\" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? \"symbol\" : typeof o; }, _typeof(o); }\nfunction _regeneratorRuntime() { \"use strict\"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = \"function\" == typeof Symbol ? Symbol : {}, a = i.iterator || \"@@iterator\", c = i.asyncIterator || \"@@asyncIterator\", u = i.toStringTag || \"@@toStringTag\"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, \"\"); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, \"_invoke\", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: \"normal\", arg: t.call(e, r) }; } catch (t) { return { type: \"throw\", arg: t }; } } e.wrap = wrap; var h = \"suspendedStart\", l = \"suspendedYield\", f = \"executing\", s = \"completed\", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { [\"next\", \"throw\", \"return\"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if (\"throw\" !== c.type) { var u = c.arg, h = u.value; return h && \"object\" == _typeof(h) && n.call(h, \"__await\") ? e.resolve(h.__await).then(function (t) { invoke(\"next\", t, i, a); }, function (t) { invoke(\"throw\", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke(\"throw\", t, i, a); }); } a(c.arg); } var r; o(this, \"_invoke\", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error(\"Generator is already running\"); if (o === s) { if (\"throw\" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if (\"next\" === n.method) n.sent = n._sent = n.arg;else if (\"throw\" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else \"return\" === n.method && n.abrupt(\"return\", n.arg); o = f; var p = tryCatch(e, r, n); if (\"normal\" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } \"throw\" === p.type && (o = s, n.method = \"throw\", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, \"throw\" === n && e.iterator[\"return\"] && (r.method = \"return\", r.arg = t, maybeInvokeDelegate(e, r), \"throw\" === r.method) || \"return\" !== n && (r.method = \"throw\", r.arg = new TypeError(\"The iterator does not provide a '\" + n + \"' method\")), y; var i = tryCatch(o, e.iterator, r.arg); if (\"throw\" === i.type) return r.method = \"throw\", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, \"return\" !== r.method && (r.method = \"next\", r.arg = t), r.delegate = null, y) : a : (r.method = \"throw\", r.arg = new TypeError(\"iterator result is not an object\"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = \"normal\", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: \"root\" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || \"\" === e) { var r = e[a]; if (r) return r.call(e); if (\"function\" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + \" is not iterable\"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, \"constructor\", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, \"constructor\", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, \"GeneratorFunction\"), e.isGeneratorFunction = function (t) { var e = \"function\" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || \"GeneratorFunction\" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, \"GeneratorFunction\")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, \"Generator\"), define(g, a, function () { return this; }), define(g, \"toString\", function () { return \"[object Generator]\"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = \"next\", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) \"t\" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if (\"throw\" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = \"throw\", a.arg = e, r.next = n, o && (r.method = \"next\", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if (\"root\" === i.tryLoc) return handle(\"end\"); if (i.tryLoc <= this.prev) { var c = n.call(i, \"catchLoc\"), u = n.call(i, \"finallyLoc\"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error(\"try statement without catch or finally\"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, \"finallyLoc\") && this.prev < o.finallyLoc) { var i = o; break; } } i && (\"break\" === t || \"continue\" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = \"next\", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if (\"throw\" === t.type) throw t.arg; return \"break\" === t.type || \"continue\" === t.type ? this.next = t.arg : \"return\" === t.type ? (this.rval = this.arg = t.arg, this.method = \"return\", this.next = \"end\") : \"normal\" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, \"catch\": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if (\"throw\" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error(\"illegal catch attempt\"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, \"next\" === this.method && (this.arg = t), y; } }, e; }\nfunction asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }\nfunction _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, \"next\", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, \"throw\", n); } _next(void 0); }); }; }\n\n\ndocument.addEventListener('DOMContentLoaded', function () {\n  var chatSessionsList = document.getElementById('chat-sessions');\n  var userInput = document.getElementById('user-input');\n  var sendButton = document.getElementById('send-button');\n  var newChatButton = document.getElementById('new-chat-button');\n  var modal = document.getElementById('modal');\n  var newChatNameInput = document.getElementById('new-chat-name');\n  var createButton = document.getElementById('create-button');\n  var cancelButton = document.getElementById('cancel-button');\n  var logoutButton = document.getElementById('logout-button');\n  sendButton.addEventListener('click', _socketHandler_js__WEBPACK_IMPORTED_MODULE_0__.sendMessage);\n  userInput.addEventListener('keypress', function (e) {\n    if (e.key === 'Enter') (0,_socketHandler_js__WEBPACK_IMPORTED_MODULE_0__.sendMessage)();\n  });\n  newChatButton.addEventListener('click', function () {\n    console.log('New chat button clicked');\n    modal.classList.remove('hidden');\n  });\n  cancelButton.addEventListener('click', function () {\n    console.log('Cancel button clicked');\n    modal.classList.add('hidden');\n  });\n  createButton.addEventListener('click', function () {\n    var sessionName = newChatNameInput.value.trim();\n    if (sessionName) {\n      (0,_sessionHandler_js__WEBPACK_IMPORTED_MODULE_1__.createChatSession)(sessionName);\n      modal.classList.add('hidden');\n    }\n  });\n  logoutButton.addEventListener('click', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {\n    return _regeneratorRuntime().wrap(function _callee$(_context) {\n      while (1) switch (_context.prev = _context.next) {\n        case 0:\n          console.log('Logout button clicked');\n          _context.prev = 1;\n          _context.next = 4;\n          return fetch('/auth/logout', {\n            method: 'POST'\n          });\n        case 4:\n          window.location.href = 'index.html';\n          _context.next = 10;\n          break;\n        case 7:\n          _context.prev = 7;\n          _context.t0 = _context[\"catch\"](1);\n          console.error('Error logging out:', _context.t0);\n        case 10:\n        case \"end\":\n          return _context.stop();\n      }\n    }, _callee, null, [[1, 7]]);\n  })));\n  var loadChatSessions = /*#__PURE__*/function () {\n    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {\n      var response, sessions, mostRecentSession, newSession;\n      return _regeneratorRuntime().wrap(function _callee2$(_context2) {\n        while (1) switch (_context2.prev = _context2.next) {\n          case 0:\n            console.log('Loading chat sessions');\n            _context2.prev = 1;\n            _context2.next = 4;\n            return fetch('/chat/sessions');\n          case 4:\n            response = _context2.sent;\n            _context2.next = 7;\n            return response.json();\n          case 7:\n            sessions = _context2.sent;\n            chatSessionsList.innerHTML = '';\n            if (!(sessions.length > 0)) {\n              _context2.next = 16;\n              break;\n            }\n            sessions.forEach(function (session) {\n              (0,_sessionHandler_js__WEBPACK_IMPORTED_MODULE_1__.addChatSessionToList)(session);\n            });\n            mostRecentSession = sessions[sessions.length - 1];\n            chatSessionsList.dataset.activeSessionId = mostRecentSession.id;\n            (0,_sessionHandler_js__WEBPACK_IMPORTED_MODULE_1__.loadChat)(mostRecentSession.id);\n            _context2.next = 21;\n            break;\n          case 16:\n            _context2.next = 18;\n            return (0,_sessionHandler_js__WEBPACK_IMPORTED_MODULE_1__.createChatSession)('New Chat');\n          case 18:\n            newSession = _context2.sent;\n            chatSessionsList.dataset.activeSessionId = newSession.id;\n            (0,_sessionHandler_js__WEBPACK_IMPORTED_MODULE_1__.loadChat)(newSession.id);\n          case 21:\n            _context2.next = 26;\n            break;\n          case 23:\n            _context2.prev = 23;\n            _context2.t0 = _context2[\"catch\"](1);\n            console.error('Error loading chat sessions:', _context2.t0);\n          case 26:\n          case \"end\":\n            return _context2.stop();\n        }\n      }, _callee2, null, [[1, 23]]);\n    }));\n    return function loadChatSessions() {\n      return _ref2.apply(this, arguments);\n    };\n  }();\n  loadChatSessions();\n});\n\n//# sourceURL=webpack://chatbot2_project/./public/chat.js?");

/***/ }),

/***/ "./public/messageHandler.js":
/*!**********************************!*\
  !*** ./public/messageHandler.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   renderMessage: () => (/* binding */ renderMessage)\n/* harmony export */ });\nvar renderMessage = function renderMessage(message, sender) {\n  var chatWindow = document.getElementById('chat-window');\n  var div = document.createElement('div');\n  div.classList.add('message', sender);\n  div.innerHTML = \"\\n      <div class=\\\"content\\\">\".concat(message, \"</div>\\n      <div class=\\\"timestamp\\\">\").concat(new Date().toLocaleTimeString(), \"</div>\\n    \");\n  chatWindow.appendChild(div);\n  chatWindow.scrollTop = chatWindow.scrollHeight; // Auto-scroll to the latest message\n};\n\n//# sourceURL=webpack://chatbot2_project/./public/messageHandler.js?");

/***/ }),

/***/ "./public/sessionHandler.js":
/*!**********************************!*\
  !*** ./public/sessionHandler.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   addChatSessionToList: () => (/* binding */ addChatSessionToList),\n/* harmony export */   createChatSession: () => (/* binding */ createChatSession),\n/* harmony export */   deleteChatSession: () => (/* binding */ deleteChatSession),\n/* harmony export */   loadChat: () => (/* binding */ loadChat)\n/* harmony export */ });\n/* harmony import */ var _messageHandler_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./messageHandler.js */ \"./public/messageHandler.js\");\nfunction _typeof(o) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && \"function\" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? \"symbol\" : typeof o; }, _typeof(o); }\nfunction _regeneratorRuntime() { \"use strict\"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = \"function\" == typeof Symbol ? Symbol : {}, a = i.iterator || \"@@iterator\", c = i.asyncIterator || \"@@asyncIterator\", u = i.toStringTag || \"@@toStringTag\"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, \"\"); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, \"_invoke\", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: \"normal\", arg: t.call(e, r) }; } catch (t) { return { type: \"throw\", arg: t }; } } e.wrap = wrap; var h = \"suspendedStart\", l = \"suspendedYield\", f = \"executing\", s = \"completed\", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { [\"next\", \"throw\", \"return\"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if (\"throw\" !== c.type) { var u = c.arg, h = u.value; return h && \"object\" == _typeof(h) && n.call(h, \"__await\") ? e.resolve(h.__await).then(function (t) { invoke(\"next\", t, i, a); }, function (t) { invoke(\"throw\", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke(\"throw\", t, i, a); }); } a(c.arg); } var r; o(this, \"_invoke\", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error(\"Generator is already running\"); if (o === s) { if (\"throw\" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if (\"next\" === n.method) n.sent = n._sent = n.arg;else if (\"throw\" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else \"return\" === n.method && n.abrupt(\"return\", n.arg); o = f; var p = tryCatch(e, r, n); if (\"normal\" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } \"throw\" === p.type && (o = s, n.method = \"throw\", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, \"throw\" === n && e.iterator[\"return\"] && (r.method = \"return\", r.arg = t, maybeInvokeDelegate(e, r), \"throw\" === r.method) || \"return\" !== n && (r.method = \"throw\", r.arg = new TypeError(\"The iterator does not provide a '\" + n + \"' method\")), y; var i = tryCatch(o, e.iterator, r.arg); if (\"throw\" === i.type) return r.method = \"throw\", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, \"return\" !== r.method && (r.method = \"next\", r.arg = t), r.delegate = null, y) : a : (r.method = \"throw\", r.arg = new TypeError(\"iterator result is not an object\"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = \"normal\", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: \"root\" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || \"\" === e) { var r = e[a]; if (r) return r.call(e); if (\"function\" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + \" is not iterable\"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, \"constructor\", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, \"constructor\", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, \"GeneratorFunction\"), e.isGeneratorFunction = function (t) { var e = \"function\" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || \"GeneratorFunction\" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, \"GeneratorFunction\")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, \"Generator\"), define(g, a, function () { return this; }), define(g, \"toString\", function () { return \"[object Generator]\"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = \"next\", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) \"t\" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if (\"throw\" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = \"throw\", a.arg = e, r.next = n, o && (r.method = \"next\", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if (\"root\" === i.tryLoc) return handle(\"end\"); if (i.tryLoc <= this.prev) { var c = n.call(i, \"catchLoc\"), u = n.call(i, \"finallyLoc\"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error(\"try statement without catch or finally\"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, \"finallyLoc\") && this.prev < o.finallyLoc) { var i = o; break; } } i && (\"break\" === t || \"continue\" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = \"next\", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if (\"throw\" === t.type) throw t.arg; return \"break\" === t.type || \"continue\" === t.type ? this.next = t.arg : \"return\" === t.type ? (this.rval = this.arg = t.arg, this.method = \"return\", this.next = \"end\") : \"normal\" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, \"catch\": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if (\"throw\" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error(\"illegal catch attempt\"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, \"next\" === this.method && (this.arg = t), y; } }, e; }\nfunction asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }\nfunction _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, \"next\", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, \"throw\", n); } _next(void 0); }); }; }\n\nvar addChatSessionToList = function addChatSessionToList(session) {\n  var chatSessionsList = document.getElementById('chat-sessions');\n  var li = document.createElement('li');\n  li.textContent = session.session_name;\n  li.dataset.sessionId = session.id;\n  li.classList.add('p-2', 'hover:bg-gray-700', 'cursor-pointer', 'flex', 'justify-between');\n  li.addEventListener('click', function () {\n    chatSessionsList.dataset.activeSessionId = session.id;\n    loadChat(session.id);\n  });\n  var deleteButton = document.createElement('button');\n  deleteButton.textContent = 'x';\n  deleteButton.classList.add('ml-4', 'text-red-500');\n  deleteButton.addEventListener('click', function (event) {\n    event.stopPropagation();\n    deleteChatSession(session.id, li);\n  });\n  li.appendChild(deleteButton);\n  chatSessionsList.appendChild(li);\n};\nvar loadChat = /*#__PURE__*/function () {\n  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(sessionId) {\n    var chatWindow, response, conversations;\n    return _regeneratorRuntime().wrap(function _callee$(_context) {\n      while (1) switch (_context.prev = _context.next) {\n        case 0:\n          chatWindow = document.getElementById('chat-window');\n          console.log('Loading chat for session:', sessionId);\n          _context.prev = 2;\n          _context.next = 5;\n          return fetch(\"/chat/conversations/\".concat(sessionId));\n        case 5:\n          response = _context.sent;\n          _context.next = 8;\n          return response.json();\n        case 8:\n          conversations = _context.sent;\n          chatWindow.innerHTML = '';\n          conversations.forEach(function (conversation) {\n            (0,_messageHandler_js__WEBPACK_IMPORTED_MODULE_0__.renderMessage)(conversation.content, conversation.sender);\n          });\n          _context.next = 16;\n          break;\n        case 13:\n          _context.prev = 13;\n          _context.t0 = _context[\"catch\"](2);\n          console.error('Error loading chat:', _context.t0);\n        case 16:\n        case \"end\":\n          return _context.stop();\n      }\n    }, _callee, null, [[2, 13]]);\n  }));\n  return function loadChat(_x) {\n    return _ref.apply(this, arguments);\n  };\n}();\nvar createChatSession = /*#__PURE__*/function () {\n  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(sessionName) {\n    var response, newSession;\n    return _regeneratorRuntime().wrap(function _callee2$(_context2) {\n      while (1) switch (_context2.prev = _context2.next) {\n        case 0:\n          console.log('Creating new chat session with name:', sessionName);\n          _context2.prev = 1;\n          _context2.next = 4;\n          return fetch('/chat/sessions', {\n            method: 'POST',\n            headers: {\n              'Content-Type': 'application/json'\n            },\n            body: JSON.stringify({\n              sessionName: sessionName\n            })\n          });\n        case 4:\n          response = _context2.sent;\n          _context2.next = 7;\n          return response.json();\n        case 7:\n          newSession = _context2.sent;\n          addChatSessionToList(newSession);\n          return _context2.abrupt(\"return\", newSession);\n        case 12:\n          _context2.prev = 12;\n          _context2.t0 = _context2[\"catch\"](1);\n          console.error('Error creating chat session:', _context2.t0);\n        case 15:\n        case \"end\":\n          return _context2.stop();\n      }\n    }, _callee2, null, [[1, 12]]);\n  }));\n  return function createChatSession(_x2) {\n    return _ref2.apply(this, arguments);\n  };\n}();\nvar deleteChatSession = /*#__PURE__*/function () {\n  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(sessionId, listItem) {\n    var chatSessionsList, chatWindow, response;\n    return _regeneratorRuntime().wrap(function _callee3$(_context3) {\n      while (1) switch (_context3.prev = _context3.next) {\n        case 0:\n          chatSessionsList = document.getElementById('chat-sessions');\n          chatWindow = document.getElementById('chat-window');\n          console.log('Deleting chat session with id:', sessionId);\n          _context3.prev = 3;\n          _context3.next = 6;\n          return fetch(\"/chat/sessions/\".concat(sessionId), {\n            method: 'DELETE'\n          });\n        case 6:\n          response = _context3.sent;\n          if (response.ok) {\n            chatSessionsList.removeChild(listItem);\n            if (chatSessionsList.dataset.activeSessionId === sessionId) {\n              chatSessionsList.dataset.activeSessionId = null;\n              chatWindow.innerHTML = '';\n            }\n          } else {\n            console.error('Failed to delete chat session');\n          }\n          _context3.next = 13;\n          break;\n        case 10:\n          _context3.prev = 10;\n          _context3.t0 = _context3[\"catch\"](3);\n          console.error('Error deleting chat session:', _context3.t0);\n        case 13:\n        case \"end\":\n          return _context3.stop();\n      }\n    }, _callee3, null, [[3, 10]]);\n  }));\n  return function deleteChatSession(_x3, _x4) {\n    return _ref3.apply(this, arguments);\n  };\n}();\n\n//# sourceURL=webpack://chatbot2_project/./public/sessionHandler.js?");

/***/ }),

/***/ "./public/socketHandler.js":
/*!*********************************!*\
  !*** ./public/socketHandler.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   sendMessage: () => (/* binding */ sendMessage)\n/* harmony export */ });\n/* harmony import */ var _messageHandler_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./messageHandler.js */ \"./public/messageHandler.js\");\n\n\n// Ensure io is defined globally\nvar socket = io();\nsocket.on('connect', function () {\n  console.log('Connected to WebSocket server');\n});\nsocket.on('chat message', function (_ref) {\n  var sessionId = _ref.sessionId,\n    message = _ref.message,\n    assistantMessage = _ref.assistantMessage;\n  var chatSessionsList = document.getElementById('chat-sessions');\n  if (chatSessionsList.dataset.activeSessionId === sessionId) {\n    (0,_messageHandler_js__WEBPACK_IMPORTED_MODULE_0__.renderMessage)(message, 'user');\n    (0,_messageHandler_js__WEBPACK_IMPORTED_MODULE_0__.renderMessage)(assistantMessage, 'assistant');\n  }\n});\nvar sendMessage = function sendMessage() {\n  var chatSessionsList = document.getElementById('chat-sessions');\n  var userInput = document.getElementById('user-input');\n  var loadingIndicator = document.getElementById('loading-indicator');\n  var activeSessionId = chatSessionsList.dataset.activeSessionId;\n  var message = userInput.value.trim();\n  if (!activeSessionId || !message) return;\n  (0,_messageHandler_js__WEBPACK_IMPORTED_MODULE_0__.renderMessage)(message, 'user'); // Display user message immediately\n  userInput.value = '';\n  loadingIndicator.style.display = 'block'; // Show loading indicator\n\n  socket.emit('chat message', {\n    sessionId: activeSessionId,\n    message: message\n  });\n};\n\n//# sourceURL=webpack://chatbot2_project/./public/socketHandler.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./public/chat.js");
/******/ 	
/******/ })()
;