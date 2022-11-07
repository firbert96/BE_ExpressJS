const dotenv = require('dotenv');
dotenv.config();
const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const morgan = require('morgan');
const cors = require('cors')
const env = process.env.NODE_ENV;
const port = process.env.PORT || 1234

app.use(cors())
if(env!=="test"){
    app.use(morgan('development'));
}
app.use(jsonParser);
app.use(urlencodedParser);
app.use(express.static('public'));

// router
const UserRouter = require('./routes/User');
app.use('/api/v1',[UserRouter]);
// end router 

app.get('/', (req, res) => res.status(200)
    .send({
        status:true,
        data:"Hello World!"
    })
)

app.listen(port, () => {
    console.log(`Server started at ${Date()}`);
    console.log(`Example app listening on port ${port}!`);
})

module.exports=app