const express = require("express");
const { listarProdutos, detalharCarrinho, adicionarProdutoAoCarrinho, modificarProdutoDoCarrinho, deletarProdutoDoCarrinho, limparCarrinho, finalizarCompra } = require("./controladores/controladores");
const { criarPedido, consultarPedido } = require("./controladores/pedidos");

const roteador = express();

roteador.get("/produtos", listarProdutos);
roteador.get("/carrinho", detalharCarrinho);
roteador.post("/carrinho/produtos", adicionarProdutoAoCarrinho);
roteador.patch("/carrinho/produtos/:idProduto", modificarProdutoDoCarrinho);
roteador.delete("/carrinho/produtos/:idProduto", deletarProdutoDoCarrinho);
roteador.delete("/carrinho", limparCarrinho);
roteador.post("/carrinho/finalizar-compra", finalizarCompra);
roteador.post("/carrinho/criar-pedido", criarPedido);
roteador.post("/carrinho/consultar-pedido/:id", consultarPedido);

module.exports = roteador;