import { server } from "./server/Server";
import { connectDB } from "./database/Mongodb";
import 'dotenv/config';

const PORT = process.env.PORT || 3000;

const runServer = async () => {

    await connectDB();

    server.listen(
        PORT,
        () => {
          console.log(`SERVER RUN ON PORT ${PORT}`);  
        }
    );
}

runServer();