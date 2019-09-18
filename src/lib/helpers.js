const bcrypt = require('bcryptjs');
const helpers = {};

// Encriptar contraseña
helpers.encryptPassword = async (password) => {
    // Crear un patron para cifrar la contraseña 
    const salt = await bcrypt.genSalt(10);

    // Cifrar la contraseña basado en el patron generado
    const hash = await bcrypt.hash(password, salt);

    // Devolver la contraseña final cifrada
    return hash;
};

// Comparar la contraseña almacenada y cifrada con la contraseña usada para logear  
helpers.matchPassword = async (password, savedPassword) => {
    try {
       return await bcrypt.compare(password, savedPassword);
    } catch (error) {
        console.log(error);
    }
};

module.exports = helpers;