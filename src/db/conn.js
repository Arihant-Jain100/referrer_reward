const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/referalUsers", {
    useNewUrlParser: true
}).then(()=>{
    console.log("connection sucessful");
}).catch((e)=>{
    console.log("some problem occured pls check code/server");
});