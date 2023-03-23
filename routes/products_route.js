const action_products = require('../controllers/products_controlers')
const middleware = require('../middlewares/adminMiddleware')

    exports.productsRoutes=(app)=>{
        
            app.get("/products",action_products.get_product)
        
            app.get("/get_product/:id",action_products.get_id)
        
            app.post("/product_add",action_products.create_product)
            
            app.patch("/update_product/:id",middleware.authenticateTokenAdmin,action_products.update_product)
        
            app.delete("/delete_product/:id",middleware.authenticateTokenAdmin,action_products.delete_product)
        
    }