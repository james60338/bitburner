/* Customizable variables for basic needs scripting */
const freeCourse = false; // Study using free course (or Algorithms)
const universityName = "Rothman University"; // Where to study; needs to be in current city
let limit = 10; // Level to reach before completion
const gymName = "Iron Gym"; // Where to workout; needs to be in current city

export async function main(ns) {
    limit = ns.args[0] ? ns.args[0] : limit;
    // STUDY
    ns.tprint("Studying hacking...");
    let courseName = freeCourse ? "Study Computer Science" : "Algorithms";
    while (ns.getStats().hacking < limit) {
        ns.universityCourse(universityName, courseName);
        await ns.sleep(5000);
    }
    ns.tprint(" Hacking level " + limit + " reached.");

    // CHARISMA
    ns.tprint("Gaining charisma...");
    while (ns.getStats().charisma < limit) {
        ns.universityCourse(universityName, "Leadership");
        await ns.sleep(5000);
    }
    ns.tprint(" Charisma level " + limit + " reached.");

    // WORKOUT
    ns.tprint("Working out that bod...");
    let stats = ["strength", "defense", "dexterity", "agility"];
    for (let stat of stats) {
        while (ns.getStats()[stat] < limit) {
            ns.gymWorkout(gymName, stat);
            await ns.sleep(5000);
        }
    }
    ns.tprint(" Combat stats all reached level " + limit + ".");

    ns.universityCourse(universityName, "Study Computer Science");
}
