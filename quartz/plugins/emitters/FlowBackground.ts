/**
 * FlowBackground - a Quartz 4.4.0 emitter plugin that mounts the animated
 * moving-lines background of the qbit design system (drifting nodes linked by
 * integration edges, comet pulses travelling along them). Clicking empty
 * background space connects two new nodes.
 *
 * How it works: Quartz builds one shared StaticResources object per build and
 * hands it to every emitter in registration order (quartz/processors/emit.ts
 * -> emitContent). This plugin pushes an inline `afterDOMReady` script with
 * `spaPreserve: true` into that object, so every page emitter that runs after
 * it (ContentPage, FolderPage, TagPage, 404, ...) renders the script at the
 * end of <body>. Because the tag carries spa-preserve, the SPA router keeps
 * it and does not re-execute it on navigation - the background mounts once
 * per full page load (with a defensive guard just in case).
 *
 * The script reads its colors from the theme tokens `--canvas-primary` /
 * `--canvas-secondary` (RGB triplets, defined in quartz/styles/variables.scss
 * per theme) and re-reads them when Quartz's dark/light toggle flips the
 * `saved-theme` attribute on <html>. It pauses on hidden tabs and renders a
 * single static frame under prefers-reduced-motion. Its container styles
 * (.flow, .flow__canvas, .flow__glow) live in quartz/styles/custom.scss.
 *
 * Wiring (quartz.config.ts of Quartz 4.4.0):
 *
 *   import { FlowBackground } from "./quartz/plugins/emitters/FlowBackground"
 *   ...
 *   plugins: {
 *     ...
 *     emitters: [
 *       FlowBackground(),          // FIRST - before the page emitters
 *       ComponentResources(),
 *       ContentPage(),
 *       ...your other emitters
 *     ],
 *   }
 *
 * Place this file at: quartz/plugins/emitters/FlowBackground.ts
 */

import { FilePath } from "../../util/path"
import { QuartzEmitterPlugin } from "../types"

interface Options {
  /** Set to false to switch the background off without removing the plugin. */
  enabled?: boolean
}

const flowBackgroundScript = `
(function () {
  'use strict';

  // Mount only once, even if the script is re-evaluated.
  if (document.querySelector('.flow')) { return; }

  var NODE_COUNT = 18;
  var canvasPrimary = '64, 156, 255';
  var canvasSecondary = '178, 122, 255';

  var container = null;
  var canvas = null;
  var nodes = [];
  var edges = [];
  var pulses = [];
  var pendingNodeIndex = null;

  var animationFrameId = null;
  var lastTimestamp = null;
  var width = 0;
  var height = 0;
  var themeObserver = null;

  function mount() {
    container = document.createElement('div');
    container.className = 'flow';
    container.setAttribute('aria-hidden', 'true');

    canvas = document.createElement('canvas');
    canvas.className = 'flow__canvas';

    var glowPrimary = document.createElement('div');
    glowPrimary.className = 'flow__glow flow__glow--primary';
    var glowSecondary = document.createElement('div');
    glowSecondary.className = 'flow__glow flow__glow--secondary';

    container.append(canvas, glowPrimary, glowSecondary);
    document.body.prepend(container);
  }

  function readThemeSettings() {
    var styles = getComputedStyle(document.documentElement);
    var primary = styles.getPropertyValue('--canvas-primary').trim();
    var secondary = styles.getPropertyValue('--canvas-secondary').trim();
    if (primary) { canvasPrimary = primary; }
    if (secondary) { canvasSecondary = secondary; }
  }

  function random(min, max) {
    return min + Math.random() * (max - min);
  }

  function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function createPulse(edgeIndex) {
    return {
      edge: typeof edgeIndex === 'number' ? edgeIndex : Math.floor(Math.random() * edges.length),
      t: Math.random(),
      speed: random(0.045, 0.12),
      size: random(1.4, 2.6),
      color: Math.random() > 0.3 ? canvasPrimary : canvasSecondary,
      direction: Math.random() > 0.5 ? 1 : -1
    };
  }

  // Distribute nodes across the canvas and connect each of them to its
  // closest neighbours - the integration edges
  function buildGraph() {
    nodes = [];
    edges = [];
    pulses = [];
    pendingNodeIndex = null;

    var nodeCount = Math.max(10, Math.min(NODE_COUNT, Math.floor(width / 80)));

    for (var i = 0; i < nodeCount; i++) {
      var x = random(0.04, 0.96) * width;
      var y = random(0.04, 0.96) * height;
      nodes.push({
        baseX: x,
        baseY: y,
        x: x,
        y: y,
        radius: random(1.8, 4),
        phase: random(0, Math.PI * 2),
        driftSpeed: random(0.1, 0.35),
        isPending: false
      });
    }

    nodes.forEach(function (node, i) {
      var neighbours = nodes
        .map(function (other, j) {
          return {
            index: j,
            distance: Math.hypot(other.baseX - node.baseX, other.baseY - node.baseY)
          };
        })
        .filter(function (n) { return n.index !== i; })
        .sort(function (a, b) { return a.distance - b.distance; });

      for (var k = 0; k < 2 && k < neighbours.length; k++) {
        var target = neighbours[k].index;
        var exists = edges.some(function (edge) {
          return (edge.from === i && edge.to === target) || (edge.from === target && edge.to === i);
        });
        if (!exists) { edges.push({ from: i, to: target }); }
      }
    });

    var pulseCount = Math.ceil(edges.length / 2);
    for (var p = 0; p < pulseCount; p++) { pulses.push(createPulse()); }
  }

  function drawFrame(ctx, delta, time) {
    ctx.clearRect(0, 0, width, height);

    // Nodes drift gently around their base position
    nodes.forEach(function (node) {
      node.x = node.baseX + Math.sin(time * node.driftSpeed + node.phase) * 12;
      node.y = node.baseY + Math.cos(time * node.driftSpeed * 0.7 + node.phase) * 9;
    });

    // Edges
    ctx.lineWidth = 1;
    edges.forEach(function (edge) {
      var from = nodes[edge.from];
      var to = nodes[edge.to];
      ctx.beginPath();
      ctx.moveTo(from.x, from.y);
      ctx.lineTo(to.x, to.y);
      ctx.strokeStyle = 'rgba(' + canvasPrimary + ', 0.08)';
      ctx.stroke();
    });

    // Data pulses travelling along the edges
    pulses.forEach(function (pulse, i) {
      var edge = edges[pulse.edge];
      if (!edge) {
        pulses[i] = createPulse();
        return;
      }

      pulse.t += (pulse.speed * delta * pulse.direction) / 1000;
      if (pulse.t >= 1 || pulse.t <= 0) {
        pulses[i] = createPulse();
        return;
      }

      var from = nodes[edge.from];
      var to = nodes[edge.to];
      var color = pulse.color;

      var x = from.x + (to.x - from.x) * pulse.t;
      var y = from.y + (to.y - from.y) * pulse.t;

      // Comet trail
      var dx = to.x - from.x;
      var dy = to.y - from.y;
      var length = Math.hypot(dx, dy) || 1;
      var trailLength = Math.min(34, length * 0.18);
      var tailX = x - (dx / length) * trailLength * pulse.direction;
      var tailY = y - (dy / length) * trailLength * pulse.direction;

      var trail = ctx.createLinearGradient(tailX, tailY, x, y);
      trail.addColorStop(0, 'rgba(' + color + ', 0)');
      trail.addColorStop(1, 'rgba(' + color + ', 0.35)');

      ctx.beginPath();
      ctx.moveTo(tailX, tailY);
      ctx.lineTo(x, y);
      ctx.strokeStyle = trail;
      ctx.lineWidth = 1.6;
      ctx.stroke();

      // Glowing packet head
      ctx.beginPath();
      ctx.arc(x, y, pulse.size, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(' + color + ', 0.9)';
      ctx.shadowColor = 'rgba(' + color + ', 0.9)';
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;
    });

    // Nodes - the connected systems
    nodes.forEach(function (node) {
      if (node.isPending) {
        // First click waiting for its counterpart: pulsing ring
        var pulse = 2.5 + Math.sin(time * 4) * 2;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(' + canvasSecondary + ', 0.5)';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius + 3 + pulse, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(' + canvasSecondary + ', 0.5)';
        ctx.lineWidth = 1.2;
        ctx.stroke();
        return;
      }

      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(' + canvasPrimary + ', 0.3)';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius + 2.5, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(' + canvasPrimary + ', 0.16)';
      ctx.lineWidth = 1;
      ctx.stroke();
    });
  }

  function draw(timestamp) {
    var ctx = canvas ? canvas.getContext('2d') : null;
    if (!canvas || !ctx) { return; }

    if (lastTimestamp === null) { lastTimestamp = timestamp; }
    var delta = Math.min(50, timestamp - lastTimestamp);
    lastTimestamp = timestamp;

    drawFrame(ctx, delta, timestamp / 1000);
    animationFrameId = window.requestAnimationFrame(draw);
  }

  function renderStaticFrame() {
    var ctx = canvas ? canvas.getContext('2d') : null;
    if (ctx) { drawFrame(ctx, 0, window.performance.now() / 1000); }
  }

  function addNodeAt(x, y) {
    nodes.push({
      baseX: x,
      baseY: y,
      x: x,
      y: y,
      radius: 3,
      phase: random(0, Math.PI * 2),
      driftSpeed: 0.25,
      isPending: true
    });
    return nodes.length - 1;
  }

  // Never place interactive nodes on top of controls a user interacts with
  function isInteractiveTarget(target) {
    return (
      target instanceof Element &&
      target.closest(
        'a, button, input, textarea, select, label, nav, footer, header, table, pre, blockquote, .dropdown, .toolbar, .sidebar, .page-header, .toc, .callout, .search, .graph'
      ) !== null
    );
  }

  function handleBackgroundClick(event) {
    if (event.button !== 0 || isInteractiveTarget(event.target)) { return; }

    if (pendingNodeIndex === null) {
      pendingNodeIndex = addNodeAt(event.clientX, event.clientY);
    } else {
      var fromIndex = pendingNodeIndex;
      pendingNodeIndex = null;
      nodes[fromIndex].isPending = false;

      var toIndex = addNodeAt(event.clientX, event.clientY);
      nodes[toIndex].isPending = false;

      var edgeIndex = edges.length;
      edges.push({ from: fromIndex, to: toIndex });
      pulses.push(createPulse(edgeIndex));
      pulses.push(createPulse(edgeIndex));
    }

    if (prefersReducedMotion()) { renderStaticFrame(); }
  }

  function resize() {
    if (!canvas) { return; }

    var dpr = window.devicePixelRatio || 1;
    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';

    var ctx = canvas.getContext('2d');
    if (ctx) { ctx.setTransform(dpr, 0, 0, dpr, 0, 0); }

    buildGraph();

    if (prefersReducedMotion()) { renderStaticFrame(); }
  }

  function start() {
    if (animationFrameId === null) {
      lastTimestamp = null;
      animationFrameId = window.requestAnimationFrame(draw);
    }
  }

  function stop() {
    if (animationFrameId !== null) {
      window.cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
  }

  // A single static frame is rendered when a user prefers reduced motion.
  function updateAnimationState() {
    if (prefersReducedMotion()) {
      stop();
      renderStaticFrame();
    } else {
      start();
    }
  }

  function bindEvents() {
    window.addEventListener('resize', resize);
    window.addEventListener('click', handleBackgroundClick);
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) { stop(); } else { updateAnimationState(); }
    });

    // Quartz's dark/light toggle flips the saved-theme attribute on <html>;
    // re-read the canvas colors when that happens.
    themeObserver = new MutationObserver(function () {
      readThemeSettings();
      updateAnimationState();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['saved-theme', 'class', 'data-theme']
    });
  }

  mount();
  readThemeSettings();
  resize();
  bindEvents();
  updateAnimationState();
})();
`

export const FlowBackground: QuartzEmitterPlugin<Options> = (opts) => {
  const enabled = opts?.enabled ?? true

  return {
    name: "FlowBackground",
    async emit(_ctx, _content, resources): Promise<FilePath[]> {
      if (enabled) {
        resources.js.push({
          loadTime: "afterDOMReady",
          contentType: "inline",
          spaPreserve: true,
          script: flowBackgroundScript,
        })
      }
      return []
    },
    getQuartzComponents() {
      return []
    },
  }
}