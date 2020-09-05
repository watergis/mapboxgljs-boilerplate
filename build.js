const fs = require('fs');
require('dotenv').config()

const build = () =>{
    if (process.env.CNAME){
        fs.writeFileSync('./dist/CNAME', process.env.CNAME);
    }
}

module.exports = build();