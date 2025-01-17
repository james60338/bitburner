export async function main(ns) {
    const allItems = ns.read("/lists/gang/allBasicEquipment.txt").split(',');
    const tasks = ns.read("/lists/gang/tasks.txt").split(',');

    if (!ns.gang.canRecruitMember()) {
        ns.tprint("Fail: Gang is already at max capacity!");
        ns.exit();
    }

    let name = ns.args[0] ? ns.args[0] : "";
    let task = ns.args[1] ? tasks[ns.args[1]] : tasks[14];

    if (name.trim() !== "") {
        if (ns.gang.recruitMember(name)) {
            ns.tprint(name + " has appeared from the slums...");

            //buy stuff
            for (let i = 0; i < allItems.length; i++) {
                ns.gang.purchaseEquipment(name, allItems[i]);
            }
            ns.tprint(" ...carrying all the requisite gear...");

            //task em
            ns.gang.setMemberTask(name, task);
            ns.tprint("  ...hungry to work, doing " + task + "!");

            //done
            ns.tprint("Success: member added.");
        } else {
            ns.tprint("Fail: User name [" + name + "] already exists!");
        }
    } else {
        ns.tprint("Fail: \'" + name + "\' is not a good name... try again!");
    }
}
