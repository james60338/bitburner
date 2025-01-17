export function city_resources(ns) {
    let cityInfo = { "name": ns.getPlayer().city, "gym": undefined, "uni": undefined };
    switch (cityInfo.name) {
        case "Aevum":
            cityInfo.gym = "Crush Fitness Gym";
            cityInfo.gym = "Snap Fitness Gym";
            cityInfo.uni = "Summit University";
            break;
        case "Chongqing":
            break;
        case "Sector-12":
            cityInfo.gym = "Iron Gym";
            cityInfo.gym = "Powerhouse Gym";
            cityInfo.uni = "Rothman University";
            break;
        case "New Tokyo":
            break;
        case "Ishima":
            break;
        case "Volhaven":
            cityInfo.gym = "Millenium Fitness Gym";
            cityInfo.uni = "ZB Institute Of Technology";
            break;
    }
    return cityInfo;
}
