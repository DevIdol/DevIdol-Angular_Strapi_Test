/**
 * A set of functions called "actions" for `user`
 */

import {sanitizeEntity} from '@strapi/utils'

export default {
  async changePassword(ctx) {
    const { id } = ctx.params;
    const { currentPassword, newPassword } = ctx.request.body;

    if (!currentPassword || !newPassword) {
      return ctx.badRequest('Current password and new password are required.');
    }

    const user = await strapi.plugins['users-permissions'].services.user.fetch({
      id,
    });

    if (!user) {
      return ctx.badRequest('User not found.');
    }

    const validPassword = await strapi.plugins[
      'users-permissions'
    ].services.user.validatePassword(currentPassword, user.password);

    if (!validPassword) {
      return ctx.badRequest('Current password is incorrect.');
    }

    const password = await strapi.plugins[
      'users-permissions'
    ].services.user.hashPassword(newPassword);

    const updatedUser = await strapi.plugins['users-permissions'].services.user.edit(
      {
        id,
      },
      {
        password,
      }
    );

    return sanitizeEntity(updatedUser, {
      model: strapi.query('user', 'users-permissions').model,
    });
  },
};
