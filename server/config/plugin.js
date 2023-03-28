module.exports = {
  settings: {
    jwt: {
      secret: process.env.JWT_SECRET || 'defaultSecret',
      expiresIn: '1d',
      options: {
        payload: (user) => ({
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role.name,
        }),
      },
    },
  },
};

