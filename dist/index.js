import { jsx as r, Fragment as Y, jsxs as d } from "react/jsx-runtime";
import { useState as v, useRef as R, useMemo as Z, useCallback as y, useEffect as h } from "react";
const ee = "_wrapper_uuosx_4", ne = "_spacer_uuosx_24", te = "_current_uuosx_28", re = "_currentControls_uuosx_36", oe = "_controlBtn_uuosx_44", se = "_musicImage_uuosx_50", ae = "_musicTitles_uuosx_62", ie = "_songName_uuosx_62", ce = "_artistName_uuosx_68", le = "_progressDetails_uuosx_75", ue = "_progressBar_uuosx_97", de = "_progressTooltip_uuosx_121", me = "_time_uuosx_135", ve = "_centeredButtons_uuosx_152", pe = "_playPause_uuosx_170", he = "_volumeContainer_uuosx_174", _e = "_volumeSlider_uuosx_187", fe = "_hoverArea_uuosx_202", ge = "_playlistScroll_uuosx_222", we = "_playlistScrollItem_uuosx_238", Ne = "_miniCover_uuosx_245", Se = "_overlay_uuosx_256", ye = "_playOverlay_uuosx_260", Ee = "_playlistTextContainer_uuosx_287", xe = "_song_uuosx_62", Le = "_artist_uuosx_68", Ce = "_playlistSongLength_uuosx_307", Te = "_mainSong_uuosx_316", t = {
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
  playlistTextContainer: Ee,
  song: xe,
  artist: Le,
  playlistSongLength: Ce,
  mainSong: Te
};
function Pe({ playlist: o }) {
  const [u, c] = v(!1), [_, k] = v(!1), [s, D] = v(o[0] || null), [E, x] = v(0), [L, H] = v(1), [b, V] = v({}), [p, w] = v(!1), [X, C] = v(null), [A, T] = v(null), i = R(null), f = R(null), j = u ? "pause" : "play_arrow", [I, F] = v(0), U = Z(() => I ? E / I * 100 : 0, [E, I]);
  function K(e) {
    const n = parseFloat(e.target.value);
    H(n), i.current && (i.current.volume = n);
  }
  function M(e, n = !1) {
    i.current && (i.current.pause(), x(0)), n && k(!0), D(e);
  }
  function O(e) {
    i.current && (i.current.currentTime = e), x(e);
  }
  const g = y(
    (e) => {
      if (!i.current || !f.current) return;
      const n = f.current.getBoundingClientRect(), a = e.clientX - n.left, l = Math.min(Math.max(a / n.width, 0), 1) * i.current.duration;
      O(l), T(a), C(String(l));
    },
    []
  ), B = y((e) => {
    if (!i.current?.duration || !f.current) return;
    const n = f.current.getBoundingClientRect(), a = (e.clientX - n.left) / n.width, m = i.current.duration * a;
    T(e.clientX - n.left), C(P(m));
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
      const l = e.currentTime;
      x(l);
    }, m = () => {
      e.src.includes(s.src) && _ && e.paused && (e.play().catch((l) => {
        console.warn("Playback failed:", l);
      }), k(!1));
    };
    return e.addEventListener("loadeddata", m), e.addEventListener("timeupdate", a), e.addEventListener("ended", n), () => {
      e.removeEventListener("loadeddata", m), e.removeEventListener("timeupdate", a), e.removeEventListener("ended", n);
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
        V((a) => ({
          ...a,
          [e.id]: n
        }));
      });
    });
  }, [o]), h(() => {
    function e(l) {
      p ? g(l) : B(l);
    }
    function n(l) {
      p && g(l.touches[0]);
    }
    function a() {
      p && w(!1);
    }
    function m() {
      p && w(!1);
    }
    return p ? (window.addEventListener("mousemove", e), window.addEventListener("mouseup", a), window.addEventListener("touchmove", n), window.addEventListener("touchend", m)) : (window.removeEventListener("mousemove", e), window.removeEventListener("mouseup", a), window.removeEventListener("touchmove", n), window.removeEventListener("touchend", m)), () => {
      window.removeEventListener("mousemove", e), window.removeEventListener("mouseup", a), window.removeEventListener("touchmove", n), window.removeEventListener("touchend", m);
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
      F(e.duration);
    };
    return e.addEventListener("loadedmetadata", n), () => {
      e.removeEventListener("loadedmetadata", n);
    };
  }, [s, S, _]), h(() => {
    const e = i.current;
    if (!e) return;
    const n = () => {
      c(!e.paused);
    };
    return e.addEventListener("play", n), e.addEventListener("pause", n), e.addEventListener("ended", n), () => {
      e.removeEventListener("play", n), e.removeEventListener("pause", n), e.removeEventListener("ended", n);
    };
  }, []), /* @__PURE__ */ r(Y, { children: /* @__PURE__ */ d("div", { className: t.wrapper, children: [
    /* @__PURE__ */ d("div", { className: t.current, children: [
      /* @__PURE__ */ r("div", { className: t.imageWrapper, children: /* @__PURE__ */ r("div", { className: t.musicImage, children: s?.cover && /* @__PURE__ */ r(
        "img",
        {
          src: s.cover,
          alt: "Album cover art"
        }
      ) }) }),
      /* @__PURE__ */ d("div", { className: t.currentControls, children: [
        /* @__PURE__ */ d("div", { className: t.musicTitles, children: [
          /* @__PURE__ */ r("div", { className: t.songName, children: s?.title || "" }),
          /* @__PURE__ */ r("div", { className: t.artistName, children: s?.artist || "" })
        ] }),
        /* @__PURE__ */ r("div", { className: t.spacer }),
        /* @__PURE__ */ d("div", { className: t.time, children: [
          /* @__PURE__ */ r("span", { className: t.currentTime, children: P(E) }),
          /* @__PURE__ */ r("span", { className: t.finalTime, children: s ? b[s.id] : "" })
        ] }),
        /* @__PURE__ */ d(
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
              const a = e.currentTarget.getBoundingClientRect(), l = (e.clientX - a.left) / a.width * n.duration;
              O(l);
            },
            children: [
              /* @__PURE__ */ r(
                "div",
                {
                  className: t.progressBar,
                  style: { width: U + "%" },
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
        /* @__PURE__ */ d("div", { className: t.controlBtn, children: [
          /* @__PURE__ */ d("div", { className: t.centeredButtons, children: [
            /* @__PURE__ */ r(
              "span",
              {
                className: "material-icons-round",
                onClick: Q,
                children: "skip_previous"
              }
            ),
            /* @__PURE__ */ r("div", { className: t.playPause, children: /* @__PURE__ */ r("span", { className: "material-icons-round", onClick: N, children: j }) }),
            /* @__PURE__ */ r("span", { className: "material-icons-round", onClick: () => S(), children: "skip_next" })
          ] }),
          /* @__PURE__ */ d("div", { className: t.volumeContainer, children: [
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
    /* @__PURE__ */ r("div", { className: t.playlistScroll, children: /* @__PURE__ */ r("ul", { children: o.map((e) => /* @__PURE__ */ d(
      "li",
      {
        className: t.playlistScrollItem,
        onClick: () => {
          s && (e.id === s.id ? N() : M(e, !0));
        },
        children: [
          /* @__PURE__ */ d("div", { className: t.miniCover, children: [
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
          /* @__PURE__ */ d("div", { className: t.playlistTextContainer, children: [
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
    const c = new Audio(o);
    c.preload = "metadata", c.src = o, c.addEventListener("loadedmetadata", () => {
      const _ = c.duration;
      c.src = "", u(P(_));
    }), c.addEventListener("error", () => {
      u("--:--");
    });
  });
}
function P(o) {
  const u = String(Math.floor(o / 60));
  let c = String(Math.floor(o % 60));
  return c.length < 2 && (c = "0" + c), u + ":" + c;
}
export {
  Pe as AudioPlayer
};
