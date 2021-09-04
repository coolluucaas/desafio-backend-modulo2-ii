const { lerArquivo, escreverNoArquivo, atualizarValoresCarrinho, validarProdutoAdicionadoAoCarrinho, validarModificarProdutoDoCarrinho, validarFinalizarCompra } = require("../bibliotecaFS");

//GET
const listarProdutos = async (req, res) => {

    const data = await lerArquivo();

    const produtosEmEstoque = data.produtos.filter(produto => produto.estoque > 0);
    const categoria = req.query.categoria;
    const precoInicial = Number(req.query.precoInicial);
    const precoFinal = Number(req.query.precoFinal);

    const produtosFiltrados = produtosEmEstoque.filter(produto => {
        if (categoria && produto.categoria.toLowerCase() !== categoria.toLowerCase()) {
            return false
        }
        if (precoInicial && produto.preco < precoInicial) {
            return false
        }
        if (precoFinal && produto.preco > precoFinal) {
            return false
        }
        return true
    });

    res.json(produtosFiltrados);
}
//GET
const detalharCarrinho = async (req, res) => {

    const data = await lerArquivo();

    res.json(data.carrinho);
}
//POST
const adicionarProdutoAoCarrinho = async (req, res) => {

    const data = await lerArquivo();

    const erro = validarProdutoAdicionadoAoCarrinho(req.body);

    if (erro) {
        res.status(400);
        res.json({ erro });
    }

    const idProduto = Number(req.body.id);
    const produtoEstoque = data.produtos.find((produto) => produto.id === idProduto);
    const produtoCarrinho = data.carrinho.produtos.find((produto) => produto.id === idProduto);
    const deltaQuantidadeProduto = Number(req.body.quantidade);

    if (!produtoEstoque) {
        res.status(404);
        res.json({ erro: "Esse produto não existe no estoque!" });
        return;
    }

    if (!produtoCarrinho) {

        if (deltaQuantidadeProduto > produtoEstoque.estoque) {
            res.status(400);
            res.json({ Erro: "Não há itens suficientes desse produto no estoque!" });
            return;
        }

        data.carrinho.produtos.push({
            id: idProduto,
            quantidade: deltaQuantidadeProduto,
            nome: produtoEstoque.nome,
            preco: produtoEstoque.preco,
            categoria: produtoEstoque.categoria
        });


    } else {

        if (deltaQuantidadeProduto + produtoCarrinho.quantidade > produtoEstoque.estoque) {
            res.status(400);
            res.json({ Erro: "Não há itens suficientes desse produto no estoque!" });
            return;
        } else {
            produtoCarrinho.quantidade = produtoCarrinho.quantidade + deltaQuantidadeProduto;
        };
    }

    atualizarValoresCarrinho(data);

    const sucesso = await escreverNoArquivo(data);
    if (sucesso) {
        res.json(data.carrinho);
    } else {
        res.status(404)
        res.json({ erro: "Não foi possível adicionar o produto ao carrinho" })
    }
}
//PATCH
const modificarProdutoDoCarrinho = async (req, res) => {

    const data = await lerArquivo();

    const erro = validarModificarProdutoDoCarrinho(req.body);

    if (erro) {
        res.status(400);
        res.json({ erro })
    }

    const idProduto = Number(req.params.idProduto);
    const produto = data.carrinho.produtos.find(produto => produto.id === idProduto);

    if (!produto) {
        res.status(404);
        res.json({ erro: "Esse produto não existe no carinho!" });
        return;
    }
    const deltaQuantidadeProduto = req.body.quantidade;
    const produtoEstoque = data.produtos.find(produto => produto.id === idProduto);

    if (deltaQuantidadeProduto >= 0) {

        if (deltaQuantidadeProduto + produto.quantidade > produtoEstoque.estoque) {
            res.status(400);
            res.json({ Erro: "Esse produto não tem estoque suficiente!" });
            return;

        } else {
            produto.quantidade = produto.quantidade + deltaQuantidadeProduto;
        };

    } else {
        if (deltaQuantidadeProduto + produto.quantidade < 0) {
            res.status(400);
            res.json({ Erro: "Tentou retirar mais itens do que havia no carrinho." });
            return;
        } else {
            produto.quantidade = produto.quantidade + deltaQuantidadeProduto;
        };

    };


    atualizarValoresCarrinho(data);

    const sucesso = await escreverNoArquivo(data);
    if (sucesso) {
        res.json(data.carrinho);
    } else {
        res.status(404)
        res.json({ erro: "Não foi possível modificar o produto no carrinho" })
    }
}
//DELETE
const deletarProdutoDoCarrinho = async (req, res) => {

    const data = await lerArquivo();

    const produto = data.carrinho.produtos.find((produto) => produto.id === Number(req.params.idProduto));

    if (!produto) {
        res.status(404);
        res.json({ erro: "Esse produto não existe no carinho!" });
        return;
    }

    const indexProdutoCarrinho = data.carrinho.produtos.indexOf(produto);
    data.carrinho.produtos.splice(indexProdutoCarrinho, 1);

    atualizarValoresCarrinho(data);

    const sucesso = await escreverNoArquivo(data);
    if (sucesso) {
        res.json(data.carrinho);
    } else {
        res.status(404)
        res.json({ erro: "Não foi possível retirar o produto do carrinho" })
    }
}
//DELETE
const limparCarrinho = async (req, res) => {

    const data = await lerArquivo();

    data.carrinho.produtos = [];

    atualizarValoresCarrinho(data);

    const sucesso = await escreverNoArquivo(data);
    if (sucesso) {
        res.json({ "mensagem": "O carrinho foi limpo com sucesso!" });
    } else {
        res.status(404);
        res.json({ erro: "Não foi possível limpar o carrinho" });
    }
}
// POST
const finalizarCompra = async (req, res) => {

    const data = await lerArquivo();

    const erro = validarFinalizarCompra(req.body, data.carrinho);

    if (erro) {
        res.status(400);
        res.json({ erro });
    }

    const carrinho = data.carrinho;       

    res.json({
        mensagem: "Compra efetuada com sucesso!",
        carrinho
    });

    for (const produtoCarrinho of carrinho.produtos) { 
        const produtoEstoque = data.produtos.find(produto => produto.id === produtoCarrinho.id);
            produtoEstoque.estoque = produtoEstoque.estoque - produtoCarrinho.quantidade;
        }    

    data.carrinho.produtos = [];

    atualizarValoresCarrinho(data);
    escreverNoArquivo(data);
}


module.exports = {
    listarProdutos,
    detalharCarrinho,
    adicionarProdutoAoCarrinho,
    modificarProdutoDoCarrinho,
    deletarProdutoDoCarrinho,
    limparCarrinho,
    finalizarCompra
}