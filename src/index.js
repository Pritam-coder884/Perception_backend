require("dotenv").config();
const express=require("express");
const mongoose=require("mongoose");
const app=express();
const {userRoute}=require("./routes");


app.use(express.json());
app.use("/",userRoute);

app.get("/",(req,res)=>{
    res.send("welcome to Perception server");
})

const port=process.env.PORT
app.listen(port,()=>{
    console.log(`listening to the port number ${port}`);
})


// connection with Mongodb database
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected with Mongodb database");
  })
  .catch((error) => console.log(`${error} did not connect`));