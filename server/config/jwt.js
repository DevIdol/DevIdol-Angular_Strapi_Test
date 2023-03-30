const jwt = require('jsonwebtoken');

const token = jwt.sign(
  { id: user.id, email: user.email, role: user.role },
  strapi.config.get('plugins.jwt.secret'),
  {
    expiresIn: strapi.config.get('plugins.jwt.options.expiresIn'),
    algorithm: strapi.config.get('plugins.jwt.options.algorithm'),
    jwtid: strapi.config.get('plugins.jwt.options.jwtid'),
    audience: strapi.config.get('plugins.jwt.options.audience'),
    issuer: strapi.config.get('plugins.jwt.options.issuer'),
    subject: strapi.config.get('plugins.jwt.options.subject'),
    payload: strapi.config.get('plugins.jwt.options.payload')(user)
  }
);

return {token}
