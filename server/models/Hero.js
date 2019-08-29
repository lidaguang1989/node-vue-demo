
const mogoose = require('mongoose')

const schema = mogoose.Schema({
    name: {type: String},
    icon: {type: String},
    title: {type: String},
    banner: {type: String},
    categories: [{type: mogoose.SchemaTypes.ObjectId, ref: 'Category'}],
    scores: {
        difficult: {type: Number},
        skill: {type: Number},
        attack: {type: Number},
        survive: {type: Number},
    },
    skills: [
        {
            icon: {type: String},
            title: {type: String},
            delay: {type: String},
            cost: {type: String},
            description: {type: String},
            tips: {type: String},
        }
    ],
    itemsGood: [{type: mogoose.SchemaTypes.ObjectId, ref: 'Item'}],
    itemsBad: [{type: mogoose.SchemaTypes.ObjectId, ref: 'Item'}],
    usageTips: {type: String},
    battleTips: {type: String},
    teamTips: {type: String},
    partners: [
        {
            hero: {type: mogoose.SchemaTypes.ObjectId, ref: 'Hero'},
            description: {type: String},
        }
    ]
})

module.exports = mogoose.model('Hero', schema, 'heroes')