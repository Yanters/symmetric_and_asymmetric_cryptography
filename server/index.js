require('dotenv').config()
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const port = 3001;

const app = express();
const AESrouter = require('./routes/AES');
const RSArouter = require('./routes/RSA');
const ECCrouter = require('./routes/ECC');
const BlowfishRouter = require('./routes/Blowfish')

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({limit: '2gb', extended: true}));

// routes
app.use('/api', AESrouter);
app.use('/api', RSArouter);
app.use('/api', ECCrouter);
app.use('/api', BlowfishRouter);

app.get('/', (req, res) => {
  res.send('Application works!');
});

app.listen(port, () => {
  console.log(`Application started on port ${port}!`);
});


/* ```

  /api/AES
  /api/Blowfish

  /api/RSA
  /api/ECC


*/
