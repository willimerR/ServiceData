console.log("ucducgud");
 const express = require("express");
 const mysql = require("mysql2");
 const cors = require("cors");
  require("dotenv").config();

 const App = express();
 App.use(express.json());
 App.use(cors());



 const PORT = process.env.PORT || 3000;
 //mysql://root:awuYBQRAVlCWEVqwepeJxSsQrxRzhrym@hopper.proxy.rlwy.net:32147/railway


const my = mysql.createPool({
    host: process.env.Database_host || "http://localhost",
    user: process.env.Database_user  || "root",
    password:process.env.Database_password || "awuYBQRAVlCWEVqwepeJxSsQrxRzhrym",
    database:process.env.Database_name || "general",
    port:process.env.Database_port || 3306,

})
console.log(process.env.Database_port)

App.post('/test-db2', (req, res) => {
    const Query = "SELECT * FROM usuario WHERE `Nombre` = ? AND `Contrasena` = ?";
 
    my.query(Query, [req.body.usuario, req.body.contrasena], (err, results) => {
      if (err) {
        return res.status(500).send({ mensaje: "Error en la consulta" });
      }
  
      // Validar si hay resultados
      if (results && results.length > 0) {
        return res.send({ mensaje: "Inicio de sesión exitoso" });
      } else {
        return res.status(401).send({ mensaje: "Credenciales incorrectas" });
      }
    });
  });
  
  

my.getConnection((err)=>{
    if(err){
        console.log("Error con la base de datos");
        return
    }
    console.log("conetando a base de datos");
})

App.get('/test-db', (req, res) => {

    const Query= "SELECT * FROM usuario";
   my.query(Query, (err, results) => {
  
      if (err) {
          res.status(500).send('Error en la consulta');
          return;
      }
      res.json(results);
  });


});








 

 App.listen(PORT,()=>{
console.log(`Servidor Express corriendo en http://localhost:${PORT}`)
 })