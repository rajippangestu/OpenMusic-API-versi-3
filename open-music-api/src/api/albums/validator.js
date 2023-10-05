const Joi = require('joi');
const { InvariantError } = require('../../commons/exceptions');

const AlbumsValidator = {
  validatePostAlbumPayload: (payload) => {
    const schema = Joi.object({
      name: Joi.string().required(),
      year: Joi.number().required(),
    });

    const result = schema.validate(payload);

    if (result.error) {
      throw new InvariantError(result.error.message);
    }

    return result.value;
  },
  validatePutAlbumPayload: (payload) => {
    const scheme = Joi.object({
      name: Joi.string().required(),
      year: Joi.number().required(),
    });

    const result = scheme.validate(payload);

    if (result.error) {
      throw new InvariantError(result.error.message);
    }

    return result.value;
  },
  validatePutAlbumCoverPayload: (payload) => {
    const scheme = Joi.object({
      cover: Joi.object({
        hapi: Joi.object({
          filename: Joi.string().required(),
          headers: Joi.object({
            'content-type': Joi.string()
              .valid('image/jpeg', 'image/png', 'image/gif')
              .required(),
          }).unknown(),
        }).unknown(),
      }).unknown().required(),
    });

    const result = scheme.validate(payload);

    if (result.error) {
      throw new InvariantError(result.error.message);
    }

    return result.value;
  },
};

module.exports = AlbumsValidator;
