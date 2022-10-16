const express = require('express');
const bodyParser = require("body-parser");
const bcrypt = require('bcrypt')
const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(__dirname + '/public'));
app.use(express.json())
const backend = require('./src/backend')
// ========================== Variables globales ========================== >


// ========================== Routes ========================== >
/**
 *  /           => (get)Renvoie 'public/index.html'
 *  /test       => (get)Test la reponse cote js
 *  /site-info  => (get)Renvoie le dashboard brut
 *  /pl-form    => (post)Gere le retour formulaire HTTP //casse\\
 *  /n-prod-l   => (post)Gere l'envoi de donnees par JSON directement pour ajouter une ligne de prod
 */

app.get('/test', (req, res) => {
    backend.test(req, res)
})

app.get('/login', (req, res) => {
    res.redirect('/login.html')
})
app.post('/login', (req, res) => {
    backend.login(req, res)
})

app.get('/sites-info', (req, res) => {
    backend.getSitesInfo(req, res)
})
app.get('/site-info/:site', (req, res) => {
    backend.getOneSiteInfo(req, res, req.params.site)
})

app.get('/plform', (req, res) => {
    res.redirect('/formLine.html')
})

app.get('/sites', (req, res) => {
    backend.getListSiteName(req, res)
})

app.get('/addr-sites/:site_name', (req, res) => {
    backend.getAddressSiteByName(req, res, req.params.site_name)
})

app.get('/prods-site/:site_name', (req, res) => {
    backend.getProdlineBySiteName(req, res, req.params.site_name)
})

app.post('/n-prod-l', (req, res) => {
    backend.addProdLine(req, res)
})


// ========================== Demarrage APP ========================== >
app.listen(3003, () => {
    console.log("demarrage d'Express sur le 3003");
})