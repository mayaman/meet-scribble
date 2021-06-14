!function(e){var t={};function n(l){if(t[l])return t[l].exports;var o=t[l]={i:l,l:!1,exports:{}};return e[l].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,l){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:l})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var l=Object.create(null);if(n.r(l),Object.defineProperty(l,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(l,o,function(t){return e[t]}.bind(null,o));return l},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t){const n=document.createElement("div"),l=document.createElement("div");l.classList.add("scribble-settings-container");const o=document.createElement("div"),i=document.createElement("select"),r=(document.createElement("select"),document.createElement("button")),c=document.createElement("label");c.classList.add("switch");const d=document.createElement("input");d.setAttribute("type","checkbox");const a=document.createElement("span");a.classList.add("slider"),a.classList.add("round"),c.appendChild(d),c.appendChild(a);let s,u,p,f=!1,m=!1,b=!1,y=!0,g="#b0f2ff",h="pressToDraw";const E=[{name:"𝕃𝕀ℕ𝔼",value:"pressToDraw"},{name:"ⓓⓞⓣⓢ",value:"clickToDraw"},{name:"𝐸𝑀🍑𝒥ℹ️𝒮💞",value:"alwaysDraw"}],v={blue:["🦋","🌀","💎","🧢","❄️","🐬","🫐","💙","🐳","💧"],pink:["💗","🌺","💞","🌸","🎀"],orange:["🍊","🔥","🍑","🧡","🦀","💥","✴️"],green:["🍏","✳️","🎾","♻️","🌱","🥝","💚"]};let w=0;function L(e,t){var n,l;return e.pageX||e.pageY?(n=e.pageX,l=e.pageY):(n=e.clientX+document.body.scrollLeft+document.documentElement.scrollLeft,l=e.clientY+document.body.scrollTop+document.documentElement.scrollTop),{x:n-=t.offsetLeft,y:l-=t.offsetTop}}function k(e,t,n,l){const o=document.createElement("button");o.classList.add("scribble-button"),o.classList.add("color-button"),o.style.background=e,o.style.left=t+"px",o.style.borderStyle="blue"==l?"solid":"dotted",o.id=t,n.appendChild(o),o.addEventListener("click",t=>{u.strokeStyle=e,u.fillStyle=e,g=e;let n=document.getElementsByClassName("color-button");currentEmojis=v[l],w=0;for(let e=0;e<n.length;e++){n[e].style.borderStyle="dotted"}t.target.style.borderStyle="solid"})}function x(){b=!b,o.style.display=b?"block":"none"}function S(){h=i.value}function T(){console.log("resizing canvas!"),s.height=window.innerHeight,s.width=window.innerWidth,u.strokeStyle=g,u.fillStyle=g,u.lineWidth=6}function C(){y=!y,console.log("toggling scribble: ",d.checked),d.checked?(s.style.display="block",r.style.opacity=1):(s.style.display="none",r.style.opacity=.5,b&&(b=!1,o.style.display="none"))}function j(){console.log("trying to clear canvas!!!"),u.clearRect(0,0,s.width,s.height),u.fillStyle="#0000001A",u.fillRect(0,0,s.width,s.height),m=!1}function M(e){let t=L(e,s);u.beginPath(),u.moveTo(t.x,t.y),m=!0}function O(e){let t=L(e,s);if(m)if("pressToDraw"==h)u.lineTo(t.x,t.y),u.stroke();else if("clickToDraw"==h){let e=8;u.fillStyle=g,u.beginPath(),u.arc(t.x,t.y,e,0,2*Math.PI),u.stroke(),u.fill()}else if("alwaysDraw"==h){let e=28;u.font=e+"px Verdana",u.fillStyle=g,u.fillText(currentEmojis[w],t.x-e/2,t.y+e/4),w=(w+1)%currentEmojis.length,console.log("EMOJI LENGTH",currentEmojis.length)}}function I(e){m&&(m=!1)}currentEmojis=v.blue,function(){console.log("🌸🌸🌸 Hell0000 FROM SCRIBBLER XO");let e=setInterval(()=>{f?(console.log("✏️ CLEARING INTERVAL"),clearInterval(e)):function(){const e=document.querySelector("[data-fps-request-screencast-cap]");p=e.parentElement.parentElement.parentElement;e&&p&&!f&&(n.id="drawing-container",r.classList.add("scribble-button"),r.id="main-button",r.addEventListener("click",x),r.innerHTML="🖍",l.appendChild(r),c.id="toggle",d.setAttribute("checked","true"),d.addEventListener("click",C),l.appendChild(c),o.id="options-container",function(e,t,n,l,o){const i=document.createElement("button");i.innerHTML=e,i.addEventListener("click",n),i.style.top=t+"px",i.classList.add("scribble-button"),i.id=o,l.appendChild(i)}("ℂ𝕃𝔼𝔸ℝ <br> (double click)",32,j,o,"clear-button"),l.appendChild(o),i.addEventListener("change",S),i.classList.add("scribble-button"),i.style.zIndex="99",i.id="select-mode",E.forEach(e=>{const t=document.createElement("option");t.value=e.value,t.innerText=e.name,t.id=e.value,i.appendChild(t)}),o.appendChild(i),k("#b0f2ff",5,o,"blue"),k("hotpink",30,o,"pink"),k("lime",55,o,"green"),k("#F4A91E",80,o,"orange"),s=document.createElement("canvas"),s.id="drawing-canvas",s.height=window.innerHeight,s.width=window.innerWidth,s.style.position="absolute",s.style.zIndex=0,s.style.cursor="pointer",u=s.getContext("2d"),u.strokeStyle=g,u.fillStyle=g,u.lineWidth=6,u.lineJoin="round",s.addEventListener("dblclick",e=>{j()}),s.addEventListener("mousedown",M),s.addEventListener("mousemove",O),s.addEventListener("mouseup",I),n.appendChild(s),n.appendChild(l),j(),p.parentElement.parentElement.parentElement.parentElement.appendChild(n),window.addEventListener("resize",T),f=!0)}()},Math.round(200))}()}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4vY29udGVudC5qcyJdLCJuYW1lcyI6WyJpbnN0YWxsZWRNb2R1bGVzIiwiX193ZWJwYWNrX3JlcXVpcmVfXyIsIm1vZHVsZUlkIiwiZXhwb3J0cyIsIm1vZHVsZSIsImkiLCJsIiwibW9kdWxlcyIsImNhbGwiLCJtIiwiYyIsImQiLCJuYW1lIiwiZ2V0dGVyIiwibyIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiZW51bWVyYWJsZSIsImdldCIsInIiLCJTeW1ib2wiLCJ0b1N0cmluZ1RhZyIsInZhbHVlIiwidCIsIm1vZGUiLCJfX2VzTW9kdWxlIiwibnMiLCJjcmVhdGUiLCJrZXkiLCJiaW5kIiwibiIsIm9iamVjdCIsInByb3BlcnR5IiwicHJvdG90eXBlIiwiaGFzT3duUHJvcGVydHkiLCJwIiwicyIsImRyYXdpbmdEaXYiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJzZXR0aW5nc0RpdiIsImNsYXNzTGlzdCIsImFkZCIsIm9wdGlvbnNEaXYiLCJzZWxlY3RNb2RlIiwibWFpbkJ1dHRvbiIsInRvZ2dsZUxhYmVsIiwidG9nZ2xlIiwic2V0QXR0cmlidXRlIiwic2xpZGVyIiwiYXBwZW5kQ2hpbGQiLCJjYW52IiwiY3R4IiwiZ3JlYXRHcmFuZHBhcmVudEVsdCIsInNldHVwQ29tcGxldGUiLCJpc0RyYXdpbmciLCJvcHRpb25zU2hvd2luZyIsInNjcmliYmxlQWN0aXZlIiwiY3VycmVudENvbG9yIiwibW9kZU9wdGlvbnMiLCJlbW9qaU9wdGlvbnMiLCJibHVlIiwicGluayIsIm9yYW5nZSIsImdyZWVuIiwiZW1vamlDb3VudGVyIiwiZml4UG9zaXRpb24iLCJlIiwiZ0NhbnZhc0VsZW1lbnQiLCJ4IiwieSIsInBhZ2VYIiwicGFnZVkiLCJjbGllbnRYIiwiYm9keSIsInNjcm9sbExlZnQiLCJkb2N1bWVudEVsZW1lbnQiLCJjbGllbnRZIiwic2Nyb2xsVG9wIiwib2Zmc2V0TGVmdCIsIm9mZnNldFRvcCIsImNyZWF0ZUNvbG9yQnV0dG9uIiwiY29sb3JTdHJpbmciLCJsZWZ0UG9zIiwicGFyZW50RGl2IiwiY29sb3JLZXkiLCJuZXdCdXR0b24iLCJzdHlsZSIsImJhY2tncm91bmQiLCJsZWZ0IiwiYm9yZGVyU3R5bGUiLCJpZCIsImFkZEV2ZW50TGlzdGVuZXIiLCJzdHJva2VTdHlsZSIsImZpbGxTdHlsZSIsImFsbENvbG9ycyIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJjdXJyZW50RW1vamlzIiwibGVuZ3RoIiwidGFyZ2V0IiwidG9nZ2xlT3B0aW9ucyIsImRpc3BsYXkiLCJjaGFuZ2VNb2RlIiwicmVzaXplQ2FudmFzIiwiY29uc29sZSIsImxvZyIsImhlaWdodCIsIndpbmRvdyIsImlubmVySGVpZ2h0Iiwid2lkdGgiLCJpbm5lcldpZHRoIiwibGluZVdpZHRoIiwidG9nZ2xlU2NyaWJibGUiLCJjaGVja2VkIiwib3BhY2l0eSIsImNsZWFyQ2FudmFzIiwiY2xlYXJSZWN0IiwiZmlsbFJlY3QiLCJtb3VzZUlzRG93biIsIm1vdXNlUG9zIiwiYmVnaW5QYXRoIiwibW92ZVRvIiwibW91c2VNb3ZlIiwibGluZVRvIiwic3Ryb2tlIiwic2hhcGVTaXplIiwiYXJjIiwiTWF0aCIsIlBJIiwiZmlsbCIsImZvbnRTaXplIiwiZm9udCIsImZpbGxUZXh0IiwibW91c2VVcCIsInNldHVwQ2hlY2tlciIsInNldEludGVydmFsIiwiY2xlYXJJbnRlcnZhbCIsIm93blZpZGVvUHJldmlldyIsInF1ZXJ5U2VsZWN0b3IiLCJwYXJlbnRFbGVtZW50IiwiaW5uZXJIVE1MIiwidGV4dCIsInlQb3MiLCJjbGlja0Z1bmN0aW9uIiwidG9wIiwiY3JlYXRlQnV0dG9uIiwiekluZGV4IiwiZm9yRWFjaCIsIm5ld01vZGUiLCJpbm5lclRleHQiLCJwb3NpdGlvbiIsImN1cnNvciIsImdldENvbnRleHQiLCJsaW5lSm9pbiIsInNldHVwIiwicm91bmQiLCJpbml0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V0FDcEIzRCxFQUFLb0MsTUFBTStELFNBQVcsV0FDdEJuRyxFQUFLb0MsTUFBTTJELE9BQVMsRUFDcEIvRixFQUFLb0MsTUFBTWdFLE9BQVMsVUFFcEJuRyxFQUFNRCxFQUFLcUcsV0FBVyxNQUN0QnBHLEVBQUl5QyxZQUFjbkMsRUFDbEJOLEVBQUkwQyxVQUFZcEMsRUFDaEJOLEVBQUkyRCxVQXpJZSxFQTBJbkIzRCxFQUFJcUcsU0FBVyxRQUNmdEcsRUFBS3lDLGlCQUFpQixXQUFhekIsSUFDL0JnRCxNQUdKaEUsRUFBS3lDLGlCQUFpQixZQUFhMEIsR0FDbkNuRSxFQUFLeUMsaUJBQWlCLFlBQWE4QixHQUNuQ3ZFLEVBQUt5QyxpQkFBaUIsVUFBV3lDLEdBRWpDaEcsRUFBV2EsWUFBWUMsR0FDdkJkLEVBQVdhLFlBQVlWLEdBQ3ZCMkUsSUFDQTlELEVBQW9Cc0YsY0FBY0EsY0FBY0EsY0FBY0EsY0FBY3pGLFlBQVliLEdBN0VwRnNFLE9BQU9mLGlCQUFpQixTQUFVVyxHQUNsQ2pELEdBQWdCLEdBcENab0csSUFLTDNCLEtBQUs0QixNQUFNLE1Bb1BsQkMiLCJmaWxlIjoiY29udGVudC5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG4iLCJjb25zdCBGUkFNRVNfUEVSX1NFQ09ORCA9IDVcbmNvbnN0IGRyYXdpbmdEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbmNvbnN0IHNldHRpbmdzRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5zZXR0aW5nc0Rpdi5jbGFzc0xpc3QuYWRkKCdzY3JpYmJsZS1zZXR0aW5ncy1jb250YWluZXInKTtcbmNvbnN0IG9wdGlvbnNEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbmNvbnN0IHNlbGVjdE1vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzZWxlY3QnKTtcbmNvbnN0IHNlbGVjdExpbmVTdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NlbGVjdCcpO1xuY29uc3QgbWFpbkJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuXG5jb25zdCB0b2dnbGVMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG50b2dnbGVMYWJlbC5jbGFzc0xpc3QuYWRkKCdzd2l0Y2gnKTtcbmNvbnN0IHRvZ2dsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG50b2dnbGUuc2V0QXR0cmlidXRlKCd0eXBlJywgJ2NoZWNrYm94Jyk7XG5jb25zdCBzbGlkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG5zbGlkZXIuY2xhc3NMaXN0LmFkZCgnc2xpZGVyJyk7XG5zbGlkZXIuY2xhc3NMaXN0LmFkZCgncm91bmQnKTtcbnRvZ2dsZUxhYmVsLmFwcGVuZENoaWxkKHRvZ2dsZSk7XG50b2dnbGVMYWJlbC5hcHBlbmRDaGlsZChzbGlkZXIpO1xuXG5sZXQgc2V0dXBDb21wbGV0ZSA9IGZhbHNlO1xubGV0IGlzRHJhd2luZyA9IGZhbHNlO1xubGV0IGN1cnJlbnRMaW5lV2lkdGggPSA2OyAvLzRcbmxldCBjYW52LCBjdHg7XG5sZXQgZ3JlYXRHcmFuZHBhcmVudEVsdDtcbmxldCBvcHRpb25zU2hvd2luZyA9IGZhbHNlO1xubGV0IHNjcmliYmxlQWN0aXZlID0gdHJ1ZTtcblxubGV0IGN1cnJlbnRDb2xvciA9ICcjYjBmMmZmJztcbmxldCBtb2RlID0gJ3ByZXNzVG9EcmF3JztcbmNvbnN0IG1vZGVPcHRpb25zID0gW1xuICAgIHtcbiAgICAgICAgbmFtZTogJ/CdlYPwnZWA4oSV8J2UvCcsXG4gICAgICAgIHZhbHVlOiAncHJlc3NUb0RyYXcnXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICfik5Pik57ik6Pik6InLFxuICAgICAgICB2YWx1ZTogJ2NsaWNrVG9EcmF3J1xuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAn8J2QuPCdkYDwn42R8J2SpeKEue+4j/Cdkq7wn5KeJyxcbiAgICAgICAgdmFsdWU6ICdhbHdheXNEcmF3J1xuICAgIH1cbl1cblxuY29uc3QgZW1vamlPcHRpb25zID0ge1xuICAgIGJsdWU6IFtcIvCfpotcIiwgXCLwn4yAXCIsIFwi8J+SjlwiLCBcIvCfp6JcIiwgXCLinYTvuI9cIiwgXCLwn5CsXCIsIFwi8J+rkFwiLCBcIvCfkplcIiwgXCLwn5CzXCIsIFwi8J+Sp1wiXSxcbiAgICBwaW5rOiBbXCLwn5KXXCIsIFwi8J+MulwiLCBcIvCfkp5cIiwgXCLwn4y4XCIsIFwi8J+OgFwiXSxcbiAgICBvcmFuZ2U6IFtcIvCfjYpcIiwgXCLwn5SlXCIsIFwi8J+NkVwiLCBcIvCfp6FcIiwgXCLwn6aAXCIsIFwi8J+SpVwiLCBcIuKctO+4j1wiXSxcbiAgICBncmVlbjogW1wi8J+Nj1wiLCBcIuKcs++4j1wiLCBcIvCfjr5cIiwgXCLimbvvuI9cIiwgXCLwn4yxXCIsIFwi8J+lnVwiLCBcIvCfkppcIl1cbn1cbmxldCBlbW9qaUNvdW50ZXIgPSAwO1xuY3VycmVudEVtb2ppcyA9IGVtb2ppT3B0aW9uc1snYmx1ZSddO1xuXG5cblxuZnVuY3Rpb24gaW5pdCgpIHtcbiAgICBjb25zb2xlLmxvZyhcIvCfjLjwn4y48J+MuCBIZWxsMDAwMCBGUk9NIFNDUklCQkxFUiBYT1wiKVxuICAgIGxldCBzZXR1cENoZWNrZXIgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgIGlmICghc2V0dXBDb21wbGV0ZSkge1xuICAgICAgICAgICAgc2V0dXAoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi4pyP77iPIENMRUFSSU5HIElOVEVSVkFMXCIpO1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChzZXR1cENoZWNrZXIpO1xuICAgICAgICB9XG4gICAgfSwgTWF0aC5yb3VuZCgxMDAwIC8gRlJBTUVTX1BFUl9TRUNPTkQpKVxufVxuXG5mdW5jdGlvbiBmaXhQb3NpdGlvbihlLCBnQ2FudmFzRWxlbWVudCkge1xuICAgIHZhciB4O1xuICAgIHZhciB5O1xuICAgIGlmIChlLnBhZ2VYIHx8IGUucGFnZVkpIHtcbiAgICAgICAgeCA9IGUucGFnZVg7XG4gICAgICAgIHkgPSBlLnBhZ2VZO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgeCA9IGUuY2xpZW50WCArIGRvY3VtZW50LmJvZHkuc2Nyb2xsTGVmdCArXG4gICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsTGVmdDtcbiAgICAgICAgeSA9IGUuY2xpZW50WSArIGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wICtcbiAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3A7XG4gICAgfVxuICAgIHggLT0gZ0NhbnZhc0VsZW1lbnQub2Zmc2V0TGVmdDtcbiAgICB5IC09IGdDYW52YXNFbGVtZW50Lm9mZnNldFRvcDtcbiAgICByZXR1cm4geyB4OiB4LCB5OiB5IH07XG59XG5cbmZ1bmN0aW9uIHNldHVwKCkge1xuICAgIGNvbnN0IG93blZpZGVvUHJldmlldyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWZwcy1yZXF1ZXN0LXNjcmVlbmNhc3QtY2FwXScpXG4gICAgZ3JlYXRHcmFuZHBhcmVudEVsdCA9IG93blZpZGVvUHJldmlldy5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudDtcblxuICAgIGNvbnN0IGJ1dHRvbnMgPSBvd25WaWRlb1ByZXZpZXcgJiYgZ3JlYXRHcmFuZHBhcmVudEVsdFxuXG4gICAgaWYgKGJ1dHRvbnMgJiYgIXNldHVwQ29tcGxldGUpIHsgLy8gZG8gdGhpcyBvbmNlIG9uY2UgdGhlIE1lZXQgZG9jdW1lbnQgZGl2cyBhcmUgcmVhZHlcbiAgICAgICAgLy8gZ3JlYXRHcmFuZHBhcmVudEVsdC5wcmVwZW5kKGJ1dHRvbnMuY2hpbGRyZW5bMV0uY2xvbmVOb2RlKCkpXG4gICAgICAgIHNldHVwRHJhd2luZygpO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCByZXNpemVDYW52YXMpO1xuICAgICAgICBzZXR1cENvbXBsZXRlID0gdHJ1ZTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHNldHVwRHJhd2luZygpIHtcbiAgICAvLyBEUkFXSU5HIENPTlRBSU5FUlxuICAgIGRyYXdpbmdEaXYuaWQgPSAnZHJhd2luZy1jb250YWluZXInO1xuXG4gICAgLy8gQ3JlYXRlIGljb25cbiAgICBtYWluQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ3NjcmliYmxlLWJ1dHRvbicpO1xuICAgIG1haW5CdXR0b24uaWQgPSBcIm1haW4tYnV0dG9uXCJcbiAgICBtYWluQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdG9nZ2xlT3B0aW9ucyk7XG4gICAgbWFpbkJ1dHRvbi5pbm5lckhUTUwgPSAn8J+WjSc7XG4gICAgLy8gbGV0IG9nU2NyaWJibGVJbWFnZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpY29uLWltYWdlJyk7XG4gICAgLy8gbGV0IHNjcmliYmxlSW1hZ2UgPSBvZ1NjcmliYmxlSW1hZ2UuY2xvbmVOb2RlKCk7XG4gICAgLy8gY29uc29sZS5sb2coc2NyaWJibGVJbWFnZSk7XG4gICAgLy8gbWFpbkJ1dHRvbi5hcHBlbmQoc2NyaWJibGVJbWFnZSk7XG4gICAgc2V0dGluZ3NEaXYuYXBwZW5kQ2hpbGQobWFpbkJ1dHRvbik7XG5cbiAgICAvLyBUT0dHTEVcbiAgICB0b2dnbGVMYWJlbC5pZCA9IFwidG9nZ2xlXCJcbiAgICB0b2dnbGUuc2V0QXR0cmlidXRlKCdjaGVja2VkJywgJ3RydWUnKTtcbiAgICB0b2dnbGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0b2dnbGVTY3JpYmJsZSk7XG4gICAgc2V0dGluZ3NEaXYuYXBwZW5kQ2hpbGQodG9nZ2xlTGFiZWwpO1xuXG4gICAgLy8gQ0xFQVIgQlVUVE9OXG4gICAgb3B0aW9uc0Rpdi5pZCA9IFwib3B0aW9ucy1jb250YWluZXJcIjtcbiAgICBjcmVhdGVCdXR0b24oJ+KEgvCdlYPwnZS88J2UuOKEnSA8YnI+IChkb3VibGUgY2xpY2spJywgMzIsIGNsZWFyQ2FudmFzLCBvcHRpb25zRGl2LCAnY2xlYXItYnV0dG9uJyk7XG4gICAgLy8gY3JlYXRlQnV0dG9uKCdET1dOTE9BRCcsIDgwLCBkb3dubG9hZENhbnZhcywgb3B0aW9uc0Rpdik7XG4gICAgc2V0dGluZ3NEaXYuYXBwZW5kQ2hpbGQob3B0aW9uc0Rpdik7XG5cbiAgICAvLyBNT0RFIFNFTEVDVE9SXG4gICAgc2VsZWN0TW9kZS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBjaGFuZ2VNb2RlKVxuICAgIHNlbGVjdE1vZGUuY2xhc3NMaXN0LmFkZCgnc2NyaWJibGUtYnV0dG9uJyk7XG4gICAgc2VsZWN0TW9kZS5zdHlsZS56SW5kZXggPSAnOTknO1xuICAgIHNlbGVjdE1vZGUuaWQgPSAnc2VsZWN0LW1vZGUnO1xuICAgIG1vZGVPcHRpb25zLmZvckVhY2goKG1vZGUpID0+IHtcbiAgICAgICAgY29uc3QgbmV3TW9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpO1xuICAgICAgICBuZXdNb2RlLnZhbHVlID0gbW9kZS52YWx1ZTtcbiAgICAgICAgbmV3TW9kZS5pbm5lclRleHQgPSBtb2RlLm5hbWU7XG4gICAgICAgIG5ld01vZGUuaWQgPSBtb2RlLnZhbHVlO1xuICAgICAgICBzZWxlY3RNb2RlLmFwcGVuZENoaWxkKG5ld01vZGUpO1xuICAgIH0pO1xuICAgIG9wdGlvbnNEaXYuYXBwZW5kQ2hpbGQoc2VsZWN0TW9kZSk7XG5cbiAgICBjcmVhdGVDb2xvckJ1dHRvbignI2IwZjJmZicsIDUsIG9wdGlvbnNEaXYsICdibHVlJyk7XG4gICAgY3JlYXRlQ29sb3JCdXR0b24oJ2hvdHBpbmsnLCAzMCwgb3B0aW9uc0RpdiwgJ3BpbmsnKTtcbiAgICBjcmVhdGVDb2xvckJ1dHRvbignbGltZScsIDU1LCBvcHRpb25zRGl2LCAnZ3JlZW4nKTtcbiAgICBjcmVhdGVDb2xvckJ1dHRvbignI0Y0QTkxRScsIDgwLCBvcHRpb25zRGl2LCAnb3JhbmdlJyk7XG5cblxuICAgIC8vIERSQVdJTkcgQ0FOVkFTXG4gICAgY2FudiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpOyAvLyBjcmVhdGVzIG5ldyBjYW52YXMgZWxlbWVudFxuICAgIGNhbnYuaWQgPSAnZHJhd2luZy1jYW52YXMnOyAvLyBnaXZlcyBjYW52YXMgaWRcbiAgICBjYW52LmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDsgLy9nZXQgb3JpZ2luYWwgY2FudmFzIGhlaWdodFxuICAgIGNhbnYud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDs7IC8vIGdldCBvcmlnaW5hbCBjYW52YXMgd2lkdGhcbiAgICBjYW52LnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICBjYW52LnN0eWxlLnpJbmRleCA9IDA7XG4gICAgY2Fudi5zdHlsZS5jdXJzb3IgPSAncG9pbnRlcic7XG5cbiAgICBjdHggPSBjYW52LmdldENvbnRleHQoJzJkJyk7XG4gICAgY3R4LnN0cm9rZVN0eWxlID0gY3VycmVudENvbG9yO1xuICAgIGN0eC5maWxsU3R5bGUgPSBjdXJyZW50Q29sb3I7XG4gICAgY3R4LmxpbmVXaWR0aCA9IGN1cnJlbnRMaW5lV2lkdGg7XG4gICAgY3R4LmxpbmVKb2luID0gXCJyb3VuZFwiO1xuICAgIGNhbnYuYWRkRXZlbnRMaXN0ZW5lcignZGJsY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICBjbGVhckNhbnZhcygpO1xuICAgIH0pO1xuXG4gICAgY2Fudi5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBtb3VzZUlzRG93bilcbiAgICBjYW52LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIG1vdXNlTW92ZSlcbiAgICBjYW52LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBtb3VzZVVwKTtcblxuICAgIGRyYXdpbmdEaXYuYXBwZW5kQ2hpbGQoY2Fudik7XG4gICAgZHJhd2luZ0Rpdi5hcHBlbmRDaGlsZChzZXR0aW5nc0Rpdik7XG4gICAgY2xlYXJDYW52YXMoKTtcbiAgICBncmVhdEdyYW5kcGFyZW50RWx0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuYXBwZW5kQ2hpbGQoZHJhd2luZ0Rpdik7IC8vIGFkZHMgdGhlIGNhbnZhcyB0byB0aGUgYm9keSBlbGVtZW50XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUJ1dHRvbih0ZXh0LCB5UG9zLCBjbGlja0Z1bmN0aW9uLCBwYXJlbnREaXYsIGlkKSB7XG4gICAgY29uc3QgbmV3QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgbmV3QnV0dG9uLmlubmVySFRNTCA9IHRleHQ7XG4gICAgbmV3QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xpY2tGdW5jdGlvbik7XG4gICAgbmV3QnV0dG9uLnN0eWxlLnRvcCA9IHlQb3MgKyAncHgnO1xuICAgIG5ld0J1dHRvbi5jbGFzc0xpc3QuYWRkKCdzY3JpYmJsZS1idXR0b24nKTtcbiAgICBuZXdCdXR0b24uaWQgPSBpZDtcbiAgICBwYXJlbnREaXYuYXBwZW5kQ2hpbGQobmV3QnV0dG9uKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlQ29sb3JCdXR0b24oY29sb3JTdHJpbmcsIGxlZnRQb3MsIHBhcmVudERpdiwgY29sb3JLZXkpIHtcbiAgICBjb25zdCBuZXdCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBuZXdCdXR0b24uY2xhc3NMaXN0LmFkZCgnc2NyaWJibGUtYnV0dG9uJyk7XG4gICAgbmV3QnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2NvbG9yLWJ1dHRvbicpO1xuICAgIG5ld0J1dHRvbi5zdHlsZS5iYWNrZ3JvdW5kID0gY29sb3JTdHJpbmc7XG4gICAgbmV3QnV0dG9uLnN0eWxlLmxlZnQgPSBsZWZ0UG9zICsgJ3B4JztcbiAgICBpZiAoY29sb3JLZXkgPT0gJ2JsdWUnKSB7XG4gICAgICAgIG5ld0J1dHRvbi5zdHlsZS5ib3JkZXJTdHlsZSA9ICdzb2xpZCc7XG5cbiAgICB9IGVsc2Uge1xuICAgICAgICBuZXdCdXR0b24uc3R5bGUuYm9yZGVyU3R5bGUgPSAnZG90dGVkJztcbiAgICB9XG5cbiAgICBuZXdCdXR0b24uaWQgPSBsZWZ0UG9zO1xuICAgIHBhcmVudERpdi5hcHBlbmRDaGlsZChuZXdCdXR0b24pO1xuXG4gICAgbmV3QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gY29sb3JTdHJpbmc7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBjb2xvclN0cmluZztcbiAgICAgICAgY3VycmVudENvbG9yID0gY29sb3JTdHJpbmc7XG4gICAgICAgIGxldCBhbGxDb2xvcnMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdjb2xvci1idXR0b24nKTtcbiAgICAgICAgY3VycmVudEVtb2ppcyA9IGVtb2ppT3B0aW9uc1tjb2xvcktleV07XG4gICAgICAgIGVtb2ppQ291bnRlciA9IDA7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWxsQ29sb3JzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50Q29sb3JCdXR0b24gPSBhbGxDb2xvcnNbaV07XG4gICAgICAgICAgICBjdXJyZW50Q29sb3JCdXR0b24uc3R5bGUuYm9yZGVyU3R5bGUgPSAnZG90dGVkJztcbiAgICAgICAgfVxuICAgICAgICBlLnRhcmdldC5zdHlsZS5ib3JkZXJTdHlsZSA9ICdzb2xpZCc7XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIHRvZ2dsZU9wdGlvbnMoKSB7XG4gICAgb3B0aW9uc1Nob3dpbmcgPSAhb3B0aW9uc1Nob3dpbmc7XG4gICAgaWYgKG9wdGlvbnNTaG93aW5nKSB7XG4gICAgICAgIG9wdGlvbnNEaXYuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgb3B0aW9uc0Rpdi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gY2hhbmdlTW9kZSgpIHtcbiAgICBtb2RlID0gc2VsZWN0TW9kZS52YWx1ZTtcbn1cblxuZnVuY3Rpb24gcmVzaXplQ2FudmFzKCkge1xuICAgIGNvbnNvbGUubG9nKCdyZXNpemluZyBjYW52YXMhJyk7XG4gICAgY2Fudi5oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7IC8vZ2V0IG9yaWdpbmFsIGNhbnZhcyBoZWlnaHRcbiAgICBjYW52LndpZHRoID0gd2luZG93LmlubmVyV2lkdGg7OyAvLyBnZXQgb3JpZ2luYWwgY2FudmFzIHdpZHRoXG5cbiAgICBjdHguc3Ryb2tlU3R5bGUgPSBjdXJyZW50Q29sb3I7XG4gICAgY3R4LmZpbGxTdHlsZSA9IGN1cnJlbnRDb2xvcjtcbiAgICBjdHgubGluZVdpZHRoID0gY3VycmVudExpbmVXaWR0aDtcbn1cblxuZnVuY3Rpb24gdG9nZ2xlU2NyaWJibGUoKSB7XG4gICAgc2NyaWJibGVBY3RpdmUgPSAhc2NyaWJibGVBY3RpdmU7XG4gICAgY29uc29sZS5sb2coXCJ0b2dnbGluZyBzY3JpYmJsZTogXCIsIHRvZ2dsZS5jaGVja2VkKTtcbiAgICBpZiAodG9nZ2xlLmNoZWNrZWQpIHtcbiAgICAgICAgY2Fudi5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgbWFpbkJ1dHRvbi5zdHlsZS5vcGFjaXR5ID0gMS4wO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGNhbnYuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgbWFpbkJ1dHRvbi5zdHlsZS5vcGFjaXR5ID0gMC41O1xuICAgICAgICBpZiAob3B0aW9uc1Nob3dpbmcpIHtcbiAgICAgICAgICAgIG9wdGlvbnNTaG93aW5nID0gZmFsc2U7XG4gICAgICAgICAgICAvLyBtYWluQnV0dG9uLmlubmVySFRNTCA9ICfinI4nO1xuICAgICAgICAgICAgb3B0aW9uc0Rpdi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBjbGVhckNhbnZhcygpIHtcbiAgICBjb25zb2xlLmxvZyhcInRyeWluZyB0byBjbGVhciBjYW52YXMhISFcIik7XG4gICAgY3R4LmNsZWFyUmVjdCgwLCAwLCBjYW52LndpZHRoLCBjYW52LmhlaWdodCk7XG4gICAgLy8gY3R4LmZpbGxTdHlsZSA9ICcjZThlOGU4NDAnXG4gICAgY3R4LmZpbGxTdHlsZSA9ICcjMDAwMDAwMUEnXG4gICAgY3R4LmZpbGxSZWN0KDAsIDAsIGNhbnYud2lkdGgsIGNhbnYuaGVpZ2h0KTtcbiAgICBpc0RyYXdpbmcgPSBmYWxzZTtcbn1cblxuZnVuY3Rpb24gZG93bmxvYWRDYW52YXMoKSB7XG4gICAgY29uc3QgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICBsaW5rLmRvd25sb2FkID0gJ215X3NjcmliYmxlLnBuZyc7XG4gICAgbGluay5ocmVmID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RyYXdpbmctY2FudmFzJykudG9EYXRhVVJMKClcbiAgICBsaW5rLmNsaWNrKCk7XG59XG5cbmZ1bmN0aW9uIG1vdXNlSXNEb3duKGUpIHtcbiAgICBsZXQgbW91c2VQb3MgPSBmaXhQb3NpdGlvbihlLCBjYW52KTtcbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgY3R4Lm1vdmVUbyhtb3VzZVBvcy54LCBtb3VzZVBvcy55KTtcbiAgICBpc0RyYXdpbmcgPSB0cnVlO1xufVxuXG5mdW5jdGlvbiBtb3VzZU1vdmUoZSkge1xuICAgIGxldCBtb3VzZVBvcyA9IGZpeFBvc2l0aW9uKGUsIGNhbnYpO1xuICAgIGlmIChpc0RyYXdpbmcpIHtcbiAgICAgICAgaWYgKG1vZGUgPT0gJ3ByZXNzVG9EcmF3Jykge1xuICAgICAgICAgICAgY3R4LmxpbmVUbyhtb3VzZVBvcy54LCBtb3VzZVBvcy55KTtcbiAgICAgICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgfSBlbHNlIGlmIChtb2RlID09ICdjbGlja1RvRHJhdycpIHtcbiAgICAgICAgICAgIGxldCBzaGFwZVNpemUgPSA4O1xuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IGN1cnJlbnRDb2xvcjtcbiAgICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgIGN0eC5hcmMobW91c2VQb3MueCwgbW91c2VQb3MueSwgc2hhcGVTaXplLCAwLCAyICogTWF0aC5QSSk7XG4gICAgICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgICAgICBjdHguZmlsbCgpO1xuICAgICAgICB9IGVsc2UgaWYgKG1vZGUgPT0gJ2Fsd2F5c0RyYXcnKSB7XG4gICAgICAgICAgICBsZXQgZm9udFNpemUgPSAyODtcbiAgICAgICAgICAgIGN0eC5mb250ID0gZm9udFNpemUgKyBcInB4IFZlcmRhbmFcIjtcbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBjdXJyZW50Q29sb3I7XG4gICAgICAgICAgICBjdHguZmlsbFRleHQoY3VycmVudEVtb2ppc1tlbW9qaUNvdW50ZXJdLCBtb3VzZVBvcy54IC0gZm9udFNpemUgLyAyLCBtb3VzZVBvcy55ICsgZm9udFNpemUgLyA0KTtcbiAgICAgICAgICAgIGVtb2ppQ291bnRlciA9IChlbW9qaUNvdW50ZXIgKyAxKSAlIGN1cnJlbnRFbW9qaXMubGVuZ3RoO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ0VNT0pJIExFTkdUSCcsIGN1cnJlbnRFbW9qaXMubGVuZ3RoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gbW91c2VVcChlKSB7XG4gICAgaWYgKGlzRHJhd2luZykge1xuICAgICAgICBpc0RyYXdpbmcgPSBmYWxzZTtcbiAgICB9XG59XG5cbmluaXQoKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=