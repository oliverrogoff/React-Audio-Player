import { jsx as r, Fragment as oe, jsxs as u } from "react/jsx-runtime";
import { useState as h, useRef as G, useCallback as d, useEffect as p } from "react";
const ie = "_wrapper_1diy9_4", ae = "_spacer_1diy9_24", se = "_current_1diy9_28", ce = "_currentControls_1diy9_36", le = "_controlBtn_1diy9_44", de = "_iconButton_1diy9_47", ue = "_musicImage_1diy9_51", me = "_musicTitles_1diy9_63", ve = "_songName_1diy9_63", he = "_artistName_1diy9_69", pe = "_progressDetails_1diy9_76", _e = "_progressBar_1diy9_98", ye = "_progressTooltip_1diy9_122", ge = "_time_1diy9_136", fe = "_centeredButtons_1diy9_153", Ne = "_playPauseButton_1diy9_180", Se = "_volumeContainer_1diy9_184", we = "_volumeSlider_1diy9_197", Le = "_hoverArea_1diy9_212", Ee = "_playlistScroll_1diy9_232", Ce = "_playlistScrollItem_1diy9_252", Te = "_miniCover_1diy9_263", Be = "_overlay_1diy9_274", be = "_playOverlay_1diy9_278", Ie = "_playlistTextContainer_1diy9_305", Pe = "_song_1diy9_63", Me = "_artist_1diy9_69", ke = "_playlistSongLength_1diy9_325", xe = "_mainSong_1diy9_334", t = {
  wrapper: ie,
  spacer: ae,
  current: se,
  currentControls: ce,
  controlBtn: le,
  iconButton: de,
  musicImage: ue,
  musicTitles: me,
  songName: ve,
  artistName: he,
  progressDetails: pe,
  progressBar: _e,
  progressTooltip: ye,
  time: ge,
  centeredButtons: fe,
  playPauseButton: Ne,
  volumeContainer: Se,
  volumeSlider: we,
  hoverArea: Le,
  playlistScroll: Ee,
  playlistScrollItem: Ce,
  miniCover: Te,
  overlay: Be,
  playOverlay: be,
  playlistTextContainer: Ie,
  song: Pe,
  artist: Me,
  playlistSongLength: ke,
  mainSong: xe
};
function $e({ playlist: o }) {
  const [s, c] = h(!1), [_, y] = h(!1), [i, L] = h(null), [R, E] = h(0), [P, J] = h(1), [F, H] = h({}), [m, C] = h(!1), [U, M] = h(null), [V, k] = h(null), [j, x] = h(0), a = G(null), g = G(null), Q = s ? "pause" : "play_arrow", Y = j ? R / j * 100 : 0;
  function Z(e) {
    const n = parseFloat(e.target.value);
    J(n), a.current && (a.current.volume = n);
  }
  const f = d((e, n = !1) => {
    a.current && (a.current.pause(), E(0), x(0)), n && y(!0), L(e);
  }, []), D = d((e) => {
    a.current && (a.current.currentTime = e), E(e);
  }, []), N = d((e) => {
    if (!a.current || !g.current || !Number.isFinite(a.current.duration) || a.current.duration <= 0) return;
    const n = g.current.getBoundingClientRect(), l = e.clientX - n.left, v = Math.min(Math.max(l / n.width, 0), 1), S = v * a.current.duration;
    D(S), k(v * n.width), M(w(S));
  }, [D]), K = d((e) => {
    if (!a.current?.duration || !g.current) return;
    const n = g.current.getBoundingClientRect(), l = Math.min(Math.max((e.clientX - n.left) / n.width, 0), 1), v = a.current.duration * l;
    k(l * n.width), M(w(v));
  }, []);
  function ee() {
    C(!0);
  }
  const A = d(() => {
    m && C(!1);
  }, [m]), T = d((e) => {
    m ? N(e) : K(e);
  }, [K, N, m]);
  function ne(e) {
    C(!0), N(e.touches[0]);
  }
  const X = d((e) => {
    m && N(e.touches[0]);
  }, [N, m]), $ = d(() => {
    m && C(!1);
  }, [m]);
  function te() {
    M(null), k(null);
  }
  const W = d(() => {
    a.current?.play().catch((e) => {
      console.warn("Playback failed:", e);
    });
  }, []), q = d(() => {
    a.current?.pause();
  }, []), B = d(() => {
    s ? q() : W();
  }, [s, q, W]), b = d((e = !1) => {
    if (i && o.length > 0) {
      let n = o.findIndex((l) => l.id === i.id);
      n >= 0 && (n = (n + 1) % o.length, f(o[n], s || e));
    }
  }, [i, f, s, o]), re = d(() => {
    if (i && o.length > 0) {
      let e = o.findIndex((n) => n.id === i.id);
      e >= 0 && (e = (e - 1 + o.length) % o.length, f(o[e], s));
    }
  }, [i, f, s, o]);
  return p(() => {
    const e = a.current;
    if (!e || !i) return;
    sessionStorage.setItem("currentSongId", String(i.id));
    const n = () => b(!0), l = () => b(!0), v = () => E(e.currentTime), S = () => {
      x(e.duration), H((O) => ({
        ...O,
        [I(i.id)]: w(e.duration)
      }));
    }, z = () => {
      e.src.includes(i.src) && (_ && e.paused && e.play().catch((O) => {
        console.warn("Playback failed:", O);
      }), y(!1));
    };
    return e.addEventListener("loadeddata", z), e.addEventListener("loadedmetadata", S), e.addEventListener("timeupdate", v), e.addEventListener("ended", n), e.addEventListener("error", l), () => {
      e.removeEventListener("loadeddata", z), e.removeEventListener("loadedmetadata", S), e.removeEventListener("timeupdate", v), e.removeEventListener("ended", n), e.removeEventListener("error", l);
    };
  }, [i, b, o, _]), p(() => {
    if (typeof window > "u") return;
    if (!o.length) {
      a.current?.pause(), sessionStorage.removeItem("currentSongId"), L(null), E(0), x(0), c(!1);
      return;
    }
    o.forEach((n) => {
      n?.src && De(n.src).then((l) => {
        H((v) => ({
          ...v,
          [I(n.id)]: l
        }));
      });
    });
    const e = sessionStorage.getItem("currentSongId");
    if (e) {
      const n = o.find((l) => String(l.id) === e);
      if (n) {
        L(n);
        return;
      }
    }
    L(o[0]);
  }, [o]), p(() => {
    if (m)
      return window.addEventListener("mousemove", T), window.addEventListener("mouseup", A), window.addEventListener("touchmove", X), window.addEventListener("touchend", $), () => {
        window.removeEventListener("mousemove", T), window.removeEventListener("mouseup", A), window.removeEventListener("touchmove", X), window.removeEventListener("touchend", $);
      };
  }, [T, A, $, X, m]), p(() => {
    a.current && (a.current.volume = P);
  }, [P]), p(() => {
    const e = (n) => {
      n.code === "Space" && !["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName ?? "") && (n.preventDefault(), B());
    };
    return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
  }, [B]), p(() => {
    const e = a.current;
    if (!e) return;
    const n = () => c(!e.paused);
    return e.addEventListener("play", n), e.addEventListener("pause", n), e.addEventListener("ended", n), () => {
      e.removeEventListener("play", n), e.removeEventListener("pause", n), e.removeEventListener("ended", n);
    };
  }, []), /* @__PURE__ */ r(oe, { children: /* @__PURE__ */ u("div", { className: t.wrapper, children: [
    /* @__PURE__ */ u("div", { className: t.current, children: [
      /* @__PURE__ */ r("div", { className: t.imageWrapper, children: /* @__PURE__ */ r("div", { className: t.musicImage, children: i?.cover && /* @__PURE__ */ r(
        "img",
        {
          src: i.cover,
          alt: "Album cover art"
        }
      ) }) }),
      /* @__PURE__ */ u("div", { className: t.currentControls, children: [
        /* @__PURE__ */ u("div", { className: t.musicTitles, children: [
          /* @__PURE__ */ r("div", { className: t.songName, children: i?.title || "" }),
          /* @__PURE__ */ r("div", { className: t.artistName, children: i?.artist || "" })
        ] }),
        /* @__PURE__ */ r("div", { className: t.spacer }),
        /* @__PURE__ */ u("div", { className: t.time, children: [
          /* @__PURE__ */ r("span", { className: t.currentTime, children: w(R) }),
          /* @__PURE__ */ r("span", { className: t.finalTime, children: i && F[I(i.id)] || "" })
        ] }),
        /* @__PURE__ */ u(
          "div",
          {
            className: t.progressDetails,
            ref: g,
            onMouseDown: ee,
            onTouchStart: ne,
            onMouseMove: T,
            onMouseLeave: te,
            onClick: (e) => {
              if (!a.current?.duration) return;
              const n = e.currentTarget.getBoundingClientRect(), v = (e.clientX - n.left) / n.width * a.current.duration;
              D(v);
            },
            children: [
              /* @__PURE__ */ r(
                "div",
                {
                  className: t.progressBar,
                  style: { width: Y + "%" },
                  children: /* @__PURE__ */ r("span", {})
                }
              ),
              U !== null && (m || V !== null) && /* @__PURE__ */ r(
                "div",
                {
                  className: t.progressTooltip,
                  style: { left: V ?? 0 },
                  children: U
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ u("div", { className: t.controlBtn, children: [
          /* @__PURE__ */ u("div", { className: t.centeredButtons, children: [
            /* @__PURE__ */ r(
              "button",
              {
                type: "button",
                className: `${t.iconButton} material-icons-round`,
                "aria-label": "Previous track",
                onClick: re,
                children: "skip_previous"
              }
            ),
            /* @__PURE__ */ r("div", { className: t.playPause, children: /* @__PURE__ */ r(
              "button",
              {
                type: "button",
                className: `${t.iconButton} ${t.playPauseButton} material-icons-round`,
                "aria-label": s ? "Pause" : "Play",
                onClick: B,
                children: Q
              }
            ) }),
            /* @__PURE__ */ r(
              "button",
              {
                type: "button",
                className: `${t.iconButton} material-icons-round`,
                "aria-label": "Next track",
                onClick: () => b(),
                children: "skip_next"
              }
            )
          ] }),
          /* @__PURE__ */ u("div", { className: t.volumeContainer, children: [
            /* @__PURE__ */ r(
              "span",
              {
                className: "material-icons-round",
                id: "volume",
                "aria-hidden": "true",
                children: "volume_up"
              }
            ),
            /* @__PURE__ */ r("div", { className: t.hoverArea }),
            /* @__PURE__ */ r(
              "input",
              {
                type: "range",
                className: t.volumeSlider,
                id: "volumeSlider",
                min: "0",
                max: "1",
                step: "0.01",
                value: P,
                onChange: Z
              }
            )
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ r("div", { className: t.playlistScroll, children: /* @__PURE__ */ r("ul", { children: o.map((e) => /* @__PURE__ */ r("li", { children: /* @__PURE__ */ u(
      "button",
      {
        type: "button",
        className: t.playlistScrollItem,
        onClick: () => {
          i && e.id === i.id ? B() : f(e, !0);
        },
        "aria-label": `${i && e.id === i.id && s ? "Pause" : "Play"} ${e.title} by ${e.artist}`,
        children: [
          /* @__PURE__ */ u("div", { className: t.miniCover, children: [
            e.cover && /* @__PURE__ */ r(
              "img",
              {
                src: e.cover,
                alt: `${e.title} cover`
              }
            ),
            /* @__PURE__ */ r("div", { className: t.overlay }),
            /* @__PURE__ */ r("span", { className: "material-icons-round " + t.playOverlay, children: "play_arrow" })
          ] }),
          /* @__PURE__ */ u("div", { className: t.playlistTextContainer, children: [
            /* @__PURE__ */ r("span", { className: t.song, children: e.title }),
            /* @__PURE__ */ r("span", { className: t.artist, children: e.artist })
          ] }),
          /* @__PURE__ */ r("div", { className: t.spacer }),
          /* @__PURE__ */ r("span", { className: t.playlistSongLength, children: F[I(e.id)] || "loading..." })
        ]
      }
    ) }, e.id)) }) }),
    /* @__PURE__ */ r(
      "audio",
      {
        ref: a,
        className: t.mainSong,
        src: i?.src,
        preload: "auto"
      }
    )
  ] }) });
}
function De(o) {
  return new Promise((s) => {
    const c = new Audio(o);
    function _() {
      c.removeEventListener("loadedmetadata", y), c.removeEventListener("error", i), c.src = "";
    }
    function y() {
      s(w(c.duration)), _();
    }
    function i() {
      s("--:--"), _();
    }
    c.addEventListener("loadedmetadata", y), c.addEventListener("error", i);
  });
}
function w(o) {
  if (!Number.isFinite(o) || o < 0) return "0:00";
  const s = Math.floor(o / 60);
  let c = String(Math.floor(o % 60));
  return c.length < 2 && (c = "0" + c), s + ":" + c;
}
function I(o) {
  return String(o);
}
export {
  $e as AudioPlayer
};
