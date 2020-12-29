//model onde está o puppeteer
var faz = require('../model/index')

exports.sms = function (req, res) {
    var id = req.params.destino
    var cor = req.params.corpo
    //FUNÇÃO QUE RECEBE OS PARAMATROS E ENVIA 
    faz.requisita(id, cor).then(e => res.status(200).json(e)).catch(er => res.status(400).json(er));
}

