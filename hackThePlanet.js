// Set these variables
let script = 'innocuous.js';
let home = 'home';

export async function main(ns) {
    let doKillAll = ns.args[0] === 'false' ? false : true;
    var places = scanMore("", "home", ns);
    Array.from(places).forEach(element=>ns.tprint(element));
    await hackItAll(places, ns, doKillAll);
}

function scanMore(prev, current, ns) {
    var all = [];
    all.push(current);
    let list = ns.scan(current);
    for (var i in list) {
        var next = list[i];
        if (next != prev) {
            var sarr = scanMore(current, next, ns).toString();
            var narr = sarr.split(',');
            all = all.concat(narr);
        }
    }
    return all;
}

async function hackItAll(hosts, ns, doKill) {
    for (var j = 0; j < hosts.length; j++) {
        var target = hosts[j];
        var ports = 0;

        if (target === 'home') {
            continue;
        }

        if (doKill) {
            ns.killall(target);
        }

        // open them ports if you got em
        if (ns.fileExists("BruteSSH.exe", home)) {
            ns.brutessh(target);
            ports++;
        }
        if (ns.fileExists("FTPCrack.exe", home)) {
            ns.ftpcrack(target);
            ports++;
        }
        if (ns.fileExists("relaySMTP.exe", home)) {
            ns.relaysmtp(target);
            ports++;
        }
        if (ns.fileExists("HTTPWorm.exe", home)) {
            ns.httpworm(target);
            ports++;
        }
        if (ns.fileExists("SQLInject.exe", home)) {
            ns.sqlinject(target);
            ports++;
        }

        if (ns.getServerNumPortsRequired(target) <= ports) {
            ns.nuke(target);
        }

        if (ns.hasRootAccess(target)) {
            ns.tprint("Success! Root Access for " + target);

            // are you good enough?
            if (ns.getHackingLevel() > ns.getServerRequiredHackingLevel(target)) {

                // thread count
                var needed = ns.getScriptRam(script);
                var totalRam = ns.getServerMaxRam(target);
                var ramUsed = ns.getServerUsedRam(target);
                var threads = Math.floor((totalRam - ramUsed) / needed);

                if (threads > 0) {
                    // copy the file
                    await ns.scp(script, home, target);

                    // run that shit
                    ns.exec(script, target, threads);
                    ns.tprint("Running script on " + target);
                } else {
                    ns.tprint("Insufficient RAM on " + target);
                }

            } else {
                ns.tprint("Nice try bitch... get good");
            }

        } else {
            ns.tprint("Fail! Access Denied for " + target);
        }
    }
}
