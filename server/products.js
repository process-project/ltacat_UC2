"use strict";
const oracledb = require('oracledb');
let db = require('./database');

let escape = s => s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

// Find entries to show in main table
let findAll = async (req, res, next) => {
  let pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 12,
  page = req.query.page ? parseInt(req.query.page) : 1,
  search = req.query.search,
  min = req.query.min,
  max = req.query.max,
  values = [];
  
    let sql = `SELECT
    nr_subbands, u.observationId, u.processIdentifier ||'-'|| sp.OBJECT_ID lid, p.DECLINATION, p.RIGHTASCENSION, u.STARTTIME, u.ENDTIME
    FROM
    (
 SELECT count(fo.URI) AS nr_subbands,  MIN(dp.startTime) AS startTime, MAX(dp.endTime) AS endTime, pr."observationId" AS observationId,  pr."processIdentifier" AS processIdentifier, dp.subArrayPointingIdentifier AS subArrayPointingIdentifier
 FROM AWOPER.CorrelatedDataProduct dp,
 AWOPER.FileObject fo,
 AWOPER."Process+" pr
 WHERE dp.processIdentifier = pr."processIdentifier"
 AND fo.data_object = dp.object_id
 AND dp.isValid> 0
 GROUP BY pr."processIdentifier", pr."observationId", dp.subArrayPointingIdentifier
 HAVING COUNT(fo.URI) = 237 OR COUNT(fo.URI) = 244
) u
JOIN awoper.SubArrayPointing sp ON u.subArrayPointingIdentifier = sp.subArrayPointingIdentifier
JOIN awoper.Pointing p ON p.OBJECT_ID = sp.POINTING
`
      await db.query(sql, values.concat([]))
    .then(products => {
      return res.json({"products": products});
    })
    .catch(next);
};

// Find information for specific product id
let findByProdId = (req, res, next) => {
  let pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 12,
  page = req.query.page ? parseInt(req.query.page) : 1,
  search = req.query.search,
  min = req.query.min,
  max = req.query.max,
  lid = req.params.lid,
  lidArray = lid.split('-'),
  bindings = {pid: { dir: oracledb.BIND_IN, val: lidArray[0], type: oracledb.STRING },
              sap: { dir: oracledb.BIND_IN, val: lidArray[1], type: oracledb.STRING }},
  whereParts = [],
  values = [];
  let sql = `
  SELECT
fo.uri
FROM
AWOPER.CorrelatedDataProduct p
JOIN awoper.FileObject fo ON fo.DATA_OBJECT = p.OBJECT_ID
WHERE
processIdentifier=to_number(:pid)
AND
subarraypointing=hextoraw(:sap)
`
/*
  ['SELECT fo.URI as uri, fo.hash_md5 as hash, dp."dataProductType" as type, ',
            'dp."dataProductIdentifier" as productid, ',
            'dp."processIdentifier" as processid ',
            'FROM AWOPER."DataProduct+" dp, ',
            'AWOPER.FileObject fo, ',
            'AWOPER."Process+" pr ',
            'WHERE dp."processIdentifier" = pr."processIdentifier" ',
            'AND fo.data_object = dp."object_id" ',
            'AND dp."isValid" > 0 ',
            'AND dp."dataProductIdentifier" = ' + prod_id].join('\n');
*/
    db.query(sql, bindings)
    .then(products => {
      return res.json({"products": products});
    })
    .catch(next);
};

exports.findAll = findAll;
exports.findByProdId = findByProdId;
