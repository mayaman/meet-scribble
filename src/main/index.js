import { injectScript } from "./inject";

injectScript(chrome.runtime.getURL('build/content.bundle.js'));