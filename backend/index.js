const express = require('express')
const app = express();
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.listen(9000, () => console. log("OK"));

const mysql = require('mysql2/promise')
const connection = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: ''
})

app.get('/',(req,res)=>{
    res.send("Nathan")
})

const getAllpessoas = async () => {
    const [query] = await connection
    .execute('select * from testepessoa.pessoa');
    return query;
}

app.get('/pessoa', async (req,res) => {
    const consulta = await getAllpessoas();
    return res.status(200).json(consulta);
})

app.get('/pessoa/:id', async (req, res)=>{
    const {id} = req.params;
    const [query] = await connection.execute('select * from testepessoa.pessoa where id = ?' , {id});
    if(query.length === 0) return res.status (400).json({mensagem: ' Nao encontrado.'})
    return res.status(200).json(query);
    })

app.get('/pessoa/busca/:nome', async (req, res)=>{
    const {nome} = req.params;
    const [query] = await connection.execute('select * from testepessoa.pessoa where nome = ?' , {nome});
    if(query.length === 0) return res.status (400).json({mensagem: ' Nao encontrado.'})
    return res.status(200).json(query);
    })

app.post('/pessoa', async (req,res)=>{
    const {nome, email} = req.body;
    const [query] = await connection.execute('insert into testepessoa.pessoa (nome, email) values(?, ?)', [nome, email])
    return res.status(200).json(query);
})

app.put('/pessoa', async (req,res)=>{
    const {nome, email, id} = req.body;
    const [query] = await connection.execute('update testepessoa.pessoa set nome = ?, email = ? where id = ?', [nome, email, id])
    return res.status(200).json(query);
})

app.delete('/pessoa', async (req,res)=>{
    const {id} = req.body;
    const [query] = await connection.execute('delete from testepessoa.pessoa where id = ?', [id])
    return res.status(200).json(query);
})