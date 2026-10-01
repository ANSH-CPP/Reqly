import { tablesDB } from "./Appwrite";
import { Query } from "appwrite";

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const TABLE_ID = import.meta.env.VITE_APPWRITE_HISTORY_TABLE_ID;


// CREATE HISTORY
export const createHistory = async (data) => {
    try {
        const result = await tablesDB.createRow({
            databaseId: DATABASE_ID,
            tableId: TABLE_ID,
            rowId: "unique()",
            data: data
        });

        return result;

    } catch (error) {
        console.log("Create History Error:", error);
        throw error;
    }
};


// GET USER HISTORY
export const getHistory = async (userId) => {
    try {
        const result = await tablesDB.listRows({
            databaseId: DATABASE_ID,
            tableId: TABLE_ID,
            queries: [
                Query.equal("userId", userId)
            ]
        });

        return result.rows;

    } catch (error) {
        console.log("Get History Error:", error);
        throw error;
    }
};


// DELETE ONE HISTORY
export const deleteHistory = async (rowId) => {
    try {
        await tablesDB.deleteRow({
            databaseId: DATABASE_ID,
            tableId: TABLE_ID,
            rowId: rowId
        });

        return true;

    } catch (error) {
        console.log("Delete History Error:", error);
        throw error;
    }
};


// DELETE ALL USER HISTORY
export const clearHistory = async (userId) => {
    try {

        // Get only current user's rows
        const result = await tablesDB.listRows({
            databaseId: DATABASE_ID,
            tableId: TABLE_ID,
            queries: [
                Query.equal("userId", userId)
            ]
        });


        // Delete user's rows
        await Promise.all(
            result.rows.map((row) =>
                tablesDB.deleteRow({
                    databaseId: DATABASE_ID,
                    tableId: TABLE_ID,
                    rowId: row.$id
                })
            )
        );

        return true;

    } catch (error) {
        console.log("Clear History Error:", error);
        throw error;
    }
};