const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const mongooes = require("mongoose");
const UserRoute = require("./routes/user")

const app = express();
const PORTNO = process.env.PORT || 3000;

mongooes
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });


// middelware
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);


// routes
app.use('/api/v1/user' , UserRoute )

app.listen(PORTNO, () => {
  console.log(` server is up and running on port no ${PORTNO}`);
});
