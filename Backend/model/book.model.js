import mongoose from 'mongoose'

const bookSchema = mongoose.Schema({
    name:String,
    age:Number,
})

export const Book = mongoose.model('Book', bookSchema)