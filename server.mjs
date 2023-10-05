//1.recordar la extencion de los archivos para importar en ES6
//2.PODEMOS CAMBIAR EL NOBRE A LA HORA DE export default app;
import app from './app.mjs';
import dotenv from 'dotenv';
import mysql from 'mysql';
import bodyParser from 'body-parser';

dotenv.config();
app.use(bodyParser.urlencoded({ extended: true }));
const db = mysql.createConnection({
    host: process.env.HOSTDATA,
    user: process.env.USERDATA,
    password: process.env.PASSDATA,
    database: process.env.DATABASE
});






db.connect(err => {
    if (err) {
        console.error('Error de conexión a la base de datos: ' + err.stack);
        return;
    }
    console.log('Conexión a la base de datos exitosa');
});

app.post('/register', (req, res) => {
    const formData = req.body;

    const sql = 'INSERT INTO registro00 (username, email, password, age, dob, sex, country, province, locality, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

    db.query(sql, [
        formData.username,
        formData.email,
        formData.password,
        formData.age,
        formData.dob,
        formData.sex,
        formData.country,
        formData.province,
        formData.locality,
        formData.description
    ], (err, result) => {
        if (err) {
            console.error('Error al registrar: ' + err.message);
            res.status(500).send('Error al registrar el usuario');
        } else {
            console.log('Registro exitoso:', result);
            res.status(200).send('Registro exitoso');
        }
    });
});

const PORT = process.env.PORT || 8081;
//nos conectamos a datbase

const server = app.listen(PORT, ()=>{
    console.log(`Servidor run in Port http://localhost:${PORT}`);
});

server.on('error', (err)=>{
    console.log(`Error en el servidor ${err}`);
})
    



//levantamos el servidor

export default app;