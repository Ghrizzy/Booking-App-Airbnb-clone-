const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserSchema = new Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;



git remote add origin https://github.com/Ghrizzy/Booking-App-Airbnb-clone-.git

git branch -M main
git push -u origin main