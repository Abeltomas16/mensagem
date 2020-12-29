
module.exports=function(app){
    var controller=app.controller.home
    app.get('/index',controller.index)
    app.get('/',controller.index)
    app.get('/novo',controller.novo)
}