window.onload = () => {
    function formTreatment(e) {
        e.preventDefault();
        //console.log(e)
        let pMin = document.getElementById('prodMinInput').value
        let lNum = document.getElementById('lineNumInput').value
        let requete = "{'pMin':"+ pMin +", 'lNum':"+ lNum +"}";
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
        let data = JSON.stringify({ "pMin": pMin, "lNum": lNum });

        // Sending data with the request
        xhr.send(data);
    }

    let subBtn = document.getElementById('subBtn');
    subBtn.addEventListener('click', formTreatment)

}


