const fs = require('fs');
const axios = require('axios');
const process = require('process');

function cat(path, out) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading ${path}:`);
            console.error(err);
            process.exit(1);
        } else {
            handleOutput(data, out);
        }
    });
}

async function webCat(url, out) {
    try {
        const res = await axios.get(url);
        handleOutput(res.data, out);
    } catch (err) {
        console.error(`Error fetching ${url}:`);
        console.error(err);
        process.exit(1);
    }
}

function handleOutput(data, out) {
    if (out) {
        fs.writeFile(out, data, 'utf8', err => {
            if (err) {
                console.error(`Couldn't write ${out}:`);
                console.error(err);
                process.exit(1);
            }
        });
    } else {
        console.log(data);
    }
}

const args = process.argv.slice(2);
let out, input;

if (args[0] === '--out') {
    out = args[1];
    input = args[2];
} else {
    input = args[0];
}

if (input.startsWith('http')) {
    webCat(input, out);
} else {
    cat(input, out);
}
