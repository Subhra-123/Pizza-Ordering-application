const homeController=require('../app/http/controllers/homeController');
const cartController = require('../app/http/controllers/customers/cartController');
const authController = require('../app/http/controllers/authControllers');
const orderController = require('../app/http/controllers/customers/orderController');
const AdminOrderController = require('../app/http/controllers/admin/orderController');
const StatusOrderController = require('../app/http/controllers/admin/statusController');
const guest=require('../app/http/middleware/guest')
const auth=require('../app/http/middleware/auth')
function initRoutes(app){
    app.get('/',homeController().index);

    
app.get('/login', guest,authController().login);
app.post('/login',authController().postLogin)
app.get('/register', guest,authController().register);
app.post('/register',authController().postRegister);
app.post('/logout',authController().logout)

app.get('/cart',cartController().index);
app.post('/update-cart',cartController().update)

//customer routes
app.post('/orders',auth,orderController().store)
app.get('/customer/orders',auth,orderController().index)
app.get('/customers/orders/:id',auth, orderController().show);
//Admin routes
app.get('/admin/orders',auth,AdminOrderController().index)


//adminorderstatus
app.post('/admin/order/status',auth,StatusOrderController().update)

}
module.exports=initRoutes