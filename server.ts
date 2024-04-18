import express from "express"
import * as dotenv from "dotenv"
import db from "./src/db"
import router from "./src/routes"
import path from "path"

dotenv.config()

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/assets", express.static(path.join(__dirname, "src/assets")));
app.use(router)

const PORT = process.env.PORT || 3000

app.get("/", (req, res) => {
    res.send("Hello World")
})

app.listen(PORT, async () => {
    await db.$connect()
    console.log(`Server Running on PORT ${PORT}`);
    
})