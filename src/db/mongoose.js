const mongoose = require("mongoose");

const URI = "mongodb://localhost:27017/jwt";

mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
