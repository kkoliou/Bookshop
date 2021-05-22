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
        .catch(error => console.log(error))
}