(function () {
  function ready(callback) {
    if (document.readyState !== "loading") {
      callback();
    } else {
      document.addEventListener("DOMContentLoaded", callback);
    }
  }

  ready(function () {
    var mobileQuery = window.matchMedia ? window.matchMedia("(max-width: 768px)") : null;
    var nav = document.getElementById("site-nav");
    var linkList = nav && nav.querySelector(".visible-links");
    var masthead = document.querySelector(".masthead");
    var activeLink = null;
    var ticking = false;
    var sections = [];
    var prefersReducedMotion = window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!nav || !linkList) {
      return;
    }

    function normalizePath(pathname) {
      return pathname.replace(/\/index\.html$/, "/").replace(/\/$/, "") || "/";
    }

    function sectionForLink(link) {
      var url;

      try {
        url = new URL(link.getAttribute("href"), window.location.href);
      } catch (error) {
        return null;
      }

      if (!url.hash || normalizePath(url.pathname) !== normalizePath(window.location.pathname)) {
        return null;
      }

      var id = decodeURIComponent(url.hash.slice(1));
      var target = document.getElementById(id);

      return target ? { link: link, target: target } : null;
    }

    function collectSections() {
      sections = Array.prototype.slice.call(linkList.querySelectorAll("a[href*='#']"))
        .map(sectionForLink)
        .filter(Boolean);
    }

    function activationOffset() {
      return (masthead ? masthead.getBoundingClientRect().height : 0) + 32;
    }

    function scrollActiveLinkIntoView(link) {
      if (!link || nav.scrollWidth <= nav.clientWidth + 1) {
        return;
      }

      var targetLeft = link.offsetLeft - (nav.clientWidth - link.offsetWidth) / 2;
      var maxLeft = Math.max(0, nav.scrollWidth - nav.clientWidth);

      nav.scrollTo({
        left: Math.max(0, Math.min(targetLeft, maxLeft)),
        behavior: prefersReducedMotion ? "auto" : "smooth"
      });
    }

    function setActive(link) {
      if (link === activeLink) {
        return;
      }

      if (activeLink) {
        activeLink.classList.remove("is-active");
        activeLink.removeAttribute("aria-current");
      }

      activeLink = link;

      if (activeLink) {
        activeLink.classList.add("is-active");
        activeLink.setAttribute("aria-current", "location");
        scrollActiveLinkIntoView(activeLink);
      }
    }

    function updateActiveSection() {
      var current = sections[0];
      var checkpoint = window.pageYOffset + activationOffset();

      sections.forEach(function (section) {
        var sectionTop = section.target.getBoundingClientRect().top + window.pageYOffset;

        if (sectionTop <= checkpoint) {
          current = section;
        }
      });

      setActive(current && current.link);
      ticking = false;
    }

    function requestUpdate() {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(updateActiveSection);
      }
    }

    function refresh() {
      collectSections();
      requestUpdate();
    }

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", refresh);

    if (mobileQuery && mobileQuery.addEventListener) {
      mobileQuery.addEventListener("change", refresh);
    } else if (mobileQuery && mobileQuery.addListener) {
      mobileQuery.addListener(refresh);
    }

    refresh();
  });
})();
