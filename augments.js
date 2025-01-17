import { formatCash } from "/helpers/formatters.ns";

let skip_augs = [];
let augmentations = [];

/* NEED TO MAKE A FACTION REP MAXIMIZER */
export async function main(ns) {
    ns.tprint("___ Start augment buying ___");
    skip_augs = [];
    let first = 0;

    try {
        while (++first == 1 || await ns.prompt("Buy next augmentation?")) {
            augmentations = [];
            //foreach faction find availble augs
            for (let f of ns.getCharacterInformation().factions) {
                let my_augs = ns.getOwnedAugmentations(true);
                for (let a of ns.getAugmentationsFromFaction(f)) {
                    if (!my_augs.includes(a)) {
                        let costs = ns.getAugmentationCost(a);
                        let aug = {
                            "name": a,
                            "faction": f,
                            "rep": costs[0],
                            "price": costs[1]
                        };
                        augmentations.push(aug);
                    }
                }
            }

            // sort the augs, desc.
            augmentations.sort(function(a, b) {
                return b.price - a.price;
            })

            //List all available augs
            ns.tprint("\n----- Price List -----");
            for (let au of augmentations) {
                ns.tprint("[" + au.faction + "] " + au.name + " : " +
                    formatCash(au.price, 3) + checkRep(au, ns));
            }

            //buy it
            let a = augmentations.reverse().pop();
            while (skip_augs.includes(a.name)) {
                a = augmentations.pop();
            }

            let buy_it = await ns.prompt("Buy '" + a.name + "' for $" +
                formatCash(a.price, 3) + "? [Cash remaining: $" +
                cashRemain(a.price, ns) + "]" + checkRep(a, ns));

            if (buy_it) {
                await checkPre(a, ns);
            } else {
                skip_augs.push(a.name);
            }
        }
    } catch (error) {
        ns.tprint("No more augments to buy.");
    }
    ns.tprint("___ Finished augment buying ___");
}

async function checkPre(au, ns) {
    let prereqs = ns.getAugmentationPrereq(au.name);

    if (prereqs.length !== 0) {
        let pname = prereqs[0];
        let owned = ns.getOwnedAugmentations(true);

        if (!owned.includes(pname)) {
            let p_cost = ns.getAugmentationCost(pname);
            let paug = {
                "name": pname,
                "faction": au.faction,
                "rep": p_cost[0],
                "price": p_cost[1]
            };

            let buy_pre = await ns.prompt("'" + au.name +
                "' has a pre-req! Buy '" + paug.name +
                "' now? [Cash remaining: $" +
                cashRemain(paug.price, ns) + "]" + checkRep(paug, ns));

            //buy deeper prereq
            if (buy_pre) {
                await checkPre(paug, ns);
            }
        }
    }

    let bought = ns.purchaseAugmentation(au.faction, au.name);
    if (bought) {
        ns.tprint("Purchased, '" + au.name + "'.");
    } else {
        ns.tprint("Failed to purchase: '" + au.name + "'.");
    }
}

function checkRep(au, ns) {
    return ns.getFactionRep(au.faction) > au.rep ? "" : " : !!!NEED MORE REP!!!";
}

function cashRemain(cost, ns) {
    return formatCash(ns.getServerMoneyAvailable("home") - cost, 3);
}
