function addToFavorites(work, completionBlock, alreadyFavoriteBlock) {
    let init = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(work)
    }

    let url = '/favorite'
    fetch(url, init)
        .then(response => response.json())
        .then(data => {
            if (data.status == responses.SUCCESS) {
                completionBlock()
            } else if (data.status == responses.ALREADY_FAVORITE) {
                alreadyFavoriteBlock()
            } else {
                showGenericErrorAlert()
            }
        })
}

function removeFromFavorites(work, completionBlock) {
    let init = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(work)
    }

    let url = '/favorite'
    fetch(url, init)
        .then(response => response.json())
        .then(data => {
            if (data.status == responses.SUCCESS) {
                completionBlock()
            } else {
                showGenericErrorAlert()
            }
        })
}

function showGenericErrorAlert() {
    alert('Something went wrong. Please try again.')
}

const responses = {
	SUCCESS: "success",
	ALREADY_FAVORITE: "already_favorite",
	ERROR: "error",
}
