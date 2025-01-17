let tasks = [
    /*  0 */   "Unassigned",
    /*  1 */   "Mug People",               
    /*  2 */   "Deal Drugs",
    /*  3 */   "Strongarm Civilians",
    /*  4 */   "Run a Con",
    /*  5 */   "Armed Robbery",
    /*  6 */   "Traffick Illegal Arms",
    /*  7 */   "Threaten & Blackmail",
    /*  8 */   "Human Trafficking",
    /*  9 */   "Terrorism",
    /* 10 */   "Vigilante Justice",
    /* 11 */   "Train Combat",
    /* 12 */   "Train Hacking",
    /* 13 */   "Train Charisma",
    /* 14 */   "Territory Warfare"
];

export async function main(ns) {
    let oldTask = ns.args[0] ? tasks[ns.args[0]] : tasks[0];
    let newTask = ns.args[1] ? tasks[ns.args[1]] : tasks[0];

    let userInput = await ns.prompt("Swap gangsters from \"" + oldTask +
        "\" to \"" + newTask + "\"?");

    if (userInput) {
        let names = ns.gang.getMemberNames();
        for (let i = 0; i < names.length; i++) {
            let name = names[i];
            if (ns.gang.getMemberInformation(name).task === oldTask) {
                ns.tprint(name + " was doing " + oldTask +
                    ", but is now " + newTask + "!");
                ns.gang.setMemberTask(name, newTask);
            }
        }
    } else {
        let seeList = await ns.prompt("Wanna see the task list?");
        if (seeList) {
            for (let i = 0; i < tasks.length; i++) {
                ns.tprint(i + " :: " + tasks[i]);
            }
        }
    }

    ns.tprint("All gangsters are straightened out.");
}
