// const os = require('os');
// console.log(" has changed");

// values of os.platform()
// darwin (macOS)
// freebsd (FreeBSD)
// linux (Linux)
// sunos (SunOS)
// win32 (Windows)
// if(os.platform() === 'win32'){
//     console.log("Windows");
// }

// os.cpus().forEach((cpu, index) => {
//     console.log(`CPU ${index} : ${cpu.model}`);
// })

// console.log(os.arch()); //architecture

// console.log(os.freemem()); //free memory

// console.log(os.networkInterfaces()); //total memory

// File System Module

// fs.mkdir('test123')
//   .then(() => {
//     console.log('folder created')
//   })
//   .catch((err) => {
//     console.log(err)
// })

// fs.watch('test123/test.txt').then((event, filename) => {
//     console.log(event, filename)
// })

// fs.writeFile('test123/test.txt', 'Hello World')
//   .then(() => {
//     console.log('file created')
//   })
//   .catch((err) => {
//     console.log(err)
// })

// fs.readFile('test123/test.txt', (err,data) => {
//     console.log(data);
// })

// fs.appendFile('test123/test.txt', 'this will append ? ')

// try {
// const value = fs.readFileSync('test123/tesere.txt', 'utf8')
// } catch (err) { 
//     // console.log(err)
//     console.log('code is running')
// }

// console.log('end of code');

// const EventEmitter = require('events');

// class ExamOverEventEmitter extends EventEmitter {}

// const examOver = new ExamOverEventEmitter();

// examOver.on('examOver', () => {
//     console.log('exam is over says student 1');
// })

// examOver.on('examStarts', () => {
//     console.log('exam is over says student 2');
// })

// examOver.emit('examOver');
// examOver.emit('examOver');


// common JS 
// const test = require('./test.js');

// const test = (function (exports, require, module, __filename, __dirname) {
//     // module.exports = exports = {};
    
//     function add (a,b) {
//         return a+b;
//     }   

//     exports ={
//         add: add,
//     }
//     return module.exports;
// })({}, require, {}, __filename, __dirname);


// add                        (1,2)
// const a = (function (a,b){return a+b})(1,2)


// Immediately Invoked Function Expression (IIFE)


// (function add(a,b) {
//     return a+b;
// })(1,2);

// add();

// console.log(test.add(1,2));


// import potato from './test.js';

// console.log(potato(1,3));


// name import
// import {sub,div,mul} from './test.js';

// console.log(sub(1,3));

// name + default import

// 1
import os from 'os';
import test, {sub,div,mul} from './test.js';
// test abc = require('./test.js');
// 2
// import * as Test from './test.js';

// Test.default(1,3);
// Test.sub(1,3);
// Test.div(1,3);
// Test.mul(1,3);

console.log("some random data")
// 50,000 lines of code
test(1,2);
os.arch();
os.cpus();