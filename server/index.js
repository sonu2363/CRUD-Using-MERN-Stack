const express=require('express')
const app=express()
const cors=require('cors')
const mongoose=require('mongoose');
const FriendModel = require('./models/friends');
//require('dotenv').config()
mongoose.set('strictQuery', true); 
app.use(express.json())
app.use(cors())

// const DB='mongodb+srv://sonu_ssh:2RKIE6GWvVbiETtm@cluster0.pvmtrj0.mongodb.net/pedro?retryWrites=true&w=majority' when connected to cloud
//
// mongoose.connect(DB,{
//     useNewUrlParser:true,
//     useUnifiedTopology:true,
//}).then(()=>{ when connected to cloud
    
//     console.log('Connection succesfull')
// }).catch((err)=>console.log('no connection',err))

mongoose.connect('mongodb://0.0.0.0:27017/pedro',)

//AddFriend API
app.post('/addFriend',async(req,res)=>{
    const name=req.body.name
    const age=req.body.age
    const friend=new FriendModel({name:name,age:age})
    await friend.save()//since save returns a promise await is used
    res.send(friend)

})


//READ API
app.get('/read',(req,res)=>{
     FriendModel.find({}).then((err,result)=>{
        if(err)
        {
            res.send(err)
        }
        else
        {
            res.send(result)
        }

    })
    
})

//UPDATE API
app.put('/update',async(req,res)=>{
    const newAge=req.body.newAge
    const id=req.body.id
    // try{
    //      await FriendModel.findById(id,async(error,friendToUpdate)=>
    //      {
    //         friendToUpdate.age=Number(newAge)//send as string as number but in
    //         // schema it is defined as NUmber
    //        await friendToUpdate.save()

    //      })
        
    // } catch(err)
    // {
    //     console.log(err)
    // }
    let data=await FriendModel.updateOne(//this method by anil sidhu is better than 
    //pedro
        {id:id},
        {
            $set:{age:newAge}
        }
    )
    res.send('updated')
})

app.delete('/delete/:_id',async(req,res)=>{
  await FriendModel.deleteOne(req.params)
    res.send('deleted')
})


app.listen(3001)