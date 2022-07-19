const { readdir } = require('fs/promises');
const { join } = require('path');
const os = require('os');


class Navigation {
    _currentPath;

    constructor(path) {
        this._currentPath = path;
    }

    get path() {
        return this._currentPath;
    }

    set path(setPath) {
        if (setPath === os.homedir()) {
            return;
        }
        
        this.currentPath = setPath;
    }

    up = () => {
        this._currentPath = join(this._currentPath, '..');
    }

    cd = (path) => {
        readdir(path)
        .then(() => this._currentPath = path)
        .catch(() => console.log('Operation failed'))
    }

    ls = () => {
        readdir(this._currentPath).then(output => console.log(...output));
    }
}

module.exports = Navigation;
