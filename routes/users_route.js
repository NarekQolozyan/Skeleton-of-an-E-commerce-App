const action_user = require('../controllers/users_controlers')
const middleware = require('../middlewares/adminMiddleware')
    exports.userRoutes=(app)=>{
        
            app.get("/users",middleware.authenticateTokenAdmin,action_user.get_user)
            
            app.get("/get_user/:id",middleware.authenticateTokenAdmin,action_user.get_id)
            
            app.post("/user_register",action_user.create_user)

            app.post("/user_login",action_user.login_user)

            app.patch("/update_user/:id",middleware.authenticateTokenAdmin,action_user.update_user)
        
            app.delete("/delete_user/:id",middleware.authenticateTokenAdmin,action_user.delete_user)
    }