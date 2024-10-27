//Inicio Programa

renderHistorico();

//Escolha de filtro

function filtrarHistorico(tipo) {
    renderHistorico(tipo);
}

//Fim escolha filtro

// Funções de edição e exclusão
function editRecord(index) {
    const registros = getRegisterLocalStorage();
    const registro = registros[index];
    
    const newHora = prompt("Nova Hora:", registro.hora);
    const newTipo = prompt("Novo Tipo:", registro.tipo);
    const newObservacao = prompt("Nova Observação:", registro.observacao);
    
    if (newHora && newTipo && newObservacao) {
        registros[index] = { ...registro, hora: newHora, tipo: newTipo, observacao: newObservacao };
        localStorage.setItem("register", JSON.stringify(registros));
        alert("Registro atualizado com sucesso!");
        renderHistorico();
    }
}

function deleteRecord(index) {
    const registros = getRegisterLocalStorage();
    registros.splice(index, 1);
    localStorage.setItem("register", JSON.stringify(registros));
    alert("Registro excluído.");
    renderHistorico();
}

//Fim Pontos

//Inicio Justificativas

function editJustificativa(index) {
    const justificativas = getJustificativasLocalStorage();
    const justificativa = justificativas[index];
    
    const newObservacao = prompt("Nova Justificativa:", justificativa.justificativa);
    if (newObservacao) {
        justificativas[index] = { ...justificativa, justificativa: newObservacao };
        localStorage.setItem("justificativas", JSON.stringify(justificativas));
        alert("Justificativa atualizada com sucesso!");
        renderHistorico();
    }
}

function deleteJustificativa(index) {
    const justificativas = getJustificativasLocalStorage();
    justificativas.splice(index, 1);
    localStorage.setItem("justificativas", JSON.stringify(justificativas));
    alert("Justificativa excluída.");
    renderHistorico();
}

//Fim Justificativas

// Funções para manipular Local Storage
function getRegisterLocalStorage() {
    const registers = localStorage.getItem("register");
    return registers ? JSON.parse(registers) : [];
}

function getJustificativasLocalStorage() {
    const justificativas = localStorage.getItem("justificativa");
    console.log(localStorage.getItem("justificativa"))
    return justificativas ? JSON.parse(justificativas) : [];
}

// Função para exibir registros na tabela
function renderHistorico(filter) {

    console.log(filter)

    const tabelaBody = document.getElementById('tabela-historico').getElementsByTagName('tbody')[0];
    tabelaBody.innerHTML = ''; // Limpa a tabela antes de renderizar

    // Obter registros e justificativas do Local Storage
    const registros = getRegisterLocalStorage();
    const justificativas = getJustificativasLocalStorage();

    // Escolher quais registros exibir de acordo com o filtro selecionado
    let registrosFiltrados = [];
    if (filter === 'ponto') {
        console.log("Entrei na ponto")
        registrosFiltrados = registros.map((item, index) => ({ ...item, originalIndex: index, tipoRegistro: 'ponto' }));
        console.log(registrosFiltrados)
    } else if (filter === 'justificativa') {
        console.log("Entrei na justificativa")
        registrosFiltrados = justificativas.map((item, index) => ({ ...item, originalIndex: index, tipoRegistro: 'justificativa' }));
        console.log(registrosFiltrados)
    } else {
        registrosFiltrados = [
            ...registros.map((item, index) => ({ ...item, originalIndex: index, tipoRegistro: 'ponto' })),
            ...justificativas.map((item, index) => ({ ...item, originalIndex: index, tipoRegistro: 'justificativa' }))
        ];
    }

    if (registrosFiltrados.length === 0) {
        tabelaBody.innerHTML = '<tr><td colspan="5">Nenhum registro encontrado para o filtro selecionado.</td></tr>';
        return;
    }

    registrosFiltrados.forEach((item) => {
        const row = tabelaBody.insertRow();
        row.insertCell(0).textContent = item.data || item.dataAusencia;
        row.insertCell(1).textContent = item.hora || 'N/A';
        row.insertCell(2).textContent = item.tipo || 'Justificativa';
        row.insertCell(3).textContent = item.observacao || item.justificativa || '';
        
        const actionsCell = row.insertCell(4);

        // Exibe ações específicas para cada tipo de item
        if (item.tipoRegistro === 'ponto') {
            actionsCell.innerHTML = `
                <button onclick="editRecord(${item.originalIndex})">Editar</button>
                <button onclick="deleteRecord(${item.originalIndex})">Excluir</button>
            `;
        } else if (item.tipoRegistro === 'justificativa') {
            actionsCell.innerHTML = `
                <button onclick="editJustificativa(${item.originalIndex})">Editar</button>
                <button onclick="deleteJustificativa(${item.originalIndex})">Excluir</button>
                ${item.conteudoArquivo ? `<a href="${item.conteudoArquivo}" download="${item.nomeArquivo}">Baixar ${item.nomeArquivo}</a>` : ""}
            `;
        }
    });
}
