require('dotenv').config()
const express = require("express")
const cors = require("cors")
const connectDB = require("./config/db.js")

const authRouter = require("./routes/auth.routes.js")
const productRouter =require("./routes/product.routes.js")
const orderRoutes = require("./routes/order.routes.js"); 


const app = express();
connectDB()


app.use(cors())
app.use(express.json());

app.use("/api/auth",authRouter)
app.use("/api/products",productRouter)
app.use("/api/order",orderRoutes)

app.get("/",(req,res)=>{
    res.send("Velora API RUnning ....")
})



const port =process.env.PORT || 5000;

app.listen(port, ()=>{
    console.log(`sever is runningh ${port}`)
})










