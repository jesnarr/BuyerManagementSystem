const mongoose = require('mongoose');

const userShema = new mongoose.Schema({
    buyer_id:{
        type:String,
        unique:true,
        trim: true,
        required:true
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    status: {
        type: Number,
        default: 1
    },
    role: {
        type: Number,
        default: 0
    }
},
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Users', userShema);