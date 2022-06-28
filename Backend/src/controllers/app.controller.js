//Inicializacion de modulo e importacion de librerias y base de datos
const appCtrl = {}
const request = require("request-promise");
const mysql = require('mysql');
const excel = require('exceljs');
var path = require('path');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'invernadero'
});

try {
    connection.connect();
    console.log('Conectado a base de datos correctamente');
} catch (error) {
    console.log('Error base de datos: ' + error);
}

//Importacion de modelos

//Controladores
appCtrl.getLastData = async (req, res) => {
    //Procesar datos
    request({
        uri: 'Ruta arduino',
        json: true
    })
    .then(data => {
        //Enviar respuesta
        res.json(data);
    })
    .catch(e => {
        res.status(401).send('Error al solicitar datos: ' + e)
    });
}

appCtrl.startCollecter = async (req, res) => {
    setInterval(collecter, 60000);
    console.log('Collecter iniciado');
    res.json({status: 'Collecter iniciado'});
}

function collecter() {
    var today = new Date();
    if(today.getMinutes() == 0 || today.getMinutes() == 30) {
        console.log('Datos solicitados');
        //Solicita datos del arduino 1 (invernadero automatico)
        request({
            uri: 'Ruta arduino 1',
            json: true
        })
        .then(data => {
            const dataObj = {
                date: today,
                temp: data.temp,
                humedad: data.humedad,
                indCal: data.indCal,
                humedadSuelo: data.humSuelo,
                lux: data.lux,
                vent: data.vent,
                luces: data.luces,
                riego: data.riego
            }
            //Enviar respuesta
            connection.query('INSERT INTO datos1 SET ?', dataObj, error => {
                if (error) throw error;
            });
        })
        .catch(e => {
            const dataObj = {
                date: today,
                temp: 0,
                humedad: 0,
                indCal: 0,
                humedadSuelo: 0,
                lux: 0,
                vent: 0,
                luces: 0,
                riego: 0
            }
            connection.query('INSERT INTO datos1 SET ?', dataObj, error => {
                if (error) throw error;
            });
        });
    }
}

appCtrl.modificarVal = async (req, res) => {
    var valObj = {
        hsluz: req.body.hsluz,
        riego: req.body.riego,
        ventilacion: req.body.ventilacion}
    connection.query('UPDATE valores SET hsluz = '+valObj.hsluz+' ,riego = '+valObj.riego+' ,ventilacion = '+valObj.ventilacion, error => {
        if (error) throw error;
    });

    request({
        uri: 'Ruta de modificacion de valores del arduino',
        json: true,
        method: "POST",
        body: valObj
    })
    .then(data => {
        //Enviar respuesta
        res.json({status: 'Valores modificados', data: data});
    })
    .catch(e => {
        res.status(401).send('Error al solicitar datos: ' + e)
    });
}

appCtrl.sendVal = async (req, res) => {
    connection.query('SELECT `hsluz`, `riego`, `ventilacion` FROM `valores` WHERE id=1', (err,resp) => {
        if (err) throw err;
        res.json(resp);
    });
}

appCtrl.toExcel = async (req, res) => {
    connection.query('SELECT * FROM datos1', (err,resp) => {
        if (err) throw err;
        const jsonData = JSON.parse(JSON.stringify(resp));
        let workbook = new excel.Workbook(); //creating workbook
		let worksheet = workbook.addWorksheet('Data1');
        worksheet.columns = [
			{ header: 'Id', key: '_id', width: 10 },
			{ header: 'Date', key: 'date', width: 30 },
			{ header: 'Temp', key: 'temp', width: 30},
            { header: 'I. calor', key: 'indCal', width: 30},
			{ header: 'Hum', key: 'humedad', width: 30},
            { header: 'Hum Suelo', key: 'humedadsuelo', width: 30},
            { header: 'Luz (Luxes)', key: 'lux', width: 30},
            { header: 'Ventilacion (on/off)', key: 'vent', width: 30},
            { header: 'Luces (on/off)', key: 'luces', width: 20},
            { header: 'Riego (on/off)', key: 'riego', width: 20}
		];
        worksheet.addRows(jsonData);
        workbook.xlsx.writeFile("src\\controllers\\datos.xlsx")
		    .then(function() {
			    console.log("file saved!");
                var options = {
                    root: path.join(__dirname)
                }
                res.sendFile('datos.xlsx', options);
		    });
    });
}

appCtrl.getAllData = async (req, res) => {
    connection.query('SELECT * FROM datos1', (err,resp) => {
        res.json(resp);
    });
}

appCtrl.getHour = async (req, res) => {
    var today = new Date();
    res.send(today.getHours())
}

appCtrl.getMinute = async (req, res) => {
    var today = new Date();
    res.send(today.getMinutes());
}


//Exportacion de modulo
module.exports = appCtrl;