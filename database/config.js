const mongoose = require('mongoose');


const dbConnection = async() => {

    try {

        await mongoose.connect(process.env.MONGO_CONECTION, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true,
            // useFindAndModify: false
        });

        console.log('DB online');
        
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar db');
    }

}

module.exports = {dbConnection};