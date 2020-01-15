const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require("../utils/parseStringAsArray");

module.exports = {
    async index(request,response){
        const devs = await Dev.find();
        return response.json(devs);
    },


    async store(request,response) {
    const { github_username, techs, latitude, longitude } = request.body;

    // let permite sobrepor as informações
    let dev = await Dev.findOne({ github_username });

    if(!dev){
        const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
        //se não tiver name vai utilizar o login
        const { name = login, avatar_url, bio} = apiResponse.data;
        // trim remove espaçamento antes de depois da string
        const techsArray = parseStringAsArray(techs);

        const location = {
            type: 'Point',
            coordinates: [longitude,latitude],
        };

        //se a variavel e o atributo são os mesmo ele vai entender não precisa
        // especificar
        dev = await Dev.create({
            github_username,
            name,
            avatar_url,
            bio,
            techs: techsArray,
            location,
        })
    }

    return response.json(dev);
    }
};