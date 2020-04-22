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
app.use(express.json())

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
    NR_SUBBANDS: 123, OBSERVATIONID: 1, LID: 'lid1', DECLINATION: 32.1, RIGHTASCENSION: 56.7, STARTTIME: new Date(2020,4,4), ENDTIME: new Date(2020,4,10)
  }, {
    NR_SUBBANDS: 123, OBSERVATIONID: 2, LID: 'lid2', DECLINATION: 32.1, RIGHTASCENSION: 56.7, STARTTIME: new Date(2020,4,4), ENDTIME: new Date(2020,4,10)
  }, {
    NR_SUBBANDS: 123, OBSERVATIONID: 3, LID: 'lid3', DECLINATION: 32.1, RIGHTASCENSION: 56.7, STARTTIME: new Date(2020,4,4), ENDTIME: new Date(2020,4,10)
  }, {
    NR_SUBBANDS: 123, OBSERVATIONID: 4, LID: 'lid4', DECLINATION: 32.1, RIGHTASCENSION: 56.7, STARTTIME: new Date(2020,4,4), ENDTIME: new Date(2020,4,10)
  }, {
    NR_SUBBANDS: 123, OBSERVATIONID: 5, LID: 'lid5', DECLINATION: 32.1, RIGHTASCENSION: 56.7, STARTTIME: new Date(2020,4,4), ENDTIME: new Date(2020,4,10)
  }, {
    NR_SUBBANDS: 123, OBSERVATIONID: 6, LID: 'lid6', DECLINATION: 32.1, RIGHTASCENSION: 56.7, STARTTIME: new Date(2020,4,4), ENDTIME: new Date(2020,4,10)
  }, {
    NR_SUBBANDS: 123, OBSERVATIONID: 7, LID: 'lid7', DECLINATION: 32.1, RIGHTASCENSION: 56.7, STARTTIME: new Date(2020,4,4), ENDTIME: new Date(2020,4,10)
  }, {
    NR_SUBBANDS: 123, OBSERVATIONID: 8, LID: 'lid8', DECLINATION: 32.1, RIGHTASCENSION: 56.7, STARTTIME: new Date(2020,4,4), ENDTIME: new Date(2020,4,10)
  }, {
    NR_SUBBANDS: 123, OBSERVATIONID: 9, LID: 'lid9', DECLINATION: 32.1, RIGHTASCENSION: 56.7, STARTTIME: new Date(2020,4,4), ENDTIME: new Date(2020,4,10)
   }]
  res.json({products});
});
app.get('/product/:lid', function(req, res) {
  console.log(req.params);
  const products = [{
    URI: 'https://someuri/' + req.params.lid
  }];
  res.json({"products": products});
});

app.post('/sessions', function(req, res) {
  console.log(req.body);
  res.json({
    pipeline: req.body.pipeline,
    config: req.body.config,
    pipeline_version: 'v0.0.0',
    status: 'MOCKED',
    pipeline_response: 'Mocked pipeline response'
  });
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
