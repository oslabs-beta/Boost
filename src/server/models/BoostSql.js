const { Pool } = require("pg");

/* global console, module, require */

const PG_URI = "postgres://pyocojrk:DPAvKMw7y1Lx2K3K3eA1y8EYn_va8lSV@raja.db.elephantsql.com/pyocojrk";

const pool = new Pool({ connectionString: PG_URI });

module.exports = {
  query: (text, params, callback) => {
    console.log("executed query", text);
    return pool.query(text, params, callback);
  },
};
