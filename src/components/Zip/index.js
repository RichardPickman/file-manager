const { pipeline } = require('stream');
const { createBrotliCompress, createBrotliDecompress } = require('zlib');
const { createReadStream, createWriteStream } = require('fs');
const { join, sep } = require('path');


class Zip {
    compress(path, dest) {
        const brotli = createBrotliCompress();
        const file = path.split(sep).at(-1);
        const initialFile = createReadStream(join(path));
        const resultFile = createWriteStream(join(dest, file + '.br'));

        pipeline(initialFile, brotli, resultFile, (err) => console.log('Operation failed'));

        return console.log('File successfully compressed')
    }

    decompress(path, dest) {
        const unBrotli = createBrotliDecompress();
        const file = path.split(sep).at(-1).split('.').slice(0, 2).join('.');
        const initialFile = createReadStream(join(path));
        const resultFile = createWriteStream(join(dest, file));
    
        pipeline(initialFile, unBrotli, resultFile, (err) => console.log('Operation failed'));
    
        return console.log('File successfully decompressed')
    };
}

module.exports = Zip;
