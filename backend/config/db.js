const mongoose = require("mongoose");

const connectToDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      // Get rid of depreciated messages
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Connected to DB: ${conn.connection.host}`.magenta.underline);
  } catch (err) {
    console.log(`Error: ${err.message}`.red.bold);
    process.exit();
  }
};

module.exports = connectToDB;
