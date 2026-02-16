import { jsx as r, Fragment as ne, jsxs as l } from "react/jsx-runtime";
import { useState as d, useRef as U, useEffect as p } from "react";
const te = "_wrapper_uuosx_4", re = "_spacer_uuosx_24", oe = "_current_uuosx_28", se = "_currentControls_uuosx_36", ae = "_controlBtn_uuosx_44", ie = "_musicImage_uuosx_50", ce = "_musicTitles_uuosx_62", le = "_songName_uuosx_62", ue = "_artistName_uuosx_68", de = "_progressDetails_uuosx_75", me = "_progressBar_uuosx_97", ve = "_progressTooltip_uuosx_121", pe = "_time_uuosx_135", he = "_centeredButtons_uuosx_152", _e = "_playPause_uuosx_170", fe = "_volumeContainer_uuosx_174", ge = "_volumeSlider_uuosx_187", we = "_hoverArea_uuosx_202", Ne = "_playlistScroll_uuosx_222", ye = "_playlistScrollItem_uuosx_238", xe = "_miniCover_uuosx_245", Se = "_overlay_uuosx_256", Le = "_playOverlay_uuosx_260", Ee = "_playlistTextContainer_uuosx_287", Ce = "_song_uuosx_62", Te = "_artist_uuosx_68", Ie = "_playlistSongLength_uuosx_307", Be = "_mainSong_uuosx_316", t = {
  wrapper: te,
  spacer: re,
  current: oe,
  currentControls: se,
  controlBtn: ae,
  musicImage: ie,
  musicTitles: ce,
  songName: le,
  artistName: ue,
  progressDetails: de,
  progressBar: me,
  progressTooltip: ve,
  time: pe,
  centeredButtons: he,
  playPause: _e,
  volumeContainer: fe,
  volumeSlider: ge,
  hoverArea: we,
  playlistScroll: Ne,
  playlistScrollItem: ye,
  miniCover: xe,
  overlay: Se,
  playOverlay: Le,
  playlistTextContainer: Ee,
  song: Ce,
  artist: Te,
  playlistSongLength: Ie,
  mainSong: Be
};
function De({ playlist: o }) {
  const [u, c] = d(!1), [V, P] = d(!1), [a, w] = d(null), [k, N] = d(0), [y, j] = d(1), [D, F] = d({}), [v, _] = d(!1), [X, x] = d(null), [b, S] = d(null), [A, O] = d(0), s = U(null), L = U(null), K = u ? "pause" : "play_arrow", W = A ? k / A * 100 : 0;
  function $(e) {
    const n = parseFloat(e.target.value);
    j(n), s.current && (s.current.volume = n);
  }
  function E(e, n = !1) {
    s.current && (s.current.pause(), N(0), O(0)), n && P(!0), w(e);
  }
  function R(e) {
    s.current && (s.current.currentTime = e), N(e);
  }
  function C(e) {
    if (!s.current || !L.current) return;
    const n = L.current.getBoundingClientRect(), i = e.clientX - n.left, h = Math.min(Math.max(i / n.width, 0), 1) * s.current.duration;
    R(h), S(i), x(g(h));
  }
  function q(e) {
    if (!s.current?.duration) return;
    const n = e.currentTarget.getBoundingClientRect(), i = (e.clientX - n.left) / n.width, m = s.current.duration * i;
    S(e.clientX - n.left), x(g(m));
  }
  function z() {
    _(!0);
  }
  function T() {
    v && _(!1);
  }
  function f(e) {
    v ? C(e) : q(e);
  }
  function G(e) {
    _(!0), C(e.touches[0]);
  }
  function I(e) {
    v && C(e.touches[0]);
  }
  function B() {
    v && _(!1);
  }
  function J() {
    x(null), S(null);
  }
  function M() {
    u ? Y() : Q();
  }
  function Q() {
    s.current?.play();
  }
  function Y() {
    s.current?.pause();
  }
  function H(e = !1) {
    if (a && o.length > 0) {
      let n = o.findIndex((i) => i.id === a.id);
      n >= 0 && (n = (n + 1) % o.length, E(o[n], u || e));
    }
  }
  function Z() {
    if (a && o.length > 0) {
      let e = o.findIndex((n) => n.id === a.id);
      e >= 0 && (e = (e - 1 + o.length) % o.length, E(o[e], u));
    }
  }
  return p(() => {
    const e = s.current;
    if (!e || !a) return;
    a.id && sessionStorage.setItem("currentSongId", String(a.id));
    const n = () => H(!0), i = () => N(e.currentTime), m = () => O(e.duration), h = () => {
      e.src.includes(a.src) && (V && e.paused && e.play().catch((ee) => {
        console.warn("Playback failed:", ee);
      }), P(!1));
    };
    return e.addEventListener("loadeddata", h), e.addEventListener("loadedmetadata", m), e.addEventListener("timeupdate", i), e.addEventListener("ended", n), () => {
      e.removeEventListener("loadeddata", h), e.removeEventListener("loadedmetadata", m), e.removeEventListener("timeupdate", i), e.removeEventListener("ended", n);
    };
  }, [a]), p(() => {
    if (o.forEach((n) => {
      n?.src && Me(n.src).then((i) => {
        F((m) => ({
          ...m,
          [n.id]: i
        }));
      });
    }), typeof window > "u") return;
    const e = sessionStorage.getItem("currentSongId");
    if (e) {
      const n = o.find((i) => i.id === Number(e));
      if (n) {
        w(n);
        return;
      }
    }
    w(o[0]);
  }, [o]), p(() => (v ? (window.addEventListener("mousemove", f), window.addEventListener("mouseup", T), window.addEventListener("touchmove", I), window.addEventListener("touchend", B)) : (window.removeEventListener("mousemove", f), window.removeEventListener("mouseup", T), window.removeEventListener("touchmove", I), window.removeEventListener("touchend", B)), () => {
    window.removeEventListener("mousemove", f), window.removeEventListener("mouseup", T), window.removeEventListener("touchmove", I), window.removeEventListener("touchend", B);
  }), [v]), p(() => {
    s.current && (s.current.volume = y);
  }, [y]), p(() => {
    const e = (n) => {
      n.code === "Space" && !["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName ?? "") && (n.preventDefault(), M());
    };
    return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
  }, [u]), p(() => {
    const e = s.current;
    if (!e) return;
    const n = () => c(!e.paused);
    return e.addEventListener("play", n), e.addEventListener("pause", n), e.addEventListener("ended", n), () => {
      e.removeEventListener("play", n), e.removeEventListener("pause", n), e.removeEventListener("ended", n);
    };
  }, []), /* @__PURE__ */ r(ne, { children: /* @__PURE__ */ l("div", { className: t.wrapper, children: [
    /* @__PURE__ */ l("div", { className: t.current, children: [
      /* @__PURE__ */ r("div", { className: t.imageWrapper, children: /* @__PURE__ */ r("div", { className: t.musicImage, children: a?.cover && /* @__PURE__ */ r(
        "img",
        {
          src: a.cover,
          alt: "Album cover art"
        }
      ) }) }),
      /* @__PURE__ */ l("div", { className: t.currentControls, children: [
        /* @__PURE__ */ l("div", { className: t.musicTitles, children: [
          /* @__PURE__ */ r("div", { className: t.songName, children: a?.title || "" }),
          /* @__PURE__ */ r("div", { className: t.artistName, children: a?.artist || "" })
        ] }),
        /* @__PURE__ */ r("div", { className: t.spacer }),
        /* @__PURE__ */ l("div", { className: t.time, children: [
          /* @__PURE__ */ r("span", { className: t.currentTime, children: g(k) }),
          /* @__PURE__ */ r("span", { className: t.finalTime, children: a ? D[a.id] : "" })
        ] }),
        /* @__PURE__ */ l(
          "div",
          {
            className: t.progressDetails,
            ref: L,
            onMouseDown: z,
            onTouchStart: G,
            onMouseMove: f,
            onMouseLeave: J,
            onClick: (e) => {
              if (!s.current) return;
              const n = e.currentTarget.getBoundingClientRect(), m = (e.clientX - n.left) / n.width * s.current.duration;
              R(m);
            },
            children: [
              /* @__PURE__ */ r(
                "div",
                {
                  className: t.progressBar,
                  style: { width: W + "%" },
                  children: /* @__PURE__ */ r("span", {})
                }
              ),
              X !== null && (v || b !== null) && /* @__PURE__ */ r(
                "div",
                {
                  className: t.progressTooltip,
                  style: { left: b ?? 0 },
                  children: X
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ l("div", { className: t.controlBtn, children: [
          /* @__PURE__ */ l("div", { className: t.centeredButtons, children: [
            /* @__PURE__ */ r("span", { className: "material-icons-round", onClick: Z, children: "skip_previous" }),
            /* @__PURE__ */ r("div", { className: t.playPause, children: /* @__PURE__ */ r("span", { className: "material-icons-round", onClick: M, children: K }) }),
            /* @__PURE__ */ r("span", { className: "material-icons-round", onClick: () => H(), children: "skip_next" })
          ] }),
          /* @__PURE__ */ l("div", { className: t.volumeContainer, children: [
            /* @__PURE__ */ r("span", { className: "material-icons-round", id: "volume", children: "volume_up" }),
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
                value: y,
                onChange: $
              }
            )
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ r("div", { className: t.playlistScroll, children: /* @__PURE__ */ r("ul", { children: o.map((e) => /* @__PURE__ */ l(
      "li",
      {
        className: t.playlistScrollItem,
        onClick: () => {
          a && (e.id === a.id ? M() : E(e, !0));
        },
        children: [
          /* @__PURE__ */ l("div", { className: t.miniCover, children: [
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
          /* @__PURE__ */ l("div", { className: t.playlistTextContainer, children: [
            /* @__PURE__ */ r("span", { className: t.song, children: e.title }),
            /* @__PURE__ */ r("span", { className: t.artist, children: e.artist })
          ] }),
          /* @__PURE__ */ r("div", { className: t.spacer }),
          /* @__PURE__ */ r("span", { className: t.playlistSongLength, children: D[e.id] || "loading..." })
        ]
      },
      e.id
    )) }) }),
    /* @__PURE__ */ r(
      "audio",
      {
        ref: s,
        className: t.mainSong,
        src: a?.src,
        preload: "auto"
      }
    )
  ] }) });
}
function Me(o) {
  return new Promise((u) => {
    const c = new Audio(o);
    c.preload = "metadata", c.addEventListener("loadedmetadata", () => {
      u(g(c.duration)), c.src = "";
    }), c.addEventListener("error", () => {
      u("--:--");
    });
  });
}
function g(o) {
  const u = Math.floor(o / 60);
  let c = String(Math.floor(o % 60));
  return c.length < 2 && (c = "0" + c), u + ":" + c;
}
export {
  De as AudioPlayer
};
