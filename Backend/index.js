import express from 'express'
import dotenv from 'dotenv'
import connectDB from './db/connectDB.js'
import bookRoute from './route/book.route.js'
import userRoute from './route/user.route.js'


dotenv.config()

const port = process.env.PORT || 5001

connectDB()

const app = express();
app.use(express.json())
app.get('/', (req, res) => {
    res.send('Hello from backend')
})

app.use('/book', bookRoute)
app.use('/user', userRoute)

app.listen(port, () => {
    console.log(`Server is running at port: `, port);
})