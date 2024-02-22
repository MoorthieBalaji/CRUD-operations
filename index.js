const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');

const app=express();
app.use(cors());

 app.use(express.json());


const PORT=process.env.PORT || 9090

// app.get("/",(req,res)=>{
//     res.json({message:"server is running crud"})
// })


//schema 
const schemaData = mongoose.Schema({
    name: String,
    email: String,
    mobile:String
  
},{
    timestamps:true
})

//usermodel
const userModel=mongoose.model("user",schemaData)

//read
//http://localhost:9090
app.get("/",async(req,res)=>{
    const data=await userModel.find({})
    res.json({success:true,data:data})
})

//create data || save data in MongoDB
//http://localhost:9090/create
// {
//     "id":"",
//     "name":"",
//     "email":"",
//     "mobile":""
// }

app.post("/create",async(req,res)=>{
    console.log(req.body)
    const data=new userModel(req.body)
    await data.save()
    res.send({success:true,message:"data save successfully"})
})


//update data
//http://localhost:9090/update
// {
//     "id":"",
//     "name":"",
//     "email":"",
//     "mobile":""
// }
app.put("/update",async(req,res)=>{
    console.log(req.body)
    const {_id,...rest}=req.body
    console.log(res)
    const data=await userModel.updateOne({_id:_id},rest)
    res.send({success:true,message:"data updated succdefully",data:data})
})

//delete data
//http://localhost:9090/delete/65d370cd0cb82caec211bdbd
app.delete("/delete/:id",async(req,res)=>{
    const id=req.params.id
    console.log(id)
    const data=await userModel.deleteOne({_id:id})
    res.send({success: true,message:"data delete successfully",data:data})
})
mongoose.connect("mongodb://127.0.0.1:27017/crudoperation")
.then(()=>{console.log("connect to db") 
app.listen(PORT,()=>console.log("Server is running"))} ) 
.catch((err)=>console.log(err))


