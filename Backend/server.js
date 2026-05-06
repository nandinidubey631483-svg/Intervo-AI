require("dotenv").config()
const app = require("./src/app");
const connectToDB = require("./src/config/database")




connectToDB();

app.get("/", (req, res) => {
  res.send("Backend is running successfully");
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})