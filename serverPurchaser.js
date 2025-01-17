export async function main(ns) {
    ns.tprint("___ Start server purchaser ___");
    let buy_lvl = ns.args[0] ? ns.args[0] : 0;

    for (let i = 1; i <= 20; i++) {
        let ex = Math.pow(2, i);
        let cost = ns.getPurchasedServerCost(ex);
        let money = ns.getServerMoneyAvailable("home");
        let afford = (cost > money) ? "no" : "yes";

        ns.tprint(i + " -- " + formatMB(ex) + " -- " + nFormatter(cost, 3) + " -- " + afford);
    }

    if (buy_lvl > 0) {
        ns.purchaseServer("expensive", Math.pow(2, buy_lvl));
    }

    ns.tprint("___ Finish server purchaser ___");
}

function nFormatter(num, digits) {
    var si = [
        { value: 1, symbol: "" },
        { value: 1E3, symbol: "k" },
        { value: 1E6, symbol: "M" },
        { value: 1E9, symbol: "b" },
        { value: 1E12, symbol: "t" },
        { value: 1E15, symbol: "qd" },
        { value: 1E18, symbol: "qt" }
    ];
    var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var i;
    for (i = si.length - 1; i > 0; i--) {
        if (num >= si[i].value) {
            break;
        }
    }
    return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
}

function formatMB(bytes, decimals = 2) {
    if (bytes === 0) return '0MB';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
