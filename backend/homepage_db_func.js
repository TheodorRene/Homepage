const p = require('./config')

const getAllProjects = (req, res) => {
    p.hppool.query('SELECT * FROM project ORDER BY date DESC;', (err, results) => {
        if(err){
            throw err
        }
        res.status(200).json(results.rows)
    })
}

module.exports = {
    getAllProjects
}
