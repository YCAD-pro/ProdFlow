

window.onload = () => {
    let divToLoad = document.getElementById('toLoad');

    fetch('http://localhost:3003/sites')
        .then(result => result.json())
        .then(result => {
            showDataSite(result)
        })

    function showDataSite(data) {
        //console.log(data)
        data.forEach(createSite)
    }

    function createSite(siteName) {
        // Pour chaque site je recup:
        //  1 adresse
        let addressSite
        fetch('/addr-sites/'+siteName.site_name)
            .then(result => result.json())
            .then(addr => {
                addressSite = addr
                //console.log('site', addressSite)
                //  Toutes les lignes de prod
                let prods = []
                fetch('/prods-site/'+siteName.site_name)
                    .then(result => result.json())
                    .then(prod => {
                        prod.forEach(p => {
                            prods.push(p)
                        })
                        //console.log('prods', prod)
                        // Maintenant tout est pret pour createCard
                        createCardContent(addressSite, prods)
                    })
            })
    }

    function createCardContent(addrData, prodsData) {
        let divCard = document.createElement('div')
        divCard.className = 'card'
        let h3 = document.createElement('h3');
        let p = document.createElement('p');
        divCard.className = 'card'
        h3.className = 'card-title'
        //divToLoad.style.width = "50%"
        h3.innerText = addrData.site_name
        divCard.appendChild(h3)
        divCard.appendChild(processAddress(addrData))
        p.className = 'card-text'
        divCard.appendChild(p)
        divCard.appendChild(document.createElement('hr'))
        divCard.appendChild(processProdLine(prodsData))
        divToLoad.append(divCard)
    }

    function processAddress(objAddress) {
        let content = document.createElement('div')
        let table = document.createElement('table')
        let rowStreet = document.createElement('tr')
        rowStreet.innerHTML = '<td>Street :</td><td>'+ objAddress.street +'</td>'
        let rowPostCode = document.createElement('tr')
        rowPostCode.innerHTML = '<td>Post code :</td><td>'+ objAddress.post_code +'</td>'
        let rowCity = document.createElement('tr')
        rowCity.innerHTML = '<td>City :</td><td>'+ objAddress.town +'</td>'
        let rowCountry = document.createElement('tr')
        rowCountry.innerHTML = '<td>Country :</td><td>'+ objAddress.country +'</td>'
        table.appendChild(rowStreet);
        table.appendChild(rowPostCode);
        table.appendChild(rowCity);
        table.appendChild(rowCountry);
        content.innerHTML = '<h5>Address :</h5>'
        content.appendChild(table)
        content.className = 'card-text'
        return content
    }

    function processProdLine(objProdLine) {
        let content = document.createElement('div')
        let table = document.createElement('table')
        let tableHead = document.createElement('thead')
        tableHead.innerHTML ='<th><td>Line Number</td><td>Product / minute</td></th>'
        table.appendChild(tableHead)
        objProdLine.forEach(prodLine => {
            let tr = document.createElement('tr')
            tr.innerHTML = `<td>${prodLine.line_number}</td><td>${prodLine.prod_unit_minute}</td>`
            table.appendChild(tr)
        })
        content.appendChild(table)
        return content
    }
}