
const cds = require('@sap/cds')

/**
 * Implementation for Risk Management service defined in ./risk-service.cds
 */
module.exports = cds.service.impl(async function() {
    this.after('READ', 'Risks', risksData => {
        const risks = Array.isArray(risksData) ? risksData : [risksData];
        risks.forEach(risk => {
            if (risk.impact >= 100000) {
                risk.criticality = 1;
            } else {
                risk.criticality = 2;
            }
        });
    });
    // https://cap.cloud.sap/docs/node.js/services#event-handlers
    this.after('CREATE', 'Risks', risksData => {
        // console.log('CREATE: ' + JSON.stringify(risksData, null, 2));
    });
    this.after('UPDATE', 'Risks', risksData => {
        // console.log('UPDATE: ' + JSON.stringify(risksData, null, 2));
        if (cds.env.requires.db.dialect == "sqlite") {
            var cdsdb = cds.db;
            var dbh1 = cdsdb.dbcs;
            dbh1.forEach(function (value, key) {
                dbh3 = value;
            });

            // console.log('get PRAGMA: synchronous');
            // cds.run(`PRAGMA synchronous = 2`);
            
            // dbh3.get('PRAGMA synchronous', function(err, row) {
            //     if (err) {
            //         console.log('ERR: ' + JSON.stringify(err, null, 2));
            //         throw err;
            //     }
            //     console.log('ROW: ' + JSON.stringify(row, null, 2));
            //     // if (row.synchronous != 2) {
            //     //     dbh3.exec("PRAGMA synchronous = 2");
            //     //     console.log('PRAGMA: 2 SET!');
            //     // } else {
            //     //     console.log('PRAGMA: 2 OK!');
            //     // }
            // });

            // dbh3.exec("PRAGMA synchronous = 2");
            // console.log('PRAGMA: 2 SET!');

        }

    });
    // this.after('UPDATE', 'Risks', req => cds.tx(req)
    //     .run('PRAGMA synchronous = 2'));
//     this.after('UPDATE', 'Risks', risksData => {
//         // console.log('UPDATE: ' + JSON.stringify(risksData, null, 2));
//         // console.log('CDS: ' + JSON.stringify(cds.env.requires.db, null, 2));
        
//         if (cds.env.requires.db.dialect == "sqlite") {
//             // const locsqlite = require('sqlite3').verbose();
//             // const db = new locsqlite.Database(cds.env.requires.db.credentials.database);
//             // const db2 = new locsqlite.Database(":memory:");

//             // console.log('DB: ' + JSON.stringify(db, null, 2));
//             // cds.db.sync();
//             // https://www.sqlite.org/c3ref/db_cacheflush.html
//             // https://www.sqlite.org/howtocorrupt.html
//             // https://www.sqlite.org/backup.html
//             // https://sqlite.org/c3ref/backup_finish.html#sqlite3backupinit

//             console.log('DB: ' + cds.env.requires.db.dialect);
//             // const dbs = cds.DatabaseService();
//             //var sqldb = cds.db.aquire();
//             var cdsdb = cds.db;
//             var dbh1 = cdsdb.dbcs;
//             var dbh2 = dbh1.size;   //Map
//             var dbh3 = "";
//             dbh1.forEach(function (value, key) {
//                 dbh3 = value;
//                 //console.log(key + ' = ' + value)
//             });

//             // db.close();
//             // db2.close();

// // Could we surface this function???
// // https://sqlite.org/c3ref/backup_finish.html#sqlite3backupinit
// // sqlite3.js
// // Line 102: Database#backup(filename, [callback])
// // Line 103: Database#backup(filename, destName, sourceName, filenameIsDest, [callback])
 
// // https://sqlite.org/c3ref/db_cacheflush.html            
            
// // @sap/cds/libx/_runtime/sqlite/Service.js
// // @sap/cds/libx/_runtime/sqlite/execute.js
// // @sap/cds/libx/_runtime/sqlite/customBuilder
            
// // https://www.sqlite.org/pragma.html#pragma_synchronous

//             // dbh3.close(); // Exiting sqlite handle??? Performs a flush as a side-effect.

// //            var dbnew = new locsqlite.Database(cds.env.requires.db.credentials.database);
//             // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
// //            var mapnew = new Map();
// //            mapnew.set('anonymous',dbnew);
// //            cdsdb.dbcs = mapnew;
            
//             // dbh3.exec("PRAGMA synchronous = 1");
//             console.log('PRAGMA: 1');
//         }
//     });
    this.after('DELETE', 'Risks', risksData => {
        // console.log('DELETE: ' + JSON.stringify(risksData, null, 2));
    });
});