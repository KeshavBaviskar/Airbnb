const express= require("express");
const app=express();
const mongoose = require("mongoose");
const Listing=require("./models/listing.js");

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');

}

main().then(()=>{
    console.log("connected to DB");
}).catch(err=>{
    console.log(err);
})

app.get("/",(req,res)=>{
    res.send("Hello World!");
})

app.get("/testListing",async (req,res)=>{
      let sampleListing=new Listing({
         title:"My New Villa",
         description:"By the beach",
         price:1200,
         location:"Goa",
         country:"India",
      });
      await sampleListing.save();
      console.log("sample was saved");
      res.send("successfull testing");
}); 

app.listen(8080,()=>{
    console.log("Server is running on port 8080");
});