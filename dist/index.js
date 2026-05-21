import { jsx as n, Fragment as L, jsxs as c } from "react/jsx-runtime";
import { useState as v, useRef as Q, useCallback as d, useEffect as h } from "react";
const se = "_wrapper_1p7b9_1", ie = "_spacer_1p7b9_21", ce = "_current_1p7b9_25", le = "_currentControls_1p7b9_33", de = "_controlBtn_1p7b9_41", ue = "_iconButton_1p7b9_42", me = "_musicImage_1p7b9_46", ve = "_musicTitles_1p7b9_58", pe = "_songName_1p7b9_58", he = "_artistName_1p7b9_64", _e = "_progressDetails_1p7b9_71", fe = "_progressBar_1p7b9_93", ge = "_progressTooltip_1p7b9_117", be = "_time_1p7b9_131", ye = "_centeredButtons_1p7b9_148", Ne = "_volumeIcon_1p7b9_175", we = "_playOverlay_1p7b9_176", Se = "_playPauseButton_1p7b9_183", Le = "_volumeContainer_1p7b9_187", Ee = "_volumeSlider_1p7b9_204", Ce = "_hoverArea_1p7b9_219", Te = "_playlistScroll_1p7b9_239", Be = "_playlistScrollItem_1p7b9_259", Ie = "_miniCover_1p7b9_270", Me = "_overlay_1p7b9_281", Pe = "_playlistTextContainer_1p7b9_312", ke = "_song_1p7b9_58", xe = "_artist_1p7b9_64", De = "_playlistSongLength_1p7b9_332", Ae = "_mainSong_1p7b9_341", o = {
  wrapper: se,
  spacer: ie,
  current: ce,
  currentControls: le,
  controlBtn: de,
  iconButton: ue,
  musicImage: me,
  musicTitles: ve,
  songName: pe,
  artistName: he,
  progressDetails: _e,
  progressBar: fe,
  progressTooltip: ge,
  time: be,
  centeredButtons: ye,
  volumeIcon: Ne,
  playOverlay: we,
  playPauseButton: Se,
  volumeContainer: Le,
  volumeSlider: Ee,
  hoverArea: Ce,
  playlistScroll: Te,
  playlistScrollItem: Be,
  miniCover: Ie,
  overlay: Me,
  playlistTextContainer: Pe,
  song: ke,
  artist: xe,
  playlistSongLength: De,
  mainSong: Ae
};
function $e({ playlist: t }) {
  const [i, l] = v(!1), [f, g] = v(!1), [C, Y] = v(() => typeof window > "u" ? null : sessionStorage.getItem("currentSongId")), [$, P] = v(0), [k, Z] = v(1), [H, F] = v({}), [m, T] = v(!1), [V, x] = v(null), [U, D] = v(null), [j, K] = v(0), s = Q(null), b = Q(null), a = ze(t, C), ee = a && j ? $ / j * 100 : 0;
  function ne(e) {
    const r = parseFloat(e.target.value);
    Z(r), s.current && (s.current.volume = r);
  }
  const y = d((e, r = !1) => {
    s.current && (s.current.pause(), P(0), K(0)), r && g(!0), Y(e.id);
  }, []), A = d((e) => {
    s.current && (s.current.currentTime = e), P(e);
  }, []), N = d((e) => {
    if (!s.current || !b.current || !Number.isFinite(s.current.duration) || s.current.duration <= 0) return;
    const r = b.current.getBoundingClientRect(), u = e.clientX - r.left, p = Math.min(Math.max(u / r.width, 0), 1), w = p * s.current.duration;
    A(w), D(p * r.width), x(E(w));
  }, [A]), W = d((e) => {
    if (!s.current?.duration || !b.current) return;
    const r = b.current.getBoundingClientRect(), u = Math.min(Math.max((e.clientX - r.left) / r.width, 0), 1), p = s.current.duration * u;
    D(u * r.width), x(E(p));
  }, []);
  function te() {
    T(!0);
  }
  const X = d(() => {
    m && T(!1);
  }, [m]), B = d((e) => {
    m ? N(e) : W(e);
  }, [W, N, m]);
  function re(e) {
    T(!0), N(e.touches[0]);
  }
  const z = d((e) => {
    m && N(e.touches[0]);
  }, [N, m]), O = d(() => {
    m && T(!1);
  }, [m]);
  function oe() {
    x(null), D(null);
  }
  const q = d(() => {
    s.current?.play().catch((e) => {
      console.warn("Playback failed:", e);
    });
  }, []), G = d(() => {
    s.current?.pause();
  }, []), I = d(() => {
    i ? G() : q();
  }, [i, G, q]), M = d((e = !1) => {
    if (a && t.length > 0) {
      let r = t.findIndex((u) => u.id === a.id);
      r >= 0 && (r = (r + 1) % t.length, y(t[r], i || e));
    }
  }, [a, y, i, t]), ae = d(() => {
    if (a && t.length > 0) {
      let e = t.findIndex((r) => r.id === a.id);
      e >= 0 && (e = (e - 1 + t.length) % t.length, y(t[e], i));
    }
  }, [a, y, i, t]);
  return h(() => {
    const e = s.current;
    if (!e || !a) return;
    typeof window < "u" && sessionStorage.setItem("currentSongId", String(a.id));
    const r = () => M(!0), u = () => M(!0), p = () => P(e.currentTime), w = () => {
      K(e.duration), F((R) => ({
        ...R,
        [_(a.id)]: E(e.duration)
      }));
    }, J = () => {
      e.src.includes(a.src) && (f && e.paused && e.play().catch((R) => {
        console.warn("Playback failed:", R);
      }), g(!1));
    };
    return e.addEventListener("loadeddata", J), e.addEventListener("loadedmetadata", w), e.addEventListener("timeupdate", p), e.addEventListener("ended", r), e.addEventListener("error", u), () => {
      e.removeEventListener("loadeddata", J), e.removeEventListener("loadedmetadata", w), e.removeEventListener("timeupdate", p), e.removeEventListener("ended", r), e.removeEventListener("error", u);
    };
  }, [a, M, t, f]), h(() => {
    if (!(typeof window > "u")) {
      if (!t.length) {
        s.current?.pause(), sessionStorage.removeItem("currentSongId");
        return;
      }
      t.forEach((e) => {
        e?.src && Xe(e.src).then((r) => {
          F((u) => ({
            ...u,
            [_(e.id)]: r
          }));
        });
      });
    }
  }, [t]), h(() => {
    if (m)
      return window.addEventListener("mousemove", B), window.addEventListener("mouseup", X), window.addEventListener("touchmove", z), window.addEventListener("touchend", O), () => {
        window.removeEventListener("mousemove", B), window.removeEventListener("mouseup", X), window.removeEventListener("touchmove", z), window.removeEventListener("touchend", O);
      };
  }, [B, X, O, z, m]), h(() => {
    s.current && (s.current.volume = k);
  }, [k]), h(() => {
    const e = (r) => {
      r.code === "Space" && !["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName ?? "") && (r.preventDefault(), I());
    };
    return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
  }, [I]), h(() => {
    const e = s.current;
    if (!e) return;
    const r = () => l(!e.paused);
    return e.addEventListener("play", r), e.addEventListener("pause", r), e.addEventListener("ended", r), () => {
      e.removeEventListener("play", r), e.removeEventListener("pause", r), e.removeEventListener("ended", r);
    };
  }, []), /* @__PURE__ */ n(L, { children: /* @__PURE__ */ c("div", { className: o.wrapper, children: [
    /* @__PURE__ */ c("div", { className: o.current, children: [
      /* @__PURE__ */ n("div", { className: o.imageWrapper, children: /* @__PURE__ */ n("div", { className: o.musicImage, children: a?.cover && /* @__PURE__ */ n(
        "img",
        {
          src: a.cover,
          alt: "Album cover art"
        }
      ) }) }),
      /* @__PURE__ */ c("div", { className: o.currentControls, children: [
        /* @__PURE__ */ c("div", { className: o.musicTitles, children: [
          /* @__PURE__ */ n("div", { className: o.songName, children: a?.title || "" }),
          /* @__PURE__ */ n("div", { className: o.artistName, children: a?.artist || "" })
        ] }),
        /* @__PURE__ */ n("div", { className: o.spacer }),
        /* @__PURE__ */ c("div", { className: o.time, children: [
          /* @__PURE__ */ n("span", { className: o.currentTime, children: E(a ? $ : 0) }),
          /* @__PURE__ */ n("span", { className: o.finalTime, children: a && H[_(a.id)] || "" })
        ] }),
        /* @__PURE__ */ c(
          "div",
          {
            className: o.progressDetails,
            ref: b,
            onMouseDown: te,
            onTouchStart: re,
            onMouseMove: B,
            onMouseLeave: oe,
            onClick: (e) => {
              if (!s.current?.duration) return;
              const r = e.currentTarget.getBoundingClientRect(), p = (e.clientX - r.left) / r.width * s.current.duration;
              A(p);
            },
            children: [
              /* @__PURE__ */ n(
                "div",
                {
                  className: o.progressBar,
                  style: { width: ee + "%" },
                  children: /* @__PURE__ */ n("span", {})
                }
              ),
              V !== null && (m || U !== null) && /* @__PURE__ */ n(
                "div",
                {
                  className: o.progressTooltip,
                  style: { left: U ?? 0 },
                  children: V
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ c("div", { className: o.controlBtn, children: [
          /* @__PURE__ */ c("div", { className: o.centeredButtons, children: [
            /* @__PURE__ */ n(
              "button",
              {
                type: "button",
                className: o.iconButton,
                "aria-label": "Previous track",
                onClick: ae,
                children: /* @__PURE__ */ n(S, { name: "prev" })
              }
            ),
            /* @__PURE__ */ n("div", { className: o.playPause, children: /* @__PURE__ */ n(
              "button",
              {
                type: "button",
                className: `${o.iconButton} ${o.playPauseButton}`,
                "aria-label": i ? "Pause" : "Play",
                onClick: I,
                children: /* @__PURE__ */ n(S, { name: i ? "pause" : "play" })
              }
            ) }),
            /* @__PURE__ */ n(
              "button",
              {
                type: "button",
                className: o.iconButton,
                "aria-label": "Next track",
                onClick: () => M(),
                children: /* @__PURE__ */ n(S, { name: "next" })
              }
            )
          ] }),
          /* @__PURE__ */ c("div", { className: o.volumeContainer, children: [
            /* @__PURE__ */ n(
              "span",
              {
                className: o.volumeIcon,
                id: "volume",
                "aria-hidden": "true",
                children: /* @__PURE__ */ n(S, { name: "volume" })
              }
            ),
            /* @__PURE__ */ n("div", { className: o.hoverArea }),
            /* @__PURE__ */ n(
              "input",
              {
                type: "range",
                className: o.volumeSlider,
                id: "volumeSlider",
                min: "0",
                max: "1",
                step: "0.01",
                value: k,
                onChange: ne
              }
            )
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ n("div", { className: o.playlistScroll, children: /* @__PURE__ */ n("ul", { children: t.map((e) => /* @__PURE__ */ n("li", { children: /* @__PURE__ */ c(
      "button",
      {
        type: "button",
        className: o.playlistScrollItem,
        onClick: () => {
          a && e.id === a.id ? I() : y(e, !0);
        },
        "aria-label": `${a && e.id === a.id && i ? "Pause" : "Play"} ${e.title} by ${e.artist}`,
        children: [
          /* @__PURE__ */ c("div", { className: o.miniCover, children: [
            e.cover && /* @__PURE__ */ n(
              "img",
              {
                src: e.cover,
                alt: `${e.title} cover`
              }
            ),
            /* @__PURE__ */ n("div", { className: o.overlay }),
            /* @__PURE__ */ n("span", { className: o.playOverlay, children: /* @__PURE__ */ n(S, { name: "play" }) })
          ] }),
          /* @__PURE__ */ c("div", { className: o.playlistTextContainer, children: [
            /* @__PURE__ */ n("span", { className: o.song, children: e.title }),
            /* @__PURE__ */ n("span", { className: o.artist, children: e.artist })
          ] }),
          /* @__PURE__ */ n("div", { className: o.spacer }),
          /* @__PURE__ */ n("span", { className: o.playlistSongLength, children: H[_(e.id)] || "loading..." })
        ]
      }
    ) }, e.id)) }) }),
    /* @__PURE__ */ n(
      "audio",
      {
        ref: s,
        className: o.mainSong,
        src: a?.src,
        preload: "auto"
      }
    )
  ] }) });
}
function Xe(t) {
  return new Promise((i) => {
    const l = new Audio(t);
    function f() {
      l.removeEventListener("loadedmetadata", g), l.removeEventListener("error", C), l.src = "";
    }
    function g() {
      i(E(l.duration)), f();
    }
    function C() {
      i("--:--"), f();
    }
    l.addEventListener("loadedmetadata", g), l.addEventListener("error", C);
  });
}
function E(t) {
  if (!Number.isFinite(t) || t < 0) return "0:00";
  const i = Math.floor(t / 60);
  let l = String(Math.floor(t % 60));
  return l.length < 2 && (l = "0" + l), i + ":" + l;
}
function ze(t, i) {
  return t.length ? i === null ? t[0] : t.find((l) => _(l.id) === _(i)) ?? t[0] : null;
}
function _(t) {
  return String(t);
}
function S({ name: t }) {
  return /* @__PURE__ */ c(
    "svg",
    {
      "aria-hidden": "true",
      viewBox: "0 0 24 24",
      focusable: "false",
      children: [
        t === "prev" && /* @__PURE__ */ c(L, { children: [
          /* @__PURE__ */ n("path", { d: "M6 5h2v14H6z" }),
          /* @__PURE__ */ n("path", { d: "m19 6-9 6 9 6z" })
        ] }),
        t === "next" && /* @__PURE__ */ c(L, { children: [
          /* @__PURE__ */ n("path", { d: "M16 5h2v14h-2z" }),
          /* @__PURE__ */ n("path", { d: "m5 6 9 6-9 6z" })
        ] }),
        t === "play" && /* @__PURE__ */ n("path", { d: "m8 5 11 7-11 7z" }),
        t === "pause" && /* @__PURE__ */ c(L, { children: [
          /* @__PURE__ */ n("path", { d: "M7 5h4v14H7z" }),
          /* @__PURE__ */ n("path", { d: "M13 5h4v14h-4z" })
        ] }),
        t === "volume" && /* @__PURE__ */ c(L, { children: [
          /* @__PURE__ */ n("path", { d: "M4 9v6h4l5 4V5L8 9z" }),
          /* @__PURE__ */ n(
            "path",
            {
              d: "M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12",
              fill: "none",
              stroke: "currentColor",
              strokeLinecap: "round",
              strokeWidth: "2"
            }
          )
        ] })
      ]
    }
  );
}
export {
  $e as AudioPlayer
};
