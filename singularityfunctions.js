import { city_resources } from "/helpers/cityinfo.js";

/** @param {NS} ns **/
export async function main(ns) {
    ns.tprint("___ Start build up ___");

    ns.tprint("Parsing config.");
    let config = ns.read("sconfig.txt");

    let v = JSON.parse(config);
    v.user_prompts.disable_all = v.user_prompts.yes_to_all ? true : v.user_prompts.disable_all;

    let city_info = city_resources(ns);

    // PROGRAM BUYING
    const pbp = v.user_prompts.disable_all ? false : await ns.prompt("Buy all hacking programs?");
    if (v.user_prompts.fine_tuning.do_program_buying || v.user_prompts.yes_to_all || pbp) {
        const programs = ns.read(v.input_file_locations.programs).split('\n');
        ns.tprint("Purchasing in progress...");
        if (!ns.getPlayer().tor) {
            if (ns.purchaseTor()) {
                ns.tprint(" Tor router was purchased.");
            } else {
                ns.tprint(" No TOR for you!!!");
            }
        } else {
            ns.tprint(" TOR router already owned.");
        }
        for (let prog of programs) {
            if (ns.purchaseProgram(prog)) {
                ns.tprint("  " + prog + " was purchased.");
            } else {
                ns.tprint("  Failed to purchase: " + prog);
            }
        }
    }

    // STUDY HACKING
    const shp = v.user_prompts.disable_all ? false : await ns.prompt("Study hacking (up to " + v.hacking_training.hack_limit + ")?");
    if (v.user_prompts.fine_tuning.do_study_hacking || v.user_prompts.yes_to_all || shp) {
        ns.tprint("Studying hacking...");
        let courseName = v.hacking_training.use_free_course ? "Study Computer Science" : "Algorithms";
        if (city_info.uni === undefined) {
            ns.travelToCity("Volhaven");
            city_info = city_resources(ns);
        }
        while (ns.getPlayer().hacking < v.hacking_training.hack_limit) {
            ns.universityCourse(city_info.uni, courseName);
            await ns.sleep(60000);
        }
        ns.tprint(" Hacking level " + v.hacking_training.hack_limit + " reached.");
    }

    // CHARISMA TRAINING
    const ctp = v.user_prompts.disable_all ? false : await ns.prompt("Gain charmisa (up to " + v.charisma_training.charisma_limit + ")?");
    if (v.user_prompts.fine_tuning.do_charisma_training || v.user_prompts.yes_to_all || ctp) {
        ns.tprint("Gaining charisma...");
        if (city_info.uni === undefined) {
            ns.travelToCity("Volhaven");
            city_info = city_resources(ns);
        }
        while (ns.getPlayer().charisma < v.charisma_training.charisma_limit) {
            ns.universityCourse(city_info.uni, "Leadership");
            await ns.sleep(60000);
        }
        ns.tprint(" Charisma level " + v.charisma_training.charisma_limit + " reached.");
    }

    // STAT BUILDING
    const sbp = v.user_prompts.disable_all ? false : await ns.prompt("Workout combat stats (up to specified levels)?");
    if (v.user_prompts.fine_tuning.do_combat_stat_building || v.user_prompts.yes_to_all || sbp) {
        ns.tprint("Working out that bod...");
        let stats = ["strength", "defense", "dexterity", "agility"];
        if (city_info.gym === undefined) {
            ns.travelToCity("Volhaven");
            city_info = city_resources(ns);
        }
        for (let stat of stats) {
            while (ns.getPlayer()[stat] < v.combat_training.workout_limits[stat]) {
                ns.gymWorkout(city_info.gym, stat); //v.combat_training.gym_name
                await ns.sleep(30000);
            }
        }
        ns.tprint(" Combat stats all reached specified level.");
    }

    // COMMIT CRIMES
    const ccp = v.user_prompts.disable_all ? false : await ns.prompt("Wanna do some quick crimes?");
    let doCrime = v.user_prompts.fine_tuning.do_crime || ccp;
    while ((v.user_prompts.yes_to_all || doCrime) && v.crime.attempts-- > 0) {
        let crime = getBestCrime(ns, v.input_file_locations.crimes);
        let time = ns.commitCrime(crime);
        await ns.sleep(time);
    }
    ns.tprint("___ Finish build up ___");
}

/*  
  Finds 'best' crime with at least 83% success rate.
  NOTE: Assumes that crimes are listed, in order, worst to best! 
*/
function getBestCrime(ns, loc) {
    const crimes = ns.read(loc).split('\r');
    let crime = "shoplift";
    let best = 0;
    for (let c of crimes) {
        let per = ns.getCrimeChance(c);
        if (per > 0.83 || per >= best) {
            best = per;
            crime = c;
        }
    }
    return crime;
}
