function getWorks(work) {
    let headers = new Headers()
    headers.append("Accept", "application/json")

    let init = {
        method: "GET",
        headers: headers
    }

    let url = `https://reststop.randomhouse.com/resources/works?search=${work}`
    fetch(url, init)
        .then(response => response.json())
        .catch(error => console.log(error))
}
