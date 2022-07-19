const { 
    createReadStream,
    createWriteStream,
    copyFile,
    rm,
    rename: changeName
} = require('fs');
const { sep } = require('path');
const { stdout } = require('process');
const { join } = require('path');


class Basic {
    read(path) {
        const stream = createReadStream(path);

        stream.on('data', (err, chunk) => {
            if (err) console.log('Invalid operation')

            stdout.write(chunk.toString().trim() + '\n');
        })
    }

    add(path, file) {
        const stream = createWriteStream(join(path, file));

        stream.write('');
    }

    copy(path, dest, file = path.split(sep).at(-1)) {
        copyFile(path, join(dest, file), (err) => err && console.log('Operation failed'));
    }

    rename(path, name) {
        const getPaths = path.split(sep)
        const [ _, format ] = getPaths.at(-1).split('.')

        changeName(path, join(getPaths.slice(0, -1).join(sep), name + '.' + format), (err) => err && console.log('Operation failed'));
    }

    move = (path, dest) => {
        this.copy(path, dest);
    }

    remove = (path) => {
        rm(path, (err) => err && console.log('Operation failed'));
    }
}

module.exports = Basic;
