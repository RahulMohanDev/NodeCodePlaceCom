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

import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import todoRoutes from './routes/todo/todo.js'
import path from 'path'
import mongoose, { Mongoose } from 'mongoose'

dotenv.config()

console.log(process.env.MONGO_URL)
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
const db = mongoose.connection

db.on('error', (error) => console.error(error))

db.once('open', () => console.log('connected to database'))

console.log(process.argv[0])
console.log(process.argv[1])

const __dirname = path.dirname(process.argv[1])


const messages = mongoose.Schema({
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  isRead: {
    type: Boolean,
    required: true,
  },
  message: {
    type: String,
    required: true,
    max: 10,
  },
  attachments: [
    {
      typeOfDocument: {
        type: String,
        enum: ['pdf', 'doc', 'docx', 'ppt', 'pptx', 'xls', 'xlsx'],
      },
      fileName: String,
      createdAt: Date,
    },
  ],
  typeOfMessage: {
    type: String,
    enum: ['text', 'image', 'video', 'audio'],
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    validate: {
      validator: function (v) {
        return v < Date.now()
      },
    },
  },
})

const Message = mongoose.model('Messages', messages)

const app = express()

console.log(path.join(__dirname, 'public'))

app.use(express.static(path.join(__dirname, 'potato')))

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

// app.use('/todos', todoRoutes)

app.get('/api/v1/messages', (req, res) => {
  const page = parseInt(req.query.page) || 1
  const filterByMessage = req.query.q || ''
  const limit = 3
  const start = (page - 1) * limit
  Message.find({
    message: {
      $regex: filterByMessage,
      $options: 'i',
    },
  })
    .skip(start)
    .limit(limit)
    .then((messages) => {
      res.json(messages)
    })
})

app.post('/api/v1/messages', (req, res) => {
  const dateAndTime = new Date(req.body.createdAt)

  const attachments = req.body.attachments.map((attachment) => {
    return {
      typeOfDocument: attachment.typeOfDocument,
      fileName: attachment.fileName,
      createdAt: new Date(),
    }
  })

  const message = new Message({
    from: req.body.from,
    to: req.body.to,
    isRead: false,
    attachments: attachments,
    message: req.body.message,
    typeOfMessage: req.body.typeOfMessage,
    createdAt: dateAndTime,
  })
  message
    .save()
    .then((message) => {
      res.json(message)
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        // Handle validation errors
        console.log(err.errors)
        res.status(400).json(err.errors)
      } else {
        // Handle other errors
        console.log(err)
      }
    })
})

// query first
// app.put('/api/v1/messages/:id', (req, res) => {
//     Message.findById(req.params.id).then((message) => {
//         message.isRead = true;
//         message.save().then((message) => {
//             res.json(message);
//         });
//     });
// })

// update first
app.patch('/api/v1/messages/:id', (req, res) => {
  Message.updateOne(
    { _id: req.params.id },
    {
      isRead: true,
    },
  ).then((message) => {
    res.json(message)
  })
})

console.log(process.env.PORT)
app.listen(process.env.PORT || 8080, () => {})
