import express from 'express'
import exphbs from 'express-handlebars'
import {
    collectDataFromServer,
    checkForSlotAvailability,
    getAvailableSlotDetails
} from './Data/getDataFunctions.js'
import logger from './logger.js'
const app = express();
//register custom handlers
app.engine('handlebars', exphbs({
    helpers: { 
    ifCond: function (v1, operator, v2, options) {
      switch (operator) {
        case '==':
          return (v1 == v2) ? options.fn(this) : options.inverse(this);
        case '!=':
          return (v1 != v2) ? options.fn(this) : options.inverse(this);
        case '>':
            return (v1 > v2) ? options.fn(this) : options.inverse(this);
        case '>=':
          return (v1 >= v2) ? options.fn(this) : options.inverse(this);
        case '<=':
          return (v1 <= v2) ? options.fn(this) : options.inverse(this);
        default:
            return options.inverse(this);
      }
    },
    },
defaultLayout: 'main'
}));
app.set('view engine','handlebars')
app.get('/', async (req, res) => {
    const filterData = await collectDataFromServer();
    const isAvailable = await checkForSlotAvailability(filterData);
    res.render('index', { data: filterData ,isAvailable:isAvailable})  
})

app.get('/newData', async(req, res) => {
  const filterData = await collectDataFromServer();
  const isAvailable = await checkForSlotAvailability(filterData);
  if (isAvailable) {
      const filterSlot = getAvailableSlotDetails();
      res.json(filterSlot);
    } else {
      res.json({});
    }
})
// Capture 500 errors
app.use((err,req,res,next) => {
res.status(500).send('Could not perform the action');
   logger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
})
// Capture 404 errors
app.use((req,res,next) => {
    res.status(404).send("PAGE NOT FOUND");
    logger.error(`400 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
})
const server = app.listen(3001, () => {
  console.log('listening on port %s...', server.address().port);
});
 
