const mongoose = require('mongoose')

const schema = mongoose.Schema({
    name: {
        type: String
    },
    items: [{
        link: {
            type: String
        },
        image: {
            type: String
        },
    }]
})

module.exports = mongoose.model('Ad', schema);