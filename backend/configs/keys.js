export default {
    environment:{
        PORT:process.env.PORT
    },
    database:{
        MONGO_DB:process.env.MONGO_URI
    },
    secret:{
        JWT_SECRET:process.env.JWT_SECRET,
        EXPIRES:process.env.EXPIRES
    },
    email:{
        SEND_GRID_KEY:process.env.SEND_GRID,
        HOST_NAME:process.env.HOST_NAME,
        HOST_EMAIL:process.env.HOST_EMAIL 
    }




}
    