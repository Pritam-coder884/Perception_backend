require("dotenv").config();
const express=require("express");
const mongoose=require("mongoose");
const cors = require('cors')
const session = require('express-session')
const passport = require('passport')

require('./helpers/passport')
const {userRoute, authRoute}=require("./routes");
const {notFound,errorHandlerMiddleware}=require("./middleware");

const app=express();
const port=process.env.PORT || 2000;

app.use(express.json());
app.use(session({
  secret : "zairza",
  resave : false,
  saveUninitialized : true,
  cookie : {secure : false}
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(cors({
    origin : process.env.CLIENT_URL,
    methods : "GET,POST,PATCH,DELETE",
    credentials : true,
}))

app.use("/",userRoute);
app.use("/",authRoute)

app.get("/",(req,res)=>{
  res.send("welcome to Perception server");
})


// connection with Mongodb database
mongoose.set("strictQuery", false);
const url = process.env.MONGO_URL;
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected with Mongodb database");
  })
  .catch((error) => console.log(`${error}`));

// error handler
app.use(notFound);
app.use(errorHandlerMiddleware);

app.listen(port,()=>{
    console.log(`listening to the port number ${port}`);
})