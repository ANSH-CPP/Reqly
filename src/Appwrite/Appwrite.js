import { Client, Functions, TablesDB, Account } from "appwrite";

const client = new Client();

client
    .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

const functions = new Functions(client);
const tablesDB = new TablesDB(client);
const account = new Account(client);

export { functions, tablesDB, account };