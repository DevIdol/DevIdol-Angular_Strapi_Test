module.exports = {
  jwt: {
    enabled: true,
    secret: 'my-secret-key',
    options: {
      expiresIn: '1d',
      jwtid: 'strapi-jwt',
      audience: 'strapi-frontend',
      issuer: 'strapi-backend',
      subject: 'strapi-user',
      algorithm: 'HS256',
      payload: {
        user_id: {
          type: 'integer',
          example: 1
        },
        email: {
          type: 'string',
          example: 'john.doe@example.com'
        },
        role: {
          type: 'string',
          example: 'authenticated'
        }
      }
    }
  }
};
