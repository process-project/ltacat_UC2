"use strict";

let express = require('express'),
    compression = require('compression'),
    // products = require('./server/products'),
    // database = require('./server/database.js'),
    app = express();

  try {
    console.log('Initializing database module');
    // database.initialize();
  } catch (err) {
    console.error(err); 
    process.exit(1); // Non-zero failure code
  }

app.set('port', process.env.PORT || 5000);

app.use(compression());

app.use('/', express.static(__dirname + '/www'));


// Adding CORS support
app.all('*', function (req, res, next) {
    // Set CORS headers: allow all origins, methods, and headers: you may want to lock this down in a production environment
    res.header("Access-Control-Allow-Origin", "*");
    //res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
    res.header("Access-Control-Allow-Methods", "GET");
    res.header("Access-Control-Allow-Headers", req.header('access-control-request-headers'));

    if (req.method === 'OPTIONS') {
        // CORS Preflight
        res.send();
    } else {
        next();
    }
});

// app.get('/products', products.findAll);
// app.get('/product/:lid', products.findByProdId);
app.get('/products', function(req,res) {
  const products = [{
    NR_SUBBANDS: 123, OBSERVATIONID: 'obsid1', LID: 'lid1', DECLINATION: 32.1, RIGHTASCENSION: 56.7, STARTTIME: new Date(2020,4,4), ENDTIME: new Date(2020,4,10)
  }, {
    NR_SUBBANDS: 123, OBSERVATIONID: 'obsid2', LID: 'lid2', DECLINATION: 32.1, RIGHTASCENSION: 56.7, STARTTIME: new Date(2020,4,4), ENDTIME: new Date(2020,4,10)
  }, {
    NR_SUBBANDS: 123, OBSERVATIONID: 'obsid3', LID: 'lid3', DECLINATION: 32.1, RIGHTASCENSION: 56.7, STARTTIME: new Date(2020,4,4), ENDTIME: new Date(2020,4,10)
  }]
  res.json({products});
});
app.get('/product/:lid', function(res, req) {
  const products = [{
    URI: 'https://someuri/' + req.params.lid
  }];
  res.json({"products": products});
});
app.get('/pipelineschemas', function(req,res) {
  const pipelineschemas = {
    pipeline1: {
      label: 'Pipeline 1',
      id: 'pipeline1',
      schema: {
          "type": "object",
          "title": "Configuration Parameters:",
          "description": "This is the LOFAR GRID Pre-Processing Pipeline. Here we print a description of the pipeline.",
          "properties": {
            "avg_freq_step": {
              "type": "integer",
              "title": "avg_freq_step",
              "description": "corresponds to .freqstep in NDPPP .type=average , or in case of .type=demixer it is the demixer.freqstep",
              "default": 2,
              "minimum": 0,
              "exclusiveMinimum": true,
              "maximum": 1000,
              "exclusiveMaximum": true,
              "propertyOrder": 1
            },
          },
          "required": [
              "avg_freq_step",
          ]
      }
    }
  };
  res.json({pipelineschemas});
});

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
