const fs = require('fs');
const axios = require('axios');
const process = require('process');

function cat(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading ${path}:`);
            console.error(err);
            process.exit(1);
        } else {
            console.log(data);
        }
    });
}

async function webCat(url) {
    try {
        const res = await axios.get(url);
        console.log(res.data);
    } catch (err) {
        console.error(`Error fetching ${url}:`);
        console.error(err);
        process.exit(1);
    }
}

const args = process.argv.slice(2);
const input = args[0];

if (input.startsWith('http')) {
    webCat(input);
} else {
    cat(input);
}
