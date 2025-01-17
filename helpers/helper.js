//Covers the whole screen in a blank square. When the mouse moves 
//over it, the square disappears and the command is executed.
export function inject(ns, code) {
    let id = '' + Math.random() + Math.random();
    let output = `<div id="${id}" style="position:absolute; width:100%; height:100%" `;
    output += `onmouseover="${code} document.getElementById(\'${id}\').remove();"></div>`;
    ns.tprint(output);
}

export function cmd(ns, cmd) {
    let code = `document.getElementById('terminal-input-text-box').value = '${cmd}';`;
    code += "document.body.dispatchEvent(new KeyboardEvent('keydown', {";
    code += "bubbles: true, cancelable: true, keyCode: 13 }));";
    inject(ns, code);
}

let svObj = (name = 'home', depth = 0) => ({ name: name, depth: depth });
export function getServers(ns) {
    let result = [];
    let visited = { 'home': 0 };
    let queue = Object.keys(visited);
    let name;
    while ((name = queue.pop())) {
        let depth = visited[name];
        result.push(svObj(name, depth));
        let scanRes = ns.scan(name);
        for (let i = scanRes.length; i >= 0; i--) {
            if (visited[scanRes[i]] === undefined) {
                queue.push(scanRes[i]);
                visited[scanRes[i]] = depth + 1;
            }
        }
    }
    return result;
}
