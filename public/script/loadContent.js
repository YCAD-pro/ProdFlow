window.onload = () => {
    let divToLoad = document.getElementById('toLoad');
    fetch('http://localhost:3003/site-info')
        .then(result => result.json())
        .then(showDataSite)

    function generateP(data) {
        let content = '';
        content += '<h5>Address :</h5>' + data.address;
        content += '<br /><strong>ProdLine</strong>:<br />';
        content += '<table>'
        data.prodline.forEach(e => {
            content += '<tr>' +
                '<td><strong>NB Prod/Minute</strong></td><td>'+ e.nbProdMinute + '</td>' +
                '<td><strong>Line Number</strong></td><td>' + e.lineNumber + '</td>' +
                '</tr>'
        })
        content += '</table>'
        return content
    }

    function showDataSite(data) {
        //divToLoad.innerText = data;
        let divCard = document.createElement('div')
        divCard.className = 'card'
        let h3 = document.createElement('h3');
        let p = document.createElement('p');
        let ul = document.createElement('ul');
        let li = document.createElement('li');
        divToLoad.className = 'card'
        h3.className = 'card-title'
        divToLoad.style.width = "50%"
        h3.innerText = data.name
        p.innerHTML = generateP(data)
        p.className = 'card-text'
        divCard.appendChild(h3)
        divCard.appendChild(p)
        divToLoad.append(divCard)
        console.log(data)
    }
}