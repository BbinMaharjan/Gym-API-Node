const express = require("express");
const mongoose = require("mongoose");
const expressValidator = require("express-validator");
const app = express();
const PORT = 8080;

// Middlerware
app.use(express.json());
app.use(express.static("public"));

// Database Connenction
mongoose
  .connect(
    "mongodb+srv://bbin:bbin123@gym.3psoy.mongodb.net/gym-api?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Database Connected");
  });

// Routes
app.get("/", (req, re) => {
  res.redirect("/gymapi/users");
});

app.use("/gymapi/gymequipments", require("./routes/gymEquipment"));
app.use("/gymapi/gymexercises", require("./routes/gymExercise"));

app.use("/gymapi/users", require("./routes/user.js"));

app.use("/gymapi/members", require("./routes/member.js"));
app.use("/gymapi/membersattendances", require("./routes/memberAttendance"));
app.use("/gymapi/memberspackages", require("./routes/memberPackage"));
app.use("/gymapi/memberspayments", require("./routes/payment"));

app.use("/gymapi/trainers", require("./routes/trainer.js"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
