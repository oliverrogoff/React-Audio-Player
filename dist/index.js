import { useCallback as e, useEffect as t, useMemo as n, useRef as r, useState as i } from "react";
import { Fragment as a, jsx as o, jsxs as s } from "react/jsx-runtime";
var c = {
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
};
function l({ playlist: l }) {
	let [f, p] = i(!1), [m, h] = i(!1), [g, _] = i(() => {
		let e = sessionStorage.getItem("currentSongId");
		if (e) {
			let t = l.find((t) => t.id === Number(e));
			if (t) return t;
		}
		return l[0] || null;
	}), [v, y] = i(0), [b, x] = i(1), [S, C] = i({}), [w, T] = i(!1), [E, D] = i(null), [O, k] = i(null), A = r(null), j = r(null), M = f ? "pause" : "play_arrow", [N, P] = i(0), F = n(() => N ? v / N * 100 : 0, [v, N]);
	function I(e) {
		let t = parseFloat(e.target.value);
		x(t), A.current && (A.current.volume = t);
	}
	function L(e, t = !1) {
		A.current && (A.current.pause(), y(0)), t && h(!0), _(e);
	}
	function R(e) {
		A.current && (A.current.currentTime = e), y(e);
	}
	let z = e((e) => {
		if (!A.current || !j.current) return;
		let t = j.current.getBoundingClientRect(), n = e.clientX - t.left, r = Math.min(Math.max(n / t.width, 0), 1) * A.current.duration;
		R(r), k(n), D(String(r));
	}, []), B = e((e) => {
		if (!A.current?.duration || !j.current) return;
		let t = j.current.getBoundingClientRect(), n = (e.clientX - t.left) / t.width, r = A.current.duration * n;
		k(e.clientX - t.left), D(d(r));
	}, []);
	function V() {
		A.current?.play();
	}
	function H() {
		A.current?.pause();
	}
	let U = e(() => {
		f ? H() : V();
	}, [f]);
	function W() {
		T(!0);
	}
	function G(e) {
		w ? z(e) : B(e);
	}
	function K(e) {
		T(!0), z(e.touches[0]);
	}
	function q() {
		D(null), k(null);
	}
	let J = e((e = !1) => {
		if (g && l.length > 0) {
			let t = l.findIndex((e) => e.id === g.id);
			t >= 0 && (t = (t + 1) % l.length, L(l[t], f || e));
		}
	}, [
		g,
		f,
		l
	]);
	function Y() {
		if (g && l.length > 0) {
			let e = l.findIndex((e) => e.id === g.id);
			e >= 0 && (e = (e - 1 + l.length) % l.length, L(l[e], f));
		}
	}
	return t(() => {
		let e = A.current;
		if (!e || !g) return;
		g.id && sessionStorage.setItem("currentSongId", String(g.id));
		let t = () => J(!0), n = () => {
			let t = e.currentTime;
			y(t);
		}, r = () => {
			e.src.includes(g.src) && m && e.paused && (e.play().catch((e) => {
				console.warn("Playback failed:", e);
			}), h(!1));
		};
		return e.addEventListener("loadeddata", r), e.addEventListener("timeupdate", n), e.addEventListener("ended", t), () => {
			e.removeEventListener("loadeddata", r), e.removeEventListener("timeupdate", n), e.removeEventListener("ended", t);
		};
	}, [
		g,
		J,
		m
	]), t(() => {
		l.forEach((e) => {
			e?.src && u(e.src).then((t) => {
				C((n) => ({
					...n,
					[e.id]: t
				}));
			});
		});
	}, [l]), t(() => {
		function e(e) {
			w ? z(e) : B(e);
		}
		function t(e) {
			w && z(e.touches[0]);
		}
		function n() {
			w && T(!1);
		}
		function r() {
			w && T(!1);
		}
		return w ? (window.addEventListener("mousemove", e), window.addEventListener("mouseup", n), window.addEventListener("touchmove", t), window.addEventListener("touchend", r)) : (window.removeEventListener("mousemove", e), window.removeEventListener("mouseup", n), window.removeEventListener("touchmove", t), window.removeEventListener("touchend", r)), () => {
			window.removeEventListener("mousemove", e), window.removeEventListener("mouseup", n), window.removeEventListener("touchmove", t), window.removeEventListener("touchend", r);
		};
	}, [
		w,
		z,
		B
	]), t(() => {
		A.current && (A.current.volume = b);
	}, [b]), t(() => {
		let e = (e) => {
			document.activeElement && e.code === "Space" && !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName) && (e.preventDefault(), U());
		};
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [f, U]), t(() => {
		let e = A.current;
		if (!e || !g) return;
		let t = () => {
			P(e.duration);
		};
		return e.addEventListener("loadedmetadata", t), () => {
			e.removeEventListener("loadedmetadata", t);
		};
	}, [
		g,
		J,
		m
	]), t(() => {
		let e = A.current;
		if (!e) return;
		let t = () => {
			p(!e.paused);
		};
		return e.addEventListener("play", t), e.addEventListener("pause", t), e.addEventListener("ended", t), () => {
			e.removeEventListener("play", t), e.removeEventListener("pause", t), e.removeEventListener("ended", t);
		};
	}, []), /* @__PURE__ */ o(a, { children: /* @__PURE__ */ s("div", {
		className: c.wrapper,
		children: [
			/* @__PURE__ */ s("div", {
				className: c.current,
				children: [/* @__PURE__ */ o("div", {
					className: c.imageWrapper,
					children: /* @__PURE__ */ o("div", {
						className: c.musicImage,
						children: g?.cover && /* @__PURE__ */ o("img", {
							src: g.cover,
							alt: "Album cover art"
						})
					})
				}), /* @__PURE__ */ s("div", {
					className: c.currentControls,
					children: [
						/* @__PURE__ */ s("div", {
							className: c.musicTitles,
							children: [/* @__PURE__ */ o("div", {
								className: c.songName,
								children: g?.title || ""
							}), /* @__PURE__ */ o("div", {
								className: c.artistName,
								children: g?.artist || ""
							})]
						}),
						/* @__PURE__ */ o("div", { className: c.spacer }),
						/* @__PURE__ */ s("div", {
							className: c.time,
							children: [/* @__PURE__ */ o("span", {
								className: c.currentTime,
								children: d(v)
							}), /* @__PURE__ */ o("span", {
								className: c.finalTime,
								children: g ? S[g.id] : ""
							})]
						}),
						/* @__PURE__ */ s("div", {
							className: c.progressDetails,
							ref: j,
							onMouseDown: W,
							onTouchStart: K,
							onMouseMove: G,
							onMouseLeave: q,
							onClick: (e) => {
								let t = A.current;
								if (!t) return;
								let n = e.currentTarget.getBoundingClientRect();
								R((e.clientX - n.left) / n.width * t.duration);
							},
							children: [/* @__PURE__ */ o("div", {
								className: c.progressBar,
								style: { width: F + "%" },
								children: /* @__PURE__ */ o("span", {})
							}), E !== null && (w || O !== null) && /* @__PURE__ */ o("div", {
								className: c.progressTooltip,
								style: { left: O ?? 0 },
								children: E
							})]
						}),
						/* @__PURE__ */ s("div", {
							className: c.controlBtn,
							children: [/* @__PURE__ */ s("div", {
								className: c.centeredButtons,
								children: [
									/* @__PURE__ */ o("span", {
										className: "material-icons-round",
										onClick: Y,
										children: "skip_previous"
									}),
									/* @__PURE__ */ o("div", {
										className: c.playPause,
										children: /* @__PURE__ */ o("span", {
											className: "material-icons-round",
											onClick: U,
											children: M
										})
									}),
									/* @__PURE__ */ o("span", {
										className: "material-icons-round",
										onClick: () => J(),
										children: "skip_next"
									})
								]
							}), /* @__PURE__ */ s("div", {
								className: c.volumeContainer,
								children: [
									/* @__PURE__ */ o("span", {
										className: "material-icons-round",
										id: "volume",
										children: "volume_up"
									}),
									/* @__PURE__ */ o("div", { className: c.hoverArea }),
									/* @__PURE__ */ o("input", {
										type: "range",
										className: c.volumeSlider,
										id: "volumeSlider",
										min: "0",
										max: "1",
										step: "0.01",
										value: b,
										onChange: I
									})
								]
							})]
						})
					]
				})]
			}),
			/* @__PURE__ */ o("div", {
				className: c.playlistScroll,
				children: /* @__PURE__ */ o("ul", { children: l.map((e) => /* @__PURE__ */ s("li", {
					className: c.playlistScrollItem,
					onClick: () => {
						g && (e.id === g.id ? U() : L(e, !0));
					},
					children: [
						/* @__PURE__ */ s("div", {
							className: c.miniCover,
							children: [
								e.cover && /* @__PURE__ */ o("img", {
									src: e.cover,
									alt: `${e.title} cover`
								}),
								/* @__PURE__ */ o("div", { className: c.overlay }),
								/* @__PURE__ */ o("span", {
									className: "material-icons-round " + c.playOverlay,
									children: "play_arrow"
								})
							]
						}),
						/* @__PURE__ */ s("div", {
							className: c.playlistTextContainer,
							children: [/* @__PURE__ */ o("span", {
								className: c.song,
								children: e.title
							}), /* @__PURE__ */ o("span", {
								className: c.artist,
								children: e.artist
							})]
						}),
						/* @__PURE__ */ o("div", { className: c.spacer }),
						/* @__PURE__ */ o("span", {
							className: c.playlistSongLength,
							children: S[e.id] || "loading..."
						})
					]
				}, e.id)) })
			}),
			/* @__PURE__ */ o("audio", {
				ref: A,
				className: c.mainSong,
				src: g?.src,
				preload: "auto"
			})
		]
	}) });
}
function u(e) {
	return new Promise((t) => {
		let n = new Audio(e);
		n.addEventListener("loadedmetadata", () => {
			let e = n.duration;
			t(d(e));
		});
	});
}
function d(e) {
	let t = String(Math.floor(e / 60)), n = String(Math.floor(e % 60));
	return n.length < 2 && (n = "0" + n), t + ":" + n;
}
export { l as AudioPlayer };
