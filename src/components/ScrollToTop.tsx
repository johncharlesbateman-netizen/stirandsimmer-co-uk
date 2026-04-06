import { useEffect, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (!("scrollRestoration" in window.history)) {
      return;
    }

    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    return () => {
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, []);

  useLayoutEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const previousHtmlScrollBehavior = html.style.scrollBehavior;
    const previousBodyScrollBehavior = body.style.scrollBehavior;

    html.style.scrollBehavior = "auto";
    body.style.scrollBehavior = "auto";

    window.scrollTo(0, 0);
    html.scrollTop = 0;
    body.scrollTop = 0;

    const frame = window.requestAnimationFrame(() => {
      window.scrollTo(0, 0);
      html.scrollTop = 0;
      body.scrollTop = 0;
      html.style.scrollBehavior = previousHtmlScrollBehavior;
      body.style.scrollBehavior = previousBodyScrollBehavior;
    });

    return () => {
      window.cancelAnimationFrame(frame);
      html.style.scrollBehavior = previousHtmlScrollBehavior;
      body.style.scrollBehavior = previousBodyScrollBehavior;
    };
  }, [pathname]);

  return null;
};

export default ScrollToTop;
