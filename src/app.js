const express = require("express");
const res = require("express/lib/response");

require("./db/conn");
const User = require("./models/users");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// displaying data from db
app.get("/user", async (req,res)=>{
    try{
        const userData = await User.find();
        res.send(userData);
    }catch(err){
        res.send(err);
    }

});



// CREATING ENTRIES INTO THE DB
app.post("/user", async(req,res)=>{
    try{
        const entry = new User(req.body);
        const createUser = await entry.save();
        console.log(createUser);
        res.status(201).send(createUser);

    }catch(e){
        res.status(400).send(e);
    }
});


// update user data as per requierment

app.patch("/user/:id", async(req, res)=>{
    try{
        const _id = req.params.id;
        const userData = await User.findById(_id);

        // console.log(userData.email);
        
        const updatePayment = await User.findOneAndUpdate({email:userData.email},{isPaymentMade: true}, {new:true});
        
        // console.log(updatePayment);
        
        const fetchedreferer = userData.referredUser.name;
        const fetchedemail = userData.referredUser.email; 
        const referer = await User.find({name:fetchedreferer, email:fetchedemail});
        
        if( referer){
            // console.log(referer);
            
            const updateUser = await User.findOneAndUpdate({ email:fetchedemail}, {totalEarnings: referer[0].totalEarnings+10}, {new :true});
        
            if(! updateUser && ! updatePayment){
                res.send("Some error occured");
            }else{
                res.send(`${updateUser}  & ${updatePayment}`);
                // console.log(updateUser);
            }
            
        }else{
            res.status(500).send("No such refral found !");
        }


    }catch(err){
        res.status(500).send(err);
    }
})





app.listen(port, (req, res)=>{
    console.log(`server is running at port ${port}`);
})