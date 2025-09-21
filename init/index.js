const mongoose = require('mongoose');
const Listing=require("../models/listing.js");
const Initdata=require("./data.js");

main()
.then(()=>{
    console.log("Connected to database!");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const initDB=async()=>{
    await Listing.deleteMany({});
    Initdata.data=Initdata.data.map((obj)=>({...obj,owner:"68c3d7f607b003c6f19ad34e"}));
    await Listing.insertMany(Initdata.data);
    console.log("data was initialized!");
}

initDB();
