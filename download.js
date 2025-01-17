const files = [
    "sconfig.txt",
    "start.ns",
    "hackThePlanet.ns",
    "innocuous.ns",
    "nodes.ns",
    "contractor.ns",
    "singularityfunctions.ns",
    "faction.ns",
    "augments.ns",
    "scan.ns",
    "/helpers/helper.ns",
    "printfile.ns",
    "/info/Shortcut_Help.txt",
    "/lists/gang/allBasicEquipment.txt",
    "/lists/gang/tasks.txt",
];

export async function main(ns) {
    for (let file of files) {
        await ns.wget('https://raw.githubusercontent.com/james60338/bitburner/master/' + file, file);
    }
}
