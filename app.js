const mySql = require('mysql2');
const express = require('express');
const fs = require("fs");
const app = express();
app.use(express.static('public'))
app.use(express.static(__dirname + '/public'));
app.use(express.json())
// ========================== Variables globales ========================== >

let dataSite = {
    name:'ProdSite nº12-10-2022',
    address: '46-48 av de la Grande Armée 75017 Paris',
    prodline: [
        {nbProdMinute: 500, lineNumber: 0o5},
        {nbProdMinute: 5200, lineNumber: 23},
        {nbProdMinute: 67, lineNumber: 80},
    ],
}


// ========================== Routes ========================== >
/**
 *  /           => (get)Renvoie 'public/index.html'
 *  /test       => (get)Test la reponse cote js
 *  /site-info  => (get)Renvoie le dashboard brut
 *  /pl-form    => (post)Gere le retour formulaire HTTP //casse\\
 *  /n-prod-l   => (post)Gere l'envoi de donnees par JSON directement pour ajouter une ligne de prod
 */
app.get('/test', (req, res) => {
    console.log('get sur "/test"');
    connBDD.query('select * from user', (err, data) => {
        console.log('Hey')
        console.log(data)
        res.send(data)
    })
})

app.get('/site-info', (req, res) => {
    res.json(dataSite);
})

app.get('/plform', (req, res) => {
    fs.readFile(__dirname + '/../public/production_line_form.html', 'utf8', function(err, text){
        res.send(text)
        if (err){
            console.log('err', err)
        }
    });
})

app.post('/n-prod-l', (req, res) => {
    let pMin = req.body.pMin
    let lNum = req.body.lNum
    let nData = {
        nbProdMinute: pMin, lineNumber: lNum
    }
    //console.log('ajout de ligne :', nData)
    dataSite.prodline.push({nbProdMinute: pMin, lineNumber: lNum});
    res.send(nData)
})

// ========================== Demarrage APP ========================== >
app.listen(3003, () => {
    console.log("demarrage d'Express sur le 3003");
})

// ========================== BDD ========================== >
let connBDD;
getCredentialBdd('infoBdd.txt');

function getCredentialBdd(path) {
    let phrase
    fs.readFile(path, 'utf8', (err, data) => {
        phrase = JSON.parse(data)
        connBDD = mySql.createConnection(phrase)
    })
}

function closeConn() {
    connBDD.end();
}
