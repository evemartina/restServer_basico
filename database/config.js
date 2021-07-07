

const mongoose = require('mongoose');


const dbConnection = async()=>{
  
    mongoose.connect(process.env.MONGODB_CN, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then( resp => {
        console.log( `Connecion to MongoDB is OK!` );
    }).catch( err => {
        console.log( `Error connecion: `, err );
    });
}

module.exports ={
    dbConnection
}