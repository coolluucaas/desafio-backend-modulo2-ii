const fs = require('fs');
const data = require('./banco/data.json');
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

const calcularSubTotal = () => {
    return data.carrinho.produtos.reduce(
        (subtotal, produto) => subtotal + produto.preco * produto.quantidade,
        0
    );
};

const calcularDataDeEntrega = () => {
    return addBusinessDays(new Date(), 15);
};

const calcularValorDoFrete = () => {
    console.log(data.carrinho.subtotal);
    return data.carrinho.subtotal <= 20000 ? 5000 : 0
};

function abaterItensVendidosDoEstoque() {
};

module.exports = {
    lerArquivo,
    escreverNoArquivo,
    calcularSubTotal,
    calcularValorDoFrete,
    calcularDataDeEntrega,
    abaterItensVendidosDoEstoque
}