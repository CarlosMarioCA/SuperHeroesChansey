import Case from "../models/case.js";

export const getAllCases = async (req, res) => {
  try {
    const cases = await Case.find()
      .populate({
        path: 'citizen',
        model: 'Citizen',
        select: 'name username'
      })
      .populate({
        path: 'hero',
        model: 'Superhero',
        select: 'name username'
      });
    res.status(200).json(cases);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener casos", error: error.message });
  }
};

export const getCaseById = async (req, res) => {
  try {
    const case_ = await Case.findById(req.params.id)
      .populate({
        path: 'citizen',
        model: 'Citizen',
        select: 'name username'
      })
      .populate({
        path: 'hero',
        model: 'Superhero',
        select: 'name username'
      });
    if (!case_) {
      return res.status(404).json({ mensaje: "Caso no encontrado" });
    }
    res.status(200).json(case_);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener caso", error: error.message });
  }
};

export const createCase = async (req, res) => {
  try {
    const {
      title,
      description,
      citizen,
      hero,
      priority,
      location
    } = req.body;

    const newCase = new Case({
      title,
      description,
      citizen,
      hero,
      priority,
      location,
      status: 'Abierto'
    });

    await newCase.save();
    
    const populatedCase = await Case.findById(newCase._id)
      .populate({
        path: 'citizen',
        model: 'Citizen',
        select: 'name username'
      })
      .populate({
        path: 'hero',
        model: 'Superhero',
        select: 'name username'
      });

    res.status(201).json({
      mensaje: "Caso creado exitosamente",
      case: populatedCase
    });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al crear caso", error: error.message });
  }
};

export const updateCase = async (req, res) => {
  try {
    const updatedCase = await Case.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    .populate({
      path: 'citizen',
      model: 'Citizen',
      select: 'name username'
    })
    .populate({
      path: 'hero',
      model: 'Superhero',
      select: 'name username'
    });

    if (!updatedCase) {
      return res.status(404).json({ mensaje: "Caso no encontrado" });
    }
    res.status(200).json({
      mensaje: "Caso actualizado exitosamente",
      case: updatedCase
    });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar caso", error: error.message });
  }
};

export const deleteCase = async (req, res) => {
  try {
    const deletedCase = await Case.findByIdAndDelete(req.params.id);
    if (!deletedCase) {
      return res.status(404).json({ mensaje: "Caso no encontrado" });
    }
    res.status(200).json({ mensaje: "Caso eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar caso", error: error.message });
  }
};

export const addMessage = async (req, res) => {
  try {
    const case_ = await Case.findById(req.params.id)
      .populate({
        path: 'citizen',
        model: 'Citizen',
        select: 'name username'
      })
      .populate({
        path: 'hero',
        model: 'Superhero',
        select: 'name username'
      });
    if (!case_) {
      return res.status(404).json({ mensaje: "Caso no encontrado" });
    }

    const { sender, content } = req.body;
    case_.messages.push({ sender, content });
    await case_.save();

    res.status(200).json({
      mensaje: "Mensaje agregado exitosamente",
      message: case_.messages[case_.messages.length - 1]
    });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al agregar mensaje", error: error.message });
  }
};

export const updateResolution = async (req, res) => {
  try {
    const case_ = await Case.findById(req.params.id)
      .populate({
        path: 'citizen',
        model: 'Citizen',
        select: 'name username'
      })
      .populate({
        path: 'hero',
        model: 'Superhero',
        select: 'name username'
      });
    if (!case_) {
      return res.status(404).json({ mensaje: "Caso no encontrado" });
    }

    case_.resolution = {
      ...case_.resolution,
      ...req.body,
      completedAt: new Date()
    };
    case_.status = 'Resuelto';
    await case_.save();

    res.status(200).json({
      mensaje: "Resolución actualizada exitosamente",
      resolution: case_.resolution
    });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar resolución", error: error.message });
  }
};
