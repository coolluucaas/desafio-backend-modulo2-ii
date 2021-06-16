//Arquivos Importados
const data = require("../banco/data.json");
const { calcularSubTotal, calcularValorDoFrete, calcularDataDeEntrega } = require("../bibliotecaFS");

//Funções dos Controladores

//GET
function exibirProdutosAplicarFiltros(req, res) {

    const produtosEmEstoque = data.produtos.filter(produto => produto.estoque !== 0);
    const usuario = req.query.usuario;
    const categoria = req.query.categoria;
    const precoInicial = Number(req.query.precoInicial);
    const precoFinal = Number(req.query.precoFinal);

    const produtosEmEstoqueFiltradosPorCategoria = produtosEmEstoque.filter(produto => produto.categoria === categoria);
    const produtosEmEstoqueFiltradosPorPreçoInicial = produtosEmEstoque.filter(produto => produto.preco >= precoInicial);
    const produtosEmEstoqueFiltradosPorPreçoFinal = produtosEmEstoque.filter(produto => produto.preco <= precoFinal);

    //Filtros
    //res.json(produtosEmEstoqueFiltradosPorCategoria);
    //res.json(produtosEmEstoqueFiltradosPorPreçoInicial);
    //res.json(produtosEmEstoqueFiltradosPorPreçoFinal);
    res.json(produtosEmEstoque);
}

function exibirInfoDoCarrinho(req, res) {
    console.log(calcularSubTotal());
    console.log(calcularValorDoFrete());
    res.json(data.carrinho);
}

//POST
function adicionarItemAoCarrinho(req, res) {
    const produtoEscolhido = data.produtos.find((produto) => produto.id === Number(req.body.id));

    data.carrinho.produtos.push({
        id: Number(req.body.id),
        quantidade: Number(req.body.quantidade),
        nome: produtoEscolhido.nome,
        preco: produtoEscolhido.preco,
        categoria: produtoEscolhido.categoria
    });

    data.carrinho.subtotal = calcularSubTotal();
    data.carrinho.dataDeEntrega = calcularDataDeEntrega();
    data.carrinho.valorDoFrete = calcularValorDoFrete();
    data.carrinho.totalAPagar = calcularSubTotal() + calcularValorDoFrete();

    res.json(data.carrinho);
}

//PATCH

function modificarItemDoCarrinho(req, res) {

}

function deletarItemDoCarrinho(req, res) {

}

function limparCarrinho(req, res) {

}

function finalizarCompra(req, res) {
    const dadosCliente = {
        type: "individual",
        country: "br",
        name: "Aardvark Silva",
        documents: [
            {
                type: "cpf",
                number: "00000000000",
            },
        ],
    }
}



module.exports = {
    //Funções Dos Controladores
    exibirProdutosAplicarFiltros,
    exibirInfoDoCarrinho,
    adicionarItemAoCarrinho,
    modificarItemDoCarrinho,
    deletarItemDoCarrinho,
    limparCarrinho,
    finalizarCompra,

    //Funções Auxiliares para Teste
    // calcularSubTotal,
    // dataDeEntrega
}