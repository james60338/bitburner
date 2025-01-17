export async function main(ns) {
    const finalCnt = ns.args[0] ? ns.args[0] : 22;

    // turn off excessive logging
    ns.disableLog("getServerMoneyAvailable");
    ns.disableLog("sleep");

    // first pass to get started
    if (ns.hacknet.numNodes() < 10) {
        await buyHN(10, ns);
        ns.tprint("Pass1: 10 nodes purchased.")

        await upgrdLvl(50, ns);
        ns.tprint("Pass1: All nodes upgraded to level 50");

        await upgrdRam(2, ns);
        ns.tprint("Pass1: All nodes upgraded to 4GB RAM");
    } else {
        ns.tprint("Pass1: Complete, skipping.");
    }

    // second pass to max nodes
    let nCnt = ns.hacknet.numNodes();
    if (nCnt >= 10 && ns.hacknet.getNodeStats(9).cores !== 16) {
        await upgrdLvl(200, ns);
        ns.tprint("Pass2: All nodes upgraded to max level 200");

        await upgrdRam(6, ns);
        ns.tprint("Pass2: All nodes upgraded to max 64GB RAM");

        await upgrdCor(16, ns);
        ns.tprint("Pass2: All nodes upgraded to max 16 cores");
    } else {
        ns.tprint("Pass2: Complete, skipping.");
    }

    // final pass to max 'em all
    let doFinal = await ns.prompt("Nodes Final Pass:\n Continue purchasing up to " + finalCnt + "?");
    if (doFinal) {
        await buyHN(finalCnt, ns);
        ns.tprint("Final: 22 nodes purchased.")

        await upgrdLvl(200, ns);
        ns.tprint("Final: All Levels maxed.");

        await upgrdRam(6, ns);
        ns.tprint("Final: All RAM maxed.");

        await upgrdCor(16, ns);
        ns.tprint("Final: All Cores maxed.");
    } else {
        ns.tprint("Final phase skipped.");
    }
    ns.tprint("Script finished.");
}


function myMoney(ns) {
    return ns.getServerMoneyAvailable("home");
}

async function buyHN(amt, ns) {
    while (ns.hacknet.numNodes() < amt) {
        var cost = ns.hacknet.getPurchaseNodeCost();
        while (myMoney(ns) < cost) {
            ns.print("Need $" + cost + " . Have $" + myMoney(ns));
            await ns.sleep(3000);
        }
        var res = ns.hacknet.purchaseNode();
        ns.print("Purchased hacknet Node with index " + res);
    }
}

async function upgrdLvl(cap, ns) {
    var cnt = ns.hacknet.numNodes();
    for (var i = 0; i < cnt; i++) {
        while (ns.hacknet.getNodeStats(i).level < cap) {
            var cost = ns.hacknet.getLevelUpgradeCost(i, 1);
            while (myMoney(ns) < cost) {
                ns.print("Need $" + cost + " . Have $" + myMoney(ns));
                await ns.sleep(3000);
            }
            var res = ns.hacknet.upgradeLevel(i, 1);
        }
    }
}

async function upgrdRam(cap, ns) {
    var cnt = ns.hacknet.numNodes();
    for (var i = 0; i < cnt; i++) {
        while (ns.hacknet.getNodeStats(i).ram < Math.pow(2, cap)) {
            var cost = ns.hacknet.getRamUpgradeCost(i, 1);
            while (myMoney(ns) < cost) {
                ns.print("Need $" + cost + " . Have $" + myMoney(ns));
                await ns.sleep(3000);
            }
            var res = ns.hacknet.upgradeRam(i, 1);
        }
    }
}

async function upgrdCor(cap, ns) {
    let cnt = ns.hacknet.numNodes();
    for (let i = 0; i < cnt; i++) {
        while (ns.hacknet.getNodeStats(i).cores < cap) {
            let cost = ns.hacknet.getCoreUpgradeCost(i, 1);
            while (myMoney(ns) < cost) {
                ns.print("Need $" + cost + " . Have $" + myMoney(ns));
                await ns.sleep(3000);
            }
            let res = ns.hacknet.upgradeCore(i, 1);
        }
    }

}
