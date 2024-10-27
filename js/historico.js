//------------------------------------------------------------------------------------------
// Inicio Programa

renderHistorico();

//------------------------------------------------------------------------------------------

// Escolha de filtro

function filtrarHistorico(tipo) {
    renderHistorico(tipo);
}

//------------------------------------------------------------------------------------------

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

function getRegisterLocalStorage() {
    const registers = localStorage.getItem("register");
    return registers ? JSON.parse(registers) : [];
}

//------------------------------------------------------------------------------------------

// Justificativas

function editJustificativa(index) {
    const justificativas = getJustificativasLocalStorage();
    const justificativa = justificativas[index];
    
    const newObservacao = prompt("Nova Justificativa:", justificativa.justificativa);
    if (newObservacao) {
        justificativas[index] = { ...justificativa, justificativa: newObservacao };
        localStorage.setItem("justificativa", JSON.stringify(justificativas));
        alert("Justificativa atualizada com sucesso!");
        renderHistorico();
    }
}

function deleteJustificativa(index) {
    const justificativas = getJustificativasLocalStorage();
    justificativas.splice(index, 1);
    localStorage.setItem("justificativa", JSON.stringify(justificativas));
    alert("Justificativa excluída.");
    renderHistorico();
}

function getJustificativasLocalStorage() {
    const justificativas = localStorage.getItem("justificativa");
    return justificativas ? JSON.parse(justificativas) : [];
}

//------------------------------------------------------------------------------------------

// Função para exibir registros na tabela
function renderHistorico(filter) {
    const tabelaBody = document.getElementById('tabela-historico').getElementsByTagName('tbody')[0];
    tabelaBody.innerHTML = '';

    // Obter registros e justificativas do Local Storage
    const registros = getRegisterLocalStorage();
    const justificativas = getJustificativasLocalStorage();

    // Escolher quais registros exibir de acordo com o filtro selecionado
    let registrosFiltrados = [];
    if (filter === 'registro') {
        registrosFiltrados = registros.map((item, index) => ({ ...item, originalIndex: index, tipoRegistro: 'registro' }));
    } else if (filter === 'justificativa') {
        registrosFiltrados = justificativas.map((item, index) => ({ ...item, originalIndex: index, tipoRegistro: 'justificativa' }));
    } else {
        registrosFiltrados = [
            ...registros.map((item, index) => ({ ...item, originalIndex: index, tipoRegistro: 'registro' })),
            ...justificativas.map((item, index) => ({ ...item, originalIndex: index, tipoRegistro: 'justificativa' }))
        ];
    }
    

    const filterPeriod = document.getElementById("filter-period").value;
    registrosFiltrados = filterRecordsByPeriod(registrosFiltrados, filterPeriod);

    if (registrosFiltrados.length === 0) {
        tabelaBody.innerHTML = '<tr><td colspan="5">Nenhum registro encontrado para o período selecionado.</td></tr>';
        return;
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
        if (item.tipoRegistro === 'registro') {
            actionsCell.innerHTML = `
                <button onclick="editRecord(${item.originalIndex})">Editar</button>
                <button onclick="deleteRecord(${item.originalIndex})">Excluir</button>
            `;
        } else if (item.tipoRegistro === 'justificativa') {
            actionsCell.innerHTML = `
                <button onclick="editJustificativa(${item.originalIndex})">Editar</button>
                <button onclick="deleteJustificativa(${item.originalIndex})">Excluir</button>
                ${item.arquivoAnexado ? `<a href="${item.arquivoAnexado}" download="${item.nomeArquivo}">Baixar ${item.nomeArquivo}</a>` : ""}
            `;
        }
    });
}

// Função para aplicar filtro de data
function filterRecordsByPeriod(records, period) {
    const now = new Date();
    let filteredRecords = records;
    
    if (period === 'last-week') {
        const oneWeekAgo = new Date(now);
        oneWeekAgo.setDate(now.getDate() - 7);
        filteredRecords = records.filter(record => {
            const recordDate = new Date(record.data || record.dataAusencia);
            return recordDate >= oneWeekAgo && recordDate <= now;
        });
    } else if (period === 'last-month') {
        const oneMonthAgo = new Date(now);
        oneMonthAgo.setMonth(now.getMonth() - 1);
        filteredRecords = records.filter(record => {
            const recordDate = new Date(record.data || record.dataAusencia);
            return recordDate >= oneMonthAgo && recordDate <= now;
        });
    } else if (period === 'custom') {
        const startDateInput = document.getElementById("start-date").value;
        const endDateInput = document.getElementById("end-date").value;
        
        if (startDateInput && endDateInput) {
            const startDate = new Date(startDateInput);
            const endDate = new Date(endDateInput);
            if (startDate > endDate) {
                alert("A data inicial não pode ser posterior à data final.");
                return [];
            } else {
                endDate.setHours(23, 59, 59, 999);
                filteredRecords = records.filter(record => {
                    const recordDate = new Date(record.data || record.dataAusencia);
                    return recordDate >= startDate && recordDate <= endDate;
                });
            }
        } else {
            alert("Por favor, selecione as datas inicial e final.");
            return [];
        }
    }
    return filteredRecords;
}

function toggleCustomDateFields() {
    const filterPeriod = document.getElementById("filter-period").value;
    const customDateRange = document.getElementById("custom-date-range");
    customDateRange.style.display = (filterPeriod === 'custom') ? 'flex' : 'none';
}

document.getElementById("filter-period").addEventListener("change", () => {
    toggleCustomDateFields();
    renderHistorico();
});