exports.up = knex => knex.schema.createTable('users', table => {
    table.increments('id').primary()
    table.string('name').notNullable()
    table.string('avatar', 500).notNullable()
    table.string('whatsapp').notNullable()
    table.string('bio', 1000).notNullable()

})

exports.down = knex => knex.schema.dropTable('users')