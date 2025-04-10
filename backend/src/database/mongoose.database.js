const mongoose = require("mongoose");

const connectToDatabase = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://user2025:test234@fsctaskmanagercluster.fckgujj.mongodb.net/?retryWrites=true&w=majority&appName=FscTaskManagerCluster`
    );
    console.log("Conectado ao MongoDB!");
  } catch (error) {
    console.error("Erro ao conectar ao MongoDB:", error);
  }
};

module.exports = connectToDatabase;
