const useBdd = require('./useBdd')
// const checkToken = useBdd.checkTokenUser

module.exports.myFirewall = async (req, res, next) => {
    let token = req.headers.loggeduser
    //console.log('token to find in header = ',token)
    useBdd.checkTokenUser(token, data => {
        console.log(data)
        if (data.length > 0) {
            next()
        } else {

            res.redirect('/login.html')
        }
    })
}