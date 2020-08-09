const db = require('../database/connection')


const index = async (req, res) => {

    try{
        const totalConnections = await db('connections').count('* as total')
        const { total } = totalConnections[0]
    
        return res.status(200).json({
            total
        })
    }catch(err){
        // Retorna uma mensagem de erro com o status 400
        return res.status(400).json({
            error: `Unexpected error while list connections. Error: ${err} `
        })
    }
}
    
const create = async (req, res) => {
    const { user_id } = req.body

    try{
        await db('connections').insert({
            user_id
        })
    
        return res.status(201).send()

    }catch(err){
        // Retorna uma mensagem de erro com o status 400
        return res.status(400).json({
            error: `Unexpected error while create new connection. Error: ${err} `
        })
    }
    
}

module.exports = {
    index,
    create
}
