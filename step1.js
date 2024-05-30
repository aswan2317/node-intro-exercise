const fs = require('fs');
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

const args = process.argv.slice(2);
const filePath = args[0];

if (filePath) {
    cat(filePath);
} else {
    console.error('Please provide a file path');
    process.exit(1);
}
