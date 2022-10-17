const fs = require("fs");
const mySql = require("mysql2");
const bcrypt = require('bcrypt');
const { v1: uuidv1 } = require('uuid')
const {setUserToken} = require("./useBdd");
const useBdd = require("./useBdd");

// ========================== BDD ========================== >
let connBDD;
getCredentialBdd('./SQL/infoBdd');

function getCredentialBdd(path) {
    let phrase
    fs.readFile(path, 'utf8', (err, data) => {
        phrase = JSON.parse(data)
        connBDD = mySql.createConnection(phrase)
    })
}
module.exports.closeConn = function () {
    connBDD.end();
}
module.exports.getConn = function () {
    return connBDD;
}

module.exports.login = function (req, res) {
    let user = req.body.nameInput
    let password = req.body.passwordInput
    let champ
    if (user.includes('@')) {
        console.log('recherche de mail')
        champ = 'email'
    } else {
        console.log('recherche de username')
        champ = 'username'
    }
    let token
    connBDD.query(`select id, password from user where ${champ} = ?`,
        [user],
        (err, data) => {
            // comparer le retour data(=password) avec celui envoyer
            console.log('data', data)
            if (data.length > 0 && bcrypt.compareSync(password, data[0].password)){
                // si OK return un token
                console.log('user ok')
                let token = uuidv1();
                useBdd.setUserToken(data[0].id, token)
                res.redirect('/logged/'+token)
            } else {
                // si NOK, renvoyer sur une page avec erreur dedans
                //res.redirect('/login')
                res.redirect('/login')
            }
        })
}

module.exports.getSitesInfo = function (req, res) {
    connBDD.query('select * from site join address_site `as` on site.site_name = `as`.site_name join line_prod lp on site.site_name = lp.id_site', (error, data) => {
        res.json(data);
    })
}

module.exports.getOneSiteInfo = function (req, res, siteName) {
    console.log(siteName)
    connBDD.query('select * from site join address_site add_site on site.site_name = add_site.site_name join line_prod lp on site.site_name = lp.id_site where add_site.site_name=?',
        [siteName],
        (error, data) => {
            res.json(data);
        })
}

module.exports.getListSiteName = function (req, res) {
    connBDD.query('select site_name from site',
        (error, data) => {
            res.json(data);
        })
}

module.exports.getAddressSiteByName = (req, res, siteName) => {
    let site = req.params
    console.log(site)
    connBDD.query('' +
        'select address_site.* from address_site where site_name = ?',
        [siteName],
        (error, data) => {
            res.json(data[0]);
        })
}

module.exports.getProdlineBySiteName = (req, res, siteName) => {
    console.log(req.params)
    connBDD.query('select prod_unit_minute, line_number from line_prod where id_site = ?',
        [siteName],
        (error, data) => {
            res.json(data);
        })
}

module.exports.addProdLine = (req, res) => {
    let {pMin, lNum, site} = req.body
    connBDD.query('insert into line_prod (prod_unit_minute, line_number, id_site)  values (?, ?, ?)',
        [pMin, lNum, site],
        (error, data) => {
            res.send(data)
        })
}

module.exports.test = (req, res) => {
    connBDD.query('select * from site',
        (err, data) => {
            console.log('Hey')
            console.log(data)
            res.json(data)
        })
}

module.exports.createUser = (req, res) => {
    let { username, email, password } = req.body
    // console.log("user :", username, "| mail :", email, " | password :", password)
    // by bcrypt =>
    bcrypt.hash(password, 10, (err, hash) => {
        let hashPassword = hash;
        console.log(hashPassword)
        connBDD.query('insert into user (email, username, password, role) VALUES (?, ?, ?, ?)',
            [email, username, hashPassword, 'USER'],
            (err, data) => {
                console.log(data)
                res.json(data)
            })
    })
    //res.send('in test')
}