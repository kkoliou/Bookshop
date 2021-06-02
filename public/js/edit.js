var work

function closeButtonTapped() {
    window.open("favorites.html", "_self")
}

function presentWork() {
    let temp = localStorage.getItem("workToEdit")
    work = JSON.parse(temp)
    console.log(work)
    
    let titleElement = document.querySelector("#title")
    if (work.titleweb != undefined) {
        titleElement.value = work.titleweb
        titleElement.style.width = titleElement.value.length + "ch"
    }

    let authorsElement = document.querySelector("#authors")
    if (work.authorweb != undefined) {
        authorsElement.value = work.authorweb
        authorsElement.style.width = authorsElement.value.length + "ch"
    }

    let commentsElement = document.querySelector("#comments")
    if (work.comments != undefined) {
        commentsElement.value = work.comments
    }
}

function saveWork() {
    work.titleweb = document.querySelector("#title").value
    work.authorweb = document.querySelector("#authors").value
    work.comments = document.querySelector("#comments").value

    let init = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(work)
    }

    let url = '/edit'
    fetch(url, init)
        .then(response => response.json())
        .then(data => {
            if (data.status == responses.SUCCESS) {
                alert('Edited successfully!')
            }
        })
}
