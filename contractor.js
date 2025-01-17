let servObj = (name, depth = 0) => ({
    name: name,
    depth: depth
});

export async function main(ns) {
    ns.tprint("Executing Contractor script...");
    let home = 'home';

    let servers = [servObj(home)];
    let visited = {};
    let contracts = [];

    let server;
    while ((server = servers.pop())) {
        let name = server.name;
        let depth = server.depth;
        visited[name] = true;

        let scanResult = ns.scan(name);
        for (let i in scanResult) {
            if (!visited[scanResult[i]]) {
                servers.push(servObj(scanResult[i], depth + 1));
            }
        }

        let serverContracts = ns.ls(name, ".cct");
        for (let i = 0; i < serverContracts.length; i++) {
            contracts.push([serverContracts[i], name]);
        }
    }

    ns.tprint(" Contracts found: " + contracts.length);
    for (let i in contracts) {
        let c = contracts[i];
        let contract = c[0];
        let target = c[1];
        let contractType = ns.codingcontract.getContractType(contract, target);

        let data = ns.codingcontract.getData(contract, target);
        let doAttempt = false;
        let answer;

        ns.tprint(contractType);
        switch (contractType) {
            case "Find Largest Prime Factor":
                let fac = 2;
                let n = data;
                while (n > fac) {
                    if (n % fac === 0) {
                        n = Math.round(n / fac);
                        fac = 2;
                    } else {
                        ++fac;
                    }
                }
                answer = fac;

                doAttempt = true;
                break;

            case "Subarray with Maximum Sum":
                const nums = data.slice();
                for (let i = 1; i < nums.length; i++) {
                    nums[i] = Math.max(nums[i], nums[i] + nums[i - 1]);
                }
                answer = Math.max(...nums);

                doAttempt = true;
                break;

            case "Total Ways to Sum":
                const ways = [1];
                ways.length = data + 1;
                ways.fill(0, 1);
                for (let i = 1; i < data; ++i) {
                    for (let j = i; j <= data; ++j) {
                        ways[j] += ways[j - i];
                    }
                }
                answer = ways[data];

                doAttempt = true;
                break;

            case "Spiralize Matrix":
                const spiral = [];
                const mm = data.length;
                const nn = data[0].length;
                let u = 0;
                let d = mm - 1;
                let l = 0;
                let r = nn - 1;
                let k = 0;
                while (true) {
                    // Up
                    for (let col = l; col <= r; col++) {
                        spiral[k] = data[u][col];
                        ++k;
                    }
                    if (++u > d) { break; }

                    // Right
                    for (let row = u; row <= d; row++) {
                        spiral[k] = data[row][r];
                        ++k;
                    }
                    if (--r < l) { break; }

                    // Down
                    for (let col = r; col >= l; col--) {
                        spiral[k] = data[d][col];
                        ++k;
                    }
                    if (--d < u) { break; }

                    // Left
                    for (let row = d; row >= u; row--) {
                        spiral[k] = data[row][l];
                        ++k;
                    }
                    if (++l > r) { break; }
                }
                answer = spiral;

                doAttempt = true;
                break;

            case "Array Jumping Game":
                const len = data.length;
                let j = 0;
                for (let reach = 0; j < len && j <= reach; ++j) {
                    reach = Math.max(j + data[j], reach);
                }
                const solution = (j === len);
                if (solution) {
                    answer = 1;
                } else {
                    answer = 0;
                }

                doAttempt = true;
                break;

            case "Merge Overlapping Intervals":
                const intervals = data.slice();
                intervals.sort((a, b) => {
                    return a[0] - b[0];
                });

                const reslt = [];
                let start = intervals[0][0];
                let end = intervals[0][1];
                for (const interval of intervals) {
                    if (interval[0] <= end) {
                        end = Math.max(end, interval[1]);
                    } else {
                        reslt.push([start, end]);
                        start = interval[0];
                        end = interval[1];
                    }
                }
                reslt.push([start, end]);
                answer = convert2DArrayToString(reslt);

                doAttempt = true;
                break;

            case "Generate IP Addresses":
                const rett = [];
                for (let a = 1; a <= 3; ++a) {
                    for (let b = 1; b <= 3; ++b) {
                        for (let c = 1; c <= 3; ++c) {
                            for (let d = 1; d <= 3; ++d) {
                                if (a + b + c + d === data.length) {
                                    const A = parseInt(data.substring(0, a), 10);
                                    const B = parseInt(data.substring(a, a + b), 10);
                                    const C = parseInt(data.substring(a + b, a + b + c), 10);
                                    const D = parseInt(data.substring(a + b + c, a + b + c + d), 10);
                                    if (A <= 255 && B <= 255 && C <= 255 && D <= 255) {
                                        const ip = [A.toString(), ".",
                                            B.toString(), ".",
                                            C.toString(), ".",
                                            D.toString()
                                        ].join("");
                                        if (ip.length === data.length + 3) {
                                            rett.push(ip);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                answer = rett;

                doAttempt = true;
                break;

            case "Algorithmic Stock Trader I":
                let maxCur = 0;
                let maxSoFar = 0;
                for (let i = 1; i < data.length; ++i) {
                    maxCur = Math.max(0, maxCur += data[i] - data[i - 1]);
                    maxSoFar = Math.max(maxCur, maxSoFar);
                }
                answer = maxSoFar.toString();

                doAttempt = true;
                break;

            case "Algorithmic Stock Trader II":
                let profit = 0;
                for (let p = 1; p < data.length; ++p) {
                    profit += Math.max(data[p] - data[p - 1], 0);
                }
                answer = profit.toString();

                doAttempt = true;
                break;

            case "Algorithmic Stock Trader III":
                let hold1 = Number.MIN_SAFE_INTEGER;
                let hold2 = Number.MIN_SAFE_INTEGER;
                let release1 = 0;
                let release2 = 0;
                for (const price of data) {
                    release2 = Math.max(release2, hold2 + price);
                    hold2 = Math.max(hold2, release1 - price);
                    release1 = Math.max(release1, hold1 + price);
                    hold1 = Math.max(hold1, price * -1);
                }
                answer = release2.toString();

                doAttempt = true;
                break;

            case "Algorithmic Stock Trader IV":
                const kk = (data[0]);
                const prices = (data[1]);
                const lenn = prices.length;
                if (lenn < 2) { return (parseInt(ans) === 0); }
                if (kk > lenn / 2) {
                    let res = 0;
                    for (let i = 1; i < lenn; ++i) {
                        res += Math.max(prices[i] - prices[i - 1], 0);
                    }
                    answer = res;

                    doAttempt = true;
                    break;
                }

                const hold = [];
                const rele = [];
                hold.length = kk + 1;
                rele.length = kk + 1;
                for (let i = 0; i <= kk; ++i) {
                    hold[i] = Number.MIN_SAFE_INTEGER;
                    rele[i] = 0;
                }

                let cur;
                for (let i = 0; i < lenn; ++i) {
                    cur = prices[i];
                    for (let j = kk; j > 0; --j) {
                        rele[j] = Math.max(rele[j], hold[j] + cur);
                        hold[j] = Math.max(hold[j], rele[j - 1] - cur);
                    }
                }
                answer = rele[kk];

                doAttempt = true;
                break;

            case "Minimum Path Sum in a Triangle":
                let nnn = data.length;
                let dp = data[nnn - 1].slice();
                for (let i = nnn - 2; i > -1; --i) {
                    for (let j = 0; j < data[i].length; ++j) {
                        dp[j] = Math.min(dp[j], dp[j + 1]) + data[i][j];
                    }
                }
                answer = dp[0];

                doAttempt = true;
                break;

            case "Unique Paths in a Grid I":
                let rows = data[0]; // Number of rows
                let cols = data[1]; // Number of columns
                let currentRow = [];
                currentRow.length = rows;

                for (let k = 0; k < rows; k++) {
                    currentRow[k] = 1;
                }
                for (let row = 1; row < cols; row++) {
                    for (let l = 1; l < rows; l++) {
                        currentRow[l] += currentRow[l - 1];
                    }
                }
                answer = currentRow[rows - 1];

                doAttempt = true;
                break;

            case "Unique Paths in a Grid II":
                let obstacleGrid = [];
                obstacleGrid.length = data.length;
                for (let i = 0; i < obstacleGrid.length; ++i) {
                    obstacleGrid[i] = data[i].slice();
                }

                for (let i = 0; i < obstacleGrid.length; i++) {
                    for (let j = 0; j < obstacleGrid[0].length; j++) {
                        if (obstacleGrid[i][j] == 1) {
                            obstacleGrid[i][j] = 0;
                        } else if (i == 0 && j == 0) {
                            obstacleGrid[0][0] = 1;
                        } else {
                            obstacleGrid[i][j] = (i > 0 ? obstacleGrid[i - 1][j] : 0) + (j > 0 ? obstacleGrid[i][j - 1] : 0);
                        }

                    }
                }
                answer = (obstacleGrid[obstacleGrid.length - 1][obstacleGrid[0].length - 1]);

                doAttempt = true;
                break;

            case "Sanitize Parentheses in Expression":
                let left = 0;
                let right = 0;
                let res = [];

                for (let i = 0; i < data.length; ++i) {
                    if (data[i] === '(') {
                        ++left;
                    } else if (data[i] === ')') {
                        (left > 0) ? --left: ++right;
                    }
                }

                function dfs(pair, index, left, right, s, solution, res) {
                    if (s.length === index) {
                        if (left === 0 && right === 0 && pair === 0) {
                            for (var i = 0; i < res.length; i++) {
                                if (res[i] === solution) { return; }
                            }
                            res.push(solution);
                        }
                        return;
                    }

                    if (s[index] === '(') {
                        if (left > 0) {
                            dfs(pair, index + 1, left - 1, right, s, solution, res);
                        }
                        dfs(pair + 1, index + 1, left, right, s, solution + s[index], res);
                    } else if (s[index] === ')') {
                        if (right > 0) dfs(pair, index + 1, left, right - 1, s, solution, res);
                        if (pair > 0) dfs(pair - 1, index + 1, left, right, s, solution + s[index], res);
                    } else {
                        dfs(pair, index + 1, left, right, s, solution + s[index], res);
                    }
                }
                dfs(0, 0, left, right, data, "", res);
                answer = res;

                doAttempt = true;
                break;

            case "Find All Valid Math Expressions":
                const num = data[0];
                const tar = data[1];

                function helper(res, path, num, targ, pos, evaluated, multed) {
                    if (pos === num.length) {
                        if (targ === evaluated) {
                            res.push(path);
                        }
                        return;
                    }

                    for (let i = pos; i < num.length; ++i) {
                        if (i != pos && num[pos] == '0') { break; }
                        let cur = parseInt(num.substring(pos, i + 1));

                        if (pos === 0) {
                            helper(res, path + cur, num, targ, i + 1, cur, cur);
                        } else {
                            helper(res, path + "+" + cur, num, targ, i + 1, evaluated + cur, cur);
                            helper(res, path + "-" + cur, num, targ, i + 1, evaluated - cur, -cur);
                            helper(res, path + "*" + cur, num, targ, i + 1, evaluated - multed + multed * cur, multed * cur);
                        }
                    }
                }

                let result = [];
                helper(result, "", num, tar, 0, 0, 0);
                answer = result;

                doAttempt = true;
                break;

            default:
                ns.tprint("not running [" + contractType + "]! default case...");
                break;
        }

        if (doAttempt) {
            ns.tprint("  Attempting: " + contract);
            ns.tprint("   from target: " + target);
            ns.tprint("    with answer(s): " + answer);
            if (ns.codingcontract.attempt(answer, contract, target)) {
                ns.tprint("     [" + contractType + "] Success!");
            } else {
                ns.tprint("     [" + contractType + "] Failure...");
            }
        }
    }
}

function convert2DArrayToString(arr) {
    const components = [];
    arr.forEach((e) => {
        let s = e.toString();
        s = ["[", s, "]"].join("");
        components.push(s);
    });

    return components.join(",").replace(/\s/g, "");
}
