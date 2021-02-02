import { injectScript, injectImage } from "./inject";

injectImage(chrome.extension.getURL('icons/icon.png'));
injectImage(chrome.extension.getURL('icons/scribble_black.png'));
injectScript(chrome.runtime.getURL('build/content.bundle.js'));
