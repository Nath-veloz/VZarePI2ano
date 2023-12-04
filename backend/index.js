const express = require('express')
const cors = require('cors');

const app = express();
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors());

const PORT = 3333;

app.listen(PORT , () => {
    console. log(`Aplicação respondendo em: http://localhost:${PORT}`)
});

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

pp.get('/doador', async (req,res) => {
    const consulta = await getAlldoadores();
    return res.status(200).json(consulta);
})

app.get('/doador/:id', async (req, res)=>{
    const {id} = req.params;
    const [query] = await connection.execute('select * from tabela_doacoes.doador where id = ?' , {id});
    if(query.length === 0) return res.status (400).json({mensagem: ' Nao encontrado.'})
    return res.status(200).json(query);
    })

app.get('/doador/busca/:nome', async (req, res)=>{
    const {nome} = req.params;
    const [query] = await connection.execute('select * from tabela_doacoes.doador where nome = ?' , {nome});
    if(query.length === 0) return res.status (400).json({mensagem: ' Nao encontrado.'})
    return res.status(200).json(query);
    })

app.post('/doador', async (req,res)=>{
    const {nome, email, telefone, endereco} = req.body;
    const [query] = await connection.execute('insert into tabela_doacoes.doador (nome, email, telefone, endereco) values(?, ?, ?, ?)', [nome, email, telefone, endereco])
    return res.status(200).json(query);
})

app.put('/doador', async (req,res)=>{
    const {nome, email, id, telefone, endereco} = req.body;
    const [query] = await connection.execute('update tabela_doacoes.doador set nome = ?, email = ?, telefone = ?, endereco = ?where id = ?', [nome, email, telefone, endereco, id])
    return res.status(200).json(query);
})

app.delete('/doador', async (req,res)=>{
    const {id} = req.body;
    const [query] = await connection.execute('delete from tabela_doacoes.doador where id = ?', [id])
    return res.status(200).json(query);
})
 
 
 
app.get('/doacao', async (req,res) => {
    const consulta = await getAlldoacoes();
    return res.status(200).json(consulta);
})
 
app.get('/doacao/:id', async (req, res)=>{
    const {id} = req.params;
    const [query] = await connection.execute('select * from tabela_doacoes.doacao where id = ?' , {id});
    if(query.length === 0) return res.status (400).json({mensagem: ' Nao encontrado.'})
    return res.status(200).json(query);
    })

app.post('/doacao', async (req,res)=>{
    const {valor, data, doador, campanha, status} = req.body;
    const [query] = await connection.execute('insert into tabela_doacoes.doacao (valor, data, doador, campanha, status) values(?, ?, ?, ?, ?)', [valor, data, doador, campanha, status])
    return res.status(200).json(query);
})

app.put('/doacao', async (req,res)=>{
    const {valor, data, doador, campanha, status, id} = req.body;
    const [query] = await connection.execute('update tabela_doacoes.doacao set valor = ? , data = ? , doador = ? , campanha = ?, status = ?where id = ?', [valor, data, doador, campanha, status, id])
    return res.status(200).json(query);
})

app.delete('/doacao', async (req,res)=>{
    const {id} = req.body;
    const [query] = await connection.execute('delete from tabela_doacoes.doacao where id = ?', [id])
    return res.status(200).json(query);
})
 
 
pp.get('/campanha', async (req,res) => {
    const consulta = await getAllcampanhas();
    return res.status(200).json(consulta);
})

app.get('/campanha/:id', async (req, res)=>{
    const {id} = req.params;
    const [query] = await connection.execute('select * from tabela_doacoes.campanha where id = ?' , {id});
    if(query.length === 0) return res.status (400).json({mensagem: ' Nao encontrado.'})
    return res.status(200).json(query);
    })

app.get('/campanha/busca/:nome', async (req, res)=>{
    const {nome} = req.params;
    const [query] = await connection.execute('select * from tabela_doacoes.campanha where nome = ?' , {nome});
    if(query.length === 0) return res.status (400).json({mensagem: ' Nao encontrado.'})
    return res.status(200).json(query);
    })

app.post('/campanha', async (req,res)=>{
    const {nome, descricao, inicio, fim, usuario} = req.body;
    const [query] = await connection.execute('insert into tabela_doacoes.campanha (nome, descricao, inicio, fim, usuario) values(?, ?, ?, ?, ?)', [nome, descricao, inicio, fim, usuario])
    return res.status(200).json(query);
})

app.put('/campanha ', async (req,res)=>{
    const {nome, descricao, inicio, fim, usuario, id} = req.body;
    const [query] = await connection.execute('update tabela_doacoes.campanha set nome = ?, descricao = ?, inicio = ?, fim = ?, usuario = ? where id = ?', [nome, descricao, inicio, fim, usuario, id])
    return res.status(200).json(query);
})

app.delete('/campanha', async (req,res)=>{
    const {id} = req.body;
    const [query] = await connection.execute('delete from tabela_doacoes.campanha where id = ?', [id])
    return res.status(200).json(query);
})
 
 
pp.get('/usuario', async (req,res) => {
    const consulta = await getAllusuarios();
    return res.status(200).json(consulta);
})

app.get('/usuario/:id', async (req, res)=>{
    const {id} = req.params;
    const [query] = await connection.execute('select * from tabela_doacoes.usuario where id = ?' , {id});
    if(query.length === 0) return res.status (400).json({mensagem: ' Nao encontrado.'})
    return res.status(200).json(query);
    })

app.get('/usuario/busca/:nome', async (req, res)=>{
    const {nome} = req.params;
    const [query] = await connection.execute('select * from tabela_doacoes.usuario where nome = ?' , {nome});
    if(query.length === 0) return res.status (400).json({mensagem: ' Nao encontrado.'})
    return res.status(200).json(query);
    })

app.post('/usuario', async (req,res)=>{
    const {nome, email, telefone, endereco} = req.body;
    const [query] = await connection.execute('insert into tabela_doacoes.usuario (nome, email, telefone, endereco) values(?, ?, ?, ?)', [nome, email, telefone, endereco])
    return res.status(200).json(query);
})

app.put('/usuario', async (req,res)=>{
    const {nome, email, id, telefone, endereco} = req.body;
    const [query] = await connection.execute('update tabela_doacoes.usuario set nome = ?, email = ?, telefone = ?, endereco = ?where id = ?', [nome, email, telefone, endereco, id])
    return res.status(200).json(query);
})

app.delete('/usuario', async (req,res)=>{
    const {id} = req.body;
    const [query] = await connection.execute('delete from tabela_doacoes.usuario where id = ?', [id])
    return res.status(200).json(query);
})
