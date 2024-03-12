const express=require('express')
const mongoose=require('mongoose')
const {Expense}=require('./schema')
const bodyParser=require('body-parser')
const app=express()
app.use(bodyParser.json())
async function connectToDb(){
   try{
    await mongoose.connect('mongodb+srv://Durga2618:Durga2005@cluster0.pinhhqm.mongodb.net/Expensetracker?retryWrites=true&w=majority&appName=Cluster0')
    console.log('print successful')
    app.listen(8000,function(){
        console.log('listening port 8000')
    })}
    catch(error){
          console.log(error)
          console.log('couldnot established connection')
    }
   
}
connectToDb()
app.post('/add-expense',async function(request,response){
    try{
        await Expense.create({
            "amount":request.body.amount,
            "category":request.body.category,
            "date":request.body.date
        })
        response.status(202).json({
            "status":"success",
            "message":"entry created"
        })
    }
    catch(error){
        response.status(500).json({
            "status":"failure",
            "message":"server error"
        })
    }
})
app.get('/get-expenses',async function(request,response){
    try{
        const expenseDetails=await Expense.find()
        response.status(200).json(expenseDetails)
    }catch(error){
        response.status(500).json({
        "status":"failed",
        "message":"could not fetch data",
         "error":error
        })
        
    }

})
app.delete('/delete-expense/:id',async function(request,response){
   try{
    const expenseEntry=await Expense.findById(request.params.id)
    if(expenseEntry){
        await Expense.findByIdAndDelete(request.params.id)
        response.status(200).json({
            "status":"success",
            "message":"entry deleted"
        })
    }
    else{
        response.status(400).json({
             "status":"failed",
             "message":"entry not deleted"
        })
    }
   }
   catch(error){
    response.status(404).json({
        "status":"failed",
        "message":"enetry not found",
         "error":error
        })
   }
})
app.patch('/update-expense/:id',async function(request,response){
    try{
     const expenseEntry=await Expense.findById(request.params.id)
     if(expenseEntry){
        await expenseEntry.updateOne({
         "amount":request.body.amount,
         "category":request.body.category,
         "date":request.body.date
        })
         response.status(200).json({
             "status":"success",
             "message":"entry updated"
         })
     }
     else{
         response.status(400).json({
              "status":"failed",
              "message":"entry not updated"
         })
     }
    }
    catch(error){
     response.status(404).json({
         "status":"failed",
         "message":"enetry not found",
          "error":error
         })
    }
 })
 