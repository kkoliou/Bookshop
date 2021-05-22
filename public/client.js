function getWorks() {
    let searchInput = document.querySelector("#searchInput").value
    let headers = new Headers()
    headers.append("Accept", "application/json")

    let init = {
        method: "GET",
        headers: headers
    }

    let url = `https://reststop.randomhouse.com/resources/works?search=${searchInput}`
    fetch(url, init)
        .then(response => response.json())
        .then(data => {
            let works = data.work
            if (works.length === 0) {
                setupEmptyState()
            } else {
                presentWorks(works)
            }
        })
        .catch(error => console.log(error))
}

function presentWorks(works) {
    for (i = 0; i < works.length; i++) {
        
    }
}

function setupEmptyState() {

}