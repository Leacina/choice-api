const crypto = require("crypto");

module.exports = app => {
    const DADOS_CRIPTOGRAFAR = {
        algoritmo : "aes256",
        codificacao : "utf8",
        segredo : "ch01c3",
        tipo : "hex"
    };

    const criptografar = (value) =>{
       
        const cipher = crypto.createCipher(DADOS_CRIPTOGRAFAR.algoritmo, DADOS_CRIPTOGRAFAR.segredo);
        cipher.update(value);
        return cipher.final(DADOS_CRIPTOGRAFAR.tipo);
    }

    const descriptografar = (value) =>{
        const decipher = crypto.createDecipher(DADOS_CRIPTOGRAFAR.algoritmo, DADOS_CRIPTOGRAFAR.segredo);
        decipher.update(value, DADOS_CRIPTOGRAFAR.tipo);
        return decipher.final();
    }

    return { criptografar, descriptografar}
}