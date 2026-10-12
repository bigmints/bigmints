import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
const root = document.getElementById("root")!;
const path = window.location.pathname.replace(/\/*$/, "/");
// Preserve bookmarks from the earlier one-page preview.
const formerSections: Record<string, string> = {
  "#brands": "/products/",
  "#company": "/company/",
  "#expertise": "/innovation/",
  "#contact": "/contact/",
};
const formerSection =
  path === "/" ? formerSections[window.location.hash] : undefined;
const application = (
  <React.StrictMode>
    <App path={path} />
  </React.StrictMode>
);
if (formerSection) window.location.replace(formerSection);
else if (root.children.length > 0) hydrateRoot(root, application);
else createRoot(root).render(application);
