const bodyParser = require('body-parser')
const express = require('express')
const mongoose = require('mongoose')
const {Expense, User} = require('./schema.js')
const app = express()
app.use(bodyParser.json())
async function connectToDb(){
    try{
        await mongoose.connect('mongodb+srv://rasi:raci93@cluster0.ghqb6s4.mongodb.net/DB?retryWrites=true&w=majority&appName=Cluster0')
        console.log("DB connection established :)")
        app.listen(8000,function(){
        console.log('Listening on port 8000...')
    })
    }catch(error){
        console.log(error)
        console.log('Couldn\'t establish DB connection')
    }
    
}
connectToDb()

app.post('/add-expense', async function(request,response){
    try{
        await Expense.create({
            "amount": request.body.amount,
            "category":request.body.category,
            "date":request.body.date
        })
        response.status(201).json({
            "status": "success",
            "message":"entry successfully added"
        })
    }catch(error){
        response.status(500).json({
            "status": "failure",
            "message":"entry not created",
            "error":error
        })
    }
})

app.get('/get-expenses',async function(request,response){
    try{
        const expenseDetails = await Expense.find()
        response.status(200).json(expenseDetails)
    }catch(error){
        response.status(500).json({
            "status" : "failure",
            "message":"could not fetch data",
            "error":error
        })
    }
})
app.delete('/delete-expense/:id', async function(request, response) {
    try {
        await Expense.findByIdAndDelete(request.params.id)
        response.status(200).json({
            "status" : "success",
            "message" : "entry deleted"
        })
    } catch(error) {
        response.status(500).json({
            "status" : "failure",
            "message" : "couldn\'t delete entry",
            "error" : error
        })
    }
})
app.patch('/update-expense/:id', async function(request, response) {
    try {
        await Expense.findByIdAndUpdate(request.params.id, {
            "amount": request.body.amount,
            "category": request.body.category,
            "date": request.body.date
        })
        response.status(200).json({
            "status" : "success",
            "message" : "entry updated"
        })
    } catch(error) {
        response.status(500).json({
            "status" : "failure",
            "message" : "couldn\'t update entry",
            "error" : error
        })
    }
})