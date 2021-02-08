import { injectScript, injectImage } from "./inject";

injectImage(chrome.extension.getURL('icons/crayon.png'));
injectImage(chrome.extension.getURL('icons/crayon.png'));
injectScript(chrome.runtime.getURL('build/content.bundle.js'));
