import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import vm from "node:vm";

const demoDir = resolve(dirname(new URL(import.meta.url).pathname), "..");
const appSource = readFileSync(join(demoDir, "assets/app.js"), "utf8");
const cssSource = readFileSync(join(demoDir, "assets/styles.css"), "utf8");

const pages = [
  ["index.html", "home", ""],
  ["single.html", "choose", "single"],
  ["color.html", "choose", "color"],
  ["deluxe.html", "choose", "deluxe"],
  ["guide-single.html", "guide", "single"],
  ["guide-color.html", "guide", "color"],
  ["guide-deluxe.html", "guide", "deluxe"],
  ["video-single.html", "video", "single"],
  ["video-color.html", "video", "color"],
  ["video-deluxe.html", "video", "deluxe"],
  ["downloads-single.html", "downloads", "single"],
  ["downloads-color.html", "downloads", "color"],
  ["downloads-deluxe.html", "downloads", "deluxe"],
];

function render(page, kit) {
  const root = { innerHTML: "" };
  const bodyClasses = new Set();
  const body = {
    getAttribute(name) {
      if (name === "data-page") return page;
      if (name === "data-kit") return kit;
      return null;
    },
    classList: {
      add(name) { bodyClasses.add(name); },
      remove(name) { bodyClasses.delete(name); },
    },
  };
  const document = {
    title: "",
    body,
    documentElement: { scrollHeight: 1000 },
    getElementById(id) { return id === "site-root" ? root : null; },
    querySelector() { return null; },
    querySelectorAll() { return []; },
    addEventListener() {},
  };
  const window = {
    location: { href: `file://${demoDir}/index.html`, protocol: "file:", host: "" },
    innerHeight: 800,
    scrollY: 0,
    addEventListener() {},
    setTimeout(fn) { fn(); },
  };
  const context = {
    document,
    window,
    URL,
    localStorage: { setItem() {} },
    requestAnimationFrame(fn) { fn(); },
    setTimeout(fn) { fn(); },
    console,
  };
  vm.runInNewContext(appSource, context, { filename: "assets/app.js" });
  assert.ok(root.innerHTML.length > 500, `${page}/${kit} should render content`);
  assert.ok(bodyClasses.has("is-ready"), `${page}/${kit} should become ready`);
  return root.innerHTML;
}

function localTargets(markup) {
  const targets = [];
  for (const match of markup.matchAll(/(?:href|src)='([^']+)'/g)) {
    const value = match[1];
    if (/^(?:https?:|#|data:|mailto:|tel:)/.test(value)) continue;
    targets.push(value.split(/[?#]/)[0]);
  }
  return targets;
}

const rendered = new Map();

for (const [file, page, kit] of pages) {
  const wrapper = readFileSync(join(demoDir, file), "utf8");
  assert.match(wrapper, new RegExp(`data-page="${page}" data-kit="${kit}"`));
  assert.match(wrapper, /assets\/styles\.css/);
  assert.match(wrapper, /assets\/app\.js/);

  const markup = render(page, kit);
  rendered.set(file, markup);
  for (const target of localTargets(markup)) {
    assert.ok(existsSync(join(demoDir, target)), `${file}: missing local target ${target}`);
  }
}

for (const kit of ["single", "color", "deluxe"]) {
  const choose = rendered.get(`${kit}.html`);
  assert.match(choose, /在线快速使用指南/);
  assert.match(choose, /开箱视频/);
  assert.match(choose, /PDF 快速指南/);

  const guide = rendered.get(`guide-${kit}.html`);
  assert.match(guide, /data-toc-link=/);
  assert.match(guide, /日常维护与使用技巧/);
  assert.doesNotMatch(guide, /<iframe/);

  const video = rendered.get(`video-${kit}.html`);
  assert.match(video, /player\.bilibili\.com/);
  assert.match(video, /www\.bilibili\.com\/video\/BV1tK5Q6cEJM/);
  assert.match(video, /www\.youtube\.com\/watch\?v=E7UKRsn_N2g/);
}

for (const [kit, expected] of [["single", 1], ["color", 2], ["deluxe", 3]]) {
  const markup = rendered.get(`downloads-${kit}.html`);
  assert.equal((markup.match(/打开并下载 PDF/g) || []).length, expected);
}

assert.match(rendered.get("guide-color.html"), /CMYK 喷墨模组/);
assert.doesNotMatch(rendered.get("guide-color.html"), /id='ra3-/);
assert.match(rendered.get("guide-deluxe.html"), /id='ra3-/);

assert.equal((cssSource.match(/{/g) || []).length, (cssSource.match(/}/g) || []).length, "CSS braces should balance");

console.log(`Validated ${pages.length} HTML pages, all local targets, kit branches, videos, and PDF counts.`);
