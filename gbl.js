let names = ["Todd", "Bryce", "Clif", "Tommy", "Cassandra", "Lorraine", "Gabriela", "Sandy", "Garrett", "Joel", "Kelsey", "Dr. Wolfe", "Andy", "Jason", "Aaron", "Ben", "James Brodeur", "Chadcole Chadcole", "Jock", "Ty", "Bakamole", "Webster", "Eric", "Buscemi", "Kathy", "Kim", "Justin", "Clark", "Jersky", "Keith"];
let allNames = ["Aaron Gavino", "Albert Andrews", "Alejandro Guzman", "Andy Robles", "Ben Baysinger", "Bryce Schmitt", "Cassandra Ludwig", "Chad Cole", "Clark Bleecker", "Clifton Porter", "Colin Hinton", "Dan Jersky", "Dave Jollota", "Diana Pardy", "Eric Gentry", "Forrest Brown", "Gabby Vallejo", "Garrett Edwards", "Geoff Meager", "Greg Siuta", "Hans Gamboa", "Hunter Harding", "Jacob Heybl", "James Brodeur", "Jason Laver", "Jessica Smith", "Jim Bak", "Jim Buscemi", "Jim Webster", "Joe Fernandez", "Joe Gannatal", "Joe Lam", "Joel Helling", "Jonathan (Ionatana) Sipili", "Joy Urban", "Justin Maestri", "Kathy France", "Kathy Smith", "Kelsey Helling", "Kim Gavino", "Lee Manko ", "Lee Olson", "Lorraine Foronda", "Mark Getzinger", "Matt Smith", "Michael O'Keefe", "Neidi Chavez", "Ralph Garcia", "Sandy Gullo", "Scott Kujiraoka", "Scott Nguyen", "Sean Carlisle", "Shannon Arnold", "Shelley Higgins", "Steve Hock", "Steve Jollota", "Todd Klasik", "Tom Jacques", "Tommy Stein", "Travis Wert", "Ty Ford", "Valerie Jimenez", "William Wolfe"];
let namePos = 0;
let tasks = ["Unassigned",
    "Mug People",
    "Deal Drugs",
    "Strongarm Civilians",
    "Run a Con",
    "Armed Robbery",
    "Traffick Illegal Arms",
    "Threaten & Blackmail",
    "Human Trafficking",
    "Terrorism",
    "Vigilante Justice",
    "Train Combat",
    "Train Hacking",
    "Train Charisma",
    "Territory Warfare"
];

let equips = ["Baseball Bat",
    "Katana",
    "Glock 18C",
    "P90C",
    "Steyr AUG",
    "AK-47",
    "M15A10 Assault Rifle",
    "AWM Sniper Rifle",
    "Bulletproof Vest",
    "Full Body Armor",
    "Liquid Body Armor",
    "Graphene Plating Armor",
    "Ford Flex V20",
    "ATX1070 Superbike",
    "Mercedes-Benz S9001",
    "White Ferrari"
];

export async function main(ns) {
    let setup = await ns.prompt("Are you sure you want to run gang setup?");
    if (setup) {
        ns.tprint("Starting gang setup...");

        recruitGBL(ns);
        ns.tprint("Recruitment finished.");


        let gifts = findBasicEquipment(ns);
        merryXmas(ns, gifts);
        ns.tprint("Stuffs purchased.");

        hustle(ns);
        ns.tprint("Training 'em up!")
    }
}


// Finds the basic equipment
function findBasicEquipment(ns) {
    var equipment = ns.gang.getEquipmentNames();
    var basicEquipment = [];
    for (var i = 0; i < equipment.length; i++) {
        var type = ns.gang.getEquipmentType(equipment[i]);
        if (type == "Weapon" || type == "Armor" || type == "Vehicle") {
            basicEquipment.push(equipment[i]);
        }
    }
    return basicEquipment;
}


function recruitGBL(ns) {
    // Fill up the gang roster
    while (ns.gang.canRecruitMember()) {
        ns.gang.recruitMember(names[namePos++]);
    }

}


function merryXmas(ns, items) {
    // Buy some equipment
    let guys = ns.gang.getMemberNames();
    for (let g = 0; g < guys.length; g++) {
        for (let i = 0; i < items.length; i++) {
            ns.gang.purchaseEquipment(guys[g], items[i]);
        }
    }
}


function hustle(ns) {
    // Assign those lower class people
    let guys = ns.gang.getMemberNames();
    for (var i = 0; i < guys.length; i++) {
        var member = ns.gang.getMemberInformation(guys[i]);
        if (member.task === tasks[0]) {
            if (member.strength > 30) {
                ns.gang.setMemberTask(guys[i], tasks[3])
            } else {
                ns.gang.setMemberTask(guys[i], tasks[11]);
            }
        }
    }
}
