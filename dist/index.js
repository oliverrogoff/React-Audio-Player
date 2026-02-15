import { useCallback as e, useEffect as t, useMemo as n, useRef as r, useState as i } from "react";
var a = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports), o = /* @__PURE__ */ ((e) => typeof require < "u" ? require : typeof Proxy < "u" ? new Proxy(e, { get: (e, t) => (typeof require < "u" ? require : e)[t] }) : e)(function(e) {
	if (typeof require < "u") return require.apply(this, arguments);
	throw Error("Calling `require` for \"" + e + "\" in an environment that doesn't expose the `require` function. See https://rolldown.rs/in-depth/bundling-cjs#require-external-modules for more details.");
}), s = {
	wrapper: "_wrapper_ogu03_4",
	spacer: "_spacer_ogu03_24",
	current: "_current_ogu03_28",
	currentControls: "_currentControls_ogu03_36",
	controlBtn: "_controlBtn_ogu03_44",
	"material-icons": "_material-icons_ogu03_45",
	"material-icons-round": "_material-icons-round_ogu03_46",
	musicImage: "_musicImage_ogu03_50",
	musicTitles: "_musicTitles_ogu03_62",
	songName: "_songName_ogu03_62",
	artistName: "_artistName_ogu03_68",
	progressDetails: "_progressDetails_ogu03_75",
	progressBar: "_progressBar_ogu03_97",
	progressTooltip: "_progressTooltip_ogu03_121",
	time: "_time_ogu03_135",
	centeredButtons: "_centeredButtons_ogu03_152",
	playPause: "_playPause_ogu03_170",
	volumeContainer: "_volumeContainer_ogu03_174",
	volumeSlider: "_volumeSlider_ogu03_187",
	hoverArea: "_hoverArea_ogu03_202",
	playlistScroll: "_playlistScroll_ogu03_222",
	playlistScrollItem: "_playlistScrollItem_ogu03_238",
	miniCover: "_miniCover_ogu03_245",
	overlay: "_overlay_ogu03_256",
	playOverlay: "_playOverlay_ogu03_260",
	playlistTextContainer: "_playlistTextContainer_ogu03_286",
	song: "_song_ogu03_62",
	artist: "_artist_ogu03_68",
	playlistSongLength: "_playlistSongLength_ogu03_306",
	mainSong: "_mainSong_ogu03_315"
}, c = /* @__PURE__ */ a(((e) => {
	var t = Symbol.for("react.transitional.element"), n = Symbol.for("react.fragment");
	function r(e, n, r) {
		var i = null;
		if (r !== void 0 && (i = "" + r), n.key !== void 0 && (i = "" + n.key), "key" in n) for (var a in r = {}, n) a !== "key" && (r[a] = n[a]);
		else r = n;
		return n = r.ref, {
			$$typeof: t,
			type: e,
			key: i,
			ref: n === void 0 ? null : n,
			props: r
		};
	}
	e.Fragment = n, e.jsx = r, e.jsxs = r;
})), l = /* @__PURE__ */ a(((e) => {
	process.env.NODE_ENV !== "production" && (function() {
		function t(e) {
			if (e == null) return null;
			if (typeof e == "function") return e.$$typeof === k ? null : e.displayName || e.name || null;
			if (typeof e == "string") return e;
			switch (e) {
				case v: return "Fragment";
				case b: return "Profiler";
				case y: return "StrictMode";
				case w: return "Suspense";
				case T: return "SuspenseList";
				case O: return "Activity";
			}
			if (typeof e == "object") switch (typeof e.tag == "number" && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), e.$$typeof) {
				case _: return "Portal";
				case S: return e.displayName || "Context";
				case x: return (e._context.displayName || "Context") + ".Consumer";
				case C:
					var n = e.render;
					return e = e.displayName, e ||= (e = n.displayName || n.name || "", e === "" ? "ForwardRef" : "ForwardRef(" + e + ")"), e;
				case E: return n = e.displayName || null, n === null ? t(e.type) || "Memo" : n;
				case D:
					n = e._payload, e = e._init;
					try {
						return t(e(n));
					} catch {}
			}
			return null;
		}
		function n(e) {
			return "" + e;
		}
		function r(e) {
			try {
				n(e);
				var t = !1;
			} catch {
				t = !0;
			}
			if (t) {
				t = console;
				var r = t.error, i = typeof Symbol == "function" && Symbol.toStringTag && e[Symbol.toStringTag] || e.constructor.name || "Object";
				return r.call(t, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", i), n(e);
			}
		}
		function i(e) {
			if (e === v) return "<>";
			if (typeof e == "object" && e && e.$$typeof === D) return "<...>";
			try {
				var n = t(e);
				return n ? "<" + n + ">" : "<...>";
			} catch {
				return "<...>";
			}
		}
		function a() {
			var e = A.A;
			return e === null ? null : e.getOwner();
		}
		function s() {
			return Error("react-stack-top-frame");
		}
		function c(e) {
			if (j.call(e, "key")) {
				var t = Object.getOwnPropertyDescriptor(e, "key").get;
				if (t && t.isReactWarning) return !1;
			}
			return e.key !== void 0;
		}
		function l(e, t) {
			function n() {
				P || (P = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", t));
			}
			n.isReactWarning = !0, Object.defineProperty(e, "key", {
				get: n,
				configurable: !0
			});
		}
		function u() {
			var e = t(this.type);
			return F[e] || (F[e] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release.")), e = this.props.ref, e === void 0 ? null : e;
		}
		function d(e, t, n, r, i, a) {
			var o = n.ref;
			return e = {
				$$typeof: g,
				type: e,
				key: t,
				props: n,
				_owner: r
			}, (o === void 0 ? null : o) === null ? Object.defineProperty(e, "ref", {
				enumerable: !1,
				value: null
			}) : Object.defineProperty(e, "ref", {
				enumerable: !1,
				get: u
			}), e._store = {}, Object.defineProperty(e._store, "validated", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: 0
			}), Object.defineProperty(e, "_debugInfo", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: null
			}), Object.defineProperty(e, "_debugStack", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: i
			}), Object.defineProperty(e, "_debugTask", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: a
			}), Object.freeze && (Object.freeze(e.props), Object.freeze(e)), e;
		}
		function f(e, n, i, o, s, u) {
			var f = n.children;
			if (f !== void 0) if (o) if (M(f)) {
				for (o = 0; o < f.length; o++) p(f[o]);
				Object.freeze && Object.freeze(f);
			} else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
			else p(f);
			if (j.call(n, "key")) {
				f = t(e);
				var m = Object.keys(n).filter(function(e) {
					return e !== "key";
				});
				o = 0 < m.length ? "{key: someKey, " + m.join(": ..., ") + ": ...}" : "{key: someKey}", R[f + o] || (m = 0 < m.length ? "{" + m.join(": ..., ") + ": ...}" : "{}", console.error("A props object containing a \"key\" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />", o, f, m, f), R[f + o] = !0);
			}
			if (f = null, i !== void 0 && (r(i), f = "" + i), c(n) && (r(n.key), f = "" + n.key), "key" in n) for (var h in i = {}, n) h !== "key" && (i[h] = n[h]);
			else i = n;
			return f && l(i, typeof e == "function" ? e.displayName || e.name || "Unknown" : e), d(e, f, i, a(), s, u);
		}
		function p(e) {
			m(e) ? e._store && (e._store.validated = 1) : typeof e == "object" && e && e.$$typeof === D && (e._payload.status === "fulfilled" ? m(e._payload.value) && e._payload.value._store && (e._payload.value._store.validated = 1) : e._store && (e._store.validated = 1));
		}
		function m(e) {
			return typeof e == "object" && !!e && e.$$typeof === g;
		}
		var h = o("react"), g = Symbol.for("react.transitional.element"), _ = Symbol.for("react.portal"), v = Symbol.for("react.fragment"), y = Symbol.for("react.strict_mode"), b = Symbol.for("react.profiler"), x = Symbol.for("react.consumer"), S = Symbol.for("react.context"), C = Symbol.for("react.forward_ref"), w = Symbol.for("react.suspense"), T = Symbol.for("react.suspense_list"), E = Symbol.for("react.memo"), D = Symbol.for("react.lazy"), O = Symbol.for("react.activity"), k = Symbol.for("react.client.reference"), A = h.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, j = Object.prototype.hasOwnProperty, M = Array.isArray, N = console.createTask ? console.createTask : function() {
			return null;
		};
		h = { react_stack_bottom_frame: function(e) {
			return e();
		} };
		var P, F = {}, I = h.react_stack_bottom_frame.bind(h, s)(), L = N(i(s)), R = {};
		e.Fragment = v, e.jsx = function(e, t, n) {
			var r = 1e4 > A.recentlyCreatedOwnerStacks++;
			return f(e, t, n, !1, r ? Error("react-stack-top-frame") : I, r ? N(i(e)) : L);
		}, e.jsxs = function(e, t, n) {
			var r = 1e4 > A.recentlyCreatedOwnerStacks++;
			return f(e, t, n, !0, r ? Error("react-stack-top-frame") : I, r ? N(i(e)) : L);
		};
	})();
})), u = (/* @__PURE__ */ a(((e, t) => {
	process.env.NODE_ENV === "production" ? t.exports = c() : t.exports = l();
})))();
function d({ playlist: a }) {
	let [o, c] = i(!1), [l, d] = i(!1), [m, h] = i(() => {
		let e = sessionStorage.getItem("currentSongId");
		if (e) {
			let t = a.find((t) => t.id === Number(e));
			if (t) return t;
		}
		return a[0] || null;
	}), [g, _] = i(0), [v, y] = i(1), [b, x] = i({}), [S, C] = i(!1), [w, T] = i(null), [E, D] = i(null), O = r(null), k = r(null), A = o ? "pause" : "play_arrow", [j, M] = i(0), N = n(() => j ? g / j * 100 : 0, [g, j]);
	function P(e) {
		let t = parseFloat(e.target.value);
		y(t), O.current && (O.current.volume = t);
	}
	function F(e, t = !1) {
		O.current && (O.current.pause(), _(0)), t && d(!0), h(e);
	}
	function I(e) {
		O.current && (O.current.currentTime = e), _(e);
	}
	let L = e((e) => {
		if (!O.current || !k.current) return;
		let t = k.current.getBoundingClientRect(), n = e.clientX - t.left, r = Math.min(Math.max(n / t.width, 0), 1) * O.current.duration;
		I(r), D(n), T(String(r));
	}, []), R = e((e) => {
		if (!O.current?.duration || !k.current) return;
		let t = k.current.getBoundingClientRect(), n = (e.clientX - t.left) / t.width, r = O.current.duration * n;
		D(e.clientX - t.left), T(p(r));
	}, []);
	function z() {
		O.current?.play();
	}
	function B() {
		O.current?.pause();
	}
	let V = e(() => {
		o ? B() : z();
	}, [o]);
	function H() {
		C(!0);
	}
	function U(e) {
		S ? L(e) : R(e);
	}
	function W(e) {
		C(!0), L(e.touches[0]);
	}
	function G() {
		T(null), D(null);
	}
	let K = e((e = !1) => {
		if (m && a.length > 0) {
			let t = a.findIndex((e) => e.id === m.id);
			t >= 0 && (t = (t + 1) % a.length, F(a[t], o || e));
		}
	}, [
		m,
		o,
		a
	]);
	function q() {
		if (m && a.length > 0) {
			let e = a.findIndex((e) => e.id === m.id);
			e >= 0 && (e = (e - 1 + a.length) % a.length, F(a[e], o));
		}
	}
	return t(() => {
		let e = O.current;
		if (!e || !m) return;
		m.id && sessionStorage.setItem("currentSongId", String(m.id));
		let t = () => K(!0), n = () => {
			let t = e.currentTime;
			_(t);
		}, r = () => {
			e.src.includes(m.src) && l && e.paused && (e.play().catch((e) => {
				console.warn("Playback failed:", e);
			}), d(!1));
		};
		return e.addEventListener("loadeddata", r), e.addEventListener("timeupdate", n), e.addEventListener("ended", t), () => {
			e.removeEventListener("loadeddata", r), e.removeEventListener("timeupdate", n), e.removeEventListener("ended", t);
		};
	}, [
		m,
		K,
		l
	]), t(() => {
		a.forEach((e) => {
			e?.src && f(e.src).then((t) => {
				x((n) => ({
					...n,
					[e.id]: t
				}));
			});
		});
	}, [a]), t(() => {
		function e(e) {
			S ? L(e) : R(e);
		}
		function t(e) {
			S && L(e.touches[0]);
		}
		function n() {
			S && C(!1);
		}
		function r() {
			S && C(!1);
		}
		return S ? (window.addEventListener("mousemove", e), window.addEventListener("mouseup", n), window.addEventListener("touchmove", t), window.addEventListener("touchend", r)) : (window.removeEventListener("mousemove", e), window.removeEventListener("mouseup", n), window.removeEventListener("touchmove", t), window.removeEventListener("touchend", r)), () => {
			window.removeEventListener("mousemove", e), window.removeEventListener("mouseup", n), window.removeEventListener("touchmove", t), window.removeEventListener("touchend", r);
		};
	}, [
		S,
		L,
		R
	]), t(() => {
		O.current && (O.current.volume = v);
	}, [v]), t(() => {
		let e = (e) => {
			document.activeElement && e.code === "Space" && !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName) && (e.preventDefault(), V());
		};
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [o, V]), t(() => {
		let e = O.current;
		if (!e || !m) return;
		let t = () => {
			M(e.duration);
		};
		return e.addEventListener("loadedmetadata", t), () => {
			e.removeEventListener("loadedmetadata", t);
		};
	}, [
		m,
		K,
		l
	]), t(() => {
		let e = O.current;
		if (!e) return;
		let t = () => {
			c(!e.paused);
		};
		return e.addEventListener("play", t), e.addEventListener("pause", t), e.addEventListener("ended", t), () => {
			e.removeEventListener("play", t), e.removeEventListener("pause", t), e.removeEventListener("ended", t);
		};
	}, []), /* @__PURE__ */ (0, u.jsx)(u.Fragment, { children: /* @__PURE__ */ (0, u.jsxs)("div", {
		className: s.wrapper,
		children: [
			/* @__PURE__ */ (0, u.jsxs)("div", {
				className: s.current,
				children: [/* @__PURE__ */ (0, u.jsx)("div", {
					className: s.imageWrapper,
					children: /* @__PURE__ */ (0, u.jsx)("div", {
						className: s.musicImage,
						children: m?.cover && /* @__PURE__ */ (0, u.jsx)("img", {
							src: m.cover,
							alt: "Album cover art"
						})
					})
				}), /* @__PURE__ */ (0, u.jsxs)("div", {
					className: s.currentControls,
					children: [
						/* @__PURE__ */ (0, u.jsxs)("div", {
							className: s.musicTitles,
							children: [/* @__PURE__ */ (0, u.jsx)("div", {
								className: s.songName,
								children: m?.title || ""
							}), /* @__PURE__ */ (0, u.jsx)("div", {
								className: s.artistName,
								children: m?.artist || ""
							})]
						}),
						/* @__PURE__ */ (0, u.jsx)("div", { className: s.spacer }),
						/* @__PURE__ */ (0, u.jsxs)("div", {
							className: s.time,
							children: [/* @__PURE__ */ (0, u.jsx)("span", {
								className: s.currentTime,
								children: p(g)
							}), /* @__PURE__ */ (0, u.jsx)("span", {
								className: s.finalTime,
								children: m ? b[m.id] : ""
							})]
						}),
						/* @__PURE__ */ (0, u.jsxs)("div", {
							className: s.progressDetails,
							ref: k,
							onMouseDown: H,
							onTouchStart: W,
							onMouseMove: U,
							onMouseLeave: G,
							onClick: (e) => {
								let t = O.current;
								if (!t) return;
								let n = e.currentTarget.getBoundingClientRect();
								I((e.clientX - n.left) / n.width * t.duration);
							},
							children: [/* @__PURE__ */ (0, u.jsx)("div", {
								className: s.progressBar,
								style: { width: N + "%" },
								children: /* @__PURE__ */ (0, u.jsx)("span", {})
							}), w !== null && (S || E !== null) && /* @__PURE__ */ (0, u.jsx)("div", {
								className: s.progressTooltip,
								style: { left: E ?? 0 },
								children: w
							})]
						}),
						/* @__PURE__ */ (0, u.jsxs)("div", {
							className: s.controlBtn,
							children: [/* @__PURE__ */ (0, u.jsxs)("div", {
								className: s.centeredButtons,
								children: [
									/* @__PURE__ */ (0, u.jsx)("span", {
										className: "material-icons-round",
										onClick: q,
										children: "skip_previous"
									}),
									/* @__PURE__ */ (0, u.jsx)("div", {
										className: s.playPause,
										children: /* @__PURE__ */ (0, u.jsx)("span", {
											className: "material-icons-round",
											onClick: V,
											children: A
										})
									}),
									/* @__PURE__ */ (0, u.jsx)("span", {
										className: "material-icons-round",
										onClick: () => K(),
										children: "skip_next"
									})
								]
							}), /* @__PURE__ */ (0, u.jsxs)("div", {
								className: s.volumeContainer,
								children: [
									/* @__PURE__ */ (0, u.jsx)("span", {
										className: "material-icons-round",
										id: "volume",
										children: "volume_up"
									}),
									/* @__PURE__ */ (0, u.jsx)("div", { className: s.hoverArea }),
									/* @__PURE__ */ (0, u.jsx)("input", {
										type: "range",
										className: s.volumeSlider,
										id: "volumeSlider",
										min: "0",
										max: "1",
										step: "0.01",
										value: v,
										onChange: P
									})
								]
							})]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, u.jsx)("div", {
				className: s.playlistScroll,
				children: /* @__PURE__ */ (0, u.jsx)("ul", { children: a.map((e) => /* @__PURE__ */ (0, u.jsxs)("li", {
					className: s.playlistScrollItem,
					onClick: () => {
						m && (e.id === m.id ? V() : F(e, !0));
					},
					children: [
						/* @__PURE__ */ (0, u.jsxs)("div", {
							className: s.miniCover,
							children: [
								e.cover && /* @__PURE__ */ (0, u.jsx)("img", {
									src: e.cover,
									alt: `${e.title} cover`
								}),
								/* @__PURE__ */ (0, u.jsx)("div", { className: s.overlay }),
								/* @__PURE__ */ (0, u.jsx)("span", {
									className: "material-icons-round " + s.playOverlay,
									children: "play_arrow"
								})
							]
						}),
						/* @__PURE__ */ (0, u.jsxs)("div", {
							className: s.playlistTextContainer,
							children: [/* @__PURE__ */ (0, u.jsx)("span", {
								className: s.song,
								children: e.title
							}), /* @__PURE__ */ (0, u.jsx)("span", {
								className: s.artist,
								children: e.artist
							})]
						}),
						/* @__PURE__ */ (0, u.jsx)("div", { className: s.spacer }),
						/* @__PURE__ */ (0, u.jsx)("span", {
							className: s.playlistSongLength,
							children: b[e.id] || "loading..."
						})
					]
				}, e.id)) })
			}),
			/* @__PURE__ */ (0, u.jsx)("audio", {
				ref: O,
				className: s.mainSong,
				src: m?.src,
				preload: "auto"
			})
		]
	}) });
}
function f(e) {
	return new Promise((t) => {
		let n = new Audio(e);
		n.addEventListener("loadedmetadata", () => {
			let e = n.duration;
			t(p(e));
		});
	});
}
function p(e) {
	let t = String(Math.floor(e / 60)), n = String(Math.floor(e % 60));
	return n.length < 2 && (n = "0" + n), t + ":" + n;
}
export { d as AudioPlayer };
