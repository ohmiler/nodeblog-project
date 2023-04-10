const mongoose = require('mongoose')
const BlogPost = require('./models/BlogPost')

mongoose.connect('mongodb+srv://admin:1234@cluster0.rbico6o.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true
})

// Insert data
// BlogPost.create({
//     title: "This is first post",
//     body: "This is first post content"
// }).then(() => {
//     console.log('Insert data successfully')
// }).catch(err => {
//     console.log(err)
// })

let id = "63ff36e27aafedd48cda6a85"

// // Read data
// BlogPost.findById(id).then((data) => {
//     console.log(data)
// }).catch(err => {
//     console.log(err)
// })

// Update data
// BlogPost.findByIdAndUpdate(id, {
//     body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
// }).then(() => {
//     console.log('Updated data successfully')
// }).catch(err => {
//     console.log(err)
// })

// Delete data
BlogPost.findByIdAndDelete(id).then(() => {
    console.log('Deleted data successfully')
}).catch(err => {
    console.log(err)
})


