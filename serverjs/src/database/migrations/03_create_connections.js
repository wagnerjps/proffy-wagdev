exports.up = knex => knex.schema.createTable('connections', table => {
    table.increments('id').primary()
    
    table.integer('user_id')
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')

    table.timestamp('created_at')
        .defaultTo(knex.fn.now())
        .notNullable()

})

exports.down = knex => knex.schema.dropTable('connections')