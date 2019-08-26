const express = require("express")

const app = express()

app.set('secret', '12dafassgfeagdsa')

app.use('/uploads', express.static(__dirname + '/uploads'))

app.use(require('cors')())
app.use(express.json())

require('./routers/admin')(app)
require('./plugins/db')(app)

app.listen(3000, () => {
    console.log("http://localhost:3000");
})