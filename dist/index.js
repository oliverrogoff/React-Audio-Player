import { jsx as r, Fragment as te, jsxs as l } from "react/jsx-runtime";
import { useState as d, useRef as K, useEffect as p } from "react";
const re = "_wrapper_uuosx_4", oe = "_spacer_uuosx_24", se = "_current_uuosx_28", ae = "_currentControls_uuosx_36", ie = "_controlBtn_uuosx_44", ce = "_musicImage_uuosx_50", le = "_musicTitles_uuosx_62", ue = "_songName_uuosx_62", de = "_artistName_uuosx_68", me = "_progressDetails_uuosx_75", ve = "_progressBar_uuosx_97", pe = "_progressTooltip_uuosx_121", he = "_time_uuosx_135", _e = "_centeredButtons_uuosx_152", fe = "_playPause_uuosx_170", ge = "_volumeContainer_uuosx_174", Ne = "_volumeSlider_uuosx_187", we = "_hoverArea_uuosx_202", ye = "_playlistScroll_uuosx_222", Se = "_playlistScrollItem_uuosx_238", xe = "_miniCover_uuosx_245", Le = "_overlay_uuosx_256", Ee = "_playOverlay_uuosx_260", Ce = "_playlistTextContainer_uuosx_287", Te = "_song_uuosx_62", Ie = "_artist_uuosx_68", Be = "_playlistSongLength_uuosx_307", Me = "_mainSong_uuosx_316", t = {
  wrapper: re,
  spacer: oe,
  current: se,
  currentControls: ae,
  controlBtn: ie,
  musicImage: ce,
  musicTitles: le,
  songName: ue,
  artistName: de,
  progressDetails: me,
  progressBar: ve,
  progressTooltip: pe,
  time: he,
  centeredButtons: _e,
  playPause: fe,
  volumeContainer: ge,
  volumeSlider: Ne,
  hoverArea: we,
  playlistScroll: ye,
  playlistScrollItem: Se,
  miniCover: xe,
  overlay: Le,
  playOverlay: Ee,
  playlistTextContainer: Ce,
  song: Te,
  artist: Ie,
  playlistSongLength: Be,
  mainSong: Me
};
function Xe({ playlist: o }) {
  const [u, c] = d(!1), [N, h] = d(!1), [s, y] = d(null), [k, S] = d(0), [x, W] = d(1), [D, X] = d({}), [v, w] = d(!1), [A, L] = d(null), [b, E] = d(null), [O, R] = d(0), a = K(null), _ = K(null), $ = u ? "pause" : "play_arrow", q = O ? k / O * 100 : 0;
  function z(e) {
    const n = parseFloat(e.target.value);
    W(n), a.current && (a.current.volume = n);
  }
  function C(e, n = !1) {
    a.current && (a.current.pause(), S(0), R(0)), n && h(!0), y(e);
  }
  function H(e) {
    a.current && (a.current.currentTime = e), S(e);
  }
  function T(e) {
    if (!a.current || !_.current) return;
    const n = _.current.getBoundingClientRect(), i = e.clientX - n.left, f = Math.min(Math.max(i / n.width, 0), 1) * a.current.duration;
    H(f), E(i), L(g(f));
  }
  function G(e) {
    if (!a.current?.duration || !_.current) return;
    const n = _.current.getBoundingClientRect(), i = (e.clientX - n.left) / n.width, m = a.current.duration * i;
    E(e.clientX - n.left), L(g(m));
  }
  function J() {
    w(!0);
  }
  function U() {
    v && w(!1);
  }
  function I(e) {
    v ? T(e) : G(e);
  }
  function Q(e) {
    w(!0), T(e.touches[0]);
  }
  function V(e) {
    v && T(e.touches[0]);
  }
  function j() {
    v && w(!1);
  }
  function Y() {
    L(null), E(null);
  }
  function B() {
    u ? ee() : Z();
  }
  function Z() {
    a.current?.play();
  }
  function ee() {
    a.current?.pause();
  }
  function M(e = !1) {
    if (s && o.length > 0) {
      let n = o.findIndex((i) => i.id === s.id);
      n >= 0 && (n = (n + 1) % o.length, C(o[n], u || e));
    }
  }
  function ne() {
    if (s && o.length > 0) {
      let e = o.findIndex((n) => n.id === s.id);
      e >= 0 && (e = (e - 1 + o.length) % o.length, C(o[e], u));
    }
  }
  return p(() => {
    const e = a.current;
    if (!e || !s) return;
    sessionStorage.setItem("currentSongId", String(s.id));
    const n = () => M(!0), i = () => M(!0), m = () => S(e.currentTime), f = () => {
      R(e.duration), X((P) => ({
        ...P,
        [s.id]: g(e.duration)
      }));
    }, F = () => {
      e.src.includes(s.src) && (N && e.paused && e.play().catch((P) => {
        console.warn("Playback failed:", P);
      }), h(!1));
    };
    return e.addEventListener("loadeddata", F), e.addEventListener("loadedmetadata", f), e.addEventListener("timeupdate", m), e.addEventListener("ended", n), e.addEventListener("error", i), () => {
      e.removeEventListener("loadeddata", F), e.removeEventListener("loadedmetadata", f), e.removeEventListener("timeupdate", m), e.removeEventListener("ended", n), e.removeEventListener("error", i);
    };
  }, [s, o]), p(() => {
    if (!o.length || typeof window > "u") return;
    o.forEach((n) => {
      n?.src && Pe(n.src).then((i) => {
        X((m) => ({
          ...m,
          [n.id]: i
        }));
      });
    });
    const e = sessionStorage.getItem("currentSongId");
    if (e) {
      const n = o.find((i) => String(i.id) === e);
      if (n) {
        y(n);
        return;
      }
    }
    y(o[0]);
  }, [o]), p(() => {
    if (v)
      return window.addEventListener("mousemove", I), window.addEventListener("mouseup", U), window.addEventListener("touchmove", V), window.addEventListener("touchend", j), () => {
        window.removeEventListener("mousemove", I), window.removeEventListener("mouseup", U), window.removeEventListener("touchmove", V), window.removeEventListener("touchend", j);
      };
  }, [v]), p(() => {
    a.current && (a.current.volume = x);
  }, [x]), p(() => {
    const e = (n) => {
      n.code === "Space" && !["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName ?? "") && (n.preventDefault(), B());
    };
    return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
  }, [u]), p(() => {
    const e = a.current;
    if (!e) return;
    const n = () => c(!e.paused);
    return e.addEventListener("play", n), e.addEventListener("pause", n), e.addEventListener("ended", n), () => {
      e.removeEventListener("play", n), e.removeEventListener("pause", n), e.removeEventListener("ended", n);
    };
  }, []), /* @__PURE__ */ r(te, { children: /* @__PURE__ */ l("div", { className: t.wrapper, children: [
    /* @__PURE__ */ l("div", { className: t.current, children: [
      /* @__PURE__ */ r("div", { className: t.imageWrapper, children: /* @__PURE__ */ r("div", { className: t.musicImage, children: s?.cover && /* @__PURE__ */ r(
        "img",
        {
          src: s.cover,
          alt: "Album cover art"
        }
      ) }) }),
      /* @__PURE__ */ l("div", { className: t.currentControls, children: [
        /* @__PURE__ */ l("div", { className: t.musicTitles, children: [
          /* @__PURE__ */ r("div", { className: t.songName, children: s?.title || "" }),
          /* @__PURE__ */ r("div", { className: t.artistName, children: s?.artist || "" })
        ] }),
        /* @__PURE__ */ r("div", { className: t.spacer }),
        /* @__PURE__ */ l("div", { className: t.time, children: [
          /* @__PURE__ */ r("span", { className: t.currentTime, children: g(k) }),
          /* @__PURE__ */ r("span", { className: t.finalTime, children: s && D[s.id] || "" })
        ] }),
        /* @__PURE__ */ l(
          "div",
          {
            className: t.progressDetails,
            ref: _,
            onMouseDown: J,
            onTouchStart: Q,
            onMouseMove: I,
            onMouseLeave: Y,
            onClick: (e) => {
              if (!a.current?.duration) return;
              const n = e.currentTarget.getBoundingClientRect(), m = (e.clientX - n.left) / n.width * a.current.duration;
              H(m);
            },
            children: [
              /* @__PURE__ */ r(
                "div",
                {
                  className: t.progressBar,
                  style: { width: q + "%" },
                  children: /* @__PURE__ */ r("span", {})
                }
              ),
              A !== null && (v || b !== null) && /* @__PURE__ */ r(
                "div",
                {
                  className: t.progressTooltip,
                  style: { left: b ?? 0 },
                  children: A
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ l("div", { className: t.controlBtn, children: [
          /* @__PURE__ */ l("div", { className: t.centeredButtons, children: [
            /* @__PURE__ */ r("span", { className: "material-icons-round", onClick: ne, children: "skip_previous" }),
            /* @__PURE__ */ r("div", { className: t.playPause, children: /* @__PURE__ */ r("span", { className: "material-icons-round", onClick: B, children: $ }) }),
            /* @__PURE__ */ r("span", { className: "material-icons-round", onClick: () => M(), children: "skip_next" })
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
                value: x,
                onChange: z
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
          s && e.id === s.id ? B() : C(e, !0);
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
        ref: a,
        className: t.mainSong,
        src: s?.src,
        preload: "auto"
      }
    )
  ] }) });
}
function Pe(o) {
  return new Promise((u) => {
    const c = new Audio(o);
    function N() {
      c.removeEventListener("loadedmetadata", h), c.removeEventListener("error", s), c.src = "";
    }
    function h() {
      u(g(c.duration)), N();
    }
    function s() {
      u("--:--"), N();
    }
    c.addEventListener("loadedmetadata", h), c.addEventListener("error", s);
  });
}
function g(o) {
  const u = Math.floor(o / 60);
  let c = String(Math.floor(o % 60));
  return c.length < 2 && (c = "0" + c), u + ":" + c;
}
export {
  Xe as AudioPlayer
};
