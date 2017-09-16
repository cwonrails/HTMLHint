/*!
 * HTMLHint v0.9.15
 * https://github.com/yaniswang/HTMLHint
 *
 * (c) 2014-2017 Yanis Wang <yanis.wang@gmail.com>.
 * MIT Licensed
 */

var HTMLHint = function(e) {
    function t(e, t) {
        return new Array(e + 1).join(t || " ");
    }
    var a = {};
    return a.version = "0.9.15", a.release = "20170916", a.rules = {}, a.defaultRuleset = {
        "tagname-lowercase": !0,
        "attr-lowercase": !0,
        "attr-value-double-quotes": !0,
        "doctype-first": !0,
        "tag-pair": !0,
        "spec-char-escape": !0,
        "id-unique": !0,
        "src-not-empty": !0,
        "attr-no-duplication": !0,
        "title-require": !0
    }, a.addRule = function(e) {
        a.rules[e.id] = e;
    }, a.verify = function(e, t) {
        void 0 !== t && 0 !== Object.keys(t).length || (t = a.defaultRuleset), e = e.replace(/^\s*<!--\s*htmlhint\s+([^\r\n]+?)\s*-->/i, function(e, a) {
            return void 0 === t && (t = {}), a.replace(/(?:^|,)\s*([^:,]+)\s*(?:\:\s*([^,\s]+))?/g, function(e, a, n) {
                "false" === n ? n = !1 : "true" === n && (n = !0), t[a] = void 0 === n || n;
            }), "";
        });
        var n, i = new HTMLParser(), r = new a.Reporter(e, t), s = a.rules;
        for (var o in t) void 0 !== (n = s[o]) && !1 !== t[o] && n.init(i, r, t[o]);
        return i.parse(e), r.messages;
    }, a.format = function(e, a) {
        var n = [], i = {
            white: "",
            grey: "",
            red: "",
            reset: ""
        };
        (a = a || {}).colors && (i.white = "\x1b[37m", i.grey = "\x1b[90m", i.red = "\x1b[31m", 
        i.reset = "\x1b[39m");
        var r = a.indent || 0;
        return e.forEach(function(e) {
            var a = e.evidence, s = e.line, o = e.col, l = a.length, d = o > 41 ? o - 40 : 1, u = a.length > o + 60 ? o + 60 : l;
            o < 41 && (u += 40 - o + 1), a = a.replace(/\t/g, " ").substring(d - 1, u), d > 1 && (a = "..." + a, 
            d -= 3), u < l && (a += "..."), n.push(i.white + t(r) + "L" + s + " |" + i.grey + a + i.reset);
            var c = o - d, f = a.substring(0, c).match(/[^\u0000-\u00ff]/g);
            null !== f && (c += f.length), n.push(i.white + t(r) + t(String(s).length + 3 + c) + "^ " + i.red + e.message + " (" + e.rule.id + ")" + i.reset);
        }), n;
    }, a;
}();

"object" == typeof exports && exports && (exports.HTMLHint = HTMLHint), function(e, t) {
    var a = function() {
        var e = this;
        e._init.apply(e, arguments);
    };
    a.prototype = {
        _init: function(e, t) {
            var a = this;
            a.html = e, a.lines = e.split(/\r?\n/);
            var n = e.match(/\r?\n/);
            a.brLen = null !== n ? n[0].length : 0, a.ruleset = t, a.messages = [];
        },
        error: function(e, t, a, n, i) {
            this.report("error", e, t, a, n, i);
        },
        warn: function(e, t, a, n, i) {
            this.report("warning", e, t, a, n, i);
        },
        info: function(e, t, a, n, i) {
            this.report("info", e, t, a, n, i);
        },
        report: function(e, t, a, n, i, r) {
            for (var s, o, l = this, d = l.lines, u = l.brLen, c = a - 1, f = d.length; c < f && (s = d[c], 
            o = s.length, n > o && a < f); c++) a++, 1 != (n -= o) && (n -= u);
            l.messages.push({
                type: e,
                message: t,
                raw: r,
                evidence: s,
                line: a,
                col: n,
                rule: {
                    id: i.id,
                    description: i.description,
                    link: "https://github.com/yaniswang/HTMLHint/wiki/" + i.id
                }
            });
        }
    }, e.Reporter = a;
}(HTMLHint);

var HTMLParser = function(e) {
    var t = function() {
        var e = this;
        e._init.apply(e, arguments);
    };
    return t.prototype = {
        _init: function() {
            var e = this;
            e._listeners = {}, e._mapCdataTags = e.makeMap("script,style"), e._arrBlocks = [], 
            e.lastEvent = null;
        },
        makeMap: function(e) {
            for (var t = {}, a = e.split(","), n = 0; n < a.length; n++) t[a[n]] = !0;
            return t;
        },
        parse: function(t) {
            function a(t, a, n, i) {
                var r = n - w + 1;
                i === e && (i = {}), i.raw = a, i.pos = n, i.line = b, i.col = r, L.push(i), c.fire(t, i);
                for (;m.exec(a); ) b++, w = n + m.lastIndex;
            }
            var n, i, r, s, o, l, d, u, c = this, f = c._mapCdataTags, g = /<(?:\/([^\s>]+)\s*|!--([\s\S]*?)--|!([^>]*?)|([\w\-:]+)((?:\s+[^\s"'>\/=\x00-\x0F\x7F\x80-\x9F]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s"'>]*))?)*?)\s*(\/?))>/g, h = /\s*([^\s"'>\/=\x00-\x0F\x7F\x80-\x9F]+)(?:\s*=\s*(?:(")([^"]*)"|(')([^']*)'|([^\s"'>]*)))?/g, m = /\r?\n/g, p = 0, v = 0, w = 0, b = 1, L = c._arrBlocks;
            for (c.fire("start", {
                pos: 0,
                line: 1,
                col: 1
            }); n = g.exec(t); ) if ((i = n.index) > p && (u = t.substring(p, i), o ? d.push(u) : a("text", u, p)), 
            p = g.lastIndex, !(r = n[1]) || (o && r === o && (a("cdata", u = d.join(""), v, {
                tagName: o,
                attrs: l
            }), o = null, l = null, d = null), o)) if (o) d.push(n[0]); else if (r = n[4]) {
                s = [];
                for (var y, T = n[5], H = 0; y = h.exec(T); ) {
                    var x = y[1], M = y[2] ? y[2] : y[4] ? y[4] : "", N = y[3] ? y[3] : y[5] ? y[5] : y[6] ? y[6] : "";
                    s.push({
                        name: x,
                        value: N,
                        quote: M,
                        index: y.index,
                        raw: y[0]
                    }), H += y[0].length;
                }
                H === T.length ? (a("tagstart", n[0], i, {
                    tagName: r,
                    attrs: s,
                    close: n[6]
                }), f[r] && (o = r, l = s.concat(), d = [], v = p)) : a("text", n[0], i);
            } else (n[2] || n[3]) && a("comment", n[0], i, {
                content: n[2] || n[3],
                long: !!n[2]
            }); else a("tagend", n[0], i, {
                tagName: r
            });
            t.length > p && a("text", u = t.substring(p, t.length), p), c.fire("end", {
                pos: p,
                line: b,
                col: t.length - w + 1
            });
        },
        addListener: function(t, a) {
            for (var n, i = this._listeners, r = t.split(/[,\s]/), s = 0, o = r.length; s < o; s++) i[n = r[s]] === e && (i[n] = []), 
            i[n].push(a);
        },
        fire: function(t, a) {
            a === e && (a = {}), a.type = t;
            var n = this, i = [], r = n._listeners[t], s = n._listeners.all;
            r !== e && (i = i.concat(r)), s !== e && (i = i.concat(s));
            var o = n.lastEvent;
            null !== o && (delete o.lastEvent, a.lastEvent = o), n.lastEvent = a;
            for (var l = 0, d = i.length; l < d; l++) i[l].call(n, a);
        },
        removeListener: function(t, a) {
            var n = this._listeners[t];
            if (n !== e) for (var i = 0, r = n.length; i < r; i++) if (n[i] === a) {
                n.splice(i, 1);
                break;
            }
        },
        fixPos: function(e, t) {
            var a, n = e.raw.substr(0, t).split(/\r?\n/), i = n.length - 1, r = e.line;
            return i > 0 ? (r += i, a = n[i].length + 1) : a = e.col + t, {
                line: r,
                col: a
            };
        },
        getMapAttrs: function(e) {
            for (var t, a = {}, n = 0, i = e.length; n < i; n++) a[(t = e[n]).name] = t.value;
            return a;
        }
    }, t;
}();

"object" == typeof exports && exports && (exports.HTMLParser = HTMLParser), HTMLHint.addRule({
    id: "alt-require",
    description: "The alt attribute of an <img> element must be present and alt attribute of area[href] and input[type=image] must have a value.",
    init: function(e, t) {
        var a = this;
        e.addListener("tagstart", function(n) {
            var i, r = n.tagName.toLowerCase(), s = e.getMapAttrs(n.attrs), o = n.col + r.length + 1;
            "img" !== r || "alt" in s ? ("area" === r && "href" in s || "input" === r && "image" === s.type) && ("alt" in s && "" !== s.alt || (i = "area" === r ? "area[href]" : "input[type=image]", 
            t.warn("The alt attribute of " + i + " must have a value.", n.line, o, a, n.raw))) : t.warn("An alt attribute must be present on <img> elements.", n.line, o, a, n.raw);
        });
    }
}), HTMLHint.addRule({
    id: "attr-lowercase",
    description: "All attribute names must be in lowercase.",
    init: function(e, t, a) {
        var n = this, i = Array.isArray(a) ? a : [];
        e.addListener("tagstart", function(e) {
            for (var a, r = e.attrs, s = e.col + e.tagName.length + 1, o = 0, l = r.length; o < l; o++) {
                var d = (a = r[o]).name;
                -1 === i.indexOf(d) && d !== d.toLowerCase() && t.error("The attribute name of [ " + d + " ] must be in lowercase.", e.line, s + a.index, n, a.raw);
            }
        });
    }
}), HTMLHint.addRule({
    id: "attr-no-duplication",
    description: "Elements cannot have duplicate attributes.",
    init: function(e, t) {
        var a = this;
        e.addListener("tagstart", function(e) {
            for (var n, i, r = e.attrs, s = e.col + e.tagName.length + 1, o = {}, l = 0, d = r.length; l < d; l++) !0 === o[i = (n = r[l]).name] && t.error("Duplicate of attribute name [ " + n.name + " ] was found.", e.line, s + n.index, a, n.raw), 
            o[i] = !0;
        });
    }
}), HTMLHint.addRule({
    id: "attr-unsafe-chars",
    description: "Attribute values cannot contain unsafe chars.",
    init: function(e, t) {
        var a = this;
        e.addListener("tagstart", function(e) {
            for (var n, i, r = e.attrs, s = e.col + e.tagName.length + 1, o = /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/, l = 0, d = r.length; l < d; l++) if (n = r[l], 
            null !== (i = n.value.match(o))) {
                var u = escape(i[0]).replace(/%u/, "\\u").replace(/%/, "\\x");
                t.warn("The value of attribute [ " + n.name + " ] cannot contain an unsafe char [ " + u + " ].", e.line, s + n.index, a, n.raw);
            }
        });
    }
}), HTMLHint.addRule({
    id: "attr-value-double-quotes",
    description: "Attribute values must be in double quotes.",
    init: function(e, t) {
        var a = this;
        e.addListener("tagstart", function(e) {
            for (var n, i = e.attrs, r = e.col + e.tagName.length + 1, s = 0, o = i.length; s < o; s++) ("" !== (n = i[s]).value && '"' !== n.quote || "" === n.value && "'" === n.quote) && t.error("The value of attribute [ " + n.name + " ] must be in double quotes.", e.line, r + n.index, a, n.raw);
        });
    }
}), HTMLHint.addRule({
    id: "attr-value-not-empty",
    description: "All attributes must have values.",
    init: function(e, t) {
        var a = this;
        e.addListener("tagstart", function(e) {
            for (var n, i = e.attrs, r = e.col + e.tagName.length + 1, s = 0, o = i.length; s < o; s++) "" === (n = i[s]).quote && "" === n.value && t.warn("The attribute [ " + n.name + " ] must have a value.", e.line, r + n.index, a, n.raw);
        });
    }
}), HTMLHint.addRule({
    id: "csslint",
    description: "Scan css with csslint.",
    init: function(e, t, a) {
        var n = this;
        e.addListener("cdata", function(e) {
            if ("style" === e.tagName.toLowerCase()) {
                var i;
                if (i = "object" == typeof exports && require ? require("csslint").CSSLint.verify : CSSLint.verify, 
                void 0 !== a) {
                    var r = e.line - 1, s = e.col - 1;
                    try {
                        i(e.raw, a).messages.forEach(function(e) {
                            var a = e.line;
                            t["warning" === e.type ? "warn" : "error"]("[" + e.rule.id + "] " + e.message, r + a, (1 === a ? s : 0) + e.col, n, e.evidence);
                        });
                    } catch (e) {}
                }
            }
        });
    }
}), HTMLHint.addRule({
    id: "doctype-first",
    description: "Doctype must be declared first.",
    init: function(e, t) {
        var a = this, n = function(i) {
            "start" === i.type || "text" === i.type && /^\s*$/.test(i.raw) || (("comment" !== i.type && !1 === i.long || !1 === /^DOCTYPE\s+/i.test(i.content)) && t.error("Doctype must be declared first.", i.line, i.col, a, i.raw), 
            e.removeListener("all", n));
        };
        e.addListener("all", n);
    }
}), HTMLHint.addRule({
    id: "doctype-html5",
    description: 'Invalid doctype. Use: "<!DOCTYPE html>"',
    init: function(e, t) {
        function a(e) {
            !1 === e.long && "doctype html" !== e.content.toLowerCase() && t.warn('Invalid doctype. Use: "<!DOCTYPE html>"', e.line, e.col, i, e.raw);
        }
        function n() {
            e.removeListener("comment", a), e.removeListener("tagstart", n);
        }
        var i = this;
        e.addListener("all", a), e.addListener("tagstart", n);
    }
}), HTMLHint.addRule({
    id: "head-script-disabled",
    description: "The <script> tag cannot be used in a <head> tag.",
    init: function(e, t) {
        function a(a) {
            var n = e.getMapAttrs(a.attrs).type, o = a.tagName.toLowerCase();
            "head" === o && (s = !0), !0 !== s || "script" !== o || n && !0 !== r.test(n) || t.warn("The <script> tag cannot be used in a <head> tag.", a.line, a.col, i, a.raw);
        }
        function n(t) {
            "head" === t.tagName.toLowerCase() && (e.removeListener("tagstart", a), e.removeListener("tagend", n));
        }
        var i = this, r = /^(text\/javascript|application\/javascript)$/i, s = !1;
        e.addListener("tagstart", a), e.addListener("tagend", n);
    }
}), HTMLHint.addRule({
    id: "href-abs-or-rel",
    description: "An href attribute must be either absolute or relative.",
    init: function(e, t, a) {
        var n = this, i = "abs" === a ? "absolute" : "relative";
        e.addListener("tagstart", function(e) {
            for (var a, r = e.attrs, s = e.col + e.tagName.length + 1, o = 0, l = r.length; o < l; o++) if ("href" === (a = r[o]).name) {
                ("absolute" === i && !1 === /^\w+?:/.test(a.value) || "relative" === i && !0 === /^https?:\/\//.test(a.value)) && t.warn("The value of the href attribute [ " + a.value + " ] must be " + i + ".", e.line, s + a.index, n, a.raw);
                break;
            }
        });
    }
}), HTMLHint.addRule({
    id: "id-class-ad-disabled",
    description: "The id and class attributes cannot use the ad keyword, it will be blocked by adblock software.",
    init: function(e, t) {
        var a = this;
        e.addListener("tagstart", function(e) {
            for (var n, i, r = e.attrs, s = e.col + e.tagName.length + 1, o = 0, l = r.length; o < l; o++) i = (n = r[o]).name, 
            /^(id|class)$/i.test(i) && /(^|[-\_])ad([-\_]|$)/i.test(n.value) && t.warn("The value of attribute " + i + " cannot use the ad keyword.", e.line, s + n.index, a, n.raw);
        });
    }
}), HTMLHint.addRule({
    id: "id-class-value",
    description: "The id and class attribute values must meet the specified rules.",
    init: function(e, t, a) {
        var n, i = this, r = {
            underline: {
                regId: /^[a-z\d]+(_[a-z\d]+)*$/,
                message: "The id and class attribute values must be in lowercase and split by an underscore."
            },
            dash: {
                regId: /^[a-z\d]+(-[a-z\d]+)*$/,
                message: "The id and class attribute values must be in lowercase and split by a dash."
            },
            hump: {
                regId: /^[a-z][a-zA-Z\d]*([A-Z][a-zA-Z\d]*)*$/,
                message: "The id and class attribute values must meet the camelCase style."
            }
        };
        if ((n = "string" == typeof a ? r[a] : a) && n.regId) {
            var s = n.regId, o = n.message;
            e.addListener("tagstart", function(e) {
                for (var a, n = e.attrs, r = e.col + e.tagName.length + 1, l = 0, d = n.length; l < d; l++) if ("id" === (a = n[l]).name.toLowerCase() && !1 === s.test(a.value) && t.warn(o, e.line, r + a.index, i, a.raw), 
                "class" === a.name.toLowerCase()) for (var u, c = a.value.split(/\s+/g), f = 0, g = c.length; f < g; f++) (u = c[f]) && !1 === s.test(u) && t.warn(o, e.line, r + a.index, i, u);
            });
        }
    }
}), HTMLHint.addRule({
    id: "id-unique",
    description: "The value of id attributes must be unique.",
    init: function(e, t) {
        var a = this, n = {};
        e.addListener("tagstart", function(e) {
            for (var i, r, s = e.attrs, o = e.col + e.tagName.length + 1, l = 0, d = s.length; l < d; l++) if ("id" === (i = s[l]).name.toLowerCase()) {
                (r = i.value) && (void 0 === n[r] ? n[r] = 1 : n[r]++, n[r] > 1 && t.error("The id value [ " + r + " ] must be unique.", e.line, o + i.index, a, i.raw));
                break;
            }
        });
    }
}), HTMLHint.addRule({
    id: "inline-script-disabled",
    description: "Inline script cannot be used.",
    init: function(e, t) {
        var a = this;
        e.addListener("tagstart", function(e) {
            for (var n, i, r = e.attrs, s = e.col + e.tagName.length + 1, o = /^on(unload|message|submit|select|scroll|resize|mouseover|mouseout|mousemove|mouseleave|mouseenter|mousedown|load|keyup|keypress|keydown|focus|dblclick|click|change|blur|error)$/i, l = 0, d = r.length; l < d; l++) i = (n = r[l]).name.toLowerCase(), 
            !0 === o.test(i) ? t.warn("Inline script [ " + n.raw + " ] cannot be used.", e.line, s + n.index, a, n.raw) : "src" !== i && "href" !== i || /^\s*javascript:/i.test(n.value) && t.warn("Inline script [ " + n.raw + " ] cannot be used.", e.line, s + n.index, a, n.raw);
        });
    }
}), HTMLHint.addRule({
    id: "inline-style-disabled",
    description: "Inline style cannot be used.",
    init: function(e, t) {
        var a = this;
        e.addListener("tagstart", function(e) {
            for (var n, i = e.attrs, r = e.col + e.tagName.length + 1, s = 0, o = i.length; s < o; s++) "style" === (n = i[s]).name.toLowerCase() && t.warn("Inline style [ " + n.raw + " ] cannot be used.", e.line, r + n.index, a, n.raw);
        });
    }
}), HTMLHint.addRule({
    id: "jshint",
    description: "Scan script with jshint.",
    init: function(e, t, a) {
        var n = this;
        e.addListener("cdata", function(i) {
            if ("script" === i.tagName.toLowerCase()) {
                var r = e.getMapAttrs(i.attrs), s = r.type;
                if (void 0 !== r.src || s && !1 === /^(text\/javascript)$/i.test(s)) return;
                var o;
                if (o = "object" == typeof exports && require ? require("jshint").JSHINT : JSHINT, 
                void 0 !== a) {
                    var l = i.line - 1, d = i.col - 1, u = i.raw.replace(/\t/g, " ");
                    try {
                        !1 === o(u, a) && o.errors.forEach(function(e) {
                            var a = e.line;
                            t.warn(e.reason, l + a, (1 === a ? d : 0) + e.character, n, e.evidence);
                        });
                    } catch (e) {}
                }
            }
        });
    }
}), HTMLHint.addRule({
    id: "space-tab-mixed-disabled",
    description: "Do not mix tabs and spaces for indentation.",
    init: function(e, t, a) {
        var n = this, i = "nomix", r = null;
        if ("string" == typeof a) {
            var s = a.match(/^([a-z]+)(\d+)?/);
            i = s[1], r = s[2] && parseInt(s[2], 10);
        }
        e.addListener("text", function(a) {
            for (var s, o = a.raw, l = /(^|\r?\n)([ \t]+)/g; s = l.exec(o); ) {
                var d = e.fixPos(a, s.index + s[1].length);
                if (1 === d.col) {
                    var u = s[2];
                    "space" === i ? r ? !1 !== /^ +$/.test(u) && u.length % r == 0 || t.warn("Please use space for indentation and keep " + r + " length.", d.line, 1, n, a.raw) : !1 === /^ +$/.test(u) && t.warn("Please use space for indentation.", d.line, 1, n, a.raw) : "tab" === i && !1 === /^\t+$/.test(u) ? t.warn("Please use tab for indentation.", d.line, 1, n, a.raw) : !0 === / +\t|\t+ /.test(u) && t.warn("Do not mix tabs and spaces for indentation.", d.line, 1, n, a.raw);
                }
            }
        });
    }
}), HTMLHint.addRule({
    id: "spec-char-escape",
    description: "Special characters must be escaped.",
    init: function(e, t) {
        var a = this;
        e.addListener("text", function(n) {
            for (var i, r = n.raw, s = /[<>]/g; i = s.exec(r); ) {
                var o = e.fixPos(n, i.index);
                t.error("Special characters must be escaped : [ " + i[0] + " ].", o.line, o.col, a, n.raw);
            }
        });
    }
}), HTMLHint.addRule({
    id: "src-not-empty",
    description: "The src attribute of an img(script,link) must have a value.",
    init: function(e, t) {
        var a = this;
        e.addListener("tagstart", function(e) {
            for (var n, i = e.tagName, r = e.attrs, s = e.col + i.length + 1, o = 0, l = r.length; o < l; o++) n = r[o], 
            (!0 === /^(img|script|embed|bgsound|iframe)$/.test(i) && "src" === n.name || "link" === i && "href" === n.name || "object" === i && "data" === n.name) && "" === n.value && t.error("The attribute [ " + n.name + " ] of the tag [ " + i + " ] must have a value.", e.line, s + n.index, a, n.raw);
        });
    }
}), HTMLHint.addRule({
    id: "style-disabled",
    description: "<style> tags cannot be used.",
    init: function(e, t) {
        var a = this;
        e.addListener("tagstart", function(e) {
            "style" === e.tagName.toLowerCase() && t.warn("The <style> tag cannot be used.", e.line, e.col, a, e.raw);
        });
    }
}), HTMLHint.addRule({
    id: "tag-pair",
    description: "Tag must be paired.",
    init: function(e, t) {
        var a = this, n = [], i = e.makeMap("area,base,basefont,br,col,frame,hr,img,input,isindex,link,meta,param,embed,track,command,source,keygen,wbr");
        e.addListener("tagstart", function(e) {
            var t = e.tagName.toLowerCase();
            void 0 !== i[t] || e.close || n.push({
                tagName: t,
                line: e.line,
                raw: e.raw
            });
        }), e.addListener("tagend", function(e) {
            for (var i = e.tagName.toLowerCase(), r = n.length - 1; r >= 0 && n[r].tagName !== i; r--) ;
            if (r >= 0) {
                for (var s = [], o = n.length - 1; o > r; o--) s.push("</" + n[o].tagName + ">");
                if (s.length > 0) {
                    var l = n[n.length - 1];
                    t.error("Tag must be paired, missing: [ " + s.join("") + " ], start tag match failed [ " + l.raw + " ] on line " + l.line + ".", e.line, e.col, a, e.raw);
                }
                n.length = r;
            } else t.error("Tag must be paired, no start tag: [ " + e.raw + " ]", e.line, e.col, a, e.raw);
        }), e.addListener("end", function(e) {
            for (var i = [], r = n.length - 1; r >= 0; r--) i.push("</" + n[r].tagName + ">");
            if (i.length > 0) {
                var s = n[n.length - 1];
                t.error("Tag must be paired, missing: [ " + i.join("") + " ], open tag match failed [ " + s.raw + " ] on line " + s.line + ".", e.line, e.col, a, "");
            }
        });
    }
}), HTMLHint.addRule({
    id: "tag-self-close",
    description: "Empty tags must be self closed.",
    init: function(e, t) {
        var a = this, n = e.makeMap("area,base,basefont,br,col,frame,hr,img,input,isindex,link,meta,param,embed,track,command,source,keygen,wbr");
        e.addListener("tagstart", function(e) {
            var i = e.tagName.toLowerCase();
            void 0 !== n[i] && (e.close || t.warn("The empty tag : [ " + i + " ] must be self closed.", e.line, e.col, a, e.raw));
        });
    }
}), HTMLHint.addRule({
    id: "tagname-lowercase",
    description: "All html element names must be in lowercase.",
    init: function(e, t) {
        var a = this;
        e.addListener("tagstart,tagend", function(e) {
            var n = e.tagName;
            n !== n.toLowerCase() && t.error("The html element name of [ " + n + " ] must be in lowercase.", e.line, e.col, a, e.raw);
        });
    }
}), HTMLHint.addRule({
    id: "title-require",
    description: "<title> must be present in <head> tag.",
    init: function(e, t) {
        function a(e) {
            var t = e.tagName.toLowerCase();
            "head" === t ? r = !0 : "title" === t && r && (s = !0);
        }
        function n(r) {
            var o = r.tagName.toLowerCase();
            if (s && "title" === o) {
                var l = r.lastEvent;
                ("text" !== l.type || "text" === l.type && !0 === /^\s*$/.test(l.raw)) && t.error("<title></title> must not be empty.", r.line, r.col, i, r.raw);
            } else "head" === o && (!1 === s && t.error("<title> must be present in <head> tag.", r.line, r.col, i, r.raw), 
            e.removeListener("tagstart", a), e.removeListener("tagend", n));
        }
        var i = this, r = !1, s = !1;
        e.addListener("tagstart", a), e.addListener("tagend", n);
    }
});