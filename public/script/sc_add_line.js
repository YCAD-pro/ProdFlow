window.onload = () => {
    // Var
    let select = document.querySelector('.form-select')

    function getSiteList() {
        fetch('/sites')
            .then(value => value.json())
            .then(values => {
                // console.log(values)
                values.forEach(site => {
                    // <option value="1">One</option>
                    let option = document.createElement('option')
                    option.value = site.site_name
                    option.innerText = site.site_name;
                    select.appendChild(option)
                })
        })
    }
    getSiteList()

    function formTreatment(e) {
        e.preventDefault();
        //console.log(e)
        let pMin = document.getElementById('prodMinInput').value
        let lNum = document.getElementById('lineNumInput').value
        let siteChoose = document.getElementById('selectSite').value
        let requete = "{'pMin':"+ pMin +", 'lNum':"+ lNum +", 'site':"+ siteChoose +"}";
        console.log(requete)
        //fetch('http://localhost:3003/n-prod-l',)
        let xhr = new XMLHttpRequest();
        let url = "/n-prod-l";

        // open a connection
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");

        // Create a state change callback
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
            }
        };

        // Converting JSON data to string
        let data = JSON.stringify({ "pMin": pMin, "lNum": lNum , "site": siteChoose});

        // Sending data with the request
        xhr.send(data);
    }

    let subBtn = document.getElementById('subBtn');
    subBtn.addEventListener('click', formTreatment)

}


