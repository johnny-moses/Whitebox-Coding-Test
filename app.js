const mysql = require('mysql');
const excel = require('exceljs');


// Create connection
var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    port: '3306',
    database: 'whitebox'
});

//connect
db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('Connected to Database')
    data = db.query("SELECT * FROM rates WHERE id = '1240'", function (err, result, fields) {
        if (err) throw err;
        const jsonData = result;
        console.log(jsonData)

        let workbook = new excel.Workbook();

let worksheet = workbook.addWorksheet('Customer');

worksheet.columns = [
    {header: '_id', key: "id", width: 10},
    {header: 'Client_ID', key: "client_id", width: 10},
    {header: 'Start_Weight', key: "start_weight", width: 15},
    {header: 'End_Weight', key: "end_weight", width: 15},
    {header: 'Zone', key: "zone", width: 10},
    {header: 'Rate', key: "rate", width: 10},
    {header: 'Shipping_Speed', key: "shipping_speed", width: 20},
    {header: 'Locale', key: "locale", width: 10}
]

worksheet.addRows(jsonData);

workbook.xlsx.writeFile("sample-output.xlsx")
.then(function() {
    console.log('File Saved')
})

db.end(function(err){
    if (err) {
        return console.log('error' + err.message);
    }
    console.log('Database connection closed.')
})
    });
})


