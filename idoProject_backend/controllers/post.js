




const newPost = (req,res,next)=>{
    res.send('new post');

}

const allPost = (req,res,next)=>{
    res.send('all post');

}

module.exports = {newPost,allPost};