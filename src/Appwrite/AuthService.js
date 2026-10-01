import { account } from "./Appwrite";


// SIGNUP
export const createAccount = async (email, password, name) => {
    try {
        const user = await account.create({
            userId: "unique()",
            email,
            password,
            name
        });

        return user;

    } catch (error) {
        console.log("Signup Error:", error);
        throw error;
    }
};


// LOGIN
export const login = async (email, password) => {
    try {
        const session = await account.createEmailPasswordSession({
            email,
            password
        });

        return session;

    } catch (error) {
        console.log("Login Error:", error);
        throw error;
    }
};


// GET CURRENT USER
export const getCurrentUser = async () => {
    try {
        const user = await account.get();

        return user;

    } catch (error) {
        console.log("Get Current User Error:", error);
        return null;
    }
};


// LOGOUT
export const logout = async () => {
    try {
        await account.deleteSession({
            sessionId: "current"
        });

        return true;

    } catch (error) {
        console.log("Logout Error:", error);
        throw error;
    }
};