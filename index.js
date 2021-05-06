const express = require('express'),
      bodyParser = require('body-parser'),
      jwt = require('jsonwebtoken'),
      config = require('./config/config'),
      geoLocation = require('./utils/geolocation'),
      app = express();

app.set('secretKey', config.secretKey);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.listen(3000,()=>{
    console.log('Servidor iniciado en el puerto 3000') 
});


app.get('/', function(req, res) {
    res.send('Inicio');
});

app.post('/login', (req, res) => {
    if(req.body.user === "email@test.com" && req.body.password === "logysto.2021") {
        const payload = {
            check:  true
        };
        console.log('secretKey', app.get('secretKey'))
        const token = jwt.sign(payload, app.get('secretKey'), {
            expiresIn: 1440
        });
        res.json({
            mensaje: 'Autenticación correcta',
            token: token
        });
    } else res.json({ mensaje: "Usuario o contraseña incorrectos"})
});

const tokenVerification = express.Router(); 
tokenVerification.use((req, res, next) => {
    const token = req.headers['authorization'];
    console.log('token', token)
    if (token) {
        jwt.verify(token, app.get('secretKey'), (err, decoded) => {      
            if (err) {
                return res.json({ mensaje: 'Token inválida' });    
            } else {
                req.decoded = decoded;    
                next();
            }
        });
    } else {
        res.send({ 
            mensaje: 'Token no proveída.' 
        });
    }
});

app.get('/geo', tokenVerification, (req, res) => {
    console.log(req.query)
    if (req.query.address == null || req.query.address == '') res.status(400).send('Invalid address');
    console.log(app.get('googleKey'))
    geoLocation.googleGeo(config.googleKey, req.query.address, (googleData, googleErr) => {
        if (googleErr) console('ERROORRR', googleErr)
        res.json(googleData);
    });    
});