const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Resto del código de tu aplicación (definición de clases, lógica de enrutamiento, etc.)

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});
