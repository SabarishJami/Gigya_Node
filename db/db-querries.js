const mongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

const insertOneRecord = (dbName, colName, insertObj) => {
    mongoClient.connect(url, (err, db) => {
        db = db.db(dbName);
        db.collection(colName).insertOne(insertObj, function (err, res) {
            if (err)
                return err;
            else {
                return res;
                console.log("1 document inserted");
            }
            db.close();
        });
    })
}

module.exports = {
    insertOneRecord: insertOneRecord
}