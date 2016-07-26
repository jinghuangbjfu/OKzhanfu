	window.lxb = window.lxb || {};
	lxb.instance = lxb.instance || 0;
	lxb.instance++;
	(function() {
		var a = {};
		lxb.add = lxb.add || function(b, d) {
			var c = a[b];
			if (!c) {
				c = a[b] = {};
				d.call(null, c)
			}
		};
		lxb.use = lxb.use || function(b) {
			if (typeof b == "string") {
				if (!a[b]) {
					throw "no module: " + b
				} else {
					return a[b]
				}
			} else {
				b.call(null, a)
			}
		}
	})();
	lxb.add("util", function(e) {
		var c = null;
		e.init = function(m) {
			c = m
		};
		e.css = function(n, m, o) {
			if (!n) {
				return
			}
			if (o !== undefined) {
				n.style[m] = o
			} else {
				try {
					if (window.getComputedStyle) {
						return window.getComputedStyle(n)[m]
					} else {
						if (n.currentStyle) {
							return n.currentStyle[m]
						}
					}
				} catch (p) {}
			}
		};
		e.isStandard = function() {
			return c.styleType == 1
		};
		e.isCustom = function() {
			return c.styleType == 2
		};
		e.isHorizon = function() {
			if (c.styleType == 1) {
				return c.style < 1000
			}
			return c.windowLayout == 1
		};
		e.isVertical = function() {
			if (c.styleType == 1) {
				return c.style > 1000
			}
			return c.windowLayout == 2
		};
		e.isLeft = function() {
			return c.position > 0
		};
		e.isRight = function() {
			return c.position < 0
		};
		e.displayGroup = function() {
			return c.ifGroup && (c.windowLayout == 2)
		};
		e.display400 = function() {
			return c.float_window == 1 || c.float_window == 3
		};
		e.displayCallback = function() {
			return c.float_window == 2 || c.float_window == 3
		};
		e.displayLink = function() {
			return c.inviteInfo.linkStatus == 1
		};
		e.isVisible = function(m) {
			return m.style.visibility == "visible"
		};
		e.isPin = function() {
			return c.scode == 1
		};
		e.position = function() {
			var m = Math.abs(c.position);
			m = (m == 1 ? 0 : m);
			return m
		};
		var a = null;
		var b = null;
		e.visitorLog = function(s, m) {
			var o = 512;
			var p = lxb.use("config");
			if (!p.lxbvt) {
				return
			}
			var n = p.Port + "vt/lxb.gif";
			var t = (document.title || "").substr(0, o);
			var v = (document.referrer || "").substr(0, o);
			var w = (document.URL || "").substr(0, o);
			var x = p.bdcbid;
			var r = [];
			r.push(encodeURIComponent(s || ""));
			r.push(encodeURIComponent(t || ""));
			r.push(encodeURIComponent(v || ""));
			r.push(encodeURIComponent(w || ""));
			r.push(+f());
			var u = g(r.join(","));
			var q = function() {
				if (!a) {
					a = document.createElement("div");
					a.style.display = "none"
				}
				a.innerHTML = '<form action="' + n + '" method="post" target="lxbHideIframe"><input name="p" value="' + u + '"/><input name="sid" value="' + m + '"/><input name="bdcbid" value="' + x + '"/><input name="t" value="' + (new Date()).valueOf() + '"/></form><iframe id="lxbHideIframe" name="lxbHideIframe" src="about:blank"></iframe>';
				if (document.body) {
					document.body.appendChild(a);
					b = a.getElementsByTagName("form")[0];
					b.submit()
				}
			};
			if (!document.body) {
				window.onload = q
			} else {
				q()
			}
		};
		var k = e.getDomain = function(m) {
			m = m.replace(/^https?:\/\//, "").split("/");
			return m[0].replace(/:.*$/, "")
		};
		var d = function(o) {
			o = o.replace(/\r\n/g, "\n");
			var m = "";
			for (var q = 0; q < o.length; q++) {
				var p = o.charCodeAt(q);
				if (p < 128) {
					m += String.fromCharCode(p)
				} else {
					if ((p > 127) && (p < 2048)) {
						m += String.fromCharCode((p >> 6) | 192);
						m += String.fromCharCode((p & 63) | 128)
					} else {
						m += String.fromCharCode((p >> 12) | 224);
						m += String.fromCharCode(((p >> 6) & 63) | 128);
						m += String.fromCharCode((p & 63) | 128)
					}
				}
			}
			return m
		};
		var i = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
		var g = e.base64 = function(o) {
			var m = "";
			var v, t, r, u, s, q, p;
			var n = 0;
			o = d(o);
			while (n < o.length) {
				v = o.charCodeAt(n++);
				t = o.charCodeAt(n++);
				r = o.charCodeAt(n++);
				u = v >> 2;
				s = ((v & 3) << 4) | (t >> 4);
				q = ((t & 15) << 2) | (r >> 6);
				p = r & 63;
				if (isNaN(t)) {
					q = p = 64
				} else {
					if (isNaN(r)) {
						p = 64
					}
				}
				m = m + i.charAt(u) + i.charAt(s) + i.charAt(q) + i.charAt(p)
			}
			return m
		};
		var j = function(o, p, q, m) {
			var r = o + "=" + p;
			if (q) {
				r += "; path=" + q
			}
			if (m) {
				var n = new Date();
				n.setTime(n.getTime() + m * 24 * 3600 * 1000);
				r += "; expires=" + n.toGMTString()
			}
			document.cookie = r
		};
		var h = function(n) {
			var o = new RegExp("(^| )" + n + "=([^;]*)(;|\x24)");
			var m = o.exec(document.cookie);
			if (m) {
				return m[2] || null
			}
			return null
		};
		var l = -1;
		var f = e.isLoadPage = function() {
			if (l !== -1) {
				return l
			}
			var m = k(window.location.href);
			var n = k(document.referrer);
			if (document.referrer) {
				if (m === n) {
					l = false;
					return l
				}
				l = true;
				return l
			} else {
				if (h("isLoadPage") === "loaded") {
					l = false;
					return l
				}
				j("isLoadPage", "loaded", "/");
				l = true;
				return l
			}
		};
		e.checkFloat = function() {
			var q = lxb.use("base");
			var n = lxb.use("util");
			var p = q.g("LXB_CONTAINER");
			var o = q.q("lxb-container", p)[0];
			if (!!p && !!o) {
				p.style.cssText += "display: block!important";
				var m = (n.css(p, "display") === "block" ? 1 : 0) && (n.css(o, "display") === "block" ? 1 : 0);
				q.create("img", {
					src: lxb.use("config").Root + "/count.gif?t=o&s=" + m
				})
			}
		};
		e.loadBPA = function() {
			var p = lxb.use("base");
			var n = p.create("script", {
				type: "text/javascript",
				charset: "utf-8"
			});
			var m = 0;
			n.onload = n.onreadystatechange = function() {
				if (m) {
					return
				}
				var q = n.readyState;
				if ("undefined" == typeof q || q == "loaded" || q == "complete") {
					m = 1;
					try {
						bpaMonitor
					} finally {
						n.onload = n.onreadystatechange = null;
						p.removeScriptTag(n)
					}
				}
			};
			n.src = "http://bpa.baidu.com/bpa/bpa.js";
			var o = document.getElementsByTagName("head")[0];
			o.appendChild(n)
		};
		e.bpaLog = function() {
			try {
				bpaMonitor.sendData()
			} catch (m) {
				return
			}
		};
		e.getBPAId = function() {
			try {
				return bpaMonitor.getID()
			} catch (m) {
				return ""
			}
		}
	});
	lxb.add("base", function(d) {
		var c = /msie (\d+\.\d+)/i.test(navigator.userAgent) ? (document.documentMode || +RegExp["\x241"]) : undefined;
		d.ie = c;
		d.g = function(e) {
			return document.getElementById(e)
		};
		var m = {};
		if (c < 8) {
			m["class"] = "className";
			m.maxlength = "maxLength"
		} else {
			m.className = "class";
			m.maxLength = "maxlength"
		}
		d.create = function(r, q) {
			var t = document.createElement(r);
			var e;
			if (q) {
				for (var s in q) {
					if (q.hasOwnProperty(s)) {
						e = m[s] || s;
						t.setAttribute(e, q[s])
					}
				}
			}
			return t
		};
		d.jsonToQuery = function(e) {
			var r = [];
			for (var q in e) {
				if (e.hasOwnProperty(q)) {
					r.push(q + "=" + encodeURIComponent(e[q]))
				}
			}
			return r.join("&")
		};
		d.extend = function(r, q) {
			for (var e in q) {
				if (q.hasOwnProperty(e)) {
					r[e] = q[e]
				}
			}
			return r
		};
		d.encodeHTML = function(e) {
			return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;")
		};
		var g = new RegExp("(^[\\s\\t\\xa0\\u3000]+)|([\\u3000\\xa0\\s\\t]+\x24)", "g");
		d.trim = function(e) {
			return e.replace(g, "")
		};
		d.filter = function(e) {
			e = e.replace(/\s+/, "");
			if (/^http:\/\/|^https:\/\//i.test(e)) {
				return e
			} else {
				e = e.replace(/^[^:]+:/gi, "")
			}
			return e
		};
		d.queryToJSON = function(s) {
			var q = {};
			s = s.split("&");
			for (var e = 0, r; r = s[e]; e++) {
				r = r.split("=");
				if (r[0]) {
					q[r[0]] = r[1]
				}
			}
			return q
		};
		d.setCookie = function(r, s, t, e) {
			var u = r + "=" + s;
			if (t) {
				u += "; path=" + t
			}
			if (e) {
				var q = new Date();
				q.setTime(q.getTime() + e * 24 * 3600 * 1000);
				u += "; expires=" + q.toGMTString()
			}
			document.cookie = u
		};
		d.getCookie = function(q) {
			var r = new RegExp("(^| )" + q + "=([^;]*)(;|\x24)");
			var e = r.exec(document.cookie);
			if (e) {
				return e[2] || null
			} else {
				return null
			}
		};
		var p = [];
		var l;
		var k = false;

		function n() {
			if (!k) {
				k = true;
				for (var q = 0, e = p.length; q < e; q++) {
					p[q]()
				}
			}
		}

		function f() {
			try {
				document.documentElement.doScroll("left")
			} catch (q) {
				setTimeout(f, 1);
				return
			}
			n()
		}
		if (document.addEventListener) {
			l = function() {
				document.removeEventListener("DOMContentLoaded", l, false);
				n()
			}
		} else {
			if (document.attachEvent) {
				l = function() {
					if (document.readyState === "complete") {
						document.detachEvent("onreadystatechange", l);
						n()
					}
				}
			}
		}
		if (document.readyState === "complete") {
			k = true
		} else {
			if (document.addEventListener) {
				document.addEventListener("DOMContentLoaded", l, false);
				window.addEventListener("load", n, false)
			} else {
				if (document.attachEvent) {
					document.attachEvent("onreadystatechange", l);
					window.attachEvent("onload", n);
					var o = false;
					try {
						o = window.frameElement == null
					} catch (h) {}
					if (document.documentElement.doScroll && o) {
						f()
					}
				}
			}
		}
		d.ready = function(e) {
			k ? e() : p.push(e)
		};
		var b = ["", "4-3-3", "3-4-3", "3-3-4"];
		d.formatTel = function(e, t) {
			var u = b[parseInt(t, 10)];
			var r = [];
			if (!u) {
				return e
			}
			e = e.split("");
			u = u.split("-");
			for (var q = 0, s; s = u[q]; q++) {
				r.push(e.splice(0, parseInt(s, 10)).join(""))
			}
			return r.join("-")
		};
		var a = [];

		function j() {
			for (var e = 0, q; q = a[e]; e++) {
				i(q)
			}
		}

		function i(q) {
			var e = document.compatMode == "CSS1Compat" ? document.documentElement : document.body;
			var r = q.ele;
			var t;
			var s;
			if (q.top === t) {
				s = r.style.top || r.currentStyle.top;
				if (!s || s == "auto") {
					s = r.style.bottom || r.currentStyle.bottom;
					if (s && s.indexOf("%") >= 0) {
						s = e.clientHeight * (100 - parseInt(s, 10)) / 100 - r.offsetHeight
					} else {
						if (s == "auto") {
							s = t
						} else {
							if (s) {
								s = e.clientHeight - r.offsetHeight - parseInt(s, 10)
							}
						}
					}
				}
				if (s) {
					if (typeof s == "string" && s.indexOf("%") >= 0) {
						s = e.clientHeight * parseInt(s, 10) / 100
					} else {
						s = parseInt(s, 10)
					}
					q.top = s
				} else {
					q.top = t
				}
			}
			if (q.top !== t) {
				r.style.top = e.scrollTop + q.top + "px"
			}
		}
		d.setFixed = function(e) {
			if (a.length <= 0) {
				window.attachEvent("onscroll", j);
				window.attachEvent("onresize", j)
			}
			e.style.position = "absolute";
			a.push({
				ele: e
			});
			i(a[a.length - 1])
		};
		d.addClass = function(q, e) {
			var s = q.className;
			if (!q) {
				return
			}
			var r = new RegExp(e);
			if (!r.test(q.className)) {
				s = q.className + " " + e
			}
			q.className = s.replace(/\s+/, " ").replace(/^\s|\s$/, "")
		};
		d.removeClass = function(q, e) {
			var s = q.className;
			if (!q) {
				return
			}
			var r = new RegExp(e);
			if (r.test(q.className)) {
				s = q.className.replace(r, "")
			}
			q.className = s.replace(/\s+/, " ").replace(/^\s|\s$/, "")
		};
		d.q = function(t, s) {
			var q = [],
				e, r, v, u;
			if (!(t = t.replace(/\s+/, ""))) {
				return q
			}
			if ("undefined" == typeof s) {
				s = document
			}
			if (s.getElementsByClassName) {
				v = s.getElementsByClassName(t);
				e = v.length;
				for (r = 0; r < e; r++) {
					u = v[r];
					q[q.length] = u
				}
			} else {
				t = new RegExp("(^|\\s)" + t + "(\\s|\x24)");
				v = s.all || s.getElementsByTagName("*");
				e = v.length;
				for (r = 0; r < e; r++) {
					u = v[r];
					t.test(u.className) && (q[q.length] = u)
				}
			}
			return q
		};
		d.viewportSize = function() {
			if (document.compatMode == "BackCompat") {
				return {
					width: document.body.clientWidth,
					height: document.body.clientHeight
				}
			} else {
				return {
					width: document.documentElement.clientWidth,
					height: document.documentElement.clientHeight
				}
			}
		};
		d.removeScriptTag = function(q) {
			if (q.clearAttributes) {
				q.clearAttributes()
			} else {
				for (var e in q) {
					if (q.hasOwnProperty(e)) {
						delete q[e]
					}
				}
			}
			if (q && q.parentNode) {
				q.parentNode.removeChild(q)
			}
			q = null
		}
	});
	lxb.add("config", function(a) {
		var c = lxb.use("base");
		var e = {
			BDCBID: '5b5b6636-2a09-4005-a83b-c38f522fccf7',
			LXBVT: 0,
			TEMPSITEID: '1289525',
			TEMPPORT: 'lxbjs.baidu.com/',
			TEMPFILEROOT: 'float'
		};
		var b = {
			BDCBID: "bdcbid",
			LXBVT: 1,
			TEMPSITEID: "siteid",
			TEMPPORT: "localhost:7779/",
			TEMPFILEROOT: "float"
		};
		c.extend(b, e);
		var d = location.href.indexOf("https://") === 0 ? "https://" : "http://";
		a.SiteId = b.TEMPSITEID;
		a.Port = d + b.TEMPPORT;
		a.Root = d + b.TEMPPORT + b.TEMPFILEROOT;
		a.lxbvt = b.LXBVT;
		a.bdcbid = b.BDCBID;
		a.Lang = {
			TRAN: "\u8f6c",
			WE: "\u6211\u4eec",
			CB_INPUT_TIP_1: "\u624b\u673a\u8bf7\u76f4\u63a5\u8f93\u5165\uff1a\u59821860086xxxx",
			CB_INPUT_TIP_2: "\u5ea7\u673a\u524d\u52a0\u533a\u53f7\uff1a\u59820105992xxxx",
			CB_INPUT_TIP_3: "\u8f93\u5165\u60a8\u7684\u7535\u8bdd\u53f7\u7801\uff0c\u70b9\u51fb\u901a\u8bdd\uff0c\u7a0d\u540e\u60a8\u5c06\u63a5\u5230\u6211\u4eec\u7684\u7535\u8bdd\uff0c\u8be5\u901a\u8bdd\u5bf9\u60a8<em>\u5b8c\u5168\u514d\u8d39</em>\uff0c\u8bf7\u653e\u5fc3\u63a5\u542c\uff01",
			CB_INPUT_TIP_HOLDER: "\u8bf7\u8f93\u5165\u60a8\u7684\u7535\u8bdd\u53f7\u7801",
			INVITE_INPUT_TIP_HOLDER: "\u8F93\u5165\u53F7\u7801\u540E\u70B9\u51FB\u4E0B\u5217\u6309\u94AE\uFF0C\u514D\u8D39\u56DE\u7535",
			CB_SUCCESS_TIP_1: "\u7a0d\u540e\u60a8\u5c06\u63a5\u5230",
			CB_SUCCESS_TIP_2: "\u7684\u7535\u8bdd\uff0c<br />\u8be5\u901a\u8bdd\u5bf9\u60a8<em>\u5b8c\u5168\u514d\u8d39</em>\uff0c<br />\u8bf7\u653e\u5fc3\u63a5\u542c\uff01",
			ERROR_CB_PHONE: "\u8bf7\u60a8\u8f93\u5165\u6b63\u786e\u7684\u53f7\u7801\uff0c\u624b\u673a\u53f7\u7801\u8bf7\u76f4\u63a5\u8f93\u5165\uff0c\u5ea7\u673a\u8bf7\u52a0\u533a\u53f7",
			ERROR_CB_FAIL: "\u7cfb\u7edf\u7e41\u5fd9\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5",
			LOADING_CB_TIP: "\u62e8\u53f7\u4e2d\uff0c\u8bf7\u7a0d\u5019",
			CB_SUCCESS_TIP_TXT_0: "\u7a0d\u540e\u60a8\u5c06\u63a5\u5230\u6211\u4eec\u7684\u6765\u7535",
			CB_SUCCESS_TIP_TXT_1: "\u6b63\u5728\u547c\u53eb\u60a8\u7684\u7535\u8bdd",
			CB_SUCCESS_TIP_TXT_2: "\u8bf7\u51c6\u5907\u63a5\u542c",
			CB_INFO_TIP_CLOSE: "\u2573",
			CB_PIN_INTRO: "\u8bf7\u8f93\u5165\u9a8c\u8bc1\u7801",
			CB_PIN_OK: "\u786e\u5b9a",
			CB_PIN_CANCLE: "\u53d6\u6d88",
			CB_PIN_NULL: "\u9a8c\u8bc1\u7801\u4e0d\u80fd\u4e3a\u7a7a",
			CB_PIN_WRONG: "\u9a8c\u8bc1\u7801\u9519\u8bef",
			REFRESH: "\u5237\u65b0",
			CB_PIN: "\u9a8c\u8bc1\u7801"
		};
		a.ClassName = {
			MAIN: "lxb-container",
			TL_PHONE: "lxb-tl-phone",
			TL_PHONE_EM: "lxb-tl-phone-em",
			CB_ICON: "lxb-cb-icon",
			CB_INPUT: "lxb-cb-input",
			CB_INPUT_BTN: "lxb-cb-input-btn",
			CB_INPUT_TIP: "lxb-cb-input-tip",
			CB_INPUT_TIP_CURSOR: "lxb-cb-input-tip-cursor",
			CB_SUCCESS_TIP: "lxb-cb-success-tip",
			CB_LOADING_TIP: "lxb-cb-loading-tip",
			CB_INFO_TIP: "lxb-cb-info-tip",
			INVITE_LINK_CON: "lxb-invite-link-con",
			INVITE_LINK_TEXT: "lxb-invite-link-txt",
			INVITE_LINK_BTN: "lxb-invite-link-btn",
			Position: {
				HOR: ["lxb-pos-left", "lxb-pos-right"],
				VER: ["lxb-pos-top", "lxb-pos-middle", "lxb-pos-bottom"]
			},
			PositionFix: {
				HOR: ["-left", "-right"],
				VER: ["-top", "-middle", "-bottom"]
			}
		};
		a.ID = {
			MAIN: "LXB_CONTAINER",
			SHOW: "LXB_CONTAINER_SHOW",
			IMG_PREV: "LXB_IMG_PREV_",
			COOKIE_DBCLKID: "LXB_DBCLICKID",
			COOKIE_REFER: "LXB_REFER"
		};
		a.TPL = {
			CB_INPUT_TIP_1: '<ins class="lxb-cb-input-tip-mobile">' + a.Lang.CB_INPUT_TIP_1 + '</ins><ins class="lxb-cb-input-tip-tel">' + a.Lang.CB_INPUT_TIP_2 + '</ins><ins class="lxb-cb-input-tip-em">' + a.Lang.CB_INPUT_TIP_3 + '</ins><ins class="lxb-cb-input-tip-cursor"></ins>',
			CB_SUCCESS_TIP_1: '<ins class="lxb-cb-success-tip-inner">',
			CB_SUCCESS_TIP_2: "</ins>",
			CB_LOADING_TIP: '<ins class="lxb-cb-loading-tip-img"></ins><ins class="lxb-cb-loading-tip-txt">' + a.Lang.LOADING_CB_TIP + "</ins>",
			CB_INFO_TIP_MAIN: '<ins class="lxb-cb-info-tip-con"></ins><ins class="lxb-cb-info-tip-arrow"></ins><ins class="lxb-cb-info-tip-close">' + a.Lang.CB_INFO_TIP_CLOSE + "</ins>",
			CB_SUCCESS_TIP_IMG: '<ins class="lxb-cb-success-tip-img"></ins>',
			CB_SUCCESS_TIP_PHONE: '<ins class="lxb-cb-success-tip-phone">',
			CB_SUCCESS_TIP_PHONE_END: "</ins>",
			CB_SUCCESS_TIP_TXT: '<ins class="lxb-cb-success-tip-txt">' + a.Lang.CB_SUCCESS_TIP_TXT_1 + '</ins><ins class="lxb-cb-success-tip-txt">' + a.Lang.CB_SUCCESS_TIP_TXT_2 + "</ins>",
			CB_SUCCESS_TIP_TXT_1: '<ins class="lxb-cb-success-tip-txt">' + a.Lang.CB_SUCCESS_TIP_TXT_0 + '</ins><ins class="lxb-cb-success-tip-txt">' + a.Lang.CB_SUCCESS_TIP_TXT_2 + "</ins>",
			CB_ERROR_TIP_S: '<ins class="lxb-cb-error-tip">',
			CB_ERROR_TIP_E: "</ins>",
			CB_PIN: '<ins class="lxb-cb-pin-intro">' + a.Lang.CB_PIN_INTRO + '</ins><ins class="lxbPinItem lxb-cb-pin-close">' + a.Lang.CB_INFO_TIP_CLOSE + '</ins><ins class="lxb-cb-pin-input-con"><input type="text" maxlength="4" class="lxbPinItem lxb-cb-pin-input" /><img class="lxbPinItem lxb-cb-pin-img" alt="' + a.Lang.CB_PIN + '"/><ins class="lxbPinItem lxb-cb-pin-change">' + a.Lang.REFRESH + '</ins></ins><ins class="lxbPinItem lxb-cb-pin-tip"></ins><ins class="lxb-cb-pin-btn-con"><ins class="lxbPinItem lxb-cb-pin-btn lxb-cb-pin-btn-first">' + a.Lang.CB_PIN_OK + '</ins><ins class="lxbPinItem lxb-cb-pin-btn ">' + a.Lang.CB_PIN_CANCLE + "</ins></ins>"
		}
	});
	lxb.add("net", function(a) {
		var d = lxb.use("base");

		function e(f, g) {
			return function(h) {
				g.call(null, h);
				setTimeout(function() {
					var i = lxb.use("base").g(f);
					i.parentNode.removeChild(i)
				}, 0)
			}
		}

		function b(g, i) {
			var h = document.getElementsByTagName("head")[0];
			var f = d.create("script", {
				type: "text/javascript",
				src: g,
				id: i || "",
				charset: "utf-8"
			});
			h.appendChild(f)
		}

		function c(f) {
			var h = document.getElementsByTagName("head")[0];
			var g = d.create("link", {
				rel: "stylesheet",
				href: f,
				type: "text/css",
				charset: "utf-8"
			});
			h.appendChild(g)
		}
		a.send = function(f, h, j) {
			var g = "_lxb_jsonp_" + new Date().getTime().toString(36) + "_";
			var i = ["t=" + (new Date().getTime())];
			i.push("callback=" + g);
			window[g] = e(g, j);
			h = h || "";
			if (typeof h !== "string") {
				h = d.jsonToQuery(h)
			}
			h += (h ? "&" : "") + i.join("&");
			f += (f.indexOf("?") >= 0 ? "&" : "?") + h;
			b(f, g)
		};
		a.loadCSS = c;
		a.log = function(f, g) {
			if (window.console && console.log) {
				console.log("[" + f + "]" + g)
			}
		}
	});
	lxb.add("log", function(a) {
		var e = lxb.use("config").Root + "/log.gif";
		var f = lxb.use("base").jsonToQuery;
		var c = null;
		var d = "0123456789ABCDEF";

		function b() {
			var j = [];
			for (var h = 0; h < 32; h++) {
				j[h] = d.substr(Math.floor(Math.random() * 16), 1)
			}
			j[12] = "4";
			j[16] = d.substr((j[16] & 3) | 8, 1);
			var k = j.join("").toLowerCase();
			k = k.toLowerCase();
			k = k.replace(/^(\w{8})(\w{4})(\w{4})(\w{4})(\w{12})$/, "$1-$2-$3-$4-$5");
			return k
		}

		function g(i) {
			var h = document.createElement("img");
			h.src = i
		}
		a.sendLog = function(j, h) {
			!c && (c = b());
			j.uuid = c;
			var i = (h || e) + "?" + f(j);
			g(i)
		}
	});
	lxb.add("tip", function(d) {
		var h = lxb.use("base").ie;
		var g = lxb.use("util").position;
		var f = {};
		var k = preHeight = preTop = preLeft = preTipHeight = 0;
		var l = {};
		var b = function(o, n) {
			for (var m in o) {
				if ((o.hasOwnProperty && o.hasOwnProperty(m)) || (!o.hasOwnProperty)) {
					if (!(m in ["event"])) {
						n[m] = o[m]
					}
				}
			}
		};
		var j = function() {
			l = {
				arrow: null,
				close: null,
				con: null,
				tipEle: null,
				value: 10
			}
		};
		var a = function() {
			if (document.compatMode == "BackCompat") {
				return {
					width: document.body.clientWidth,
					height: document.body.clientHeight
				}
			} else {
				return {
					width: document.documentElement.clientWidth,
					height: document.documentElement.clientHeight
				}
			}
		};
		var i = function(m) {
			return {
				width: m.offsetWidth,
				height: m.offsetHeight,
				top: m.offsetTop,
				left: m.offsetLeft
			}
		};
		var e = function(m) {
			return {
				width: m.offsetWidth,
				height: m.offsetHeight,
				top: m.offsetTop,
				left: m.offsetLeft
			}
		};
		var c = function() {
			f.body = a();
			f.con = i(l.con);
			f.tip = e(l.tipEle)
		};
		d.init = function(m) {
			j();
			b(m, l)
		};
		d.show = function() {
			l.tipEle.style.display = "";
			c();
			if (preTipHeight != f.tip.height || k != f.con.width || preHeight != f.con.height || preTop != f.con.top || preLeft != f.con.left) {
				d.resetLoc();
				k = f.con.width;
				preHeight = f.con.height;
				preTop = f.con.top;
				preLeft = f.con.left;
				preTipHeight = f.tip.height
			}
		};
		d.resetLoc = function() {
			var m = (f.con.height <= f.tip.height) ? true : false;
			var n = (h <= 6 || (h && document.compatMode != "CSS1Compat")) ? true : false;
			if (n) {
				f.con.top = f.body.height * g() / 100
			}
			if (f.tip.width > f.con.left) {
				if (f.tip.height > f.con.top) {
					l.arrow.className = "arrow-left-t";
					l.arrow.style.top = "6px";
					l.tipEle.style.top = m ? "22px" : "10px"
				} else {
					l.arrow.className = "arrow-left-b";
					l.tipEle.style.top = m ? (f.con.height - f.tip.height - 10) + "px" : "0px"
				}
				l.tipEle.style.left = (f.con.left + f.con.width + 7 + l.value) + "px"
			} else {
				if (f.tip.height > f.con.top) {
					l.arrow.className = "arrow-right-t";
					l.arrow.style.top = "6px";
					l.tipEle.style.top = m ? "22px" : "10px"
				} else {
					l.arrow.className = "arrow-right-b";
					l.tipEle.style.top = m ? (f.con.height - f.tip.height - 10) + "px" : "0px"
				}
				if (document.compatMode == "BackCompat" && h) {
					l.arrow.style.left = "302px"
				}
				l.tipEle.style.left = (-f.tip.width - 7 - 10) + "px"
			}
		};
		d.hide = function() {
			l.tipEle && (l.tipEle.style.display = "none")
		}
	});
	lxb.add("business.replacer", function(b) {
		function e(j, h, l) {
			var g;
			for (var f = 0, k; k = h[f]; f++) {
				g = j.nodeValue.replace(k, l);
				if (g != j.nodeValue) {
					j.nodeValue = g
				}
			}
		}

		function a(h) {
			var g = [];
			if (typeof h == "string") {
				h = [h]
			}
			for (var f = 0, j; j = h[f]; f++) {
				if (j.indexOf("@REG:") == 0) {
					g.push(new RegExp(j.substring(5), "g"))
				} else {
					g.push(j)
				}
			}
			return g
		}

		function d(h) {
			var f = [];
			if (h.nodeType == 3) {
				f.push(h)
			} else {
				if (h.nodeType == 1 && (h.className || h.className === "") && h.className.indexOf && h.className.indexOf("lxb-") < 0) {
					for (var g = h.firstChild; g != null; g = g.nextSibling) {
						f = f.concat(d(g))
					}
				}
			}
			return f
		}

		function c(j, k) {
			var f = d(document.body || document.getElementsByTagName("body")[0]);
			var j = a(j);
			for (var g = 0, h; h = f[g]; g++) {
				e(h, j, k)
			}
		}
		b.run = function(j, f, g, k) {
			var i = lxb.use("base");
			var h = lxb.use("config").Lang;
			var l = i.formatTel(f, k) + (g ? h.TRAN + g : "");
			if (!j || j.length <= 0 || !l) {
				return
			}
			i.ready(function() {
				c(j, l)
			})
		}
	});
	lxb.add("business.container", function(e) {
		var c = lxb.use("base");
		var h = lxb.use("config").ClassName;
		var i = lxb.use("config").ID;
		var g = lxb.use("util");
		var a = function() {};
		var f = {};
		var k = {};
		var j = 0;

		function l() {
			var n = k.main;
			var o = k.mask;
			var m = n.style.height || (n.currentStyle ? n.currentStyle.height : "");
			if (!m || m == "auto") {
				setTimeout(l, 300)
			} else {
				o.style.height = m;
				o.style.width = n.style.width || (n.currentStyle ? n.currentStyle.width : "100%");
				n.style.zoom = 1
			}
		}

		function b() {
			var r = lxb.use("log");
			var x = h.MAIN;
			var t = c.create("ins", {
				id: i.MAIN
			});
			var q = k.main = c.create("ins");
			t.appendChild(q);
			q.style.visibility = "hidden";
			if (f.floatColor) {
				q.style.backgroundColor = f.floatColor
			}
			if (f.imagePath) {
				q.style.backgroundImage = 'url("' + f.imagePath + '")'
			}
			var y = h.MAIN + "-" + f.style + "-" + f.type;
			var m = 0;
			var u = 0;
			if (f.position > 0) {
				m = 1
			}
			var v = "";
			if (g.isHorizon()) {
				v = "lxb-vertical"
			} else {
				if (g.isVertical()) {
					v = "lxb-horizen"
				}
			}
			u = Math.abs(f.position);
			var w = h.Position.HOR[m];
			y += " " + y + h.PositionFix.HOR[m];
			q.className = x + " " + y + " " + w + " " + v;
			if (u <= 45) {
				q.className += " " + h.Position.VER[0]
			} else {
				q.className += " " + h.Position.VER[1]
			}
			var p = k.btnHide = c.create("ins", {
				className: h.MAIN + "-btn-hide"
			});
			q.appendChild(p);
			p = k.btnShow = c.create("ins");
			x = h.MAIN + "-btn-show";
			x += " " + h.MAIN + "-btn-show-" + f.style;
			x += " " + w;
			x += " " + h.MAIN + "-btn-show-" + f.style + h.PositionFix.HOR[m];
			p.className = x;
			var o = c.create("ins", {
				id: i.SHOW
			});
			o.appendChild(p);
			p.style.display = "none";
			btnBg = k.btnShowBg = c.create("ins", {
				className: h.MAIN + "-btn-show-bg"
			});
			if (!(g.isStandard() && g.isHorizon())) {
				if (f.floatColor) {
					p.style.backgroundColor = f.floatColor
				}
				if (f.imagePath) {
					p.style.backgroundImage = 'url("' + f.imagePath + '")'
				}
			}
			p.appendChild(btnBg);
			var s = function(A) {
				var z = g.css(q, "zIndex");
				if (z > 0) {
					r.sendLog({
						fType: 1,
						name: "css",
						t: (new Date()).getTime()
					});
					A.call(null)
				} else {
					setTimeout(function() {
						s(A)
					}, 30)
				}
			};
			var n = c.viewportSize();
			s(function() {
				j = parseInt(g.css(q, "height"));
				if (g.isVertical()) {
					if (g.displayGroup()) {
						j = 190 + 25 * f.groupDetail.length
					} else {
						if (g.isCustom()) {
							j = 220
						}
					}
				}
				if (g.isCustom() && g.isHorizon()) {
					j = 90
				}
				q.style.height = j + "px";
				u = (u == 1 ? 0 : u);
				k.btnShow.style.top = q.style.top = (u / 100 * (n.height - j)) + "px";
				q.style.visibility = "visible";
				a({
					main: k.main,
					btnShow: k.btnShow,
					height: j
				});
				if (c.ie <= 6 || (c.ie == 7 && document.compatMode != "CSS1Compat")) {
					c.setFixed(p);
					p.style.display = "none";
					c.setFixed(q)
				}
			});
			c.ready(function() {
				if (c.ie && c.ie <= 6) {
					k.mask = c.create("iframe", {
						frameBorder: 0,
						className: h.MAIN + "-mask"
					});
					q.appendChild(k.mask);
					p.appendChild(k.btnShowMask = c.create("iframe", {
						frameBorder: 0,
						className: h.MAIN + "-mask"
					}))
				}
				document.body.appendChild(o);
				document.body.appendChild(t);
				var z = setInterval(function() {
					if (document.readyState === "complete") {
						clearInterval(z);
						g.checkFloat()
					}
				}, 0);
				if (!c.ie) {
					return
				}
				if (c.ie <= 6) {
					l();
					k.btnShowMask.contentWindow.document.open();
					k.btnShowMask.contentWindow.document.write('<html><head></head><body style="padding:0px;margin:0px;height:100%;width:100%"></body></html>');
					k.btnShowMask.contentWindow.document.close()
				}
			})
		}

		function d() {
			k.main.onkeypress = k.main.onkeydown = k.main.onkeyup = k.main.onmousedown = k.main.onmouseup = k.main.onclick = function(n) {
				n = n || window.event;
				if (n.stopPropagation) {
					n.stopPropagation()
				} else {
					n.cancelBubble = true
				}
			};
			k.btnHide.onclick = function() {
				k.main.style.display = "none";
				k.btnShow.style.display = ""
			};

			function m() {
				k.btnShow.style.display = "none";
				k.main.style.display = ""
			}
			if (k.btnShowMask) {
				k.btnShowMask.contentWindow.document.onclick = m
			}
			k.btnShow.onclick = m
		}
		e.init = function(m, n) {
			a = n;
			c.extend(f, m);
			b();
			d()
		}
	});
	lxb.add("business.custom", function(a) {
		var b = lxb.use("config").ClassName;
		a.init = function(d) {
			var c = d.main;
			var f = d.btnShow;
			var e = b.MAIN + "-custom";
			e += " " + b.MAIN + "-custom-" + d.type + "-" + (d.windowLayout == 1 ? "h" : "v");
			e += " " + b.MAIN + "-custom-" + (d.windowLayout == 1 ? "h" : "v") + (Math.abs(d.position) == 50 ? b.PositionFix.VER[1] : "");
			c.className += " " + e
		}
	});
	lxb.add("business.tel", function(a) {
		var e = lxb.use("base");
		var f = lxb.use("config").ClassName;
		var d = lxb.use("config").Lang;
		var b = {};

		function c() {
			var h = e.create("ins", {
				className: f.TL_PHONE
			});
			var i = e.formatTel(e.encodeHTML(b.phone), b.format);
			if (b.mode == 1 && b.ext) {
				i += ' <em class="' + f.TL_PHONE_EM + '">' + d.TRAN + "</em>" + e.encodeHTML(b.ext)
			}
			h.innerHTML = i;
			var g = h.getElementsByTagName("em")[0];
			if (b.telFontcolor) {
				h.style.color = b.telFontcolor
			}
			if (b.telFontfamily !== undefined && b.styleType != 1) {
				switch (b.telFontfamily - 0) {
					case 0:
						h.style.fontFamily = "\u5b8b\u4f53";
						if (g) {
							g.style.fontFamily = "\u5b8b\u4f53"
						}
						break;
					case 1:
						h.style.fontFamily = "\u9ed1\u4f53";
						if (g) {
							g.style.fontFamily = "\u9ed1\u4f53"
						}
						break;
					case 2:
						h.style.fontFamily = "\u5fae\u8f6f\u96c5\u9ed1";
						if (g) {
							g.style.fontFamily = "\u5fae\u8f6f\u96c5\u9ed1"
						}
						break;
					default:
						h.style.fontFamily = "\u5b8b\u4f53";
						if (g) {
							g.style.fontFamily = "\u5b8b\u4f53"
						}
				}
			}
			if (b.telFontsize) {
				h.style.fontSize = b.telFontsize + "px";
				if (g) {
					g.style.fontSize = b.telFontsize + "px"
				}
			}
			if (b.telFontcolor) {
				h.style.color = b.telFontcolor;
				if (g) {
					g.style.color = b.telFontcolor
				}
			}
			b.main.appendChild(h)
		}
		a.init = function(g) {
			e.extend(b, g);
			c()
		}
	});
	lxb.add("business.pin", function(g) {
		var c = lxb.use("base");
		var d = lxb.use("config").TPL;
		var k = lxb.use("config").Lang;
		var j = lxb.use("config").ClassName;
		var a = lxb.use("config").Port;
		var h = {};
		var n = {};
		var l = a + "cb/scode?t=";

		function b() {
			var q = n.main = c.create("ins", {
				className: j.MAIN + "-pin-con"
			});
			n.main.innerHTML = d.CB_PIN;
			var p = c.q("lxbPinItem", n.main);
			n.btnClose = p[0];
			n.input = p[1];
			n.pinImg = p[2];
			n.change = p[3];
			n.tip = p[4];
			n.btnOk = p[5];
			n.btnCancle = p[6];
			var r = c.viewportSize();
			var o = parseInt(h.main.style.top, 10) + 124;
			if (o >= r.height) {
				n.main.style.top = -(o - r.height) + "px"
			}
			h.main.appendChild(n.main);
			n.main.style.display = "none"
		}

		function f() {
			n.btnOk.onclick = function() {
				var o = n.input.value;
				if (!m(o)) {
					return
				}
				e(o)
			};
			n.btnClose.onclick = n.btnCancle.onclick = function() {
				i()
			};
			n.input.onkeyup = function(p) {
				p = p || window.event;
				if (p.keyCode == 13) {
					var o = n.input.value;
					if (!m(o)) {
						return
					}
					e(o)
				}
			};
			n.change.onclick = function() {
				n.pinImg.src = l + new Date().getTime()
			}
		}

		function m(o) {
			o = c.trim(o);
			if (o == "") {
				n.tip.innerHTML = k.CB_PIN_NULL;
				return false
			}
			if (o.length != 4) {
				n.tip.innerHTML = k.CB_PIN_WRONG;
				return false
			}
			return true
		}

		function e(p) {
			var q = lxb.use("net");
			var r = lxb.use("business.callback");
			var o = a + "cb/callcode";
			q.send(o, {
				scode: p
			}, function(s) {
				if (!!s.status) {
					n.tip.innerHTML = s.statusInfo || k.CB_PIN_WRONG;
					return
				} else {
					i();
					r.submit(h.value, h.groupId)
				}
			})
		}

		function i() {
			n.input.value = "";
			n.tip.innerHTML = "";
			n.main.style.display = "none"
		}
		g.show = function(p, o) {
			h.value = p;
			h.groupId = o;
			n.main.style.display = "";
			n.pinImg.src = l + new Date().getTime()
		};
		g.init = function(o) {
			c.extend(h, o);
			b();
			f()
		}
	});
	lxb.add("business.callback", function(r) {
		var i = lxb.use("base");
		var h = lxb.use("config").Lang;
		var d = lxb.use("config").TPL;
		var f = lxb.use("config").ClassName;
		var o = lxb.use("config").SiteId;
		var b = lxb.use("util");
		var g = {};
		var k = {};
		var l = "";

		function s() {
			l = h.CB_INPUT_TIP_HOLDER;
			if (b.displayGroup()) {
				l = h.INVITE_INPUT_TIP_HOLDER
			}
			var u = k.input = i.create("input", {
				type: "text",
				name: "phone",
				className: f.CB_INPUT,
				maxlength: 12,
				value: l
			});
			var z = k.cbCon = i.create("ins", {
				className: "lxb-callback-container"
			});
			k.cbCon.appendChild(u);
			var w = k.btn = i.create("ins", {
				className: f.CB_INPUT_BTN
			});
			w.innerHTML = i.encodeHTML(g.btnFontContent || "");
			if (!(b.isStandard() && b.isHorizon())) {
				w.style.color = g.btnfontColor;
				w.style.backgroundColor = g.btnColor
			}
			k.cbCon.appendChild(w);
			if (b.displayGroup()) {
				w.style.display = "none";
				var y = k.groupContainer = i.create("ins", {
					className: "lxb-group-container"
				});
				k.cbCon.appendChild(y);
				for (var v = 0; v < g.groupDetail.length; v++) {
					var A = i.create("ins", {
						groupid: g.groupDetail[v].groupid,
						title: "\u514D\u8D39\u56DE\u7535",
						className: "lxb-group-btn"
					});
					A.innerHTML = i.encodeHTML(g.groupDetail[v].groupname);
					A.style.color = g.btnfontColor;
					A.style.backgroundColor = g.btnColor;
					y.appendChild(A)
				}
			}
			var x = k.tip = i.create("ins", {
				className: f.CB_INPUT_TIP
			});
			x.style.display = "none";
			x.innerHTML = d.CB_INPUT_TIP_1;
			if (i.ie && i.ie <= 6) {
				x.appendChild(i.create("iframe", {
					className: f.MAIN + "-mask",
					frameBorder: 0
				}))
			}
			g.main.appendChild(z);
			g.main.appendChild(x);
			if (b.isPin()) {
				k.pin = lxb.use("business.pin");
				k.pin.init({
					main: g.main
				})
			}
		}
		var e = lxb.use("tip");

		function q() {
			var v = k.infoLayer;
			v = k.infoLayer = i.create("ins", {
				className: f.CB_INFO_TIP
			});
			v.innerHTML = d.CB_INFO_TIP_MAIN;
			var u = v.getElementsByTagName("ins");
			k.tipCon = u[0];
			k.tipOpt = {
				arrow: u[1],
				close: u[2],
				con: g.main,
				tipEle: v
			};
			u[2].onclick = function() {
				e.hide();
				clearTimeout(g.successTimer)
			};
			g.main.appendChild(v)
		}

		function n(u) {
			if (!k.infoLayer) {
				q()
			}
			k.tipCon.innerHTML = d.CB_ERROR_TIP_S + i.encodeHTML(u) + d.CB_ERROR_TIP_E;
			e.init(k.tipOpt);
			e.show()
		}

		function t(u) {
			if (!k.infoLayer) {
				q()
			}
			if (u.order == "0") {
				k.tipCon.innerHTML = d.CB_SUCCESS_TIP_IMG + d.CB_SUCCESS_TIP_PHONE + i.encodeHTML(u.cbPhone) + d.CB_SUCCESS_TIP_PHONE_END + d.CB_SUCCESS_TIP_TXT
			} else {
				k.tipCon.innerHTML = d.CB_SUCCESS_TIP_IMG + d.CB_SUCCESS_TIP_TXT_1
			}
			e.init(k.tipOpt);
			e.show();
			if (u.order == "0") {
				g.successTimer = setTimeout(function() {
					e.hide()
				}, 5000)
			} else {
				g.successTimer = setTimeout(function() {
					e.hide()
				}, 30000)
			}
		}

		function c() {
			var u = function(v) {
				k.input.blur();
				if (g.successTimer) {
					e.hide();
					clearTimeout(g.successTimer)
				}
				var w = k.input.value = i.trim(k.input.value);
				if (!m(w)) {
					return
				}
				if (b.isPin()) {
					e.hide();
					k.pin.show(w, v)
				} else {
					j(w, v)
				}
			};
			if (b.displayGroup()) {
				k.groupContainer.onclick = function(x) {
					x = x || window.event;
					var w = x.srcElement || x.target;
					if (/lxb\-group\-btn/.test(w.className.toLowerCase())) {
						var v = w.getAttribute("groupid");
						p();
						u(v)
					}
				}
			} else {
				k.btn.onclick = function() {
					p();
					u()
				}
			}
			k.input.onfocus = function() {
				k.tip.style.display = "";
				if (this.value == l) {
					this.value = ""
				}
				k.loadingLayer && (k.loadingLayer.style.display = "none");
				if (g.successTimer) {
					e.hide();
					clearTimeout(g.successTimer)
				}
			};
			k.input.onblur = function() {
				k.tip.style.display = "none";
				if (i.trim(this.value) == "") {
					this.value = l
				}
			};
			if (!b.displayGroup()) {
				k.input.onkeyup = function(v) {
					v = v || window.event;
					if (v.keyCode == 13) {
						k.btn.onclick()
					}
				}
			}
		}

		function a() {
			var u = k.loadingLayer;
			if (!u) {
				u = k.loadingLayer = i.create("ins", {
					className: f.CB_LOADING_TIP
				});
				u.style.display = "none";
				g.main.appendChild(u)
			}
			u.innerHTML = d.CB_LOADING_TIP;
			u.style.display = ""
		}

		function m(v) {
			var u = true;
			if (!/^\d{11,12}$/.test(v)) {
				u = false;
				n(h.ERROR_CB_PHONE)
			}
			return u
		}

		function j(y, x) {
			var z = lxb.use("net");
			var w = lxb.use("config").Root + "/_c.js";
			var v = lxb.use("config").Root + "/xCode";
			var u = lxb.use("config").bdcbid;
			if (g.submitTimer) {
				return
			}
			a();
			g.submitTimer = setTimeout(function() {
				g.submitTimer = null
			}, 5000);
			var A = {
				vtel: y,
				siteid: g.siteid,
				bdcbid: u,
				refer_domain: g.refer,
				bpaid: b.getBPAId()
			};
			if (x) {
				A.g = x
			}
			b.bpaLog();
			z.send(v, A, function(B) {
				A.code = B.data.code;
				z.send(w, A, function(C) {
					k.loadingLayer.style.display = "none";
					if (!!C.status) {
						var E = C.msg || h.ERROR_CB_FAIL;
						n(E + " ( code: " + C.status + " )")
					} else {
						var D = {};
						D.order = C.order;
						D.cbPhone = C.cbPhone;
						t(D);
						k.input.value = l
					}
					if (g.submitTimer) {
						clearTimeout(g.submitTimer);
						g.submitTimer = null
					}
				})
			});
			b.visitorLog(2, o)
		}

		function p() {
			lxb.use("base").create("img", {
				src: lxb.use("config").Root + "/count.gif?t=o"
			})
		}
		r.init = function(u) {
			i.extend(g, u);
			s();
			c()
		};
		r.submit = function(v, u) {
			j(v, u)
		}
	});
	lxb.add("business.invite", function(d) {
		var b = lxb.use("config");
		var a = lxb.use("base");
		var f = lxb.use("util");
		var i = null;
		var e = null;
		var j = [];
		var h = 0;
		var k = function() {
			this.transList = []
		};
		k.prototype = {
			begin: function() {
				this.transList.push("begin")
			},
			add: function(l) {
				this.transList.push(l)
			},
			commit: function() {
				var l = this.transList.pop();
				while (l !== "begin") {
					l = this.transList.pop()
				}
			},
			rollback: function() {
				var l = this.transList.pop();
				while (l && (l !== "begin")) {
					if (typeof l === "function") {
						l.call(null)
					}
					l = this.transList.pop()
				}
			},
			addClass: function(m, l) {
				a.addClass(m, l);
				this.add(function() {
					a.removeClass(m, l)
				})
			},
			addElement: function(m, l) {
				if (!m || !l) {
					return
				}
				l.appendChild(m);
				this.add(function() {
					l.removeChild(m)
				})
			},
			addElementToFirst: function(n, m) {
				if (!n || !m) {
					return
				}
				var l = m.getElementsByTagName("*")[0];
				if (l) {
					m.insertBefore(n, l)
				} else {
					m.appendChild(n)
				}
				this.add(function() {
					m.removeChild(n)
				})
			},
			changeText: function(l, n) {
				var m = l.innerHTML;
				l.innerHTML = n;
				this.add(function() {
					l.innerHTML = m
				})
			},
			setStyle: function(m, l, n) {
				if (n === undefined) {
					return
				}
				if (l == "float") {
					try {
						if (m.style[l]) {
							l = "float"
						} else {
							l = "cssFloat"
						}
						if (a.ie) {
							l = "styleFloat"
						}
					} catch (o) {}
				}
				var p = m.style[l];
				m.style[l] = n;
				this.add(function() {
					m.style[l] = p
				})
			},
			setStyleFromOptions: function(l, o) {
				for (var p in l) {
					if (!l.hasOwnProperty(p)) {
						continue
					}
					var r = l[p];
					var n = a.q(p, o);
					for (var m = 0; m < n.length; m++) {
						for (var q in r) {
							if (!r.hasOwnProperty(q)) {
								continue
							}
							this.setStyle(n[m], q, r[q])
						}
					}
				}
			}
		};
		k.prototype.constructor = k;
		var c = new k();
		d.init = function(n) {
			i = n.main;
			e = n;
			e.vertical = Math.abs(e.vertical);
			e.vertical = (e.vertical == 1 ? 0 : e.vertical);
			var r = a.q("lxb-cb-input", i)[0];
			if (!r) {
				return
			}
			if (f.displayGroup()) {
				var s = a.q("lxb-group-container", i)[0]
			} else {
				var q = a.q("lxb-cb-input-btn", i)[0]
			}
			if (f.isPin()) {
				var l = a.q("lxb-cb-pin-input", i)[0]
			}
			var o = function() {
				a.setCookie("isCalled", "called", "/");
				j = []
			};
			var p = function(v) {
				v = v || window.event;
				var u = v.target || v.srcElement;
				if (u.className == "lxb-group-btn") {
					o()
				}
			};
			var t = function(u) {
				u = u || window.event;
				if (u.keycode === 13) {
					o()
				}
				h = (new Date()).valueOf()
			};
			var m = function() {
				h = (new Date()).valueOf()
			};
			if (document.addEventListener) {
				r.addEventListener("keydown", t, false);
				r.addEventListener("mousedown", t, false);
				if (f.displayGroup()) {
					s.addEventListener("click", p, false)
				} else {
					q.addEventListener("click", o, false)
				}
				if (l) {
					l.addEventListener("keydown", m, false);
					l.addEventListener("mousedown", m, false)
				}
			} else {
				if (document.attachEvent) {
					r.attachEvent("onkeydown", t);
					r.attachEvent("onmousedown", t);
					if (f.displayGroup()) {
						s.attachEvent("onclick", p, false)
					} else {
						q.attachEvent("onclick", o)
					}
					if (l) {
						l.attachEvent("onkeydown", m, false);
						l.attachEvent("onmousedown", m, false)
					}
				}
			}
			if (a.getCookie("isCalled") === "called") {
				return
			}
			if (e.status === 0) {
				return
			} else {
				if (e.status === 1) {
					if (e.ifStartPage === 0) {
						d.schedule();
						return
					} else {
						if (e.ifStartPage === 1) {
							if (f.isLoadPage()) {
								d.schedule();
								return
							}
						}
					}
				}
			}
		};
		var g = function() {
			var l = j.shift();
			if (!l) {
				return
			}
			var m = function() {
				var n = (new Date()).valueOf();
				if (n - h < 3000) {
					setTimeout(m, 3000)
				} else {
					l.callback.call(null)
				}
			};
			setTimeout(m, l.delay * 1000)
		};
		d.schedule = function() {
			var l = e.stayTime;
			var p = e.inviteTimes;
			var n = e.inviteInterval;
			var m = e.closeTime || 99999;
			j.push({
				delay: l,
				callback: function() {
					d.invite()
				}
			});
			j.push({
				delay: m,
				callback: function() {
					d.minimize()
				}
			});
			p--;
			for (var o = 0; o < p; o++) {
				j.push({
					delay: n,
					callback: function() {
						d.invite()
					}
				});
				j.push({
					delay: m,
					callback: function() {
						d.minimize()
					}
				})
			}
			g()
		};
		d.getOptions = function() {
			var l = {
				"lxb-invite": {
					marginTop: (function() {
						var m = 0;
						var n = 0;
						if (e.background == 1) {
							m = e.height;
							n = e.width
						} else {
							m = e.imgHeight;
							n = e.imgWidth
						}
						switch (e.position - 0) {
							case 0:
								return "-" + m / 2 + "px";
							case 1:
								return "0px";
							case 2:
								return "0px"
						}
					})(),
					marginBottom: (function() {
						var m = 0;
						var n = 0;
						if (e.background == 1) {
							m = e.height;
							n = e.width
						} else {
							m = e.imgHeight;
							n = e.imgWidth
						}
						switch (e.position - 0) {
							case 0:
								return "-" + m / 2 + "px";
							case 1:
								return "0px";
							case 2:
								return "0px"
						}
					})(),
					marginLeft: (function() {
						var m = 0;
						var n = 0;
						if (e.background == 1) {
							m = e.height;
							n = e.width
						} else {
							m = e.imgHeight;
							n = e.imgWidth
						}
						switch (e.position - 0) {
							case 0:
								return "-" + n / 2 + "px";
							case 1:
								return "0px";
							case 2:
								return "0px"
						}
					})(),
					marginRight: (function() {
						var m = 0;
						var n = 0;
						if (e.background == 1) {
							m = e.height;
							n = e.width
						} else {
							m = e.imgHeight;
							n = e.imgWidth
						}
						switch (e.position - 0) {
							case 0:
								return "-" + n / 2 + "px";
							case 1:
								return "0px";
							case 2:
								return "0px"
						}
					})(),
					left: (function() {
						switch (e.position - 0) {
							case 0:
								return "50%";
							case 1:
								return "0px";
							case 2:
								return "auto"
						}
					})(),
					right: (function() {
						switch (e.position - 0) {
							case 0:
								return "auto";
							case 1:
								return "auto";
							case 2:
								return "0px"
						}
					})(),
					top: (function() {
						switch (e.position - 0) {
							case 0:
								return "50%";
							case 1:
								return "auto";
							case 2:
								return "auto"
						}
					})(),
					bottom: (function() {
						switch (e.position - 0) {
							case 0:
								return "auto";
							case 1:
								return "0px";
							case 2:
								return "0px"
						}
					})(),
					border: "none",
					textAlign: "left",
					width: (function() {
						var m = 0;
						if (e.background == 1) {
							m = e.width
						} else {
							m = e.imgWidth
						}
						return m + "px"
					})(),
					height: (function() {
						var m = 0;
						if (e.background == 1) {
							m = e.height
						} else {
							m = e.imgHeight
						}
						return m + "px"
					})(),
					backgroundImage: (function() {
						if (e.background === 2) {
							return 'url("' + e.backgroundImg + '")'
						} else {
							return "none"
						}
					})(),
					backgroundColor: (function() {
						if (e.background === 1) {
							return e.backgroundColor
						} else {
							return "transparent"
						}
					})(),
					color: "#000",
					borderRadius: "3px",
					mozBorderRadius: "3px",
					webkitBorderRadius: "3px"
				},
				"lxb-tl-phone": {
					width: "auto",
					fontFamily: (function() {
						switch (e.telFont - 0) {
							case 0:
								return "\u5b8b\u4f53";
							case 1:
								return "\u9ed1\u4f53";
							case 2:
								return "\u5fae\u8f6f\u96c5\u9ed1";
							default:
								return "\u5b8b\u4f53"
						}
					})(),
					textAlign: "center",
					position: "static",
					margin: "10px 10px 0 10px",
					color: e.telColor,
					lineHeight: "1.2em",
					fontSize: e.telSize + "px"
				},
				"lxb-tl-phone-em": {
					fontFamily: (function() {
						switch (e.telFont - 0) {
							case 0:
								return "\u5b8b\u4f53";
							case 1:
								return "\u9ed1\u4f53";
							case 2:
								return "\u5fae\u8f6f\u96c5\u9ed1";
							default:
								return "\u5b8b\u4f53"
						}
					})(),
					color: e.telColor,
					lineHeight: "1.2em",
					fontSize: e.telSize + "px"
				},
				"lxb-callback-container": {
					textAlign: "center",
					paddingBottom: (function() {
						if (f.displayGroup()) {
							if (f.displayLink()) {
								return "30px"
							} else {
								return "3px"
							}
						} else {
							if (f.displayLink()) {
								return "40px"
							} else {
								return "15px"
							}
						}
					})()
				},
				"lxb-cb-input": {
					width: "130px",
					height: "22px",
					display: "inline-block",
					_display: "inline",
					_zoom: "1",
					color: "#000",
					margin: 0,
					marginRight: "5px",
					lineHeight: "17px",
					top: "auto",
					left: "50%",
					bottom: "15px",
					position: "static",
					verticalAlign: "middle",
					borderRadius: "0px",
					mozBorderRadius: "0px",
					webkitBorderRadius: "0px",
					backgroundColor: "#fff"
				},
				"lxb-cb-input-btn": {
					display: (function() {
						if (f.displayGroup()) {
							return "none"
						} else {
							return "inline-block"
						}
					})(),
					_display: (function() {
						if (f.displayGroup()) {
							return "none"
						} else {
							return "inline"
						}
					})(),
					position: "static",
					_zoom: "1",
					verticalAlign: "middle",
					lineHeight: "22px",
					height: "22px",
					border: "none",
					backgroundImage: "none",
					color: e.btnFontColor,
					backgroundColor: e.btnColor,
					margin: "0",
					fontSize: "12px",
					paddingLeft: "5px",
					paddingRight: "5px",
					width: "auto",
					borderRadius: "0px",
					mozBorderRadius: "0px",
					webkitBorderRadius: "0px",
					top: "auto",
					left: "50%",
					bottom: "15px",
					textAlign: "center",
					fontWeight: "normal"
				},
				"lxb-group-btn": {
					"float": "left",
					width: "107px",
					height: "25px",
					lineHeight: "25px",
					margin: "3px",
					color: e.btnFontColor,
					backgroundColor: e.btnColor
				},
				"lxb-container-btn-hide": {
					display: "none"
				},
				"lxb-cb-input-tip": {
					right: "auto",
					left: "0",
					top: "-100px"
				}
			};
			return l
		};
		d.minimize = function() {
			c.rollback();
			g();
			if (a.ie <= 6) {
				var l = a.viewportSize();
				i.style.top = (e.vertical / 100 * (l.height - e.conHeight)) + "px";
				a.setFixed(i)
			}
		};
		d.invite = function() {
			if (a.getCookie("isCalled") === "called") {
				return
			}
			var o = a.q("lxb-cb-input-btn")[0];
			var q = document.createElement("ins");
			q.innerHTML = a.encodeHTML(e.content);
			q.style.fontSize = e.fontSize + "px";
			q.style.lineHeight = "1.2em";
			q.style.fontFamily = (function() {
				switch (e.font - 0) {
					case 0:
						return "\u5b8b\u4f53";
					case 1:
						return "\u9ed1\u4f53";
					case 2:
						return "\u5fae\u8f6f\u96c5\u9ed1";
					default:
						return "\u5b8b\u4f53"
				}
			})();
			q.style.color = e.fontColor;
			q.style.fontWeight = "bold";
			q.style.position = "static";
			q.style.margin = "20px 10px 0 10px";
			var p = document.createElement("ins");
			p.innerHTML = "\u2573";
			p.style.fontSize = "12px";
			p.style.lineHeight = "1.2em";
			p.style.position = "absolute";
			p.style.lineHeight = "1.2em";
			p.style.height = "12px";
			p.style.right = "5px";
			p.style.top = "5px";
			p.style.fontWeight = "bold";
			p.style.fontFamily = "\u5b8b\u4f53";
			p.style.cursor = "pointer";
			p.onclick = function() {
				d.minimize()
			};
			if (f.displayLink()) {
				var r = document.createElement("ins");
				r.className = b.ClassName.INVITE_LINK_CON;
				var n = document.createElement("ins");
				n.className = b.ClassName.INVITE_LINK_TEXT;
				n.innerHTML = a.encodeHTML(e.linkTextContent);
				n.style.color = e.linkTextColor;
				n.style.fontFamily = (function() {
					switch (e.linkTextFont - 0) {
						case 0:
							return "\u5b8b\u4f53";
						case 1:
							return "\u9ed1\u4f53";
						case 2:
							return "\u5fae\u8f6f\u96c5\u9ed1";
						default:
							return "\u5b8b\u4f53"
					}
				})();
				var l = document.createElement("a");
				l.innerHTML = a.encodeHTML(e.linkBtnContent);
				l.className = b.ClassName.INVITE_LINK_BTN;
				l.style.color = e.linkBtnFontColor;
				l.style.backgroundColor = e.linkBtnBgColor;
				l.href = a.filter(e.linkURL);
				l.target = "_blank";
				r.appendChild(n);
				r.appendChild(l)
			}
			c.begin();
			c.addElementToFirst(q, i);
			c.addElement(p, i);
			f.displayLink() && c.addElement(r, i);
			c.addClass(i, "lxb-invite");
			var m = d.getOptions();
			c.setStyleFromOptions(m);
			if (a.ie <= 6) {
				a.setFixed(i)
			}
			g()
		}
	});
	(function() {
		var k = lxb.use("util");
		var i = lxb.use("log");
		i.sendLog({
			fType: 1,
			name: "lxb",
			t: (new Date()).getTime()
		});

		function j(t) {
			var e = {};
			var s = t.float_window;
			var u = 0;
			if (t.inviteInfo) {
				u = t.inviteInfo.status
			}
			if (!s || s == "0") {
				return {}
			}
			e.base = {
				position: t.position,
				groupDetail: t.groupDetail,
				windowLayout: t.windowLayout,
				style: t.style,
				type: s
			};
			if (k.isStandard()) {
				if (k.isVertical()) {
					e.base.floatColor = t.floatColor
				}
			}
			if (k.isCustom()) {
				e.custom = {
					url: t.imagePath,
					windowLayout: t.windowLayout,
					position: t.position,
					type: s
				};
				e.base.style = "custom";
				e.base.imagePath = t.imagePath
			}
			if (k.display400()) {
				e.tel = {
					phone: t.phone,
					mode: t.mode,
					format: t.format,
					ext: t.ext
				};
				if (k.isCustom()) {
					e.tel.telFontcolor = t.telFontcolor;
					e.tel.telFontfamily = t.telFontfamily;
					e.tel.telFontsize = t.telFontsize;
					e.tel.telFontcolor = t.telFontcolor
				}
			}
			if (k.displayCallback()) {
				e.callback = {
					callPhone: t.cbPhone || "",
					style: t.style,
					btnFontContent: t.btnFontContent,
					siteid: t.siteid,
					btnfontColor: t.btnfontColor,
					btnColor: t.btnColor,
					styleType: t.styleType,
					windowLayout: t.windowLayout,
					ifGroup: t.ifGroup,
					groupDetail: t.groupDetail,
					code: t.code,
					refer: q || ""
				}
			}
			if (u !== 0) {
				t.inviteInfo = t.inviteInfo || {};
				t.inviteWay = t.inviteWay || {};
				e.invite = {
					ifGroup: t.ifGroup,
					vertical: t.position,
					windowLayout: t.windowLayout,
					status: t.inviteInfo.status || 0,
					content: t.inviteInfo.content || "",
					font: t.inviteInfo.font || 0,
					fontSize: t.inviteInfo.fontSize || 16,
					fontColor: t.inviteInfo.fontColor || "#000000",
					background: t.inviteInfo.background || 1,
					backgroundColor: t.inviteInfo.backgroundColor || "rgb(197, 232, 251)",
					backgroundImg: t.inviteInfo.backgroundImg || "",
					btnColor: t.inviteInfo.btnColor || "rgb(132, 133, 134)",
					btnFontColor: t.inviteInfo.btnFontColor || "#ffffff",
					telFont: t.inviteInfo.telFont || 0,
					telSize: t.inviteInfo.telSize || 18,
					telColor: t.inviteInfo.telColor || "#000000",
					height: t.inviteInfo.height || 140,
					width: t.inviteInfo.width || 230,
					imgHeight: t.inviteInfo.imgHeight || 140,
					imgWidth: t.inviteInfo.imgWidth || 230,
					position: t.inviteInfo.position || 0,
					linkStatus: t.inviteInfo.linkStatus || 0,
					linkURL: t.inviteInfo.linkURL,
					linkTextContent: t.inviteInfo.linkTextContent || "",
					linkTextColor: t.inviteInfo.linkTextColor || "#000000",
					linkTextFont: t.inviteInfo.linkTextFont || 0,
					linkBtnContent: t.inviteInfo.linkBtnContent || "在线交谈",
					linkBtnBgColor: t.inviteInfo.linkBtnBgColor || "#000000",
					linkBtnFontColor: t.inviteInfo.linkBtnFontColor || "#ffffff",
					ifStartPage: t.inviteWay.ifStartPage || 0,
					stayTime: t.inviteWay.stayTime || 0,
					inviteTimes: t.inviteWay.inviteTimes || 1,
					inviteInterval: t.inviteWay.inviteInterval || 0,
					closeTime: t.inviteWay.closeTime || 0,
					siteId: t.inviteWay.siteId
				}
			}
			return e
		}

		function d(y) {
			i.sendLog({
				fType: 1,
				name: "_l",
				t: (new Date()).getTime()
			});
			var x = lxb.use("net");
			var s = lxb.use("util");
			if (!!y.status) {
				x.log("error", "init");
				return
			}
			var v = y.data;
			s.init(v);
			if (v.replace && v.phone) {
				try {
					var u = v.mode == 1 ? v.ext : "";
					lxb.use("business.replacer").run(v.replace, v.phone, u || "", v.format || "1")
				} catch (w) {
					x.log("error", "replace")
				}
			}
			if (v.style <= 5 && v.float_window != 1) {
				return
			}
			v = j(v);
			if (v.base) {
				var t = lxb.use("config").Root + "/asset/" + v.base.style + ".css";
				x.loadCSS(t);
				lxb.use("business.container").init(v.base, function(z) {
					if (v.custom) {
						v.custom.main = z.main;
						v.custom.btnShow = z.btnShow;
						lxb.use("business.custom").init(v.custom)
					}
					if (v.tel) {
						v.tel.main = z.main;
						lxb.use("business.tel").init(v.tel)
					}
					if (v.callback) {
						v.callback.main = z.main;
						lxb.use("business.callback").init(v.callback)
					}
					if (v.invite) {
						v.invite.main = z.main;
						v.invite.conHeight = z.height;
						var e = lxb.use("business.invite");
						e.init(v.invite)
					}
					i.sendLog({
						fType: 1,
						name: "finishRender",
						t: (new Date()).getTime()
					});
					s.loadBPA(g.bpa)
				})
			}
		}

		function m() {
			var e = location.search ? location.search.substring(1) : "";
			e = c.queryToJSON(e);
			return e.bdclkid
		}

		function f() {
			var e = document.referrer;
			e = e.replace(/^https?:\/\//, "").split("/");
			return e[0].replace(/:.*$/, "")
		}

		function p(u) {
			var e = "";
			var s = [".com", ".co", ".cn", ".info", ".net", ".org", ".me", ".mobi", ".us", ".biz", ".xxx", ".ca", ".co.jp", ".com.cn", ".net.cn", ".org.cn", ".gov.cn", ".mx", ".tv", ".ws", ".ag", ".com.ag", ".net.ag", ".org.ag", ".am", ".asia", ".at", ".be", ".com.br", ".net.br", ".bz", ".com.bz", ".net.bz", ".cc", ".com.co", ".net.co", ".nom.co", ".de", ".es", ".com.es", ".nom.es", ".org.es", ".eu", ".fm", ".fr", ".gs", ".in", ".co.in", ".firm.in", ".gen.in", ".ind.in", ".net.in", ".org.in", ".it", ".jobs", ".jp", ".ms", ".com.mx", ".nl", ".nu", ".co.nz", ".net.nz", ".org.nz", ".se", ".tc", ".tk", ".tw", ".com.tw", ".com.hk", ".idv.tw", ".org.tw", ".hk", ".co.uk", ".me.uk", ".org.uk", ".vg", ".name"];
			s = s.join("|").replace(".", "\\.");
			var t = new RegExp("\\.?([^.]+(" + s + "))$");
			u.replace(t, function(w, v) {
				e = v
			});
			return e
		}
		if (window.top != window) {
			try {
				if (window.parent.document.getElementsByTagName("frameset")[0]) {} else {
					lxb.instance++
				}
			} catch (l) {}
		}
		if (lxb.instance > 1) {
			return
		}
		var g = lxb.use("config");
		var n = lxb.use("net");
		var c = lxb.use("base");
		var a = g.Root + "/_l.js";
		var o = m();
		if (!o) {
			o = c.getCookie(g.ID.COOKIE_DBCLKID)
		} else {
			c.setCookie(g.ID.COOKIE_DBCLKID, o)
		}
		var r = g.bdcbid;
		var q = f();
		if (!q || p(q) == p(location.hostname)) {
			q = c.getCookie(g.ID.COOKIE_REFER)
		} else {
			var b = q + "; path=/";
			if (location.hostname.indexOf("baidu.com") < 0) {
				b += "; domain=." + p(location.hostname)
			}
			c.setCookie(g.ID.COOKIE_REFER, b)
		}
		var h = {
			siteid: g.SiteId,
			bdclickid: o || "",
			bdcbid: r || "",
			refer_domain: q || "",
			ishttp: (location.href.indexOf("https://") === 0 ? 0 : 1)
		};
		n.send(a, h, d);
		k.visitorLog(1, g.SiteId)
	})();