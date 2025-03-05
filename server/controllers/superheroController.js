import Superhero from "../models/superhero.js";

export const getAllSuperheroes = async (req, res) => {
  try {
    const superheroes = await Superhero.find().select('-password');
    res.status(200).json(superheroes);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener superhéroes" });
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
    res.status(500).json({ mensaje: "Error al obtener superhéroe" });
  }
};

export const createSuperhero = async (req, res) => {
  try {
    const newSuperhero = new Superhero(req.body);
    await newSuperhero.save();
    const superheroResponse = newSuperhero.toObject();
    delete superheroResponse.password;
    res.status(201).json({ mensaje: "Superhéroe creado exitosamente", superhero: superheroResponse });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al crear superhéroe" });
  }
};

export const updateSuperhero = async (req, res) => {
  try {
    const updatedSuperhero = await Superhero.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).select('-password');
    
    if (!updatedSuperhero) {
      return res.status(404).json({ mensaje: "Superhéroe no encontrado" });
    }
    res.status(200).json({ mensaje: "Superhéroe actualizado exitosamente", superhero: updatedSuperhero });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar superhéroe" });
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
    res.status(500).json({ mensaje: "Error al eliminar superhéroe" });
  }
};

export const loginSuperhero = async (req, res) => {
  try {
    const { username, password } = req.body;
    const superhero = await Superhero.findOne({ username });

    if (!superhero || superhero.password !== password) {
      return res.status(401).json({ mensaje: "Credenciales inválidas" });
    }

    const superheroResponse = {
      id: superhero._id,
      username: superhero.username,
      name: superhero.name,
      role: 'hero'
    };

    res.status(200).json({ 
      mensaje: "Login exitoso",
      superhero: superheroResponse
    });
  } catch (error) {
    res.status(500).json({ mensaje: "Error en el servidor durante login" });
  }
};

export default {
  getAllSuperheroes,
  getSuperheroById,
  createSuperhero,
  updateSuperhero,
  deleteSuperhero,
  loginSuperhero
};
