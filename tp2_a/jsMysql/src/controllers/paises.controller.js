const { Pais } = require('../database');
const Axios = require("axios").default;


const Ctrl = {};

Ctrl.getAll = async (req, res) => {
    try {
        const paises = await Pais.findAll();
        res.status(200).json(paises)
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
}

Ctrl.setData = async (req, res) => {
    try {
        let urlApi = "https://restcountries.eu/rest/v2/callingcode";
        for (let index = 0; index < 300; index++) {
            let urlCode = `${urlApi}/${index}`;
            try {
                let response = await Axios.get(urlCode);
                if(response.status == 200){
                    response.data.forEach(element => {
                        insertData(element);
                    });
                } else {
                    continue;
                }
            } catch (error) {
                // console.error(error);
                continue;
            }
        }
        res.json({'msg':'Datos cargados'});
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
}

async function insertData(data) {
    try {
        let { numericCode, name, capital, region, population, latlng } = data;
        let pais = await Pais.build({
            codPais: numericCode,
            nombre: name,
            capital: capital,
            region: region,
            poblacion: population,
            lat: latlng[0],
            lng: latlng[1]
        });

        const existPais = await Pais.findAll({
            where: { codPais: pais.codPais}
        });

        if(existPais.length != 0){
            await Pais.update(existPais,{
                where: {
                    codPais: pais.codPais
                }
            });
        } else {
            await pais.save();
        }
    } catch (error) {
        console.error(error);
    }
}

module.exports = Ctrl;