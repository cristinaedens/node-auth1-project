exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('users').del()
        .then(function() {
            // Inserts seed entries
            return knex('users').insert([
                { id: 1, username: 'pikachu', password: 'pikapika123' },
                { id: 2, username: 'neffex', password: 'neffex432' },
                { id: 3, username: 'warframe', password: 'bestgamever246' }
            ]);
        });
};