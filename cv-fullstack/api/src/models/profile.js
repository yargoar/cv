const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({

    lang: { type: String, required: true },
    name: { type: String, required: true },
    profession: { type: String, required: false },
    contact: { type: Array, required: false },
    sections: { type: Array, required: true }
});

module.exports = mongoose.model('Profile', profileSchema);