const bodyRequestValidator = require('../middlewares/bodyRequestValidator');
const cpfValidator = require('../middlewares/cpfValidator');
const { authValidate } = require('../middlewares/auth');
const { passwordValidator } = require('../middlewares/passwordValidator');
const { statusFieldValidator } = require('../middlewares/statusFieldValidator');
const { logIn } = require('../controllers/login');
const {
  signUpUser,
  detailUser,
  editUser,
  verifyEmail,
  verifyAndResetPassword,
  createAndSendPasswordResetRequest
} = require('../controllers/users');
const { signUpClient, detailClient, editClient, listClients } = require('../controllers/clients');
const { createCharge, listCharges, editCharge, deleteCharge, detailCharge } = require('../controllers/charges');
const { summary } = require('../controllers/summary');
const loginSchema = require('../schemas/loginSchema');
const signUpSchema = require('../schemas/signUpSchema');
const editUserSchema = require('../schemas/editUserSchema');
const signUpClientSchema = require('../schemas/signUpClientSchema');
const editClientSchema = require('../schemas/editClientSchema');
const createChargeSchema = require('../schemas/createChargeSchema');
const editChargeSchema = require('../schemas/editChargeSchema');
const resetPasswordSchema = require('../schemas/resetPasswordSchema');

const routes = require('express')();

routes.get('/', (req, res) => {
  return res.json('API PARA SISTEMA DE GERENCIAMENTO FINANCEIRO.');
});

routes.post(
  '/usuario',
  bodyRequestValidator(signUpSchema),
  signUpUser
);
routes.get('/usuario/verificar-email', verifyEmail);
routes.get('/usuario/resetar-senha', createAndSendPasswordResetRequest);
routes.patch('/usuario/resetar-senha', bodyRequestValidator(resetPasswordSchema), verifyAndResetPassword);

routes.post('/login', bodyRequestValidator(loginSchema), logIn);

routes.use(authValidate);

routes.get(
  '/resumo',
  summary
);

routes.get(
  '/usuario',
  detailUser
);
routes.put(
  '/usuario',
  bodyRequestValidator(editUserSchema),
  cpfValidator,
  passwordValidator,
  editUser
);

routes.get(
  '/cliente',
  listClients
);
routes.get(
  '/cliente/:id',
  detailClient
);
routes.post(
  '/cliente',
  bodyRequestValidator(signUpClientSchema),
  cpfValidator,
  signUpClient
);
routes.put(
  '/cliente/:id',
  bodyRequestValidator(editClientSchema),
  cpfValidator,
  editClient
);

routes.post(
  '/cobranca',
  bodyRequestValidator(createChargeSchema),
  statusFieldValidator,
  createCharge
);
routes.get(
  '/cobranca',
  listCharges
);
routes.patch(
  '/cobranca/:id',
  bodyRequestValidator(editChargeSchema),
  statusFieldValidator,
  editCharge
);
routes.delete(
  '/cobranca/:id',
  deleteCharge
);
routes.get(
  '/cobranca/:id',
  detailCharge
);



module.exports = routes;
