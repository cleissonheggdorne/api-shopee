// const axios = require('axios');
// const crypto = require('crypto-js');
// // Variáveis necessárias
// const appId = '18305180027';
// const secret = '4G4FNLPZGO7BGD5YHK5SSYRSGLMT5THG';
// const apiUrl = 'https://open-api.affiliate.shopee.com.br/graphql'; // URL da API

// const payload =JSON.stringify({
//     query: "{\r\n    productOfferV2(keyword: \"smartphone\"){\r\n        nodes {\r\n            productName\r\n            commissionRate\r\n            commission\r\n            price\r\n            sales\r\n            imageUrl\r\n            shopName\r\n            offerLink\r\n            priceMin\r\n            priceMax\r\n            ratingStar\r\n            priceDiscountRate\r\n        }\r\n        pageInfo{\r\n            page\r\n            limit\r\n            hasNextPage\r\n            scrollId\r\n        }\r\n    }\r\n    }",
//     variables: {}
//   }); // Corpo da requisição
// const timestamp = Math.floor(Date.now() / 1000); // Timestamp atual

// // Gerar assinatura
// const signatureString = `${appId}${timestamp}${payload}${secret}`;
// const signature = crypto.SHA256(signatureString).toString(crypto.enc.Hex);

// // Cabeçalho Authorization
// const authorizationHeader = `SHA256 Credential=${appId}, Timestamp=${timestamp}, Signature=${signature}`;
// console.log(authorizationHeader);
// // Configuração da requisição
// const config = {
//     method: 'post', // ou 'get', dependendo da API
//     url: apiUrl,
//     headers: {
//         'Content-Type': 'application/json',
//         'Authorization': authorizationHeader,
//     },
//     data: payload,
// };

// // Fazendo a requisição
// const testApi = async () => {
//     try {
//         const response = await axios(config);
//         const nodes = response.data.productOfferV2;

//         console.log('Resposta da API:', JSON.stringify(response.data, null,2));
//         console.log("Nodes:", nodes);
//     } catch (error) {
//         console.error('Erro ao acessar a API:', error.response ? error.response.data : error.message);
//     }
// };

// testApi();
const express = require('express');
const AffiliateShopeeRoutes = require('./src/routes/AffiliateShopee');

const app = express();
app.use(express.json());  // Para parsear o JSON no corpo da requisição

app.use('/api', AffiliateShopeeRoutes);

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
  });