const mongoose=require('mongoose')
const expenseTrackerschema=new mongoose.Schema({
    amount:{
        type:Number
    },category:{
        type:String
    },date:{
        type:String
    }
    }
)
const Expense=mongoose.model('expensedetails',expenseTrackerschema)
module.exports={ Expense}