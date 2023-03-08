const error400 = (res, errorReason) => {
    return res.status(400).json({ mensagem: `${errorReason}` });
};

const error401 = (res, errorReason) => {
    if (!errorReason) {
        return res.status(401).json({ mensagem: 'Usuário não autorizado.' });
    }
    return res.status(401).json({ mensagem: `${errorReason}` });
};

const error404 = (res, errorReason) => {
    return res.status(404).json({ mensagem: `${errorReason}` });
};

const error500 = (res) => {
    return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
};

module.exports = {
    error400,
    error401,
    error404,
    error500
};