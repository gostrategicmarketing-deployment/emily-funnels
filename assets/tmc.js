/* The Medicare Coach funnels: shared behaviour. Content is visible without this file. */
window.TMC = {
  // Live destinations (verified 2026-10-16). Swap here if the checkout moves.
  checkoutFull: "https://join.themedicarecoach.com/mec-bonus",      // $1,497 one-time (shows $2,500 struck)
  checkoutTwoPay: "https://go.themedicarecoach.com/mec-two-payments", // 2 x $749
  workshop: "https://go.themedicarecoach.com/free-workshop",
  phone: "785-537-6225"
};
document.documentElement.classList.add("js");

(function () {
  // Reveal: transform-only, so nothing is ever hidden if the observer never fires.
  var els = document.querySelectorAll(".rv");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -8% 0px" });
    els.forEach(function (el) { io.observe(el); });
  } else { els.forEach(function (el) { el.classList.add("in"); }); }

  // Count-up on stats. The final number is already in the markup.
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.querySelectorAll("[data-count]").forEach(function (el) {
    if (reduce || !("IntersectionObserver" in window)) return;
    var end = parseFloat(el.getAttribute("data-count")), suffix = el.getAttribute("data-suffix") || "";
    var o = new IntersectionObserver(function (es) {
      if (!es[0].isIntersecting) return; o.disconnect();
      var t0 = Date.now(), dur = 1200;
      (function tick() {
        var p = Math.min(1, (Date.now() - t0) / dur), v = Math.round(end * (1 - Math.pow(1 - p, 3)));
        el.textContent = v.toLocaleString("en-US") + suffix;
        if (p < 1) setTimeout(tick, 30);
      })();
    });
    o.observe(el);
  });

  // Sticky bottom CTA after the hero leaves the screen.
  var sticky = document.querySelector(".sticky-cta"), anchor = document.querySelector("[data-sticky-after]");
  if (sticky && anchor && "IntersectionObserver" in window) {
    new IntersectionObserver(function (es) {
      sticky.classList.toggle("show", !es[0].isIntersecting && es[0].boundingClientRect.top < 0);
    }).observe(anchor);
  }

  // Wire checkout links from one config.
  document.querySelectorAll("[data-href]").forEach(function (a) {
    var k = a.getAttribute("data-href"); if (window.TMC[k]) a.href = window.TMC[k];
  });

  // Player: plays the real file when data-src is set; until the VSL is recorded, says so plainly.
  document.querySelectorAll(".player").forEach(function (p) {
    var btn = p.querySelector("button.play"); if (!btn) return;
    btn.addEventListener("click", function () {
      var src = p.getAttribute("data-src");
      if (src) {
        var v = document.createElement("video");
        v.src = src; v.controls = true; v.autoplay = true; v.playsInline = true;
        v.style.cssText = "position:absolute;inset:0;width:100%;height:100%;background:#000;object-fit:contain";
        p.innerHTML = ""; p.appendChild(v);
      } else if (!p.querySelector(".notice")) {
        var n = document.createElement("div"); n.className = "notice";
        n.innerHTML = "<b style='font-size:1.25rem'>The video is on its way</b><span style='color:#C9D3E6;max-width:44ch'>In the meantime, call our team at 785-537-6225 with any question.</span>";
        p.appendChild(n);
      }
    });
  });
})();
