const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const logger = require('morgan');
const cors = require('cors');
/*
* RUTAS
*/
const users = require('./routes/usersRoutes');

const port = process.env.PORT || 3000;


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))



app.use(cors());
//app.use(passport.initialize());
//app.use(passport.session());
//require('./config/passport')(passport);

app.disable('x-powered-by');

app.set('port', port);

/*
* LLAMANDO A LA RUTAS
*/
users(app);

server.listen(3000, '192.168.10.117' || 'localhost', function() {
    console.log('Aplicacion de NodeJS ' + port + ' Iniciada...')
});

app.get('/', (req, res) =>{
res.send('Ruta raiz del backend');
} );

app.get('/test', (req, res) =>{
    res.send('Ruta test');
    } );

// ERROR HANDLER
app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).send(err.stack);
});

module.exports = {
    app: app,
    server: server
}