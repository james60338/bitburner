/* NEED TO MAKE A FACTION REP MAXIMIZER */
export async function main(ns) {
    ns.tprint("___ Start faction worker ___");

    //check for invitations
    let can_join = ns.checkFactionInvitations();

    //ensure they are not city based (block others)
    const city_fact = ["Sector-12", "Chongqing", "New Tokyo", "Ishima", "Aevum", "Volhaven"];

    //join all 
    for (let fac of can_join) {
        if (!city_fact.includes(fac)) {
            ns.joinFaction(fac);
        }
    }

    //foreach faction find availble augs
    for (let f of ns.getCharacterInformation().factions) {
        let rep_need = 0;
        let my_augs = ns.getOwnedAugmentations(true);
        for (let a of ns.getAugmentationsFromFaction(f)) {
            if (!my_augs.includes(a)) {
                rep_need = Math.max(ns.getAugmentationCost(a)[0], rep_need);
            }
        }

        //do work for the faction until threshold
        while (ns.getFactionRep(f) < rep_need) {
            if (!ns.workForFaction(f, "hacking")) {
                if (!ns.workForFaction(f, "field")) {
                    ns.workForFaction(f, "security");
                }
            }
            await ns.sleep(60000);
        }
        //do next faction
    }

    //do something else when done

    ns.tprint("___ Finished faction worker ___");
}
