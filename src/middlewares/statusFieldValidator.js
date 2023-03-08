const { error400 } = require("../functions/error");

const statusFieldValidator = (req, res, next) => {
  const acceptedStatus = ['pago', 'pendente'];
  const { status } = req.body;

  if (!acceptedStatus.includes(status.toLowerCase())) {
    return error400(res, `O campo status precisa conter uma das seguintes palavras: '${acceptedStatus[0]}' ou '${acceptedStatus[1]}'.`);
  }

  next();
};

module.exports = { statusFieldValidator };
