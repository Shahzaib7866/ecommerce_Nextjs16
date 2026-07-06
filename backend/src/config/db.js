import mongoose from 'mongoose';
import { DB_NAME } from '../constants.js';

const connectDB = async () => {

    try {
        const dbConnectionObject = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);

        console.log(`\n Mongodb connected !! DB HOST: ${dbConnectionObject.connection.host} \n`);//production ki bajahy kisi or db mein connect ho jahun tu pata krny k liye k kon se host mein connect huva hun

        // console.log(dbConnectionObject);
        
    } catch (error) {
        console.error("db connection failed ", error);
        process.exit(1);
        //In Node.js, the process object is a core global object that provides direct information about, and control over, the currently running Node.js application instance
        //process.exit(1) is used to terminate the Node.js process with a non-zero exit code, indicating that an error occurred. In this case, if the database connection fails, the application will log the error and then exit with a status code of 1, which is a common convention for indicating an error.
    }


}

export default connectDB;








