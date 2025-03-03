 import mongoose from "mongoose";

 const citizenSchema = mongoose.Schema({
    name: {type: String, required: true, trim: true},
    username: {type: String, required: true, trim: true},
    password: {type: String, required: true, trim: true}
 })

 export default mongoose.model('Citizen', citizenSchema)