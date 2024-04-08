const Post = require ('../Model/postModel')




const newPost = async(req,res,next)=>{
    const message = req.body.message
    const sender = req.body.sender

    try {
        const post = new Post({
            message: message,
            sender: sender
        });
        const newPost = await post.save();
        console.log('add post to database');
        res.status(200).send(newPost)
        
    } catch (err) {
        console.error('failed to add data to database:', err);
        res.status(500).send('Failed to add data to database');
    }
};

const allPost = (req,res,next)=>{
    res.send('all post');

}

module.exports = {newPost,allPost};