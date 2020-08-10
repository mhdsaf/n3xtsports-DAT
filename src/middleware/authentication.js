const authentication = async (req,res,next) => { 
    try { 
        const token = req.header('Authorization');
        if(token!='Wya_%WfAy9(z$usN'){
            throw new Error();
        }
        next();
    } catch (error) {
        res.status(405).send("Access Denied")
    }
}
module.exports = authentication;