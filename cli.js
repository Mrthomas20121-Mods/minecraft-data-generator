import { exec } from 'node:child_process';
import { copyFileSync, mkdirSync, readdirSync } from 'node:fs';
import { join, relative } from 'node:path';

/**
 * Copy a Directory
 * @param {string} source 
 * @param {string} destination 
 */
function copyDirectory(source, destination) {
    mkdirSync(destination, { recursive: true });

    readdirSync(source, { withFileTypes: true }).forEach((entry) => {
      let sourcePath = join(source, entry.name);
      let destinationPath = join(destination, entry.name);

      entry.isDirectory()
        ? copyDirectory(sourcePath, destinationPath)
        : copyFileSync(sourcePath, destinationPath);
    });
}

class Task {

    /**
     * @param {string} name 
     * @param {(args: string[]) => void} cb 
     * @param {string} desc Task description
     */
    constructor(name, desc, cb) {
        this.name = name;
        this.cb = cb;
        this.desc = desc;
    }

    /**
     * run the task
     * @param {string[]} args 
     */
    run(args) {
        this.cb(args)
    }
}

class TaskMaster {
    /**
     * @type {Map<string, Task>}
     */
    taskMap = new Map();

    constructor() {
        this.init();
    }

    init() {
        this.registerTask('metallum', 'Start the metallum datagen', (args) => {
            exec('tsc -p ./tsconfig.json').addListener('close', () => {
                exec('node ./src/datagen/metallum.js').addListener('close', () => {
                    copyDirectory('./generated/tfc_metallum/', 'C:/Users/mrtho/Dev/Java/MinecraftMods/TFC Metallum/src/main/resources');
                }).on('error', (err) => {
                    console.log(err);
                });
            });
        });
        this.registerTask('metalwork', 'Start the metalwork datagen', (args) => {
            exec('tsc -p ./tsconfig.json').addListener('close', () => {
                exec('node ./src/datagen/metalwork.js').addListener('close', () => {
                    copyDirectory('./generated/tfc_metalwork/', 'C:/Users/mrtho/Dev/Java/MinecraftMods/TFC-Metalwork/src/main/resources');
                }).on('error', (err) => {
                    console.log(err);
                });
            });
        });

        this.registerTask('deco', 'Start the tfc decoration datagen', (args) => {
            exec('tsc -p ./tsconfig.json').addListener('close', () => {
                exec('node ./src/datagen/tfc_decoration.js').addListener('close', () => {
                    copyDirectory('./generated/tfc_decoration/', 'C:/Users/mrtho/Dev/Java/MinecraftMods/TFC-Decoration/src/main/resources');
                }).on('error', (err) => {
                    console.log(err);
                });
            });
        });

        this.registerTask('ae2_tools', 'Start the ae2 tools complement datagen', (args) => {
            exec('tsc -p ./tsconfig.json').addListener('close', () => {
                exec('node ./src/datagen/ae2_tools.js').addListener('close', () => {
                    copyDirectory('./generated/ae2_tools/', 'C:/Users/mrtho/Dev/Java/MinecraftMods/ae2_tools_complement/src/main/resources');
                }).on('error', (err) => {
                    console.log(err);
                });
            });
        });

        this.registerTask('gravitation', 'Start the aether gravitation datagen', (args) => {
            exec('tsc -p ./tsconfig.json').addListener('close', () => {
                exec('node ./src/datagen/aether_gravitation.js').addListener('close', () => {
                    copyDirectory('./generated/gravitation/', 'C:/Users/mrtho/Dev/Java/MinecraftMods/Aether Gravitation/src/main/resources');
                }).on('error', (err) => {
                    console.log(err);
                });
            });
        });
    }

    /**
     * 
     * @param {string} taskName name of the task
     * @param {string} desc Task Description
     * @param {(args: string[]) => void} callback what to do when you call the task
     */
    registerTask(taskName, desc, callback) {
        this.taskMap.set(taskName, new Task(taskName, desc, callback));
    }

    run(taskName, args) {
        this.taskMap.get(taskName).run(args);
    }
}

(function cli() {
    let master = new TaskMaster();
    let argv = process.argv;
    let args = argv.slice(3);
    let task_cmd = argv[2];
    if(task_cmd == '--help' || task_cmd == '/?') {
        console.log('Available tasks : ')
        master.taskMap.forEach((value, key) => console.log(`Task ${key} : --task ${key}`));
    }
    else if(task_cmd != '--task') {
        console.log('Cannot find task!');
    }
    else {
        let task_name = argv[3];
        master.run(task_name, args);
    }
    
})();