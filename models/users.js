import mongoose from "mongoose"

export const User = mongoose.model('User', new mongoose.Schema({
    username: String,
    password: String
}))
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://Localhost:27017/products', { useNewUrlParser: true, useUnifiedTopology: true })