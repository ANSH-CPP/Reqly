
import crypto from "crypto";

const ALGORITHM = "aes-256-gcm";

const getEncryptionKey = () => {
    const key = process.env.WEBHOOK_ENCRYPTION_KEY;

    if (!key) {
        throw new Error("WEBHOOK_ENCRYPTION_KEY is missing");
    }

    const buffer = Buffer.from(key, "hex");

    if (buffer.length !== 32) {
        throw new Error(
            "WEBHOOK_ENCRYPTION_KEY must be a 32-byte hex key"
        );
    }

    return buffer;
};

export const encryptToken = (token) => {

    const key = getEncryptionKey();

    // Generate unique initialization vector
    const iv = crypto.randomBytes(12);

    const cipher = crypto.createCipheriv(
        ALGORITHM,
        key,
        iv
    );

    const encrypted = Buffer.concat([
        cipher.update(token, "utf8"),
        cipher.final()
    ]);

    const authTag = cipher.getAuthTag();

    return [
        iv.toString("hex"),
        authTag.toString("hex"),
        encrypted.toString("hex")
    ].join(":");
};

export const decryptToken = (encryptedToken) => {

    const key = getEncryptionKey();

    const [ivHex, authTagHex, encryptedHex] =
        encryptedToken.split(":");

    if (!ivHex || !authTagHex || !encryptedHex) {
        throw new Error("Invalid encrypted webhook token");
    }

    const iv = Buffer.from(ivHex, "hex");
    const authTag = Buffer.from(authTagHex, "hex");
    const encrypted = Buffer.from(encryptedHex, "hex");

    const decipher = crypto.createDecipheriv(
        ALGORITHM,
        key,
        iv
    );

    decipher.setAuthTag(authTag);

    const decrypted = Buffer.concat([
        decipher.update(encrypted),
        decipher.final()
    ]);

    return decrypted.toString("utf8");
};
