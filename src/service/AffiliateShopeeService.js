const dotenv = require('dotenv');
const axios = require('axios');
const crypto = require('crypto-js');

class AffiliateShopeeService{
    constructor(){
        dotenv.config();
        const appId = process.env.appId;
        const timestamp = Math.floor(Date.now() / 1000);
        const payload = JSON.stringify({
            query: "{\r\n    productOfferV2(keyword: \"smartphone\"){\r\n        nodes {\r\n            productName\r\n            commissionRate\r\n            commission\r\n            price\r\n            sales\r\n            imageUrl\r\n            shopName\r\n            offerLink\r\n            priceMin\r\n            priceMax\r\n            ratingStar\r\n            priceDiscountRate\r\n        }\r\n        pageInfo{\r\n            page\r\n            limit\r\n            hasNextPage\r\n            scrollId\r\n        }\r\n    }\r\n    }",
            variables: {}
          }); // Corpo da requisição
        const assignature = this.generateSignature(appId, timestamp,payload);
        const authorizationHeader = this.generateHeader(appId, timestamp, assignature);
        this.config = this.generateConfig(authorizationHeader,payload)
    }

    generateSignature(appId, timestamp,payload){
        const password = process.env.password;
        const signatureString = `${appId}${timestamp}${payload}${password}`;
        return crypto.SHA256(signatureString).toString(crypto.enc.Hex);
    }

    generateHeader(appId, timestamp, assignature){
        return `SHA256 Credential=${appId}, Timestamp=${timestamp}, Signature=${assignature}`;
    }

    generateConfig(authorizationHeader, payload){
        const apiUrl = process.env.SHOPEE_API_URL; // URL da API
        return {
            method: 'POST', // ou 'get', dependendo da API
            url: apiUrl,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authorizationHeader,
            },
            data: payload,
        };
    }
    async testApi(config){
        try {
            const response = await axios(config);
            const nodes = response.data.productOfferV2;
    
            console.log('Resposta da API:', JSON.stringify(response.data, null,2));
            console.log("Nodes:", nodes);
            return JSON.stringify(response.data, null,2);
        } catch (error) {
            console.error('Erro ao acessar a API:', error.response ? error.response.data : error.message);
            return error;
        }
    }
}

module.exports = AffiliateShopeeService;
