const Menu=require('../../models/menu');
function homeController(){
    //factory functions
    return {
       async  index(req,res)
        {
          // Menu.find().then(function(pizzas){
          //   res.render('home',{pizzas:pizzas});
          // })
          const pizzas=await Menu.find();
          res.render('home',{pizzas:pizzas});
          
        }
    }
}
module.exports=homeController