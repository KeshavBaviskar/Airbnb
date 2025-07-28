const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const listingSchema=new Schema({
    title:{
        type:String,
        required:true,
    },
    description:String,
    image:{
        type:String,
        default:"https://unsplash.com/photos/do-something-great-neon-sign-oqStl2L5oxI",
        set:(v)=>v===""?"https://unsplash.com/photos/do-something-great-neon-sign-oqStl2L5oxI":v,
    },
    price:Number,
    location:String,
    country:String,
});

const Listing=mongoose.model("Listing",listingSchema);

module.exports=Listing;