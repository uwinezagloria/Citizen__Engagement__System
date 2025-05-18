import mongoose from "mongoose";
const agencySchema = new mongoose.Schema({
  name: String,
  description: String
});
const agencyModel= mongoose.model('Agency', agencySchema);
export default agencyModel