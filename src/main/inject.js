/**
 * Injects the text from a file or text passed directly into the function
 * as a script tag in the DOM.
 * 
 * @param  {string} file_path
 * @param  {string} tag='html'
 * @param  {string} type='script'
 * @param  {string} text=''
 */
export function injectScript(file_path, tag = 'html', type = 'script', text = '') {
    var node = document.getElementsByTagName(tag)[0];
    var tag_type = type == 'link' ? 'link' : 'script';
    var script = document.createElement(tag_type);
    if (type == 'script') {
        script.setAttribute('type', 'text/javascript');
    }
    else if (type == 'module') {
        script.setAttribute('type', 'module');
    }
    else {
        script.setAttribute('rel', 'stylesheet');
        script.setAttribute('media', 'screen');

    }
    if (text == '') {
        script.setAttribute(tag_type == 'script' ? 'src' : 'href', file_path);
    }
    else {
        script.innerHTML = text;
    }
    node.appendChild(script);

}

export function injectImage(file_path) {
    let img = new Image();
    img.src = file_path;
    img.id = 'icon-image';
    img.style.display = 'none';
    let node = document.body;
    node.appendChild(img);
}