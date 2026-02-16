import { jsx as r, Fragment as ne, jsxs as c } from "react/jsx-runtime";
import { useState as l, useRef as j, useEffect as p } from "react";
const te = "_wrapper_uuosx_4", re = "_spacer_uuosx_24", oe = "_current_uuosx_28", se = "_currentControls_uuosx_36", ie = "_controlBtn_uuosx_44", ae = "_musicImage_uuosx_50", ce = "_musicTitles_uuosx_62", le = "_songName_uuosx_62", ue = "_artistName_uuosx_68", de = "_progressDetails_uuosx_75", me = "_progressBar_uuosx_97", ve = "_progressTooltip_uuosx_121", pe = "_time_uuosx_135", he = "_centeredButtons_uuosx_152", _e = "_playPause_uuosx_170", fe = "_volumeContainer_uuosx_174", ge = "_volumeSlider_uuosx_187", we = "_hoverArea_uuosx_202", Ne = "_playlistScroll_uuosx_222", ye = "_playlistScrollItem_uuosx_238", xe = "_miniCover_uuosx_245", Se = "_overlay_uuosx_256", Le = "_playOverlay_uuosx_260", Ee = "_playlistTextContainer_uuosx_287", Ce = "_song_uuosx_62", Te = "_artist_uuosx_68", Ie = "_playlistSongLength_uuosx_307", Be = "_mainSong_uuosx_316", t = {
  wrapper: te,
  spacer: re,
  current: oe,
  currentControls: se,
  controlBtn: ie,
  musicImage: ae,
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
  const [u, d] = l(!1), [F, k] = l(!1), [s, w] = l(null), [D, N] = l(0), [y, K] = l(1), [X, b] = l({}), [v, f] = l(!1), [A, x] = l(null), [O, S] = l(null), [R, H] = l(0), i = j(null), L = j(null), W = u ? "pause" : "play_arrow", $ = R ? D / R * 100 : 0;
  function q(e) {
    const n = parseFloat(e.target.value);
    K(n), i.current && (i.current.volume = n);
  }
  function E(e, n = !1) {
    i.current && (i.current.pause(), N(0), H(0)), n && k(!0), w(e);
  }
  function U(e) {
    i.current && (i.current.currentTime = e), N(e);
  }
  function C(e) {
    if (!i.current || !L.current) return;
    const n = L.current.getBoundingClientRect(), a = e.clientX - n.left, h = Math.min(Math.max(a / n.width, 0), 1) * i.current.duration;
    U(h), S(a), x(_(h));
  }
  function z(e) {
    if (!i.current?.duration) return;
    const n = e.currentTarget.getBoundingClientRect(), a = (e.clientX - n.left) / n.width, m = i.current.duration * a;
    S(e.clientX - n.left), x(_(m));
  }
  function G() {
    f(!0);
  }
  function T() {
    v && f(!1);
  }
  function g(e) {
    v ? C(e) : z(e);
  }
  function J(e) {
    f(!0), C(e.touches[0]);
  }
  function I(e) {
    v && C(e.touches[0]);
  }
  function B() {
    v && f(!1);
  }
  function Q() {
    x(null), S(null);
  }
  function M() {
    u ? Z() : Y();
  }
  function Y() {
    i.current?.play();
  }
  function Z() {
    i.current?.pause();
  }
  function V(e = !1) {
    if (s && o.length > 0) {
      let n = o.findIndex((a) => a.id === s.id);
      n >= 0 && (n = (n + 1) % o.length, E(o[n], u || e));
    }
  }
  function ee() {
    if (s && o.length > 0) {
      let e = o.findIndex((n) => n.id === s.id);
      e >= 0 && (e = (e - 1 + o.length) % o.length, E(o[e], u));
    }
  }
  return p(() => {
    const e = i.current;
    if (!e || !s) return;
    s.id !== null && sessionStorage.setItem("currentSongId", String(s.id));
    const n = () => V(!0), a = () => N(e.currentTime), m = () => {
      H(e.duration), b((P) => ({
        ...P,
        [s.id]: _(e.duration)
      }));
    }, h = () => {
      e.src.includes(s.src) && (F && e.paused && e.play().catch((P) => {
        console.warn("Playback failed:", P);
      }), k(!1));
    };
    return e.addEventListener("loadeddata", h), e.addEventListener("loadedmetadata", m), e.addEventListener("timeupdate", a), e.addEventListener("ended", n), () => {
      e.removeEventListener("loadeddata", h), e.removeEventListener("loadedmetadata", m), e.removeEventListener("timeupdate", a), e.removeEventListener("ended", n);
    };
  }, [s]), p(() => {
    if (!o.length || (o.forEach((n) => {
      n?.src && Me(n.src).then((a) => {
        b((m) => ({
          ...m,
          [n.id]: a
        }));
      });
    }), typeof window > "u")) return;
    const e = sessionStorage.getItem("currentSongId");
    if (e) {
      const n = o.find((a) => a.id === Number(e));
      if (n) {
        w(n);
        return;
      }
    }
    w(o[0]);
  }, [o]), p(() => (v ? (window.addEventListener("mousemove", g), window.addEventListener("mouseup", T), window.addEventListener("touchmove", I), window.addEventListener("touchend", B)) : (window.removeEventListener("mousemove", g), window.removeEventListener("mouseup", T), window.removeEventListener("touchmove", I), window.removeEventListener("touchend", B)), () => {
    window.removeEventListener("mousemove", g), window.removeEventListener("mouseup", T), window.removeEventListener("touchmove", I), window.removeEventListener("touchend", B);
  }), [v]), p(() => {
    i.current && (i.current.volume = y);
  }, [y]), p(() => {
    const e = (n) => {
      n.code === "Space" && !["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName ?? "") && (n.preventDefault(), M());
    };
    return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
  }, [u]), p(() => {
    const e = i.current;
    if (!e) return;
    const n = () => d(!e.paused);
    return e.addEventListener("play", n), e.addEventListener("pause", n), e.addEventListener("ended", n), () => {
      e.removeEventListener("play", n), e.removeEventListener("pause", n), e.removeEventListener("ended", n);
    };
  }, []), /* @__PURE__ */ r(ne, { children: /* @__PURE__ */ c("div", { className: t.wrapper, children: [
    /* @__PURE__ */ c("div", { className: t.current, children: [
      /* @__PURE__ */ r("div", { className: t.imageWrapper, children: /* @__PURE__ */ r("div", { className: t.musicImage, children: s?.cover && /* @__PURE__ */ r(
        "img",
        {
          src: s.cover,
          alt: "Album cover art"
        }
      ) }) }),
      /* @__PURE__ */ c("div", { className: t.currentControls, children: [
        /* @__PURE__ */ c("div", { className: t.musicTitles, children: [
          /* @__PURE__ */ r("div", { className: t.songName, children: s?.title || "" }),
          /* @__PURE__ */ r("div", { className: t.artistName, children: s?.artist || "" })
        ] }),
        /* @__PURE__ */ r("div", { className: t.spacer }),
        /* @__PURE__ */ c("div", { className: t.time, children: [
          /* @__PURE__ */ r("span", { className: t.currentTime, children: _(D) }),
          /* @__PURE__ */ r("span", { className: t.finalTime, children: s && X[s.id] || "" })
        ] }),
        /* @__PURE__ */ c(
          "div",
          {
            className: t.progressDetails,
            ref: L,
            onMouseDown: G,
            onTouchStart: J,
            onMouseMove: g,
            onMouseLeave: Q,
            onClick: (e) => {
              if (!i.current?.duration) return;
              const n = e.currentTarget.getBoundingClientRect(), m = (e.clientX - n.left) / n.width * i.current.duration;
              U(m);
            },
            children: [
              /* @__PURE__ */ r(
                "div",
                {
                  className: t.progressBar,
                  style: { width: $ + "%" },
                  children: /* @__PURE__ */ r("span", {})
                }
              ),
              A !== null && (v || O !== null) && /* @__PURE__ */ r(
                "div",
                {
                  className: t.progressTooltip,
                  style: { left: O ?? 0 },
                  children: A
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ c("div", { className: t.controlBtn, children: [
          /* @__PURE__ */ c("div", { className: t.centeredButtons, children: [
            /* @__PURE__ */ r("span", { className: "material-icons-round", onClick: ee, children: "skip_previous" }),
            /* @__PURE__ */ r("div", { className: t.playPause, children: /* @__PURE__ */ r("span", { className: "material-icons-round", onClick: M, children: W }) }),
            /* @__PURE__ */ r("span", { className: "material-icons-round", onClick: () => V(), children: "skip_next" })
          ] }),
          /* @__PURE__ */ c("div", { className: t.volumeContainer, children: [
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
                onChange: q
              }
            )
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ r("div", { className: t.playlistScroll, children: /* @__PURE__ */ r("ul", { children: o.map((e) => /* @__PURE__ */ c(
      "li",
      {
        className: t.playlistScrollItem,
        onClick: () => {
          s && (e.id === s.id ? M() : E(e, !0));
        },
        children: [
          /* @__PURE__ */ c("div", { className: t.miniCover, children: [
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
          /* @__PURE__ */ c("div", { className: t.playlistTextContainer, children: [
            /* @__PURE__ */ r("span", { className: t.song, children: e.title }),
            /* @__PURE__ */ r("span", { className: t.artist, children: e.artist })
          ] }),
          /* @__PURE__ */ r("div", { className: t.spacer }),
          /* @__PURE__ */ r("span", { className: t.playlistSongLength, children: X[e.id] || "loading..." })
        ]
      },
      e.id
    )) }) }),
    /* @__PURE__ */ r(
      "audio",
      {
        ref: i,
        className: t.mainSong,
        src: s?.src,
        preload: "auto"
      }
    )
  ] }) });
}
function Me(o) {
  return new Promise((u) => {
    const d = new Audio(o);
    d.addEventListener("loadedmetadata", () => {
      u(_(d.duration));
    });
  });
}
function _(o) {
  const u = Math.floor(o / 60);
  let d = String(Math.floor(o % 60));
  return d.length < 2 && (d = "0" + d), u + ":" + d;
}
export {
  De as AudioPlayer
};
