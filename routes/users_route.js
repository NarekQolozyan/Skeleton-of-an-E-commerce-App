const action_user = require('../models/users_schema')

    exports.userRoutes=(app)=>{
        
            app.get("/users",action_user.get_user)
        
            app.get("/get_user/:id",action_user.get_id)
        
            app.post("/user_register",action_user.create_user)

            app.post("/user_login",action_user.login_user)

            app.patch("/update_user/:id",action_user.update_user)
        
            app.delete("/delete_user/:id",action_user.delete_user)
    }