require('dotenv').config();
const app = require('./app')

const PORT = process.env.APP_PORT || process.env.PORT;


app.get('/', (req, res) => {
    res.json({ message: 'Hello World' })
})

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})