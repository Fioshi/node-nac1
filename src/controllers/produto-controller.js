exports.get = async(req , res, next) => {
    const data = await repository.get();
    return res.status(200).send(data);
}

exports.post = async(req, res) => {
    serviceProduto.post();
    res.status(201).send({mensagem: "criado com sucesso"})
}

exports.delete = async (req, res) => {
    serviceProduto.delete();
    res.send('Requisição DELETE recebida');
}

exports.update = async (req, res) => {
    try {
        const id = req.params.id;  
        const data = req.body;    

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send('ID inválido'); 
        }
        const updatedProduto = await produtoService.update(id, data);  

        if (!updatedProduto) {
            return res.status(404).send('produto não foi encontrado'); 
        }
        res.status(200).json(updatedProduto);  
    } catch (error) {
        console.error('Erro ao atualizar o produto:', error);
        res.status(500).send('Erro ao atualizar o produto'); 
    }
};