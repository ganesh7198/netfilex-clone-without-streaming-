import mongoose from "mongoose";

 const db= async()=>{
try{
	const response=await mongoose.connect(process.env.MANGO_URI);
	console.log("MONGO DB CONNECTED :"+response.connection.host);
	
}catch(error){
	console.log("error in database connection ",error.message);
}
}

export default db;
