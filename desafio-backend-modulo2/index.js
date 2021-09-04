const express = require("express");
const estoque = require("./dados/estoque");
const controladoresCheckout =require("./controladores/controladoresCheckout");

const app = express();
app.use(express.json());

app.get("/produtos", controladoresCheckout.selecionarProdutos);
app.get("/carrinho", controladoresCheckout.exibirInfoDoCarrinho);
app.post("/carrinho/produtos",controladoresCheckout.adicionarItemAoCarrinho);
app.patch("/carrinho/produtos/:idProduto",controladoresCheckout.modificarItemDoCarrinho);
app.delete("/carrinho/produtos/:idProduto", controladoresCheckout.deletarItemDoCarrinho);
app.delete("/carrinho", controladoresCheckout.limparCarrinho);
app.post("/carrinho/finalizar-compra", controladoresCheckout.finalizarCompra);


app.listen(8000);