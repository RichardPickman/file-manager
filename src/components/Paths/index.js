const os = require('os');

class PathHandler {
    currentPath;

    constructor(path) {
        this.currentPath = path;
    }

    get path() {
        return this.currentPath;
    }

    set path(setPath) {
        if (setPath === os.homedir()) {
            return;
        }
        
        this.currentPath = setPath;
    }

    
}

module.exports = PathHandler;
