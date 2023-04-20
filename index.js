// var catMe = require('cat-me')
// console.log("is this working")
// console.dir(catMe);
// catMe('grumpy')
// commonJS module (import export)
// var color = require('colors-cli')
// console.log( color.green_bbt('hello') )

// const a = 23;

// exports.a = a;
// exports.b = 42;
// exports.c = 99;


// const cat ={
//     name: 'cat',
//     age: 3,
// }

// function catMe(){
//     console.log('cat me')
// }

// const dog={
//     name: 'dog',
//     age: 4,
// }

// const test = {
//     name: 'test',
// }


// // default export
// export default dog;
// // normal export
// export {cat, catMe };
// export {test};

// import http from 'http';


// api/v1/employees GET 
// api/v1/managers  GET
// api/v1/students  GET
// api/v1/teachers  GET

// const server = http.createServer((req, res) => {
//     if(req.method === 'GET'){
//         // if(req.url === '/'){
      
//         // res.write('hello world \n');
//         // res.write('hi I am still there \n');
//         // res.write('hi I am still there \n');
//         // res.write('hi I am still there \n');
//         // res.end();
//         // } else if (req.url === '/about'){ 
//         //     res.write('about page \n');
//         //     res.end();
//         // }
//         if(req.url === '/api/v1/employees'){
//             res.write('employees \n');
//             res.end();
//         } else if (req.url === '/api/v1/managers'){ 
//             res.write('managers \n');
//             res.end();
//         } else if (req.url === '/api/v1/students'){
//             res.write('students \n');
//             res.end();
//         } else if (req.url === '/api/v1/teachers'){
//             res.write('teachers \n');
//             res.end();
//         }
//     } else if (req.method === 'POST'){
//        let body = '';
//         req.on('data', (chunk) => {
//              body += chunk;
//         });
//         console.log(body);
//         req.on('end', () => {
//             console.log(body);
//             res.end('data resided');
//         });
//     }
// });

// server.listen(4505, () => {
//     console.log('listening on port 4505')
// });



// import http from 'http';

// const server = http.createServer((req, res) => {
//     if(req.method === 'GET'){
//         if(req.url === '/'){
//            res.end('hello world');
//         }
//     }
// });

// server.listen(4505,()=>{});


// todo list
// GET 
// /todos
 //  {
 //    "todos": ['test' ,'test2',"teach at newton school"]
 //  }

// GET
// /todos/3
// {
//     "todo": "teach at newton school"
// }

// POST
// /todos
// {
    //     "todo": "teach at newton school"
// }

// DELETE
// /todos/1


import dotenv from 'dotenv';
import express from "express";
import cors  from 'cors';
import todoRoutes from './routes/todo/todo.js';
import path from 'path';
import mongoose from 'mongoose';

dotenv.config();

console.log(process.env.MONGO_URL);
mongoose.connect(process.env.MONGO_URL,{useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection;

db.on('error', (error) => console.error(error));

db.once('open', () => console.log('connected to database'));

console.log(process.argv[0]);
console.log(process.argv[1]);

const __dirname = path.dirname(process.argv[1]);



const app = express();


console.log(path.join(__dirname,'public'));


app.use(express.static(path.join(__dirname, 'potato')));


app.use(express.json());

app.use(express.urlencoded({extended: true}));

app.use('/todos', todoRoutes)



console.log(process.env.PORT);
app.listen(process.env.PORT||8080,()=>{});

