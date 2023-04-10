const BlogPost = require('../models/BlogPost')
const path = require('path')

module.exports = (req, res) => {
    let image = req.files.image;
    image.mv(path.resolve(__dirname, '..', 'public/assets/img', image.name), async () => {
        await BlogPost.create({
            ...req.body,
            image: '/img/' + image.name,
            userid: req.session.userId
        }).then(() => {
            console.log('Data inserted sucessfully')
            res.redirect('/')
        }).catch(err => {
            console.log(err)
        })
    })
}