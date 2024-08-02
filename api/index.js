const express = require('express');
const bodyParser = require('body-parser');
const getTripsByID = require('../getTrips');
const transformTrip = require('../transformTrip');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/getData', async (req, res) => {
  const { ids, csrfToken, cookies } = req.body;
  console.log(ids, csrfToken, cookies);
  
  try {
    const trips = await getTripsByID(ids, csrfToken, cookies)
  
    res.json(trips.map(trip => transformTrip(trip)));
  } catch (err) {
    res.status(400).json({data: err.response?.data})
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
