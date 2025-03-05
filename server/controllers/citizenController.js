import Citizen from "../models/citizen.js";

export const getAllCitizens = async (req, res) => {
  try {
    const citizens = await Citizen.find().select('-password');
    res.status(200).json(citizens);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener ciudadanos" });
  }
};

export const getCitizenById = async (req, res) => {
  try {
    const citizen = await Citizen.findById(req.params.id).select('-password');
    if (!citizen) {
      return res.status(404).json({ mensaje: "Ciudadano no encontrado" });
    }
    res.status(200).json(citizen);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener ciudadano" });
  }
};

export const createCitizen = async (req, res) => {
  try {
    const newCitizen = new Citizen(req.body);
    await newCitizen.save();
    const citizenResponse = newCitizen.toObject();
    delete citizenResponse.password;
    res.status(201).json({ mensaje: "Ciudadano creado exitosamente", citizen: citizenResponse });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al crear ciudadano" });
  }
};

export const updateCitizen = async (req, res) => {
  try {
    const updatedCitizen = await Citizen.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).select('-password');
    
    if (!updatedCitizen) {
      return res.status(404).json({ mensaje: "Ciudadano no encontrado" });
    }
    res.status(200).json({ mensaje: "Ciudadano actualizado exitosamente", citizen: updatedCitizen });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar ciudadano" });
  }
};

export const deleteCitizen = async (req, res) => {
  try {
    const deletedCitizen = await Citizen.findByIdAndDelete(req.params.id);
    if (!deletedCitizen) {
      return res.status(404).json({ mensaje: "Ciudadano no encontrado" });
    }
    res.status(200).json({ mensaje: "Ciudadano eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar ciudadano" });
  }
};

export const loginCitizen = async (req, res) => {
  try {
    const { username, password } = req.body;
    const citizen = await Citizen.findOne({ username });

    if (!citizen || citizen.password !== password) {
      return res.status(401).json({ mensaje: "Credenciales inválidas" });
    }

    const citizenResponse = {
      id: citizen._id,
      username: citizen.username,
      name: citizen.name,
      role: 'citizen'
    };

    res.status(200).json({ 
      mensaje: "Login exitoso",
      citizen: citizenResponse
    });
  } catch (error) {
    res.status(500).json({ mensaje: "Error en el servidor durante login" });
  }
};

export default {
  getAllCitizens,
  getCitizenById,
  createCitizen,
  updateCitizen,
  deleteCitizen,
  loginCitizen
};
