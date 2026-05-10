(function () {
  function ready(callback) {
    if (document.readyState !== "loading") {
      callback();
    } else {
      document.addEventListener("DOMContentLoaded", callback);
    }
  }

  function addRelToken(link, token) {
    var rel = link.getAttribute("rel");
    var tokens = rel ? rel.split(/\s+/) : [];

    if (tokens.indexOf(token) === -1) {
      tokens.push(token);
      link.setAttribute("rel", tokens.join(" ").trim());
    }
  }

  ready(function () {
    Array.prototype.forEach.call(document.querySelectorAll("a[href]"), function (link) {
      var url;

      try {
        url = new URL(link.getAttribute("href"), window.location.href);
      } catch (error) {
        return;
      }

      if ((url.protocol === "http:" || url.protocol === "https:") &&
          url.origin !== window.location.origin) {
        link.setAttribute("target", "_blank");
        addRelToken(link, "noopener");
        addRelToken(link, "noreferrer");
      }
    });
  });
})();
