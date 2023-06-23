require("dotenv").config();
const express=require("express");
const mongoose=require("mongoose");
const app=express();
const {userRoute}=require("./routes");
const {notFound,errorHandlerMiddleware}=require("./middleware");


app.use(express.json());
app.use("/",userRoute);


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

const port=process.env.PORT || 2000;
app.listen(port,()=>{
    console.log(`listening to the port number ${port}`);
})