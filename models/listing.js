const mongoose = require('mongoose');
const review = require('./review.js');
const { ref } = require('joi');
const Schema=mongoose.Schema;

const listingSchema=new Schema({
    title:{type:String,
       required:true,
    },
    description:String,
   image: {
  filename: { type: String, default: "listingimage" },
  url: {
    type: String,
    default: "https://media.istockphoto.com/id/503016934/photo/entrance-of-luxury-hotel.jpg?s=612x612&w=0&k=20&c=DXFzucB2xWGf3PI6_yjhLKDvrFcGlOpOjXh6KDI8rqU=",
  },
},
 price:Number,
    location:String,
    country:String,
    reviews:[
      {
        type:Schema.Types.ObjectId,
        ref:"Review",
      },
    ],
    owner:{
      type:Schema.Types.ObjectId,
      ref:"User",
    },
})


listingSchema.post("findOneAndDelete",async(listing)=>{
  if(listing){
    await review.deleteMany({_id:{$in:listing.reviews}});
  }
});

const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;