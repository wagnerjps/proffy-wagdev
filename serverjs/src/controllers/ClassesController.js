const db  = require('../database/connection')
const convertHourToMinutes  = require('../Utils/convertHourToMinutes')

const index = async(req, res) => {

    // Dados da requisição
    const filters = req.query

    // Cast dos dados
    const subject = filters.subject
    const week_day = filters.week_day
    const time = filters.time

    // Verificação dos dados
    if(!subject || !week_day || !time){
        return res.status(400).json({
            error: "Misses filters to search classes."
        })
    }

    // Converção dos time
    const timeInMinutes = convertHourToMinutes.convert(time)

    // Busca dos dados solitados com os filtros
    try{
        const classes = await db('classes')
        .whereExists(function(){
            this.select('class_schedule.*')
                .from('class_schedule')
                .whereRaw('class_schedule.class_id = classes.id')
                .whereRaw('class_schedule.week_day = ??', [Number(week_day)])
                .whereRaw('class_schedule.from <= ??', [timeInMinutes])
                .whereRaw('class_schedule.to > ??', [timeInMinutes])
        })
        .where('classes.subject', '=', subject)
        .join('users', 'classes.user_id', '=', 'users.id')
        .select(['classes.*', 'users.*'])
    
        // Resposta a requisição
        res.json(classes)
    }catch(err){
        return res.status(400).json({
            error: `Unexpected error while list class. Error: ${err} `
        })
    }
}

const create = async (req, res) => {

    // Desestrutura os dados vindos da requisição
    const { name, avatar, whatsapp, bio, subject, cost, schedule } = req.body;

    // Cria uma transaction com o banco de dados
    const trx = await db.transaction()

    try {
        // Insere um novo usuário no banco de dados
        const isertedUsersIds = await trx('users').insert({
            name, avatar, whatsapp, bio
        }).returning('id')

        // Recupera o id do usuário criado da primeira posição do isertedUsersIds
        const user_id = isertedUsersIds[0]

        // Insere uma nova aula no banco de dados
        const isertedClassesId = await trx('classes').insert({
            subject, cost, user_id
        }).returning('id')

        // Recupera o id da aula criado da primeira posição do isertedClassesId
        const class_id = isertedClassesId[0]

        // Mapeia os dados de schedule vindos da requisição para o classSchedule, 
        // converte os valores de from e to para minutos
        const classSchedule = schedule.map(scheduleItem => {
            return {
                class_id,
                week_day: scheduleItem.week_day,
                from: convertHourToMinutes.convert(scheduleItem.from),
                to: convertHourToMinutes.convert(scheduleItem.to)
            };
        })

        // Insere as novas schendule no banco de dados
        await trx('class_schedule').insert(classSchedule)

        // Realiza o commit da transaction

        await trx.commit()

        // Retorno os ids gerados em users e aulas com uma mensagem de sucesso e o status 201
        return res.status(201).json({ 
            user_id: user_id, 
            class_id: class_id, 
            message: 'Usuário e aulas criados com sucesso!'
        })
    
    } catch (err) {
        // Desfazer as alterações feitas no banco
        await trx.rollback()

        // Retorna uma mensagem de erro com o status 400
        return res.status(400).json({
            error: `Unexpected error while create new class. Error: ${err} `
        })
    }
}

module.exports = {
    index,
    create
}