// Arquivos Importados
const data = require('./banco/data.json');
const bibliotecaFS = require('./bibliotecaFS');

//Teste 
const carrinhoTeste = {
  "produtos": [
    {
      "id": 1,
      "quantidade": 1,
      "nome": "Pipoca para Microondas Manteiga YOKI 50g",
      "preco": 169,
      "categoria": "Bazar"
    },
    {
      "id": 4,
      "quantidade": 0,
      "nome": "Desinfetante Uso Geral Herbal Omo Frasco 500ml",
      "preco": 529,
      "categoria": "Limpeza"
    }
  ],
  "subtotal": 0,
  "dataDeEntrega": null,
  "valorDoFrete": 0,
  "totalAPagar": 0
}


const produto = {
  "id": 1,
  "quantidade": 1,
  "nome": "Pipoca para Microondas Manteiga YOKI 50g",
  "preco": 169,
  "categoria": "Bazar"
}

const reqbody = {	
  "amount": 100,
  "payment_method":"boleto",
  "customer":{
      "type": "individual",
      "country": "br",
      "name": "Aardvark Silva",
      "documents": [
        {
          "type": "cpf",
          "number": "00000000000"
        }
      ]
  }	

}
console.log(reqbody.customer.documents[0].type);

// for (let dado in produto) {
//   console.log(dado, produto[dado])
// };



// console.log(data.produtos);

// const produtosFiltrados = produtos.filter(produto =>

//   for (chave in filtros) {

// })