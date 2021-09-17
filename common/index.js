const keys = require("../config/keys");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");

const signJwt = (id, email) => {
    try {
        console.log("inside signt")
        const payload = {
             id,
            email,
        };
        const token = jwt.sign(payload, keys.userJwtKey, {
            expiresIn: "80h", // expires in 80 hours
        });
        const encryptedToken = encryptData(token);
        if (encryptData) {
            return encryptedToken;
        } else {
            return null;
        }
    } catch (e) {
        return null;
    }
};

const encryptData = (data) => {
    try {
        console.log("inside encrypt")
        const algorithm = "aes-192-cbc";
        const password = keys.cryptoKey;
        const key = crypto.scryptSync(password, "salt", 24);
        const iv = Buffer.alloc(16, 0);

        const cipher = crypto.createCipheriv(algorithm, key, iv);

        let encrypted = cipher.update(data, "utf8", "hex");
        encrypted += cipher.final("hex");
        return encrypted;
    } catch (e) {
        return null;
    }
};
const verifyJwt = (token) => {
    if (token) {
        return new Promise((resolve, reject) => {
            const decryptedToken = decryptPass(token);
            if (decryptedToken) {
                jwt.verify(decryptedToken, keys.userJwtKey, (err, decoded) => {
                    if (err) {
                        reject(false);
                    } else {
                        resolve(decoded);
                    }
                });
            } else {
                reject(false);
            }
        });
    }
};

const decryptPass = (encryptedPassword) => {
    try {
        const algorithm = "aes-192-cbc";
        const password = keys.cryptoKey;
        const key = crypto.scryptSync(password, "salt", 24);
        const iv = Buffer.alloc(16, 0);

        const decipher = crypto.createDecipheriv(algorithm, key, iv);

        const encrypted = encryptedPassword;
        let decrypted = decipher.update(encrypted, "hex", "utf8");
        decrypted += decipher.final("utf8");
        return decrypted;
    } catch (e) {
        console.log(e);
        return null;
    }
};



const hashPassword = (password) => {
    console.log("paswd call")
    return new Promise(async (resolve, reject) => {
        try {
            const hashedPassword = bcrypt.hashSync(password, 10);
            resolve(hashedPassword);
        } catch (e) {
            reject(false);
        }
    });
};

const verifyPassword = (password, passwordHash) => {
    return new Promise(async (resolve, reject) => {
        try {
            const isPasswordValid = bcrypt.compareSync(password, passwordHash);
            resolve(isPasswordValid);
        } catch (e) {
            reject(false);
        }
    });
};

module.exports = {hashPassword, signJwt, verifyJwt, verifyPassword}