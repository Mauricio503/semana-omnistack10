const{ Router } = require('express');
const axios = require('axios');
const Dev = require('./models/Dev');

const routes = Router();

routes.post("/devs", async (request,response) => {
    const { github_username, techs } = request.body;

    const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
    //se não tiver name vai utilizar o login
    const { name = login, avatar_url, bio} = apiResponse.data;
    // trim remove espaçamento antes de depois da string
    const techsArray = techs.split(',').map(tech => tech.trim());

    //se a variavel e o atributo são os mesmo ele vai entender não precisa
    // especificar
    const dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
    })
    return response.json({ message: 'Hello World' });
});

module.exports = routes;