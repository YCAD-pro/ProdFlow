const express = require('express')
const bodyParser = require("body-parser")
const bcrypt = require('bcrypt')
const app = express();
const firewall = require('./src/firewall')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(__dirname + '/public'))
app.use(express.json())
const backend = require('./src/backend')
const useBdd = require("./src/useBdd");
// ========================== Variables globales ========================== >


// ========================== Routes ========================== >
/**
 *  /           => (get)Renvoie 'public/index.html'
 *  /test       => (get)Test la reponse cote js
 *  /site-info  => (get)Renvoie le dashboard brut
 *  /pl-form    => (post)Gere le retour formulaire HTTP //casse\\
 *  /n-prod-l   => (post)Gere l'envoi de donnees par JSON directement pour ajouter une ligne de prod
 */

//app.use(firewall.myFirewall)

app.get('/test', firewall.myFirewall, (req, res) => {
    backend.test(req, res)
})

app.get('/addUser', (req, res) => {
    res.redirect('/createUser.html')
})
app.post('/addUser', (req, res) => {
    backend.createUser(req, res)
})

app.get('/', firewall.myFirewall, (req, res) => {
    res.redirect('/index.html')
})

app.get('/login', (req, res) => {
    res.redirect('/login.html')
})
app.post('/login', (req, res) => {
    backend.login(req, res)
})

app.get('/logged/:token', (req, res) => {
    let token = req.params
    console.log("token", token)
    // coder un depot de cookie aui sera verifie dans les requete sous firewall
    res.json(token)
})

app.get('/dashboard', firewall.myFirewall, (req, res) => {
    res.redirect('/dashboard.html')
})

app.get('/create-line', firewall.myFirewall, (req, res) => {
    res.redirect('/formLine.html')
})

app.get('/sites-info', firewall.myFirewall, (req, res) => {
    backend.getSitesInfo(req, res)
})
app.get('/site-info/:site', firewall.myFirewall, (req, res) => {
    backend.getOneSiteInfo(req, res, req.params.site)
})

app.get('/plform', firewall.myFirewall, (req, res) => {
    res.redirect('/formLine.html')
})

app.get('/sites', firewall.myFirewall, (req, res) => {
    backend.getListSiteName(req, res)
})

app.get('/addr-sites/:site_name', firewall.myFirewall, (req, res) => {
    backend.getAddressSiteByName(req, res, req.params.site_name)
})

app.get('/prods-site/:site_name', firewall.myFirewall, (req, res) => {
    backend.getProdlineBySiteName(req, res, req.params.site_name)
})

app.post('/n-prod-l', firewall.myFirewall, (req, res) => {
    backend.addProdLine(req, res)
})


// ========================== Demarrage APP ========================== >
app.listen(3003, () => {
    console.log("demarrage d'Express sur le 3003");
})