const mongoose = require('mongoose');
const produto = require('../models/produto');
const Produto = mongoose.model('Produto');

exports.get = async() => {
    const result = await Produto.find({});
    return result;
};

exports.create = async(data) => {
    const produto = Produto(data);
    await produto.save();
};

exports.delete = async (id) => {
    try {
        const produto = await Produto.findByIdAndDelete(id); 

        if (!produto) {
            return null;  
        }

        return produto;  
    } catch (error) {
        console.error('Erro ao excluir o produto:', error);
        throw error;  
    }
};

exports.update = async (id, data) => {
    try {
        const updatedProduto = await Produto.findByIdAndUpdate(id, data, {
            new: true,    
            runValidators: true  
        });

        if (!updatedProduto) {
            return null;  
        }

        return updatedProduto;  
    } catch (error) {
        console.error('Erro ao atualizar o produto:', error);
        throw error;  
    }
};