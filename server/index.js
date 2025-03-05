import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import citizenRoutes from './routes/citizen.js';
import superheroRoutes from './routes/superhero.js';
import caseRoutes from './routes/case.js';
import adminRoutes from './routes/admin.js';

// Load environment variables
dotenv.config();

const app = express();

// Connect to MongoDB Atlas
mongoose.connect(process.env.ATLAS_URI)
  .then(() => console.log('🟢 Connected to MongoDB Atlas'))
  .catch(err => console.error('🔴 MongoDB connection error:', err));

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/citizens', citizenRoutes);
app.use('/api/superheroes', superheroRoutes);
app.use('/api/cases', caseRoutes);
app.use('/api/admin', adminRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('🔴 Server error:', err.stack);
  res.status(500).json({ mensaje: 'Error interno del servidor' });
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

export default app;
