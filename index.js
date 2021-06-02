const express = require("express")
const app = express()
const port = 5050
let favorites = new Map()

app.use('/', express.static('public'))
app.use(express.json())
app.listen(port, () => console.log(`listening on port ${port}`))

app.put('/favorite', function(req, res) {
    let data = req.body
    if (favorites.has(data.workid)) {
        res.json({
            status: responses.ALREADY_FAVORITE
        })
        console.log(`Already favorite work with id ${data.workid}`)
    } else {
        favorites.set(data.workid, data)
        res.json({
            status: responses.SUCCESS
        })
        console.log(`Added work with id ${data.workid}`)
    }
})

app.delete('/favorite', function(req, res) {
    let data = req.body
    favorites.delete(data.workid)
    res.json({
        status: responses.SUCCESS
    })
    console.log(`Deleted work with id ${data.workid}`)
})

app.get('/favorites', function(req, res) {
    let favs = []
    for (let [key, value] of favorites) {
        favs.push(value)
    }

    res.json({
        status: responses.SUCCESS,
        favorites: favs
    })
})

app.post('/edit', function(req, res) {
    let data = req.body
    favorites.set(data.workid, data)
    res.json({
        status: responses.SUCCESS
    })
    console.log(`Edited work with id ${data.workid}`)
})

const responses = {
	SUCCESS: "success",
	ALREADY_FAVORITE: "already_favorite",
	ERROR: "error",
}
