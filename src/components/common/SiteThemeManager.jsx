import { useEffect } from "react";

/** The whole site uses the guide (cream/ink/gold) theme. */
export default function SiteThemeManager() {
  useEffect(() => {
    document.documentElement.setAttribute("data-site-theme", "partial");
  }, []);

  return null;
}
