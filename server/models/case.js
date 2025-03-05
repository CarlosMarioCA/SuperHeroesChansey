import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  sender: {
    type: String,
    enum: ['Héroe', 'Ciudadano'],
    required: true
  },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const caseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  citizen: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Citizen'
},
hero: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Superhero'
},
  status: {
    type: String,
    enum: ['Abierto', 'En progreso', 'Resuelto', 'Cerrado'],
    default: 'Abierto'
  },
  priority: {
    type: String,
    enum: ['Baja', 'Media', 'Alta', 'Urgente'],
    default: 'Media'
  },
  location: {
    address: String,
    city: String,
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  messages: [messageSchema],
  resolution: {
    completedAt: Date,
    summary: String,
    heroFeedback: String,
    citizenFeedback: String,
    rating: { type: Number, min: 1, max: 5 }
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, {
  timestamps: true
});

export default mongoose.model("Case", caseSchema);
