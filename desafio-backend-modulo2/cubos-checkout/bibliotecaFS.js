const fs = require('fs');

const { addBusinessDays } = require('date-fns');

const fsp = fs.promises;

const ARQUIVO = 'banco/data.json';
const CAMINHO_BANCO = 'banco';

const lerArquivo = async () => {
    try {
        if (fs.existsSync(ARQUIVO)) {
            const arquivo = await fsp.readFile(ARQUIVO, (err, data) => {
                if (err) {
                    return err;
                }
                return data;
            });

            if (arquivo.length > 0) {
                return JSON.parse(arquivo)
            }
        }
        return [];
    } catch (err) {
        return false
    }
};

const escreverNoArquivo = async (data) => {
    try {
        if (!fs.existsSync(CAMINHO_BANCO)) {
            fs.mkdirSync(CAMINHO_BANCO);
        }
        await fsp.writeFile(ARQUIVO, JSON.stringify(data, null, 2));
        return true;
    } catch (err) {
        return false;
    }
};

const atualizarValoresCarrinho = (data) => { 
    
    const subtotal = data.carrinho.produtos.reduce((subtotal, produto) => subtotal + produto.preco * produto.quantidade,0);
    data.carrinho.subtotal = subtotal;

    const valorFrete = data.carrinho.subtotal <= 20000 ? 5000 : 0;
    data.carrinho.valorDoFrete = valorFrete

    data.carrinho.dataDeEntrega = addBusinessDays(new Date(), 15);
    
    data.carrinho.totalAPagar = subtotal + valorFrete;

    if(subtotal === 0) {        
        data.carrinho.dataDeEntrega = null;
        data.carrinho.valorDoFrete = 0;
        data.carrinho.totalAPagar = 0;
    }
};

const validarProdutoAdicionadoAoCarrinho = (produto) => {

    if (!produto.id) {
        return "O campo 'nome' é obrigatório.";
    }

    if (!produto.quantidade) {
        return "O campo 'quantidade' é obrigatório.";
    }

    if (typeof produto.id !== "number") {
        return "O campo 'id' deve ser preenchido com um número.";
    }

    if (typeof produto.quantidade !== "number") {
        return "O campo 'quantidade' deve ser preenchido com um número.";
    }

    if (produto.quantidade < 0) {
        return "O campo 'quantidade' deve ser preenchido com valores positivos."
    }
};

const validarModificarProdutoDoCarrinho = (produto) => {

    if (!produto.quantidade) {
        return "O campo 'quantidade' é obrigatório.";
    }

    if (typeof produto.quantidade !== "number") {
        return "O campo 'quantidade' deve ser preenchido com um número.";
    }
};

const validarFinalizarCompra = (cliente, carrinho) => {
    //Validação Cliente
    //Verificação de preenchimento
    if (!cliente.type) {
        return "O campo 'type' é obrigatório.";
    }
    if (!cliente.country) {
        return "O campo 'country' é obrigatório.";
    }
    if (!cliente.name) {
        return "O campo 'quantidade' é obrigatório.";
    }
    if (!cliente.documents[0].type) {
        return "O campo 'type' de 'documents' é obrigatório.";
    }
    if (!cliente.documents[0].number) {
        return "O campo 'number' de 'documents' é obrigatório.";
    }
    //Verificação de tipo de entrada    
    if (typeof cliente.type !== "string") {
        return "O campo 'id' deve ser preenchido com um texto.";
    }
    if (typeof cliente.country !== "string") {
        return "O campo 'country' deve ser preenchido com um texto.";
    }
    if (typeof cliente.name !== "string") {
        return "O campo 'name' deve ser preenchido com um texto.";
    }
    if (typeof cliente.documents[0].type !== "string") {
        return "O campo 'type' de 'documents' deve ser preenchido com um texto.";
    }
    if (typeof cliente.documents[0].number !== "string") {
        return "O campo 'number' de 'documents' deve ser preenchido com um número.";
    }
    //Outras Validações
    if (!cliente.country.length === 2) {
        return "O campo 'country' deve ser preenchido com um texto de 2 dígitos.";
    }
    if (cliente.type !== "individual") {
        return "Este e-commerce só atende pessoas físicas"
    }
    if (!cliente.name.includes(" ")) {
        return "O campo 'name' deve ser preenchido com nome e sobrenome."
    }
    if (!cliente.documents[0].number.match(/[0-9]{11}/g)) {
        return "O campo 'number' de 'documents' deve ser conter um cpf com 11 dígitos apenas numéricos."
    }

    //Validação Carrinho
    if (carrinho.produtos.length === 0) {
        return "O carrinho está vazio!";
    }
};

module.exports = {
    lerArquivo,
    escreverNoArquivo,   
    atualizarValoresCarrinho,
    validarProdutoAdicionadoAoCarrinho,
    validarModificarProdutoDoCarrinho,
    validarFinalizarCompra
}