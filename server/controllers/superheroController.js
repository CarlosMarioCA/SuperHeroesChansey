import Superhero from "../models/superhero.js";

export const getAllSuperheroes = async (req, res) => {
  try {
    const superheroes = await Superhero.find().select('-password');
    res.status(200).json(superheroes);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener superhéroes", error: error.message });
  }
};

export const getSuperheroById = async (req, res) => {
  try {
    const superhero = await Superhero.findById(req.params.id).select('-password');
    if (!superhero) {
      return res.status(404).json({ mensaje: "Superhéroe no encontrado" });
    }
    res.status(200).json(superhero);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener superhéroe", error: error.message });
  }
};

export const createSuperhero = async (req, res) => {
  try {
    const {
      name,
      username,
      password,
      powers,
      specialties,
      contactInfo,
      location
    } = req.body;

    const newSuperhero = new Superhero({
      name,
      username,
      password,
      powers,
      specialties,
      contactInfo,
      location,
      activeStatus: 'Disponible',
      rank: 'Novato'
    });

    await newSuperhero.save();
    res.status(201).json({
      mensaje: "Superhéroe creado exitosamente",
      superhero: {
        ...newSuperhero.toObject(),
        password: undefined
      }
    });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al crear superhéroe", error: error.message });
  }
};

export const updateSuperhero = async (req, res) => {
  try {
    const { password, ...updateData } = req.body;
    const updatedSuperhero = await Superhero.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).select('-password');

    if (!updatedSuperhero) {
      return res.status(404).json({ mensaje: "Superhéroe no encontrado" });
    }
    res.status(200).json({
      mensaje: "Superhéroe actualizado exitosamente",
      superhero: updatedSuperhero
    });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar superhéroe", error: error.message });
  }
};

export const deleteSuperhero = async (req, res) => {
  try {
    const deletedSuperhero = await Superhero.findByIdAndDelete(req.params.id);
    if (!deletedSuperhero) {
      return res.status(404).json({ mensaje: "Superhéroe no encontrado" });
    }
    res.status(200).json({ mensaje: "Superhéroe eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar superhéroe", error: error.message });
  }
};

export const assignCase = async (req, res) => {
  try {
    const superhero = await Superhero.findById(req.params.id);
    if (!superhero) {
      return res.status(404).json({ mensaje: "Superhéroe no encontrado" });
    }

    superhero.assignedCases.push(req.body);
    superhero.activeStatus = 'En misión';
    await superhero.save();

    res.status(200).json({
      mensaje: "Caso asignado exitosamente",
      case: superhero.assignedCases[superhero.assignedCases.length - 1]
    });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al asignar caso", error: error.message });
  }
};

export const updateStats = async (req, res) => {
  try {
    const superhero = await Superhero.findById(req.params.id);
    if (!superhero) {
      return res.status(404).json({ mensaje: "Superhéroe no encontrado" });
    }

    const { successfulMissions, failedMissions, averageRating } = req.body;
    superhero.stats = {
      ...superhero.stats,
      successfulMissions,
      failedMissions,
      averageRating
    };
    
    await superhero.save();
    res.status(200).json({
      mensaje: "Estadísticas actualizadas exitosamente",
      stats: superhero.stats
    });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar estadísticas", error: error.message });
  }
};
