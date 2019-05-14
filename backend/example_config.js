const Pool = require('pg').Pool 

//Change this
const password = 'yourpassword'

//currbooks pool
const cbpool = new pool({
  user: 'postgres',
  host: 'localhost',
  database: 'currbooks',
  password: password,
  port: 5432,
})

//homepage pool
const hppool = new pool({
  user: 'postgres',
  host: 'localhost',
  database: 'homepage',
  password: password,
  port: 5432,
})

module.exports = {
    cbpool: cbpool,
    hppool: hppool
}

