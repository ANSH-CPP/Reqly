// import { tablesDB } from "../../Appwrite/Appwrite";

// const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
// const TABLE_ID = import.meta.env.VITE_APPWRITE_HISTORY_TABLE_ID;

// export const createHistory = async (data) => {
//     try {
//         const result = await tablesDB.createRow({
//             databaseId: DATABASE_ID,
//             tableId: TABLE_ID,
//             rowId: "unique()",
//             data: data,
//         });

//         return result;
//     } catch (error) {
//         console.error("Error creating history:", error);
//         throw error;
//     }
// };

// export const getHistory = async (userId) => {
//     try {
//         const result = await tablesDB.listRows({
//             databaseId: DATABASE_ID,
//             tableId: TABLE_ID,
//         });

//         return result.rows.filter(
//             (row) => row.userId === userId
//         );
//     } catch (error) {
//         console.error("Error fetching history:", error);
//         throw error;
//     }
// };

// export const deleteHistory = async (rowId) => {
//     try {
//         await tablesDB.deleteRow({
//             databaseId: DATABASE_ID,
//             tableId: TABLE_ID,
//             rowId: rowId,
//         });

//         return true;
//     } catch (error) {
//         console.error("Error deleting history:", error);
//         throw error;
//     }
// };




import api from "../../api/axios.js"
class HistoryService {
    async createHistory(data) {
        try {
            const response = await api.post("/history", data);
            return response.data.data;
        } catch (error) {
            console.error(
                "Error creating history:",
                error.response?.data || error.message
            );
            throw error;
        }
    }

    async getHistory() {
        try {
            const response = await api.get("/history");
            return response.data.data;
        } catch (error) {
            console.error(
                "Error fetching history:",
                error.response?.data || error.message
            );
            throw error;
        }
    }

    async deleteHistory(id) {
        try {
            const response = await api.delete(`/history/${id}`);
            return response.data.data;
        } catch (error) {
            console.error(
                "Error deleting history:",
                error.response?.data || error.message
            );
            throw error;
        }
    }

    async deleteAllHistory() {
        try {
            const response = await api.delete("/history/all");
            return response.data.data;
        } catch (error) {
            console.error(
                "Error deleting all history:",
                error.response?.data || error.message
            );
            throw error;
        }
    }
}

const historyService = new HistoryService();
export default historyService;



