// Vietnamese landmarks rendered as procedural particle surfaces. Units are metres, y is up.
import { boxEdges, boxSurface, cylinder, ellipsoid, line, paramSurface, polyline, quad, revolve, TAU, tri, tube } from '../lib/sampling.js';
import { linspace } from '../lib/vec.js';

/** Cam Ranh International Airport: terminal, runway, control tower, and a parked airliner. */
function camRanhInternationalAirport() {
  const P = [];
  P.push(quad([-175, 0, -48], [175, 0, -48], [175, 0, -12], [-175, 0, -12], 0.16));
  P.push(polyline([[-165, .25, -30], [-125, .25, -30], [-85, .25, -30], [-45, .25, -30], [-5, .25, -30], [35, .25, -30], [75, .25, -30], [115, .25, -30], [155, .25, -30]], 0, 3));
  P.push(quad([-160, .05, 0], [155, .05, 0], [155, .05, 31], [-160, .05, 31], .12));

  P.push(boxSurface([0, 10, 37], [250, 20, 28], .32), boxEdges([0, 10, 37], [250, 20, 28], 0, 2.5));
  const roof = (u, v) => [-132 + 264 * u, 21 + 5.5 * Math.sin(u * Math.PI) ** 1.5 + 1.1 * Math.cos(v * TAU), 19 + 37 * v];
  P.push(paramSurface(roof, 0, 1, 0, 1, { density: .8, gu: 42, gv: 14 }));
  for (const x of linspace(-120, 120, 13)) P.push(polyline([[x, 1, 23], [x, 21.5, 23], [x, 25, 37], [x, 21.5, 51]], 0, 2.1));
  for (const z of [23, 37, 51]) P.push(line([-130, 21.5, z], [130, 21.5, z], 0, 2));

  P.push(cylinder([104, 0, 48], 4.2, 36, { density: 1.4 }));
  P.push(revolve([36, 40, 43], [5.2, 7.3, 4.5], { center: [104, 0, 48], density: 1.5 }));
  P.push(line([104, 43, 48], [104, 49, 48], 0, 4));
  for (const x of [-58, 28]) P.push(boxSurface([x, 5, 8], [10, 8, 30], .45), boxEdges([x, 5, 8], [10, 8, 30], 0, 2));

  const ax = -62, az = -18;
  P.push(tube([ax - 24, 2.7, az], [ax + 25, 2.7, az], 2.2, 1, 1.8), ellipsoid([ax + 27, 2.7, az], [3.6, 1.6, 1.2], 1.8));
  P.push(quad([ax - 4, 2.7, az - 1], [ax + 11, 2.7, az - 1], [ax + 1, 2.7, az - 25], [ax - 13, 2.7, az - 25], 1.1));
  P.push(quad([ax - 4, 2.7, az + 1], [ax + 11, 2.7, az + 1], [ax + 1, 2.7, az + 25], [ax - 13, 2.7, az + 25], 1.1));
  P.push(tri([ax - 20, 3, az], [ax - 28, 13, az], [ax - 15, 3, az], 1.3));
  return P;
}

/**
 * Photo-based reconstruction: five curved facade bays with pointed glazed openings,
 * a compact petal crown and a closed bud. Proportions are visual, not survey dimensions.
 * References: vinwonders.com/vi/wonderpedia/news/thap-tram-huong-nha-trang/
 * and PLO's January 2023 restoration photographs; colours follow the supplied night photo.
 */
function agarwoodTowerGroups() {
  const base = [], white = [], glass = [], crown = [], crownWindows = [], flame = [], frames = [];
  // Low circular podium and broad front staircase.
  base.push(revolve([0, 1, 2, 3], [34, 34, 30, 28], { density: .25 }));
  for (let i = 0; i < 9; i++) {
    base.push(boxSurface([0, .18 * (i + 1), 34 - i * .85], [21, .36 * (i + 1), .85], .55));
  }
  const bays = 5, step = TAU / bays;
  // Full lower body with a gentle waist; the facade must not narrow to a stalk.
  const facadeRadius = (y) => 19.4 - 2.1 * Math.sin(Math.PI * Math.min(1, y / 66));
  // Each bay is a continuous curved wall ABOVE and beside a pointed window.
  // This makes the broad interlocking arches visible, rather than isolated triangular fins.
  for (let i = 0; i < bays; i++) {
    const angle = i * step;
    const top = (u) => 56 + 10 * (1 - Math.abs(u) ** 1.15);
    const bottom = (u) => Math.abs(u) < .62
      ? 3 + 46 * (1 - (Math.abs(u) / .62) ** 1.5) : 3;
    const surface = (u, v, inset = 0) => {
      const y = bottom(u) + (top(u) - bottom(u)) * v;
      const r = facadeRadius(y) - inset;
      const a = angle + u * step * .5;
      return [r * Math.sin(a), y, r * Math.cos(a)];
    };
    white.push(paramSurface((u, v) => surface(u, v), -1, 1, 0, 1, { density: 1, gu: 48, gv: 26 }));
    // Thin return surfaces lend the exposed edges depth when the tower turns.
    for (const edge of [-1, 1]) {
      white.push(paramSurface((v, d) => surface(edge, v, d), 0, 1, 0, .6, { density: .7 }));
    }
    frames.push(polyline(linspace(-1, 1, 70).map((u) => surface(u, 1)), 0, .8));
    frames.push(polyline(linspace(-.62, .62, 60).map((u) => surface(u, 0)), 0, .8));
    // Only sample glass in the openings, avoiding a luminous box through the solid facade.
    const windowPoint = (u, v) => {
      const y = 3 + (bottom(u) - 3) * v;
      const a = angle + u * step * .5;
      const r = facadeRadius(y) - .55;
      return [r * Math.sin(a), y, r * Math.cos(a)];
    };
    glass.push(paramSurface(windowPoint, -.62, .62, 0, 1, { density: .36, gu: 28, gv: 26 }));
    for (const y of [4, 12, 21, 30, 39]) {
      const umax = .62 * ((49 - y) / 46) ** (2 / 3);
      const r = facadeRadius(y) - .5;
      frames.push(polyline(linspace(-umax, umax, 30).map((u) => {
        const a = angle + u * step * .5;
        return [r * Math.sin(a), y, r * Math.cos(a)];
      }), 0, .65));
    }
    for (const u of [-.24, 0, .24]) {
      frames.push(polyline(linspace(0, 1, 25).map((v) => windowPoint(u, v)), 0, .6));
    }
  }
  // Five compact upper petals, with curved shoulders and pointed tips (not cones).
  // The real crown is pale concrete, punctuated by cool blue-green glazed cells;
  // it is deliberately not rendered as a gold/orange cap.
  for (let i = 0; i < bays; i++) {
    const center = (i + .5) * step;
    const petal = (u, v, offset = 0) => {
      const roof = 77 + 8 * (1 - Math.abs(u) ** 1.4);
      const y = 59 + (roof - 59) * v;
      const r = 8.1 + .9 * Math.sin(v * Math.PI) + offset;
      const a = center + u * step * .51;
      return [r * Math.sin(a), y, r * Math.cos(a)];
    };
    crown.push(paramSurface(petal, -1, 1, 0, 1, { density: .85, gu: 24, gv: 22 }));
    // The restored tower uses tall, narrow blue-green glazed openings,
    // separated by horizontal mullions. Keep them centered in each white petal
    // instead of covering the facade in a square grid.
    for (const [u0, u1] of [[-.42, -.035], [.035, .42]]) {
      for (const [v0, v1] of [[.16, .34], [.39, .57], [.62, .8]]) {
        crownWindows.push(paramSurface((u, v) => petal(u, v, .1), u0, u1, v0, v1,
          { density: .48, gu: 8, gv: 5 }));
      }
    }
    frames.push(polyline(linspace(-1, 1, 40).map((u) => petal(u, 1)), 0, .65));
  }
  // A closed, faceted lotus bud, broad at the foot and tapering continuously.
  const profile = (t) => 5.9 * (1 - t) * (1 + .9 * Math.sin(Math.PI * t));
  flame.push(paramSurface((a, t) => {
    const r = profile(t);
    return [r * Math.sin(a), 81 + 20 * t, r * Math.cos(a)];
  }, 0, TAU, 0, 1, { density: .7 }));
  for (let i = 0; i < 6; i++) {
    const a = i * TAU / 6;
    frames.push(polyline(linspace(0, 1, 35).map((t) => [
      profile(t) * Math.sin(a), 81 + 20 * t, profile(t) * Math.cos(a),
    ]), 0, .55));
  }
  frames.push(line([0, 101, 0], [0, 103, 0], 0, .7));
  // Rounded scroll/cloud sculptures. Each spiral is a tube, not a zigzag outline.
  for (let i = 0; i < bays; i++) {
    const a = (i + .5) * step, ca = Math.cos(a), sa = Math.sin(a);
    for (const side of [-1, 1]) {
      const path = linspace(0, 1, 50).map((t) => {
        const theta = -.65 * Math.PI + t * TAU * 1.15;
        const r = 4.3 * (1 - .86 * t);
        const x = side * (2.4 + r * Math.cos(theta));
        return [23 * sa + x * ca, 8.2 + r * Math.sin(theta), 23 * ca - x * sa];
      });
      for (let j = 0; j + 1 < path.length; j++) {
        const radius = 1.55 * (1 - .65 * j / path.length);
        base.push(tube(path[j], path[j + 1], radius, radius * .98, .8));
      }
      base.push(boxSurface([23 * sa + side * 2 * ca, 3.4, 23 * ca - side * 2 * sa], [3, 4, 3], .35));
    }
  }
  return [
    { parts: base, color: [.85, .79, .61] },
    { parts: white, color: [.9, .87, .76] },
    { parts: glass, color: [.06, .52, .7] },
    { parts: crown, color: [.82, .85, .82] },
    { parts: crownWindows, color: [.12, .58, .55] },
    { parts: flame, color: [.78, .76, .83] },
    { parts: frames, color: [.63, .7, .72] },
  ];
}
function agarwoodTower() { return agarwoodTowerGroups().flatMap((g) => g.parts); }

export const VIETNAM_WONDERS = [
  { name: 'Cam Ranh International Airport', build: camRanhInternationalAirport, color: [.35, .82, 1], fact: 'Khanh Hoa · terminal, runway & control tower' },
  { name: 'Agarwood Tower', build: agarwoodTower, color: [1, .48, .72], fact: 'Nha Trang, Khanh Hoa · lotus-inspired landmark' },
];

VIETNAM_WONDERS[1].buildColored = agarwoodTowerGroups;
VIETNAM_WONDERS[1].color = [1, .84, .42];
