import { Logger } from '@nestjs/common';
const JDBC = require('jdbc');
var jinst = require('jdbc/lib/jinst');

export const upperCaseSQL = async (data: any) => {
  let processedArray = [];
  if (data.length > 0) {
    for (let i = 0; i < data.length; i++) {
      let a = data[i];
      for (let key in a) {
        if (a.hasOwnProperty(key)) {
          a[key.toUpperCase()] = a[key];
          delete a[key];
        }
      }
      data[i] = a;
    }
    processedArray = data;
  }
  return processedArray;
};

export const queryExecute = async (query: string): Promise<any> => {
  if (!jinst.isJvmCreated()) {
    jinst.addOption('-Xrs');
    jinst.setupClasspath([
      './src/shared/drivers/jdbc.jar',
      './src/shared/drivers/bson.jar',
    ]);
  }

  var config = {
    url: `jdbc:informix-sqli://${process.env.CARGASOFT_DB_HOST}:${
      process.env.CARGASOFT_DB_PORT
    }/${process.env.CARGASOFT_DB_NAME}:INFORMIXSERVER=${
      process.env.CARGASOFT_DB_INFORMIXSERVER
    }`,
    properties: {
      user: process.env.CARGASOFT_DB_USERNAME,
      password: process.env.CARGASOFT_DB_PASSWORD,
    },
  };

  const db = new JDBC(config);

  const purgeConnection = async (dbx: any) => {
    const promClose = new Promise(resolve => {
      dbx.purge(() => {
        Logger.log('Purge conections', 'informix.ts');
        resolve(true);
      });
    });
    return await promClose.then();
  };

  const releaseConnection = async (dbx: any, obj: any) => {
    const promClose = new Promise(resolve => {
      dbx.release(obj, err => {
        err ? Logger.log(err, 'informix.ts') : null;
        resolve(true);
      });
    });
    return await promClose.then();
  };

  const connErr = async (err: any, dbx?: any) => {
    Logger.error(err.message, 'InformixUtil');
    if (dbx) {
      return await purgeConnection(dbx);
    }
  };

  const promise = new Promise((resolve, reject) => {
    db.initialize(err =>
      err
        ? connErr(err)
        : Logger.log('Conexión con Informix exitosa', 'informix.ts'),
    );

    db.reserve(async (err, obj) => {
      if (obj) {
        const conn = obj.conn;
        const promStatement = new Promise((resStatement, rejStatemen) => {
          conn.createStatement((err, statement) => {
            if (err) {
              conn.close(errCls => {
                Logger.log('cierre conexion lvl 1', 'informix.ts');
                rejStatemen(err);
              });
            } else {
              statement.executeQuery(query, (err, resultset) => {
                if (err) {
                  conn.close(errCls => {
                    rejStatemen(err);
                    Logger.log('cierre conexion lvl 2', 'informix.ts');
                  });
                } else {
                  resultset.toObjArray(async (err, results) => {
                    if (err) {
                      conn.close(errCls => {
                        rejStatemen(err);
                        Logger.log('cierre conexion lvl 3', 'informix.ts');
                      });
                    } else {
                      conn.close(errCls => {
                        resStatement(results);
                        Logger.log('cierre conexion lvl 4', 'informix.ts');
                      });
                    }
                  });
                }
              });
            }
          });
        });

        try {
          const resultado = await promStatement.then();
          await releaseConnection(db, obj);
          resolve(resultado);
        } catch (eStatement) {
          await releaseConnection(db, obj);
          reject(eStatement);
        }
      } else {
        await connErr(err, db);
        reject(err);
      }
      try {
        await purgeConnection(db);
      } catch (e) {}
    });
  });
  return await promise;
};
