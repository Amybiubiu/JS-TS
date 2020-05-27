var mysql = require('mysql');
var connection = mysql.createConnection({
    host    : 'localhost',
    user    : 'root',
    password: '2yuhly',
    database: 'firstdb'
});

connection.connect();
//查
connection.query('SELECT * FROM websites WHERE id=1',function(err,result){
    if(err){
        console.log('error-',err.message);
        return;
    }
    console.log('-----查-----\n');
    console.log(result[0].id);
    console.log('------------\n');
})

//增
var  addSql = 'INSERT INTO websites(Id,name,url,alexa,country) VALUES(0,?,?,?,?)';
var  addSqlParams = ['菜鸟工具', 'https://c.runoob.com','23453', 'CN'];
connection.query(addSql,addSqlParams,function (err, result){
    if(err){
        console.log('error-',err.message);
        return;
    }
    console.log('-----增-----\n');
    console.log(result);
    console.log('------------\n');
})

//改
var modSql = 'UPDATE websites SET name = ?,url = ? WHERE Id = ?';
var modSqlParams = ['狗狗宠物站', 'https://wangwang.com',5];
connection.query(modSql,modSqlParams,function (err, result){
    if(err){
        console.log('error-',err.message);
        return;
    }
    console.log('-----改-----\n');
    console.log(result.affectedRows);
    console.log('------------\n');
})

//删
connection.query('DELETE FROM websites where id=5',function(err,result){
    if(err){
        console.log('error-',err.message);
        return;
    }
    console.log('-----删-----\n');
    console.log(result.affectedRows);
    console.log('------------\n');   
})

//school 表 查询数据库选课人数
var getNumSql = 'select COUNT(Sno) from SC where Cno = '
                +'(select Cno from Course where Cname = ?)';
var courseName = '数据库';
connection.query(getNumSql,courseName,function(err,result){
    if(err){
        console.log('error-',err.message);
        return;
    }
    console.log('-----school-----\n');
    console.log(result);
    console.log('------------\n');
})
connection.end();
