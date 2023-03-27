module.exports = {
  find(params, populate) {
    console.log("OK1")
    return strapi.query('user', 'users-permissions').find(params, populate);
  },

  findOne(params, populate) {
    console.log("OK")
    return strapi.query('user', 'users-permissions').findOne(params, populate);
  },

  count(params) {
    return strapi.query('user', 'users-permissions').count(params);
  },

  async create(data, { files } = {}) {
    const advanced = await strapi
      .store({
        environment: strapi.config.environment,
        type: 'plugin',
        name: 'users-permissions',
        key: 'advanced'
      })
      .get();

    const role = await strapi.query('role', 'users-permissions').findOne({ type: advanced.default_role }, []);

    const user = await strapi.query('user', 'users-permissions').create(data);

    if (!files || !files.length) {
      await strapi.query('user', 'users-permissions').update({ id: user.id }, { role: role.id });
      return user;
    }

    // automatic role assignation doesn't work for upload plugin
    // and we need to assign role manually
    await strapi.plugins['upload'].services.upload.uploadFiles(user, files, { source: 'users-permissions' });
    await strapi.query('user', 'users-permissions').update({ id: user.id }, { role: role.id });

    return this.findOne({ id: user.id });
  },

  async update(params, data, { files } = {}) {
    const advanced = await strapi
      .store({
        environment: strapi.config.environment,
        type: 'plugin',
        name: 'users-permissions',
        key: 'advanced'
      })
      .get();

    if (data.role && !advanced.roles.some(role => role.id === data.role)) {
      throw new Error('Forbidden');
    }

    const user = await strapi.query('user', 'users-permissions').update(params, data);

    if (!files || !files.length) {
      return user;
    }

    // automatic role assignation doesn't work for upload plugin
    // and we need to assign role manually
    await strapi.plugins['upload'].services.upload.uploadFiles(user, files, { source: 'users-permissions' });

    return this.findOne({ id: user.id });
  },

  delete(params) {
    return strapi.query('user', 'users-permissions').delete(params);
  }
};
