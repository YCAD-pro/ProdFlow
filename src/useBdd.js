const backend = require("./backend")

module.exports.setUserToken = (idUser, token) => {
    let connBDD = backend.getConn()
    connBDD.query(`update user set token = ? where id = ?`,
        [token, idUser],
        (err, data) => {
            console.log('Ajout du token '+token+' a userId => '+idUser+' \nRetour de bdd = '+data)
            return token
        })
}

module.exports.getUsersToTestBdd = async () => {
    let connBDD = backend.getConn()
    connBDD.query('select * from user', (err, data) => {
        console.log("data", data)
        console.log("err", err)
        return data
    })
}

module.exports.checkTokenUser = (token, functionToCall) => {
    let connBDD = backend.getConn()
    connBDD.query(`select token, role from user where token =?`,
        [token],
        (err, data) => {
            //console.log(data)
            functionToCall(data)
        })
}