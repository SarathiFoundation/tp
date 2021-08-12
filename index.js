const express = require('express')
const Discord = require('discord.js')
const path = require('path')
const bodyParser = require('body-parser')

const app = express()
//https://discord.com/api/webhooks/875417099353358417/JqmzXAcFVT6fo8QnFmLyO0rWODeXwdQRIOn-CWLNjw4FiGzj47923agNbyT8v_rSGp0H
const webhook = new Discord.WebhookClient("875417099353358417", "JqmzXAcFVT6fo8QnFmLyO0rWODeXwdQRIOn-CWLNjw4FiGzj47923agNbyT8v_rSGp0H")

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({
    json: true
}))

app.post('/form', (req, res) => {
    let mapped = Object.entries(req.body).map(c => {
        return {
            [c[0]]: c[1]
        }
    })
    let mappedString = mapped.map(c => `${Object.keys(c)[0]}\n> ${c[Object.keys(c)[0]]}`)
    webhook.send(mappedString.join("\n"))
    res.send("sent")
})

app.listen(3000, () => {
    console.log(`App listening on http://localhost:3000`)
})