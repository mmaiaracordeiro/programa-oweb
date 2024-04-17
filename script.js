let produtos = [];


function adicionarProduto() {
   const nome = document.getElementById('nomeProduto').value;
   const preco = parseFloat(document.getElementById('precoProduto').value);
   const quantidade = parseInt(document.getElementById('quantidadeProduto').value);
   const categoria = document.getElementById('categoriaProduto').value;


   if (nome && !isNaN(preco) && !isNaN(quantidade) && categoria !== "Escolha uma categoria...") {
       produtos.push({ nome, preco, quantidade, categoria });
       mostrarProdutos();
   } else {
       alert("Por favor, preencha todos os campos corretamente.");
   }
}


function mostrarProdutos(filtroTexto = '') {
    const listaProdutos = document.getElementById('listaProdutos');
    listaProdutos.innerHTML = '';

    const produtosFiltrados = produtos.filter(produto => produto.nome.toLowerCase().includes(filtroTexto.toLowerCase()));

    const produtosPorCategoria = produtosFiltrados.reduce((acc, produto) => {
        acc[produto.categoria] = acc[produto.categoria] || [];
        acc[produto.categoria].push(produto);
        return acc;
    }, {});

    Object.keys(produtosPorCategoria).forEach(categoria => {
        const divCategoria = document.createElement('div');
        divCategoria.innerHTML = `<h3>${categoria}</h3>`;
        listaProdutos.appendChild(divCategoria);

        produtosPorCategoria[categoria].forEach((produto, index) => {
            const divProduto = document.createElement('div');
            divProduto.className = 'alert alert-info d-flex justify-content-between align-items-center';
            divProduto.innerHTML = `
                <div>
                    Nome: ${produto.nome},
                    Preço: R$ ${produto.preco.toFixed(2)},
                    Quantidade: ${produto.quantidade},
                    Valor Total: R$ ${(produto.preco * produto.quantidade).toFixed(2)}
                </div>
                <div>
                    <button onclick="abrirModalEdicao(${index})" class="btn btn-primary btn-sm">
                        <i class="fas fa-pencil-alt"></i>
                    </button>
                    <button onclick="excluirProduto(${index})" class="btn btn-danger btn-sm">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            listaProdutos.appendChild(divProduto);
        });
    });
}


function abrirModalEdicao(index) {
   const produto = produtos[index];
   document.getElementById('editNomeProduto').value = produto.nome;
   document.getElementById('editPrecoProduto').value = produto.preco;
   document.getElementById('editQuantidadeProduto').value = produto.quantidade;
   document.getElementById('editCategoriaProduto').value = produto.categoria;
   $('#modalEdicao').modal('show');
   $('#modalEdicao').data('index', index);
}


function salvarEdicao() {
   const index = $('#modalEdicao').data('index');
   const nome = document.getElementById('editNomeProduto').value;
   const preco = parseFloat(document.getElementById('editPrecoProduto').value);
   const quantidade = parseInt(document.getElementById('editQuantidadeProduto').value);
   const categoria = document.getElementById('editCategoriaProduto').value;


   if (nome && !isNaN(preco) && !isNaN(quantidade) && categoria) {
       produtos[index] = { nome, preco, quantidade, categoria };
       $('#modalEdicao').modal('hide');
       mostrarProdutos();
   } else {
       alert("Por favor, preencha todos os campos corretamente.");
   }
}


function excluirProduto(index) {
   if (confirm("Tem certeza que deseja excluir este produto?")) {
       produtos.splice(index, 1);
       mostrarProdutos();
   }
}


mostrarProdutos();