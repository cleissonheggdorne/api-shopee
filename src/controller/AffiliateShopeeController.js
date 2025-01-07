const AffiliateShopeeService = require("../service/AffiliateShopeeService");

class AffiliateShopeeController {
    static async getLinks(req, res){
        try{
            const affiliate = new AffiliateShopeeService();
            return await affiliate.testApi(affiliate.config);
        }catch(error){
            res.status(500).json({ message: 'Erro ao criar acessar api', error });
        }
    }
}

module.exports = AffiliateShopeeController;
