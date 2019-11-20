const schedule = require('node-schedule')
const request = require('request')
const cheerio = require('cheerio')
const {Product_Crawler, Product_Mining} = require('../src/models')

module.exports = app => {
    schedule.scheduleJob('59 * * * * *', async function () {
        //Faz o request na URL

        request('http://biancapizzaria.com.br/sabores/', function(err, res, body){
            //Somente busca os dados se não ocorreu nenhum erro
            if(!err){
                var $ = cheerio.load(body)
                var titlePizza, ingredients
        
                $("#portfolio-entries article").each((i, elem) => {
                    titlePizza =  $(elem).find(".portfolio-entry-details h2").text()
                    ingredients = $(elem).find(".portfolio-entry-excerpt p").text().replace("Ingredientes:",'')
                    
                    Product_Crawler.create({
                        name: titlePizza,
                        ingredients 
                    })
                })
            }
        })

        request('http://www.pizzariaimperial.com.br//cardapio/2352_PIZZAS-SALGADAS', function(err, res, body){
            //Somente busca os dados se não ocorreu nenhum erro
            if(!err){
                var $ = cheerio.load(body)
                var titlePizza, ingredients

                $(".coluna_direita table").each((i, elem) => {
                    $(elem).find('tr').each((i, elemento)=>{
                        titlePizza = $(elemento).find('.produto_descricao h3').text()
                        ingredients = $(elemento).find('.produto_descricao p').text()
                        
                        Product_Crawler.create({
                            name: titlePizza,
                            ingredients 
                        })
                    })
                
                })
            }
        })

        //Filtra todos os dados para uma nova tabela
        minerateDate()

    })

    async function minerateDate(){
    
        const product_crawler = await Product_Crawler.findAll()

        //Percorre todos os registro para "minerar" dados
        for(let i = 0; i < product_crawler.length; i++){
            //Se não possuir nome de pizza
            if(!product_crawler[i].name){
                continue
            }

            //Verifica se já tem o produto na tabela origem
            const product_mining = await Product_Mining.findOne({
                where:{
                    name: product_crawler[i].name
                }
            })

            //Se não possuir esse produto lá... Add
            if(!product_mining){
                var ingredients = product_crawler[i].ingredients.trim()
                ingredients = ingredients[0].toUpperCase() + ingredients.substring(1).toLowerCase()
        
                Product_Mining.create({
                    name: product_crawler[i].name,
                    ingredients: ingredients
                })
            }
        }
    }

}