//jshint esversion: 6


const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

const port = 3000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

const db = mongoose.connect("mongodb://127.0.0.1:27017/prepUserDB");

const userSchema = new mongoose.Schema({
    _id:String,
    name:{
        type:String,
        required:[true, "Input Name"]
    },
    points:{
        type:Number,
        default:0
    },
    bestReply:Number,
    friends:Number,
    badges:[String]

});

const User = mongoose.model("user", userSchema);

const user1 = new User({
    
    _id:"2802",
    name:"Techbeast",
    bestReply:200,
    friends:100,


});

user1.save();

app.get("/", function(req,res){
   res.sendFile(__dirname + "/index.html");
});




app.post("/", function(req,res){

    const userId = req.body.userId;

    console.log(userId); 
    const action = 'certified';
    //req.body.login;
    console.log(action);
    async function awardPointsAndBadges(userId, action){
    
        const user = await User.findById(userId);
        console.log(user.name);
        if(!user){
            console.log("user not found");
        }
    
        switch (action) {
            case 'login':
                const loginpoints = 10;
                user.points += loginpoints;
                await user.save();
                //await prepUserDB.addpoint(userId, loginpoint);
                break;
        case 'certified':


            //const certificationPoints = 50;


            if(user.friends === 1){
                const certificationBadge = "Friendly Student";
                user.badges.push(certificationBadge);
                await user.save();
            }
            if(user.friends === 10){
                const certificationBadge = "Cool Kid";
                user.badges.push(certificationBadge);
                await user.save();

            }
            if(user.friends ===100){
                const certificationBadge = "Networker-in-Chief";
                user.badges.push(certificationBadge);
                await user.save();
            }
            if(user.bestReply === 1){
                const certificationBadge = "Pay it Forward";
                user.badges.push(certificationBadge);
                await user.save();
            }
            if(user.bestReply >100){
                const certificationBadge = "AfternoonPrep Tutor";
                user.badges.push(certificationBadge);
                await user.save();
            }

            else{
                console.log("opps");
            }

           // user.points += certificationPoints;
           
            // await prepUserDB.addpoint(userId, certificationPoints);
            // await prepUserDB.addBadge(userId, certificationBadge);
    break;
    case 'share':
       const certificationBadge = "AfternoonPrep Evangelist";
       user.badges.push(certificationBadge);
       await user.save();

    break;
    
    case 'invite':
    const invitePoints=5;
    const inviteBadge = "Inviter";
    user.points += invitePoints;
    user.badges.push(inviteBadge);
    await user.save();
    // await prepUserDB.addpoint(userId, invitePoints);
    // await prepUserDB.addBadge(userId, inviteBadge)
    break;
            default:
                console.log("unknown action:", action);
                break;
        }
    }
    
    awardPointsAndBadges(userId,action)
    .then(()=>{
        console.log("Point and Badge awarded");
    })
    .catch((error)=>{
        console.log("Error awarding points and badge:", error);
    });     
    
    res.redirect("/");

});



app.listen(port, function(){
    console.log("Server is Up and running on Localhost 3000");
});









//user1.save();

// const user1 = new User({
//     name:"Temidayo",
//     password:"Tech"
// });


//user1.save();