const Joi = require('joi');

module.exports = {

    PermitSchema : {
        add:Joi.object({
            name:Joi.string().required(),
            created:Joi.optional(),
        })

    },

    AllSchema: {
        id:Joi.object({
            id:Joi.string().regex(/^[0-9a-fA-F]{24}$/),
        })
    },

    RoleSchema : {
        addPermit : Joi.object({
            roleId:Joi.string().regex(/^[0-9a-fA-f]{24}$/),
            permitId:Joi.string().regex(/^[0-9a-fA-f]{24}$/),
        })
    }
}