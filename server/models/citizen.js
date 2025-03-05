import mongoose from "mongoose";

const caseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: {
    address: String,
    city: String,
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  status: {
    type: String,
    enum: ['Pendiente', 'En progreso', 'Resuelto'],
    default: 'Pendiente'
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const citizenSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  username: { type: String, required: true, trim: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  personalInfo: {
    phoneNumber: String,
    idNumber: String,
    dateOfBirth: Date
  },
  address: {
    street: String,
    city: String,
    state: String,
    country: String
  },
  cases: [caseSchema],
  accountStatus: {
    type: String,
    enum: ['Activo', 'Inactivo', 'Suspendido'],
    default: 'Activo'
  },
  lastLogin: Date,
  createdAt: { type: Date, default: Date.now }
}, {
  timestamps: true
});

export default mongoose.model("Citizen", citizenSchema);
