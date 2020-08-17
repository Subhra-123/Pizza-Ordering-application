const mongoose=require('mongoose');
const menuSchema=new mongoose.Schema({
    name:{type:String,required:true},
    price:{type:Number,required:true},
    image:{type:String,required:true},
    size:{type:String,required:true}
});

const Menu=mongoose.model('Menu',menuSchema);
// var m=new Menu({
//     name: "Margherita",
//   image: "pizza.png",
//   price: "250",
//   size: "small"
// });
// Menu.create(m,function(err,newmenu){
//     if(err)
//     console.log('something went wrong');
//     // else
//     // {
//     //     res.redirect("/hotels");
//     //     // console.log(newresturant);
//     // }
// });
module.exports=Menu;