// const express = require("express");
import express from "express";
import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";
dotenv.config();


const app = express();

const PORT = process.env.PORT;

const MONGO_URL =process.env.MONGO_URL;
const client = new MongoClient(MONGO_URL); // dial
// Top level await
await client.connect(); // call
console.log("Mongo is connected !!!  ");

        app.get("/", function (request, response) {
           response.send("🙋‍♂️, 🌏 🎊✨🤩");
         });
 
      app.post("/room",express.json(),async function(request,response){
        const data=request.body;
        const result=await client.db("b42wd2").collection("room").insertOne(data)
    response.send(result)
      })

      app.post("/customer",express.json(),async function(request,response){
        const data=request.body;
        const result=await client.db("b42wd2").collection("customer").insertOne(data)
        response.send(result)
      })

      app.post("/booked",express.json(),async function(request,response){
        const data=request.body;
        const result=await client.db("b42wd2").collection("booked").insertMany(data)
        response.send(result)
      })

      app.get("/rooms",async function(request,response){
        const books=await client .db("b42wd2").collection("booked").find({"booked-status":"true"}).toArray();
        response.send(books)
      })

      app.get("/customers",async function(request,response){
        const customers=await client .db("b42wd2").collection("booked").find({},{_id : 0,"booked-status": 0}).toArray();
        response.send(customers)
      })
app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));
