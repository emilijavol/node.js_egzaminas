import mongoose from "mongoose";
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  adress: {
    type: Array,
    required: true,
    default: [],
  },
});
const User = mongoose.model("user", userSchema);
export default User;
