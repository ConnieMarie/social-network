const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(require("./routes"));

// Wrap Mongoose around local connection to MongoDB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/social-network", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.set("debug", true);

app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}!`);
});
