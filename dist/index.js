import { jsx as r, Fragment as Y, jsxs as l } from "react/jsx-runtime";
import { useState as m, useRef as R, useMemo as Z, useCallback as y, useEffect as h } from "react";
const ee = "_wrapper_uuosx_4", ne = "_spacer_uuosx_24", te = "_current_uuosx_28", re = "_currentControls_uuosx_36", oe = "_controlBtn_uuosx_44", se = "_musicImage_uuosx_50", ae = "_musicTitles_uuosx_62", ie = "_songName_uuosx_62", ce = "_artistName_uuosx_68", le = "_progressDetails_uuosx_75", ue = "_progressBar_uuosx_97", de = "_progressTooltip_uuosx_121", me = "_time_uuosx_135", ve = "_centeredButtons_uuosx_152", pe = "_playPause_uuosx_170", he = "_volumeContainer_uuosx_174", _e = "_volumeSlider_uuosx_187", fe = "_hoverArea_uuosx_202", ge = "_playlistScroll_uuosx_222", we = "_playlistScrollItem_uuosx_238", Ne = "_miniCover_uuosx_245", Se = "_overlay_uuosx_256", ye = "_playOverlay_uuosx_260", xe = "_playlistTextContainer_uuosx_287", Ee = "_song_uuosx_62", Le = "_artist_uuosx_68", Ce = "_playlistSongLength_uuosx_307", Te = "_mainSong_uuosx_316", t = {
  wrapper: ee,
  spacer: ne,
  current: te,
  currentControls: re,
  controlBtn: oe,
  musicImage: se,
  musicTitles: ae,
  songName: ie,
  artistName: ce,
  progressDetails: le,
  progressBar: ue,
  progressTooltip: de,
  time: me,
  centeredButtons: ve,
  playPause: pe,
  volumeContainer: he,
  volumeSlider: _e,
  hoverArea: fe,
  playlistScroll: ge,
  playlistScrollItem: we,
  miniCover: Ne,
  overlay: Se,
  playOverlay: ye,
  playlistTextContainer: xe,
  song: Ee,
  artist: Le,
  playlistSongLength: Ce,
  mainSong: Te
};
function Pe({ playlist: o }) {
  const [u, v] = m(!1), [_, k] = m(!1), [s, D] = m(o[0] || null), [x, E] = m(0), [L, H] = m(1), [b, U] = m({}), [p, w] = m(!1), [X, C] = m(null), [A, T] = m(null), i = R(null), f = R(null), V = u ? "pause" : "play_arrow", [I, j] = m(0), F = Z(() => I ? x / I * 100 : 0, [x, I]);
  function K(e) {
    const n = parseFloat(e.target.value);
    H(n), i.current && (i.current.volume = n);
  }
  function M(e, n = !1) {
    i.current && (i.current.pause(), E(0)), n && k(!0), D(e);
  }
  function O(e) {
    i.current && (i.current.currentTime = e), E(e);
  }
  const g = y(
    (e) => {
      if (!i.current || !f.current) return;
      const n = f.current.getBoundingClientRect(), a = e.clientX - n.left, c = Math.min(Math.max(a / n.width, 0), 1) * i.current.duration;
      O(c), T(a), C(String(c));
    },
    []
  ), B = y((e) => {
    if (!i.current?.duration || !f.current) return;
    const n = f.current.getBoundingClientRect(), a = (e.clientX - n.left) / n.width, d = i.current.duration * a;
    T(e.clientX - n.left), C(P(d));
  }, []);
  function W() {
    i.current?.play();
  }
  function $() {
    i.current?.pause();
  }
  const N = y(() => {
    u ? $() : W();
  }, [u]);
  function q() {
    w(!0);
  }
  function z(e) {
    p ? g(e) : B(e);
  }
  function G(e) {
    w(!0), g(e.touches[0]);
  }
  function J() {
    C(null), T(null);
  }
  const S = y((e = !1) => {
    if (s && o.length > 0) {
      let n = o.findIndex((a) => a.id === s.id);
      n >= 0 && (n = (n + 1) % o.length, M(o[n], u || e));
    }
  }, [s, u, o]);
  function Q() {
    if (s && o.length > 0) {
      let e = o.findIndex((n) => n.id === s.id);
      e >= 0 && (e = (e - 1 + o.length) % o.length, M(o[e], u));
    }
  }
  return h(() => {
    const e = i.current;
    if (!e || !s) return;
    s.id && sessionStorage.setItem("currentSongId", String(s.id));
    const n = () => S(!0), a = () => {
      const c = e.currentTime;
      E(c);
    }, d = () => {
      e.src.includes(s.src) && _ && e.paused && (e.play().catch((c) => {
        console.warn("Playback failed:", c);
      }), k(!1));
    };
    return e.addEventListener("loadeddata", d), e.addEventListener("timeupdate", a), e.addEventListener("ended", n), () => {
      e.removeEventListener("loadeddata", d), e.removeEventListener("timeupdate", a), e.removeEventListener("ended", n);
    };
  }, [s, S, _]), h(() => {
    if (typeof window > "u") return;
    const e = sessionStorage.getItem("currentSongId");
    if (e) {
      const n = o.find((a) => a.id === Number(e));
      n && D(n);
    }
  }, [o]), h(() => {
    o.forEach((e) => {
      e?.src && Ie(e.src).then((n) => {
        U((a) => ({
          ...a,
          [e.id]: n
        }));
      });
    });
  }, [o]), h(() => {
    function e(c) {
      p ? g(c) : B(c);
    }
    function n(c) {
      p && g(c.touches[0]);
    }
    function a() {
      p && w(!1);
    }
    function d() {
      p && w(!1);
    }
    return p ? (window.addEventListener("mousemove", e), window.addEventListener("mouseup", a), window.addEventListener("touchmove", n), window.addEventListener("touchend", d)) : (window.removeEventListener("mousemove", e), window.removeEventListener("mouseup", a), window.removeEventListener("touchmove", n), window.removeEventListener("touchend", d)), () => {
      window.removeEventListener("mousemove", e), window.removeEventListener("mouseup", a), window.removeEventListener("touchmove", n), window.removeEventListener("touchend", d);
    };
  }, [p, g, B]), h(() => {
    i.current && (i.current.volume = L);
  }, [L]), h(() => {
    const e = (n) => {
      document.activeElement && n.code === "Space" && !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName) && (n.preventDefault(), N());
    };
    return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
  }, [u, N]), h(() => {
    const e = i.current;
    if (!e || !s) return;
    const n = () => {
      j(e.duration);
    };
    return e.addEventListener("loadedmetadata", n), () => {
      e.removeEventListener("loadedmetadata", n);
    };
  }, [s, S, _]), h(() => {
    const e = i.current;
    if (!e) return;
    const n = () => {
      v(!e.paused);
    };
    return e.addEventListener("play", n), e.addEventListener("pause", n), e.addEventListener("ended", n), () => {
      e.removeEventListener("play", n), e.removeEventListener("pause", n), e.removeEventListener("ended", n);
    };
  }, []), /* @__PURE__ */ r(Y, { children: /* @__PURE__ */ l("div", { className: t.wrapper, children: [
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
          /* @__PURE__ */ r("span", { className: t.currentTime, children: P(x) }),
          /* @__PURE__ */ r("span", { className: t.finalTime, children: s ? b[s.id] : "" })
        ] }),
        /* @__PURE__ */ l(
          "div",
          {
            className: t.progressDetails,
            ref: f,
            onMouseDown: q,
            onTouchStart: G,
            onMouseMove: z,
            onMouseLeave: J,
            onClick: (e) => {
              const n = i.current;
              if (!n) return;
              const a = e.currentTarget.getBoundingClientRect(), c = (e.clientX - a.left) / a.width * n.duration;
              O(c);
            },
            children: [
              /* @__PURE__ */ r(
                "div",
                {
                  className: t.progressBar,
                  style: { width: F + "%" },
                  children: /* @__PURE__ */ r("span", {})
                }
              ),
              X !== null && (p || A !== null) && /* @__PURE__ */ r(
                "div",
                {
                  className: t.progressTooltip,
                  style: { left: A ?? 0 },
                  children: X
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ l("div", { className: t.controlBtn, children: [
          /* @__PURE__ */ l("div", { className: t.centeredButtons, children: [
            /* @__PURE__ */ r(
              "span",
              {
                className: "material-icons-round",
                onClick: Q,
                children: "skip_previous"
              }
            ),
            /* @__PURE__ */ r("div", { className: t.playPause, children: /* @__PURE__ */ r("span", { className: "material-icons-round", onClick: N, children: V }) }),
            /* @__PURE__ */ r("span", { className: "material-icons-round", onClick: () => S(), children: "skip_next" })
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
                value: L,
                onChange: K
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
          s && (e.id === s.id ? N() : M(e, !0));
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
          /* @__PURE__ */ r("span", { className: t.playlistSongLength, children: b[e.id] || "loading..." })
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
function Ie(o) {
  return new Promise((u) => {
    const v = new Audio(o);
    v.addEventListener("loadedmetadata", () => {
      const _ = v.duration;
      u(P(_));
    });
  });
}
function P(o) {
  const u = String(Math.floor(o / 60));
  let v = String(Math.floor(o % 60));
  return v.length < 2 && (v = "0" + v), u + ":" + v;
}
export {
  Pe as AudioPlayer
};
