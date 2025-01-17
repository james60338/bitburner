export async function main(ns) {

    let target = ns.getHostname();
    //target = "iron-gym";
    let moneyThresh = ns.args[0] ? ns.args[0] : (ns.getServerMaxMoney(target) * 0.9);
    let securityThresh = ns.args[1] ? ns.args[1] : (ns.getServerMinSecurityLevel(target) + 5);

    while (true) {
        if (ns.getServerSecurityLevel(target) > securityThresh) {
            await ns.weaken(target);
        } else if (ns.getServerMoneyAvailable(target) < moneyThresh) {
            await ns.grow(target);
        } else {
            await ns.hack(target);
        }
    }
}
