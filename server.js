require('dotenv').config();
const express=require('express');
const app=express();
const ejs=require('ejs');
const path=require('path');
const mongoose=require('mongoose');
const session=require('express-session');
const flash=require('express-flash');
const expresslayout=require('express-ejs-layouts');
const { MongoStore } = require('connect-mongo');
const MongoDbStore=require('connect-mongo')(session);
const passport=require('passport');
const Emitter=require('events')
//databse connection
mongoose.connect('mongodb+srv://subhra1234:subhra1234@cluster0.pyhwx.mongodb.net/Pizza-db',{
    
     useNewUrlParser: true , useUnifiedTopology: true
});
const connection=mongoose.connection;

app.use(expresslayout);
app.set('views',path.join(__dirname,'/resources/views'));
app.set('view engine','ejs');
//session-store
let mongoStore=new MongoDbStore({
    mongooseConnection:connection,
    collection:'sessions'
})

//session
app.use(session({
    secret:process.env.COOKIE_SECRET,
    resave:false,
    store:mongoStore,
    saveUninitialized:false,
    // store:mongoStore,
    cookie:{maxAge:1000*60*60*24}
}))

//event emitter
const eventEmitter=new Emitter()
app.set('eventEmitter',eventEmitter)

//passport config
const passportInit=require('./app/config/passport');
passportInit(passport)
app.use(passport.initialize());
app.use(passport.session());

app.use(flash())
//Assets
app.use(express.static('public'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
//global middleware
app.use((req,res,next)=>{
    res.locals.session=req.session
    res.locals.user=req.user
    next()

})
require('./routes/web')(app)

const PORT=process.env.PORT||3000;
const server=app.listen(PORT,()=>{
    console.log('listening on port 3000');
});



//socket
const io=require('socket.io')(server)

io.on('connection',(socket)=>{
    // join
    // console.log(socket.id)
    socket.on('join',(orderId)=>{
        console.log(orderId)

   socket.join(orderId)
    })
})

eventEmitter.on('orderUpdated',(data)=>{

    io.to(`order_${data.id}`).emit('orderUpdated',data)

})


eventEmitter.on('orderPlaced',(data)=>{

    io.to('adminRoom').emit('orderPlaced',data)

})