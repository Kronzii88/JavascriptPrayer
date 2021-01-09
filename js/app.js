const jadwalSholat = (latitude, longtitude) => {
    fetch(`http://api.aladhan.com/v1/calendar?latitude=${latitude}&longitude=${longtitude}&method=2`)
    .then(response => response.json())
    .then(function(response) {
        let date = new Date().getDate() - 1
        // console.log(date);

        let data = response.data[date].timings;
        console.log(response.data[0]);

        let app = document.querySelector(".app");
        let table = document.createElement("table");
        let tBody = document.createElement("tBody");

        for(i in data) {
            // console.log(i);
            let row = tBody.insertRow();
            let name = row.insertCell(0);
            let time = row.insertCell(1);
            name.innerHTML = i;
            time.innerHTML = data[i]
            tBody.appendChild(row);
            
        }
        table.appendChild(tBody);
        app.appendChild(table);
        
    });
}

const success = (position) =>{
    jadwalSholat(position.coords.latitude, position.coords.longitude);
}

const error = () => {
    alert(`posisi tidak boleh diakses`);
}

const userLocation = () => {
    if (!navigator.geolocation) {
        alert(`Geo Location tidak didukung di browser anda`)
    } else {
        navigator.geolocation.getCurrentPosition(success, error)
    }   
}


const index = () => {
    let app = document.querySelector(".app");
    let h3 = document.createElement("h3");
    h3.innerHTML = "JADWAL SHOLAT";

    app.appendChild(h3);
    userLocation();
}


index()