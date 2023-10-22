//Main conainer for data
let data={};
data['restaurants']={}
data['restaurants']["Eat 'n' Park"]={}
data['restaurants']["Eat 'n' Park"]["tables"]=[]
data['restaurants']["Eat 'n' Park"]["tables"].push({"tableId":100,"totalSeats":2,"seatsAvailable":0})
data['restaurants']["Eat 'n' Park"]["tables"].push({"tableId":200,"totalSeats":4,"seatsAvailable":2})
data['restaurants']["King's"]={}
data['restaurants']["King's"]["tables"]=[]
data['restaurants']["King's"]["tables"].push({"tableId":300,"totalSeats":6,"seatsAvailable":4})
data['restaurants']["King's"]["tables"].push({"tableId":400,"totalSeats":4,"seatsAvailable":1})
const express = require('express')
const app = express()
const port = 3000
const cors=require('cors')
const cookieParser = require("cookie-parser");
var session=require('express-session')
const path=require('path')
const sqlite3 = require('sqlite3');
require('dotenv').config();

//Instructs the app to get static files relative to the root directory
app.use(express.static(path.join(__dirname, '/')))

app.set('view engine','pug')

function auth(req,res,next) {
  console.log("in auth")
  if(req.session || req.path==='/login') {
      next();
  } else {
      res.redirect("/login")
  }
}

function queryDb() {
    console.log("saving");
    const db = new sqlite3.Database('./db/rezu.db');
    db.serialize(() => {
      const stmt=db.prepare('insert into users (username,password) values (?,?)');
      stmt.run("bob","george");
      stmt.finalize();
      //db.run('insert into games (data) values ('+JSON.stringify(data)+')');
    })
    console.log("saved!");
  }

var sess = {
    secret: process.env.SESSION_SECRET, 
    resave: false,
    saveUninitialized: true,
    sameSite:false,
    path:'/',
    //60000ms = 60 seconds
    cookie: { maxAge: 60000,tester:'hi there!' }
}

if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  sess.cookie.secure = true // serve secure cookies
}

app.use(cookieParser());
app.use(session(sess))
app.use(express.urlencoded({ extended: true }));
app.use(auth);


var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

app.get('/', (req, res) => {
  //res.send('Hello World!')
  res.render('rezui',{message:'Welcome to rez!',title:'rez-ui',data:data})
})
app.route('/login')
  .post(cors(corsOptions),(req, res) => {
    session=req.session;
    session.userid='bob';
    console.log(req.session)
    console.log('logged in'+req.session)
    //res.redirect('/')
    res.redirect('/')
  })
    //res.render('rezui',{message:'Welcome!',title:'rezu-ui',data:data})
  .get((req,res) => {
    res.render('login')
  })

  app.post('/listRestaurants', cors(corsOptions),(req, res) => {
    res.render('rezui',{message:'Welcome!',title:'rezu-ui',data:data})
  })
  app.post('/listTables', cors(corsOptions),(req, res) => {
    console.log('listTables'+req.body)
    res.render('rezui',{restaurantName:req.body.restaurant,message:'Welcome!',title:'rezu-ui',data:data})
  })
  
  app.post('/reserveTable', cors(corsOptions),(req, res) => {
    console.log(req.body)
    res.render('rezui',{restaurantName:req.body.restaurant,tableId:req.body.tableId,message:'Welcome!',title:'rezu-ui',data:data})
  })

  app.post('/offerTable', cors(corsOptions),(req, res) => {
    console.log(req.body)
    res.render('rezui',{restaurantName:req.body.restaurant,tableId:req.body.tableId,message:'Welcome!',title:'rezu-ui',data:data})
  })
  app.get('/logout', (req, res) => {
    req.session.destroy(err=> {
        res.clearCookie('connect.sid');
        res.redirect('/');
    });
    //res.send('Logged out')
  })

  //queryDb();

app.listen(port, () => {
  console.log(`rezu listening on port ${port}`)
})