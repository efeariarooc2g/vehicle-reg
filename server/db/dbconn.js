import knex from 'knex';
import bookshelf from 'bookshelf';
import dbconfig from './dbconfig';

export default bookshelf(knex(dbconfig));