require('dotenv').config()

if(!process.env.mongoDB_URI){
    throw new Error("MONGO_URI is not defined in environment varibale")
}


if(!process.env.JWT_SECRET){
    throw new Error("JWT_SECRET is not defined in environment varibale")
}


if(!process.env.Client_ID){
    throw new Error("Client_ID is not defined in environment varibale")
}


if(!process.env.Client_secret){
    throw new Error("Client_secret is not defined in environment varibale")
}


if(!process.env.user){
    throw new Error("user is not defined in environment varibale")
}


if(!process.env.Refresh_token){
    throw new Error("Refresh_token is not defined in environment varibale")
}

const config ={
    mongoDB_URI:process.env.mongoDB_URI,
    JWT_SECRET:process.env.JWT_SECRET,
    Client_ID:process.env.Client_ID,
    user:process.env.user,
    Refresh_token:process.env.Refresh_token,

}

export default config