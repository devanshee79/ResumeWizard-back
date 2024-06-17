const { timeStamp } = require('console');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type : "string",
        required: true,
        unique: true
    },
    password:{
        type : "string",
        required: true,
        unique: true,
    },
    cpassword:{
        type : "string",
        required: true,
        unique: true,
    },
    firstName:{
        type:"string",
        required: false,
        default:""
    },
    lastName:{
        type:"string",
        required: false,
        default:""
    },
    email:{
        type:"string",
        required: false,
        default:""
    },
    mobileNumber:{
        type:"string",
        required: false,
        default:""
    },
    portfolio:{
        type:"string",
        required: false,
        default:""
    },
    carrierObjective:{
        type:"string",
        required: false,
        default:""
    },
    address:{
        type:"string",
        required: false,
        default:""
    },
    experience:{
        type: "array", default:[]
    },
    projects:{
        type: "array", default:[]
    },
    education:{
        type: "array", default:[]
    },
    skills:{
        type: "array", default:[]
    }

}, {timeStamp: true})

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;