const router = require('express').Router();

const controller = require('../controllers/role');

const {PermitSchema, AllSchema, RoleSchema} = require('../utils/schema');
const { validateBody, validateParams } = require('../utils/validator');


router.post('/',[validateBody(PermitSchema.add),controller.add]);
router.get('/',controller.all);
router.post('/add/permit',[validateBody(RoleSchema.addPermit),controller.roleAddPermit]);
router.post('/remove/permit',[validateBody(RoleSchema.addPermit),controller.roleRemovePermit]);

router.route('/:id')
.get([validateParams(AllSchema.id,"id"),controller.get])
.patch([validateParams(AllSchema.id,"id"),controller.patch])
.delete([validateParams(AllSchema.id,"id"),controller.drop])

module.exports = router;