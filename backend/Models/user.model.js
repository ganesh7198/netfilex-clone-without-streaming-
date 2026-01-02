import mongoose from "mongoose";


const userSchema=mongoose.Schema({
    username:{
		type:String,
		unique:true,
		required:true,
	},
	email:{
		type:String,
		unique:true,
		required:true,
	},
	password:{
		type:String,
		required:true
	},
	image:{
		type:String,
		default:"",
	},
	searchHistory:{
		type:Array,
		default:[]
	}
},{  timestamps: true})

const User=mongoose.model("User",userSchema);
export default User;