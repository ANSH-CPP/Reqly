import { tablesDB } from "./Appwrite";

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
            tableId: TABLE_ID
        });

        const userHistory = result.rows.filter(
            (row) => row.userId === userId
        );

        return userHistory;

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
        const result = await tablesDB.listRows({
            databaseId: DATABASE_ID,
            tableId: TABLE_ID
        });

        const userRows = result.rows.filter(
            (row) => row.userId === userId
        );

        await Promise.all(
            userRows.map((row) =>
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