const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    fullname: String,
    date_of_birth: Date,
    qualification: String,
    specialist: String,
    email: String,
    phone_number: String,
    password: String
});

module.exports = mongoose.model('Doctor', doctorSchema);
