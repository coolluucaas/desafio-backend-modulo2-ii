const express = require("express");
const { listarProdutos, detalharCarrinho, adicionarProdutoAoCarrinho, modificarProdutoDoCarrinho, deletarProdutoDoCarrinho, limparCarrinho, finalizarCompra } = require("./controladores/controladores");

const roteador = express();

roteador.get("/produtos", listarProdutos);
roteador.get("/carrinho", detalharCarrinho);
roteador.post("/carrinho/produtos", adicionarProdutoAoCarrinho);
roteador.patch("/carrinho/produtos/:idProduto", modificarProdutoDoCarrinho);
roteador.delete("/carrinho/produtos/:idProduto", deletarProdutoDoCarrinho);
roteador.delete("/carrinho", limparCarrinho);
roteador.post("/carrinho/finalizar-compra", finalizarCompra);

module.exports = roteador;