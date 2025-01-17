export async function main(ns) {
    if (ns.args.length < 1) {
        ns.tprint("Missing argument: filename");
        ns.exit();
    }

    let filename = ns.args[0];
    let file = ns.read(filename);

    ns.tprint(filename + "\n" + file);
}
