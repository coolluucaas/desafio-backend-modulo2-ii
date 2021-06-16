const express = require("express");
const controladores =require("./controladores/controladores");

const app = express();
app.use(express.json());

app.get("/produtos", controladores.exibirProdutosAplicarFiltros);
app.get("/carrinho", controladores.exibirInfoDoCarrinho);
app.post("/carrinho/produtos",controladores.adicionarItemAoCarrinho);
app.patch("/carrinho/produtos/:idProduto",controladores.modificarItemDoCarrinho);
app.delete("/carrinho/produtos/:idProduto", controladores.deletarItemDoCarrinho);
app.delete("/carrinho", controladores.limparCarrinho);
app.post("/carrinho/finalizar-compra", controladores.finalizarCompra);


app.listen(8000);