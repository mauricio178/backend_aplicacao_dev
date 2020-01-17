const axios = require ('axios');
const Dev = require ('../modules/Dev');
const parseStringAsArray = require ('../utils/parseStringAsArray');

//index: Mostrar lista
//Show:  Mostrar único 
//Store: Criar
//Update: Alterar
//Destroy: Deletar

module.exports = {
    async index (request, response){
        const devs = await Dev.find();
        
        return response.json(devs);
    },

    async store (request, response) {
    
    const {git_user, techs, latitude, longitude} = request.body;

    let dev = await Dev.findOne ({git_user});

    if (!dev){
        const apiResponse = await axios.get(`https://api.github.com/users/${git_user}`);
    
        const { name = login, avatar_url, bio } = apiResponse.data;
        
        const techsArray = parseStringAsArray(techs);
    
        const location = {
            type: 'Point',
            coordinates: [longitude, latitude],
        };
    
        dev = await Dev.create({
            git_user,
            name,
            avatar_url,
            bio,
            techs: techsArray,
            location,
        });
    };
    
    return response.json(dev);
}
};