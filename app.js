const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 8080;
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://bbin:bbin123@gym.3psoy.mongodb.net/gym-api?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Database Connected");
  });

app.get("/", (req, re) => {
  res.redirect("/gymapi/users");
});

app.use("/gymapi/users", require("./routes/user.js"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});