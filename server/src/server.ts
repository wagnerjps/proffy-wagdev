require('dotenv').config();

import app from './app'

const PORT = process.env.APP_PORT || process.env.PORT

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})