const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });

    console.log(`mongoDB Connected ${connect.connection.host}`.green.bold);
  } catch (error) {
    console.log(`erroe : ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
