const BlogPost = require('../models/BlogPost')

module.exports = async(req, res) => {
    await BlogPost.findOneAndDelete(req.params.id)
    res.redirect('/posts/mypost')
}