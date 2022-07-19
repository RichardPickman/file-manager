const Basic = require('./Basic');
const HashIt = require('./Hash');
const Navigation = require('./Navigation');
const OperationSystem = require('./OperationSystem');
const Zip = require('./Zip');
const os = require('os');
const readline = require('readline');
const EventEmitter = require('events');

const { stdin: input, stdout: output, argv } = require('process');

class Application {
    username;

    emitter = new EventEmitter();
    basic = new Basic();
    hasher = new HashIt();
    nav = new Navigation(os.homedir());
    operSystem = new OperationSystem();
    zip = new Zip();

    constructor(username = argv.slice(2)[0]) {
        this.username = username.split('=').at(-1);
    }

    start() {
        this._initCommands();

        const rl = readline.createInterface({ input, output });
        
        rl.setPrompt(`Welcome to the File Manager, ${this.username} \n`);
        rl.prompt();

        rl.on('line', (line) => {
            const [command, ...args] = line.split(' ');
            console.log(line)
            if (line == '.exit') {
                rl.close();
                return;
            }
            
            const emit = this.emitter.emit(command, args);

            if (emit) {
                rl.setPrompt(`You are currently in ${this.nav.path} \n`);
                rl.prompt();
            }

            if (!emit) {
                rl.write('Error: Invalid input \n')
            }
        })

        const bye = () => rl.write(`Thank you for using File Manager, ${this.username} \n`);

        rl.on('close', () => {
            bye();
        })

        rl.on('SIGINT', () => {
            bye();
        })
    }

    _initCommands() {
        const funcs = this._comands();

        Object.keys(funcs).forEach(command => {
            const handler = funcs[command];
            this.emitter.on(command, args => handler(...args));
        });
    }

    _comands() {
        return {
            up: this.nav.up,
            cd: this.nav.cd,
            ls: this.nav.ls,
            cat: this.basic.read,
            add: this.basic.add,
            rn: this.basic.rename,
            cp: this.basic.copy,
            mv: this.basic.move,
            rm: this.basic.remove,
            hash: this.hasher.hash,
            compress: this.zip.compress,
            decompress: this.zip.decompress,
            os: (args) => {
                switch (args) {
                    case '--EOL':
                        console.log(this.operSystem.EOL);
                        return;
                    case '--cpus':
                        console.log(this.operSystem.CPU);
                        return;
                    case '--homedir':
                        console.log(this.operSystem.HOMEDIR);
                        return;
                    case '--username':
                        console.log(this.operSystem.USERNAME);
                        return;
                    case '--architecture':
                        console.log(this.operSystem.ARCH);
                        return;
                    default:
                        console.log('Invalid operation');
                        return;
                }
            }
        }   
    }
}

module.exports = Application;
