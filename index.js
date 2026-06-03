const express = require('express');
const app = express();
app.use(express.json());

let buses = {};

app.post('/actualizar-posicion', (req, res) => {
    const { id, lat, lon } = req.body;
    buses[id] = { lat, lon, tiempo: new Date() };
    res.send("Posición recibida");
});

app.get('/posiciones', (req, res) => {
    res.json(buses);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('GoBusLive Server activo en puerto ' + PORT));
