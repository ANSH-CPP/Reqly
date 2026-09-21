import { Client, Functions ,TablesDB} from "appwrite";

const client = new Client();

client
    .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

const functions = new Functions(client);
const tablesDB = new TablesDB(client);

export { functions ,tablesDB};