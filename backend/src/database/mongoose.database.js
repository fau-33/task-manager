const mongoose = require("mongoose");

const connectToDatabase = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@fsctaskmanagercluster.fckgujj.mongodb.net/task-manager?retryWrites=true&w=majority&appName=FscTaskManagerCluster`
    );
    console.log("Connected to database mongodb");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error; // Propaga o erro para ser tratado no `startServer`
  }
};

module.exports = connectToDatabase;
