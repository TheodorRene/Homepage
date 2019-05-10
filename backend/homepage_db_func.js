const Pool = require('pg').Pool
//
//Config
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'homepage',
  password: '123tre!!',
  port: 5432,
})
//end config

const getAllProjects = (req, res) => {
    pool.query('SELECT * from project', (err, results) => {
        if(err){
            throw err
        }
        res.status(200).json(results.rows)
    })
}

module.exports = {
    getAllProjects
}
