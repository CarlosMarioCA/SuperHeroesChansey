import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true,
    immutable: true,
    default: 'administradorSistema'
  },
  password: { 
    type: String, 
    required: true 
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  role: {
    type: String,
    default: 'Administrador',
    immutable: true
  },
  permissions: {
    manageHeroes: { type: Boolean, default: true, description: 'Gestionar Héroes' },
    manageCitizens: { type: Boolean, default: true, description: 'Gestionar Ciudadanos' },
    manageCases: { type: Boolean, default: true, description: 'Gestionar Casos' },
    systemConfiguration: { type: Boolean, default: true, description: 'Configuración del Sistema' }
  },
  activityLog: [{
    action: String,
    timestamp: { type: Date, default: Date.now },
    details: Object
  }],
  lastLogin: Date,
  securitySettings: {
    twoFactorEnabled: { type: Boolean, default: true },
    lastPasswordChange: Date,
    loginAttempts: { type: Number, default: 0 }
  }
}, {
  timestamps: true,
  collection: 'admin'
});

// Asegurar que solo exista un administrador
adminSchema.pre('save', async function(next) {
  const Admin = this.constructor;
  if (await Admin.countDocuments() > 0 && this.isNew) {
    throw new Error('Solo puede existir una cuenta de administrador en el sistema');
  }
  next();
});

export default mongoose.model("Admin", adminSchema);
