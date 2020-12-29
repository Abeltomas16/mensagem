module.exports = function (app) {
    //instância passada pelo exress load
    const sms = app.controller.sms

    //Rota que chama a função para o envio de sms presente no controller sms
    app.post('/sms', sms.sms);
} 