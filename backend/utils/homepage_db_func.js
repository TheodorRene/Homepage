const p = require('../config')

const getAllProjects = (req, res) => {
    p.hppool.query('SELECT * FROM project ORDER BY date DESC;', (err, results) => {
        if(err){
            throw err
        }
        res.status(200).json(results.rows)
    })
}

//TODO restructure code
//Make string for query and list/string for values
const newProject = (req, res) => {
    const project = req.body
    p.hppool.query('INSERT INTO project(title,img_path,description, link, type, date) VALUES ($1, $2, $3, $4, $5, $6)',[project.title, project.img_path, project.description, project.link, project.type, project.date], (err, result) => {
        if(err){
            throw err
        }
         res.status(201).send(`Project has been added to database`)

    })
    }
const getInfo = (req, res) => {
    p.hppool.query('SELECT text FROM info LIMIT 1;', (err, results) => {
        if(err){
            throw err}
        res.status(200).json(results.rows)
    })
}

module.exports = {
    getAllProjects,
    newProject,
    getInfo
}
