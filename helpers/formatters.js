export function formatCash(num, digits) {
    var neg = num < 0 ? "-" : "";
    num = Math.abs(num);

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
    return neg + (num / si[i].value).toFixed(digits).replace(rx, "$1") +
        si[i].symbol;
}

export function formatMB(bytes, decimals = 2) {
    if (bytes === 0) return '0MB';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
