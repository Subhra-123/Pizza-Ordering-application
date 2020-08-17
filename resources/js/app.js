import axios from 'axios'
import Noty from 'noty'
let addToCart=document.querySelectorAll('.add-to-cart');
let cartCounter=document.querySelector('#cartCounter')
function updateCart(pizza){
       axios.post('/update-cart',pizza).then(res=>{
           cartCounter.innerText=res.data.totalQty

           new Noty({
               type:"success",
               timeout:1000,
               progressBar:false,
               
            text: 'Item Added To Cart'
        }).show();

       }).catch(err=>{

        new Noty({
            type:"error",
            timeout:1000,
            progressBar:false,
            
         text: 'Something Went Wrong'
     }).show();
       })
}
addToCart.forEach((btn)=>{
    btn.addEventListener('click',()=>{
        let pizza=JSON.parse(btn.dataset.pizza)
        updateCart(pizza)
    })
})