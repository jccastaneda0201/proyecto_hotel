const jwt = require('jsonwebtoken');

const createToken = (usuario) => {
    const data = {
        usuario_id: usuario.id,
        usuario_rol: usuario.rol
    }
    console.log(data)
    return jwt.sign(data, 'crmhotel');
}

module.exports = createToken;