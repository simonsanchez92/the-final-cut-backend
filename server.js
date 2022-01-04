const express = require("express");
const path = require("path");

const connectDB = require("./config/db");

const cors = require("cors");

connectDB();

const app = express();

app.use(cors());
//Body parser
app.use(express.json());

//Route files
const auth = require("./routes/auth");
const movies = require("./routes/movies");
const users = require("./routes/users");

//Mount routers

app.use("/api/v1/auth", auth);
app.use("/api/v1/movies", movies);
app.use("/api/v1/users", users);

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`App runing on port ${PORT}`);
});
