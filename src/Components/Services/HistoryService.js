import { tablesDB } from "../../Appwrite/Appwrite";

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const TABLE_ID = import.meta.env.VITE_APPWRITE_HISTORY_TABLE_ID;

export const createHistory = async (data) => {
    try {
        const result = await tablesDB.createRow({
            databaseId: DATABASE_ID,
            tableId: TABLE_ID,
            rowId: "unique()",
            data: data,
        });

        return result;
    } catch (error) {
        console.error("Error creating history:", error);
        throw error;
    }
};

export const getHistory = async (userId) => {
    try {
        const result = await tablesDB.listRows({
            databaseId: DATABASE_ID,
            tableId: TABLE_ID,
        });

        return result.rows.filter(
            (row) => row.userId === userId
        );
    } catch (error) {
        console.error("Error fetching history:", error);
        throw error;
    }
};

export const deleteHistory = async (rowId) => {
    try {
        await tablesDB.deleteRow({
            databaseId: DATABASE_ID,
            tableId: TABLE_ID,
            rowId: rowId,
        });

        return true;
    } catch (error) {
        console.error("Error deleting history:", error);
        throw error;
    }
};