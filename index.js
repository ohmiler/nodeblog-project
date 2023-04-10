const express = require('express')
const app = express()
const ejs = require('ejs')
const mongoose = require('mongoose')
const fileUpload = require('express-fileupload')
const expressSession = require('express-session')
const flash = require('connect-flash')

// MVC
const newPostController = require('./controllers/newPost')
const homeController = require('./controllers/home')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost')
const aboutController = require('./controllers/about')
const contactController = require('./controllers/contact')
const newUserController = require('./controllers/newUser')
const storeUserController = require('./controllers/storeUser')
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')
const logoutController = require('./controllers/logout')
const myPostController = require('./controllers/myPost')
const editPostController = require('./controllers/editPost')
const updatePostController = require('./controllers/updatePost')
const deletePostController = require('./controllers/deletePost')

// Middleware
const validateMiddleWare = require('./middleware/validationMiddleware')
const authMiddleWare = require('./middleware/authMiddleware')
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware')


mongoose.connect('your-connection-string', {
    // allow users to fall back to the old parser if they find a bug in the new parser
    useNewUrlParser: true
})

global.loggedIn = null

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded())
app.use(fileUpload()) 
app.use('/posts/store', validateMiddleWare)
app.use(expressSession({
    secret: "node secret"
}))
app.use("*", (req, res, next) => {
    loggedIn = req.session.userId
    next()
})
app.use(flash())
app.set('view engine', 'ejs')

app.get('/', homeController)

app.get('/about', aboutController)

app.get('/contact', contactController)

app.get('/post/:id', getPostController)

app.get('/posts/new', authMiddleWare, newPostController)

app.get('/auth/logout', logoutController)

app.post('/posts/store', authMiddleWare, storePostController)

app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController)

app.post('/users/register', redirectIfAuthenticatedMiddleware, storeUserController)

app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController)

app.post('/users/login', redirectIfAuthenticatedMiddleware, loginUserController)

app.get('/posts/mypost', authMiddleWare, myPostController)

app.get('/posts/edit/:id', authMiddleWare, editPostController)

app.post('/posts/update', authMiddleWare, updatePostController)

app.get('/posts/delete/:id', authMiddleWare, deletePostController)

app.use((req, res) => res.render('notfound'))

app.listen(4000, () => {
    console.log("App listening on port 4000")
})