const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    mongoose.connect(
      "mongodb+srv://admin:admin@tapancluster.zaxy0yl.mongodb.net/blog-app?retryWrites=true&w=majority&appName=TapanCluster"
    );
    mongoose.connection.on("connected", () => {
      console.log("Database Connected");
    });
  } catch (error) {
    mongoose.connection.on("error", () => {
      console.log("Database not connected", error);
    });
  }
};

module.exports = connectDb;
