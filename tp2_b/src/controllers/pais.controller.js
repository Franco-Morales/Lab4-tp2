const Pais = require('../models/pais.model');
const Axios = require("axios").default;


const Ctrl = {};

Ctrl.getAll = async (req, res) => {
    try {
        let paises = [];
        if(Object.keys(req.query).length !== 0){
            switch (req.query.opt) {
                case '1':
                    let reg= req.query.region;
                    let pob = req.query.poblacion || 0;
                    let paises = await Pais.find({ region: reg, poblacion: { $gt: pob }}).exec();
                    res.status(200).json(paises);
                    break;
                case '2':
                    let regExcluede = req.query.region;
                    let paisesExcludes = await Pais.find({ region: {$ne:regExcluede}}).exec();
                    res.status(200).json(paisesExcludes);
                    break;
                case '3':
                    let { name, nombre, pobEgipto } = req.query;
                    let egipto = await Pais.findOneAndUpdate({nombre: name},{nombre: nombre, poblacion: pobEgipto},{new: true}).exec();
                    res.status(200).json(egipto);
                    break;
                case '4':
                    let { nameDelete } = req.query;
                    let resp = await Pais.findOneAndDelete({nombre: nameDelete}).exec();
                    res.status(200).send(resp);
                case '5': 
                    let { pobMayor, pobMenor } = req.query;
                    let paisesPob = await Pais.find({ poblacion: { $gt:parseInt(pobMayor) ,$lt:parseInt(pobMenor)}}).exec();
                    res.status(200).json(paisesPob);
                    break;
                case '6':
                    let { order } = req.query;
                    let PaisesOrder = await Pais.find().sort({nombre: order}).exec();
                    res.status(200).json(PaisesOrder);
                    break;
                default:
                    res.status(500).json({error:"Error Can't skip query parameter [opt], add '&opt=1' to your url"})
                    break;
            }
        } else {
            let paises = await Pais.find();
            res.status(200).json(paises);
        }
    } catch (error) {
        res.status(500).json(error);
    }
}
Ctrl.getOne = async (req,res) => {
    try {
        const pais = await Pais.findOne({_id: req.params.id});
        res.status(200).json(pais);
    } catch (error) {
        res.status(500).json({'error': error});
    }
}

Ctrl.setData = async (req, res) => {
    try {
        let urlApi = "https://restcountries.eu/rest/v2/callingcode";
        for (let index = 1; index < 300; index++) {
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
                continue;
            }
        }
        res.json({'msg':'Datos cargados'});
    } catch (error) {
        res.status(500).json(error);
    }
}

async function insertData(data) {
    try {
        let { numericCode, name, capital, region, population, latlng } = data;
        let newPais = new Pais({
            codPais: numericCode,
            nombre: name,
            capital: capital,
            region: region,
            poblacion: population,
            lat: latlng[0],
            lng: latlng[1]
        });

        const existPais = await Pais.findOne({codPais: numericCode}).exec();
        // console.log(existPais);
        if(existPais){
            await Pais.findOneAndUpdate({codPais: existPais.codPais},existPais);
        } else {
            await newPais.save();
        }
    } catch (error) {
        console.error(error);
    }
}

module.exports = Ctrl;