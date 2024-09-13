const mongoose = require('mongoose'); 
const registro = require('../models/produto');
const repository = require('../repositories/produto-repository');
const controller = require('../controllers/produto-controller');

'use strict'

const express = require('express')
const router = new express.Router();

router.get('/', async (req, res) => {
    const produtos = await repository.get();
    res.json(produtos);
})

router.post('/submit', (req, res) => {
    const produto = { nome } = req.body;
    
    repository.create(produto)
    
    res.status(201).send('Created produto');
});

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;  

        const produto = await repository.delete(id); 

        if (!produto) {
            return res.status(404).send('produto não encontrado');  
        }

        res.status(200).send('produto excluído com sucesso');  
    } catch (error) {
        console.error('Erro ao excluir o produto:', error);
        res.status(500).send('Erro ao excluir o produto'); 
    }
});

router.put('/:id',async (req, res) => {
    try {
        const id = req.params.id;  
        const data = req.body;    

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send('ID inválido'); 
        }

        const updatedProduto = await repository.update(id, data) 

        if (!updatedProduto) {
            return res.status(404).send('produto não encontrado');  
        }

        res.status(200).json(updatedProduto);  
    } catch (error) {
        console.error('Erro ao atualizar o produto:', error);
        res.status(500).send('Erro ao atualizar o produto'); 
    }
})

module.exports = router;