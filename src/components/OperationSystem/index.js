const os = require('os');


class OperationSystem {
    _EOL = os.EOL;
    _CPU = os.cpus();
    _HOMEDIR = os.homedir();
    _USERNAME = os.hostname();
    _ARCH = os.arch();

    get EOL() {
        return this._EOL;
    }

    get CPU() {
        return this._CPU;
    }

    get HOMEDIR() {
        return this._HOMEDIR
    }

    get USERNAME() {
        return this._USERNAME
    }

    get ARCH() {
        return this._ARCH
    }
}

module.exports = OperationSystem;
