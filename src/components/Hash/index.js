const { createHash } = require('crypto');
const { createReadStream } = require('fs');


class HashIt {
    hash(path) {
        const readAndReturn = () => new Promise((resolve, reject) => {
            const stream = createReadStream(path, { encoding: 'utf8'});
            let fileContent = '';

            stream.on('data', (chunk) => fileContent += chunk);
            stream.on('end', () => resolve(fileContent));
            stream.on('error', (err) => reject(err));
        });

        const crypto = createHash('sha256');

        crypto.on('readable', () => {
            const data = crypto.read();
            if (data) {
                console.log(data.toString('hex'));
            }
        })
        
        readAndReturn()
        .then(data => crypto.write(data))
        .catch(err => console.log('Operation failed'));
        
        crypto.end();
    }
}

module.exports = HashIt;
