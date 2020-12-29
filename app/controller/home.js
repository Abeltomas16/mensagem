var controller={}

controller.index=function(req,res){
    res.render('index')
}
controller.novo=function(req,res){
   res.json({nome:'abel'})
}
module.exports=controller