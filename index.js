const express = require("express")
const app = express()
const port = 5050

app.use('/', express.static('public'))
app.use(express.json())
app.listen(port, () => console.log(`listening on port ${port}`))

app.put('/favorite', function(req, res) {
    let data = req.body
    console.log(data)
    res.json({
        status: responses.SUCCESS
    })
})

app.delete('/favorite', function(req, res) {
    let data = req.body
    console.log(data)
    res.json({
        status: responses.SUCCESS
    })
})

const responses = {
	SUCCESS: "success",
	ALREADY_FAVORITE: "already_favorite",
	ERROR: "error",
}