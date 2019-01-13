const mongoose = require('mongoose'),  
      Schema = mongoose.Schema;

//================================
// Task Schema
//================================
const TaskSchema = new Schema({  
  name: {
    type: String,
    lowercase: true,
    unique: true,
    required: true
  },
  status: {
    type: String,
    enum: ["inProgress", "pending", "completed"],
    default: 'pending'
  },
},
{
  timestamps: true
});

module.exports = mongoose.model('Task', TaskSchema);  