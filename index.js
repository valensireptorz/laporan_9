const express = require('express');
const app = express();
const port = 3000;

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
const kapalRoutes = require('./routes/kapal');
const pemilikRoutes = require('./routes/pemilik');
const alatTangkapRoutes = require('./routes/alat');
const dpiRoutes = require('./routes/dpi');

app.use('/kapal', kapalRoutes);
app.use('/pemilik', pemilikRoutes);
app.use('/alat', alatTangkapRoutes);
app.use('/dpi', dpiRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});