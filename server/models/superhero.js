import mongoose from "mongoose";

const powerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  level: { type: Number, min: 1, max: 10 }
});

const assignedCaseSchema = new mongoose.Schema({
  caseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Case' },
  status: {
    type: String,
    enum: ['Asignado', 'En progreso', 'Completado'],
    default: 'Asignado'
  },
  startDate: Date,
  completionDate: Date,
  citizenFeedback: {
    rating: { type: Number, min: 1, max: 5 },
    comment: String
  }
});

const superheroSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  username: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
  score: { type: Number, default: 0 },
  rank: {
    type: String,
    enum: ['Novato', 'Intermedio', 'Experto', 'Élite', 'Legendario'],
    default: 'Novato'
  },
  powers: [powerSchema],
  specialties: [String],
  activeStatus: {
    type: String,
    enum: ['Disponible', 'En misión', 'Descansando', 'Inactivo'],
    default: 'Disponible'
  },
  stats: {
    successfulMissions: { type: Number, default: 0 },
    failedMissions: { type: Number, default: 0 },
    averageRating: { type: Number, default: 0 }
  },
  assignedCases: [assignedCaseSchema],
  contactInfo: {
    email: { type: String, required: true, unique: true },
    phone: String,
    emergencyContact: String
  },
  location: {
    city: String,
    operationArea: [String]
  },
  createdAt: { type: Date, default: Date.now }
}, {
  timestamps: true
});

export default mongoose.model("Superhero", superheroSchema);
