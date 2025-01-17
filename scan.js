import {
    cmd,
    getServers
} from "/helpers/helper.js";


let facServers = {
    "CSEC": "yellow",
    "avmnite-02h": "yellow",
    "I.I.I.I": "yellow",
    "run4theh111z": "yellow",
    "The-Cave": "orange",
    "w0r1d_d43m0n": "red"
};

export async function main(ns) {
    let output = "Network:";
    getServers(ns).forEach(server => {
        let name = server.name;
        let hackColor = ns.hasRootAccess(name) ? "lime" : "red";
        let nameColor = facServers[name] ? facServers[name] : "white";

        let hoverText = ["Req Level: ", ns.getServerRequiredHackingLevel(name),
            "&#10;Req Ports: ", ns.getServerNumPortsRequired(name),
            "&#10;Memory: ", ns.getServerRam(name)[0], "GB",
            "&#10;Security: ", ns.getServerSecurityLevel(name),
            "/", ns.getServerMinSecurityLevel(name),
            "&#10;Money: ", Math.round(ns.getServerMoneyAvailable(name)).toLocaleString(), " (",
            Math.round(100 * ns.getServerMoneyAvailable(name) / ns.getServerMaxMoney(name)), "%)"
        ].join("");

        let ctText = "";
        ns.ls(name, ".cct").forEach(ctName => {
            ctText += ["<a title='", ctName,
                //Comment out the next line to reduce footprint by 5 GB
                "&#10;", ns.codingcontract.getContractType(ctName, name),
                "'>©</a>"
            ].join("");
        });

        output += ["<br>", " ".repeat(server.depth),
            `<font color=${hackColor}>■ </font>`,
            `<a class='scan-analyze-link' title='${hoverText}'' style='color:${nameColor}'>${name}</a> `,
            `<font color='fuchisa'>${ctText}</font>`,
        ].join("");
    });
    ns.tprint(output);
    cmd(ns, 'scan-analyze 0');
}
