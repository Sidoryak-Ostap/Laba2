
const {Router} = require('express');

const {User} = require('../models/users.js');
const {Link} = require('../models/links.js');

const router = Router();


router.get('/links', async (req,res) =>{

try {
    

    const {authorization} = req.headers;
    const {expiredAt} = req.query;


    const user = await User.findOne({apiKey: authorization});

    if(!user)
    {
        return res.status(200).send("User with such credentials was not found");
    }


    const user_id = user._id;

    const links = await Link.find({
        userId: user_id,
        expiredAt:{  
            $gt: new Date(expiredAt)
        }
    });

    const link = []

    for (let index = 0; index < links.length; index++) {
        link.push(links[index].link.cut)
    }

    console.log(expiredAt);

    res.status(200).send(link);
    
    



} catch (error) {
    res.status(400).send('Something went wrong');
}

})


module.exports = {router};