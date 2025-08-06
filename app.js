const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride=require("method-override");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
async function main() {
  await mongoose.connect(MONGO_URL);
}

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("Hello i am root!");
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.get("/listings", async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
});

app.get("/listings/new", (req, res) => {
  res.render("listings/new.ejs");
});

app.get("/listings/:id", async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/show.ejs", { listing });
});

app.post("/listings",async (req,res)=>{
    const newlisting=new Listing(req.body.listings);
    newlisting.save();
    res.redirect("/listings"); 
})

app.get("/listings/:id/edit",async (req,res)=>{
      let {id}=req.params;
      const listing=await Listing.findById(id);
      res.render("listings/edit.ejs",{listing});
})

app.put("/listings/:id",async (req,res)=>{
   let {id}=req.params;
   await Listing.findByIdAndUpdate(id,{...req.body.listing }) ;
   res.redirect("/listings");
})

app.delete("/listings/:id",async (req,res)=>{
   let {id}=req.params;
   let deletedlisting=await Listing.findByIdAndDelete(id);
   console.log(deletedlisting);
   res.redirect("/listings");
})

// app.get("/testListing",async (req,res)=>{
//       let sampleListing=new Listing({
//          title:"My New Villa",
//          d!escription:"By the beach",
//          price:1200,
//          location:"Goa",
//          country:"India",
//       });
//       await sampleListing.save();
//       console.log("sample was saved");
//       res.send("successfull testing");
// });

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
