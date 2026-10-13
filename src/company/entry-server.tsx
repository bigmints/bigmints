import React from "react";
import { renderToString } from "react-dom/server";
import App from "../../App";
export { routes, getPage, company, brands, expertise, caseStudies } from "./content";
export const render = (path: string) => renderToString(<App path={path} />);
