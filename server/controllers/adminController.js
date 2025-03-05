import Admin from "../models/admin.js";

export const getAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.findOne().select('-password');
    if (!admin) {
      return res.status(404).json({ mensaje: "Administrador no encontrado" });
    }
    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener perfil de administrador", error: error.message });
  }
};

export const updateAdminProfile = async (req, res) => {
  try {
    const { password, ...updateData } = req.body;
    const admin = await Admin.findOne();
    
    if (!admin) {
      return res.status(404).json({ mensaje: "Administrador no encontrado" });
    }

    Object.assign(admin, updateData);
    await admin.save();

    res.status(200).json({
      mensaje: "Perfil de administrador actualizado exitosamente",
      admin: {
        ...admin.toObject(),
        password: undefined
      }
    });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar perfil", error: error.message });
  }
};

export const updateSecuritySettings = async (req, res) => {
  try {
    const admin = await Admin.findOne();
    if (!admin) {
      return res.status(404).json({ mensaje: "Administrador no encontrado" });
    }

    admin.securitySettings = {
      ...admin.securitySettings,
      ...req.body,
      lastPasswordChange: new Date()
    };
    await admin.save();

    res.status(200).json({
      mensaje: "Configuración de seguridad actualizada exitosamente",
      securitySettings: admin.securitySettings
    });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar configuración de seguridad", error: error.message });
  }
};

export const logAdminActivity = async (req, res) => {
  try {
    const admin = await Admin.findOne();
    if (!admin) {
      return res.status(404).json({ mensaje: "Administrador no encontrado" });
    }

    const { action, details } = req.body;
    admin.activityLog.push({ action, details });
    await admin.save();

    res.status(200).json({
      mensaje: "Actividad registrada exitosamente",
      activity: admin.activityLog[admin.activityLog.length - 1]
    });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al registrar actividad", error: error.message });
  }
};

export const updatePermissions = async (req, res) => {
  try {
    const admin = await Admin.findOne();
    if (!admin) {
      return res.status(404).json({ mensaje: "Administrador no encontrado" });
    }

    admin.permissions = {
      ...admin.permissions,
      ...req.body
    };
    await admin.save();

    res.status(200).json({
      mensaje: "Permisos actualizados exitosamente",
      permissions: admin.permissions
    });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar permisos", error: error.message });
  }
};
