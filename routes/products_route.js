const action_products = require('../models/products_schema')

    exports.productsRoutes=(app)=>{
        
            app.get("/products",action_products.get_product)
        
            app.get("/get_product/:id",action_products.get_id)
        
            app.post("/product_add",action_products.create_product)
            
            app.patch("/update_user/:id",action_products.update_product)
        
            app.delete("/delete/:id",action_products.delete_product)
        
    }