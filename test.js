const express = require('express')
const app = express()
const port = 3000
const cors=require('cors')
const cookieParser = require("cookie-parser");
var session=require('express-session')
require('dotenv').config();
app.set('view engine','pug')

var sess = {
    secret: process.env.SESSION_SECRET, 
    resave: false,
    saveUninitialized: true,
    sameSite:false,
    path:'/',
    //60000ms = 60 seconds
    cookie: { maxAge: 360000,tester:'hi there!' }
}

function auth(req,res,next) {
    console.log("in auth")
    if(req.session || req.path==='/login') {
        next();
    } else {
        res.redirect("/login")
    }
}

app.use(cookieParser());
app.use(session(sess))
app.use(express.urlencoded({ extended: true }));
app.use(auth);

var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.route('/login')
    .get((req,res) => {
        res.render('login')
    })
    .post(cors(corsOptions),(req,res)=>{   
        session=req.session;
        session.userid='bob';
        console.log(req.session)
        console.log('logged in'+req.session)
        res.redirect('/')
    })

app.get('/', (req, res) => {
    //res.send('Hello World!')
    res.render('test',{message:'hello',title:'rezu'})
})

/*app.get('/login',(req,res)=> {
    res.render('login')
})*/


app.listen(port, () => {
    console.log(`rezu listening on port ${port}`)
})
