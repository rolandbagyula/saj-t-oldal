// Minimal blog.js to prevent 404 and allow future enhancements
(function(){
  const ready = () => {
    console.log("blog.js loaded");
    // Add blog-specific JS here as needed
  };
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", ready);
  } else {
    ready();
  }
})();
