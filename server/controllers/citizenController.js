import Citizen from "../models/citizen.js";

export const getAllCitizens = async (req, res) => {
  try {
    const citizens = await Citizen.find().select('-password');
    res.status(200).json(citizens);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener ciudadanos", error: error.message });
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
    res.status(500).json({ mensaje: "Error al obtener ciudadano", error: error.message });
  }
};

export const createCitizen = async (req, res) => {
  try {
    const {
      name,
      username,
      password,
      email,
      personalInfo,
      address
    } = req.body;

    const newCitizen = new Citizen({
      name,
      username,
      password, // Note: Should implement password hashing
      email,
      personalInfo,
      address,
      accountStatus: 'Activo'
    });

    await newCitizen.save();
    res.status(201).json({
      mensaje: "Ciudadano creado exitosamente",
      citizen: {
        ...newCitizen.toObject(),
        password: undefined
      }
    });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al crear ciudadano", error: error.message });
  }
};

export const updateCitizen = async (req, res) => {
  try {
    const { password, ...updateData } = req.body;
    const updatedCitizen = await Citizen.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).select('-password');

    if (!updatedCitizen) {
      return res.status(404).json({ mensaje: "Ciudadano no encontrado" });
    }
    res.status(200).json({
      mensaje: "Ciudadano actualizado exitosamente",
      citizen: updatedCitizen
    });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar ciudadano", error: error.message });
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
    res.status(500).json({ mensaje: "Error al eliminar ciudadano", error: error.message });
  }
};

export const addCase = async (req, res) => {
  try {
    const citizen = await Citizen.findById(req.params.id);
    if (!citizen) {
      return res.status(404).json({ mensaje: "Ciudadano no encontrado" });
    }

    citizen.cases.push(req.body);
    await citizen.save();

    res.status(200).json({
      mensaje: "Caso agregado exitosamente",
      case: citizen.cases[citizen.cases.length - 1]
    });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al agregar caso", error: error.message });
  }
};
