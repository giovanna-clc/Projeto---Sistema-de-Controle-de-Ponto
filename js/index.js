// TO-DO:
// Organizar código-fonte,
//Funções
function getCurrentDate() {
    const date = new Date();
    return String(date.getDate()).padStart(2, '0') + "/" + String((date.getMonth() + 1)).padStart(2, '0') + "/" + String(date.getFullYear()).padStart(2, '0');
}

function getWeekDay() {
    const date = new Date();
    let days = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
    return days[date.getDay()];
}

function getCurrentHour() {
    const date = new Date();
    return String(date.getHours()).padStart(2, '0') + ":" + String(date.getMinutes()).padStart(2, '0') + ":" + String(date.getSeconds()).padStart(2, '0');
}

function printCurrentHour() {
    horaMinSeg.textContent = getCurrentHour();
}


// Esta função deve retornar sempre um ARRAY, mesmo que seja vazio
function getRegisterLocalStorage() {
    let registers = localStorage.getItem("register");
    
    if(!registers) {
        return [];
    }
    
    return JSON.parse(registers); // converte de JSON para Array
}

async function getCurrentPosition() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition((position) => {
            let userLocation = {
                "latitude": position.coords.latitude,
                "longitude": position.coords.longitude
            }
            resolve(userLocation);
        },
        (error) => {
            reject("Erro ao recuperar a localização " + error);
        });
    });
}
function saveRegisterLocalStorage(register) {
    const typeRegister = document.getElementById("tipos-ponto");
    registerLocalStorage.push(register); // Array
    localStorage.setItem("register", JSON.stringify(registerLocalStorage));
    localStorage.setItem("lastTypeRegister", typeRegister.value);
} 

//Fim funções


//Dados padrões apresentação
const diaSemana = document.getElementById("dia-semana");
const diaMesAno = document.getElementById("dia-mes-ano");
const horaMinSeg = document.getElementById("hora-min-seg");
    //Atualiza para a data de hoje
    diaSemana.textContent = getWeekDay();
    diaMesAno.textContent = getCurrentDate();
        //Atualiza a hora de 1 em 1 segundo (1000 ticks == 1 segundo)
        setInterval(printCurrentHour, 1000);
    //Fim atualizações
const nextRegister = {
    "entrada": "intervalo",
    "intervalo": "volta-intervalo", 
    "volta-intervalo": "saida", 
    "saida": "entrada"
}
let lastTypeRegister = localStorage.getItem("lastTypeRegister");
    if(lastTypeRegister) {
        const typeRegister   = document.getElementById("tipos-ponto");
        typeRegister.value   = nextRegister[lastTypeRegister];
        let lastRegisterText = "Último registro: " + localStorage.getItem("lastDateRegister") + " - " + localStorage.getItem("lastTimeRegister") + " | " + localStorage.getItem("lastTypeRegister")
        document.getElementById("dialog-last-register").textContent = lastRegisterText;
    }
//Fim dados padrões


//Alerta registro
// TO-DO:
// Problema: os 5 segundos continuam contando
const btnCloseAlertRegister = document.getElementById("alerta-registro-ponto-fechar");
btnCloseAlertRegister.addEventListener("click", () => {
    divAlertaRegistroPonto.classList.remove("show");
    divAlertaRegistroPonto.classList.add("hidden");
});
//Fim alerta registro

const dialogData = document.getElementById("dialog-data");
const dialogHora = document.getElementById("dialog-hora");
const dialogPonto = document.getElementById("dialog-ponto");
//Fim registro

//------------------------------------------------------------------------------------------

//Registro

function register() {
    dialogData.textContent = "Data: " + getCurrentDate();
    dialogHora.textContent = "Hora: " + getCurrentHour();
    
    let lastTypeRegister = localStorage.getItem("lastTypeRegister");
    if(lastTypeRegister) {
        const typeRegister   = document.getElementById("tipos-ponto");
        typeRegister.value   = nextRegister[lastTypeRegister];
        let lastRegisterText = "Último registro: " + localStorage.getItem("lastDateRegister") + " - " + localStorage.getItem("lastTimeRegister") + " | " + localStorage.getItem("lastTypeRegister")
        document.getElementById("dialog-last-register").textContent = lastRegisterText;
    }

    // TO-DO
    // Como "matar" o intervalo a cada vez que o dialog é fechado?
    setInterval(() => {
        dialogHora.textContent = "Hora: " + getCurrentHour();
    }, 1000);

    dialogPonto.showModal();
}

//Formulario de registro de ponto
const btnBaterPonto = document.getElementById("btn-bater-ponto");
btnBaterPonto.addEventListener("click", register);

//Fechamento forms manual
const btnDialogFechar = document.getElementById("btn-dialog-fechar");
btnDialogFechar.addEventListener("click", () => {
    dialogPonto.close();
});
//Fim fechamento manual

//Regsitro e save do ponto
const btnDialogBaterPonto = document.getElementById("btn-dialog-bater-ponto");
const divAlertaRegistroPonto = document.getElementById("alerta-registro-ponto");

btnDialogBaterPonto.addEventListener("click", async () => {
    const typeRegister = document.getElementById("tipos-ponto");
    let lastTypeRegister = localStorage.getItem("lastTypeRegister");

    console.log(lastTypeRegister);

    let userCurrentPosition = await getCurrentPosition();

    let ponto = {
        "data": getCurrentDate(),
        "hora": getCurrentHour(),
        "localizacao": userCurrentPosition,
        "id": 1,
        "tipo": typeRegister.value
    }

    console.log(ponto);

    saveRegisterLocalStorage(ponto);

    localStorage.setItem("lastDateRegister", ponto.data);
    localStorage.setItem("lastTimeRegister", ponto.hora);

    dialogPonto.close();

    divAlertaRegistroPonto.classList.remove("hidden");
    divAlertaRegistroPonto.classList.add("show");

    setTimeout(() => {
        divAlertaRegistroPonto.classList.remove("show");
        divAlertaRegistroPonto.classList.add("hidden");
    }, 5000);

});
//Fim resgistro save

//Fim registro

//------------------------------------------------------------------------------------------

//Jusificativa
function toggleFileInput() {
    const fileInputContainer = document.getElementById("fileInputContainer");
    fileInputContainer.style.display = document.getElementById("toggleFileCheckbox").checked ? "block" : "none";
}

function registerJustificativa() {

    // Carrega a última justificativa registrada, se existir
    let lastAbsenceDate = localStorage.getItem("lastAbsenceDate");
    if (lastAbsenceDate) {
        const lastAbsenceText = `Última justificativa: ${lastAbsenceDate} - ${localStorage.getItem("lastAbsenceTime")} | Arquivo anexado: ${localStorage.getItem("absenceFileAttached")}`;
        document.getElementById("dialog-last-register-justificativa").textContent = lastAbsenceText;
    }

    // Atualiza a hora a cada segundo
    setInterval(() => {
        document.getElementById("dialog-hora-justificativa").textContent = "Hora: " + getCurrentHour();
    }, 1000);

    dialogJustificativa.showModal();
}

// Botão para abrir o diálogo de justificativa
const btnBaterJustificar = document.getElementById("btn-bater-justificar");
btnBaterJustificar.addEventListener("click", registerJustificativa);

// Fechamento manual do formulário de justificativa
const dialogJustificativa = document.getElementById("dialog-justificativa");
const btnFecharJustificativa = document.getElementById("btn-dialog-fechar-justificatica");
btnFecharJustificativa.addEventListener("click", () => {
    dialogJustificativa.close();
});

// Botão para confirmar o registro da justificativa
const btnDialogJustificativa = document.getElementById("btn-dialog-bater-justificativa");
const divAlertaRegistroJustificativa = document.getElementById("alerta-registro-justificativa");

btnDialogJustificativa.addEventListener("click", async () => {
    const absenceDate = document.getElementById("absenceDate").value;
    const observationText = document.getElementById("observationText").value;
    
    if (!absenceDate) {
        alert("Por favor, selecione uma data de ausência.");
        return;
    }

    // Obtém a posição atual do usuário (se necessário)
    let userCurrentPosition = await getCurrentPosition();

    // Cria o objeto de justificativa
    const absenceFile = document.getElementById("absenceFile").files[0]; // Obtenha o arquivo

    let justificativa = {
        data: absenceDate,
        hora: getCurrentHour(),
        localizacao: userCurrentPosition,
        id: 1, // ou outro ID único
        tipo: "justificativa",
        arquivoAnexado: absenceFile ? URL.createObjectURL(absenceFile) : "", // Gera URL temporária
        nomeArquivo: absenceFile ? absenceFile.name : "", // Salva o nome do arquivo
        observacao: observationText || "-"
    };



    console.log(justificativa);

    // Salva o registro da justificativa no localStorage
    saveRegisterLocalStorage(justificativa);

    // Atualiza o último registro da justificativa no localStorage
    localStorage.setItem("lastAbsenceDate", justificativa.data);
    localStorage.setItem("lastAbsenceTime", justificativa.hora);
    localStorage.setItem("absenceFileAttached", justificativa.arquivoAnexado);

    dialogJustificativa.close();

    // Mostra um alerta de registro da justificativa
    divAlertaRegistroJustificativa.classList.remove("hidden");
    divAlertaRegistroJustificativa.classList.add("show");

    setTimeout(() => {
        divAlertaRegistroJustificativa.classList.remove("show");
        divAlertaRegistroJustificativa.classList.add("hidden");
    }, 5000);
});

// Função para alternar a visibilidade do campo de arquivo
function toggleFileInput() {
    const fileInputContainer = document.getElementById("fileInputContainer");
    const checkbox = document.getElementById("toggleFileCheckbox");
    if (checkbox.checked) {
        fileInputContainer.style.display = "block";
    } else {
        fileInputContainer.style.display = "none";
    }
}
//Fim justificativa

//------------------------------------------------------------------------------------------

//Inicio histórico

function carregarHistorico() {
    const registros = JSON.parse(localStorage.getItem("register")) || [];
    console.log("Registros carregados:", registros); // Adiciona log para verificação
    atualizarTabela(registros);
}

function filtrarHistorico(tipo) {
    const registros = JSON.parse(localStorage.getItem("register")) || [];

    let registrosFiltrados;
    if (tipo === 'ponto') {
        registrosFiltrados = registros.filter(reg => 
            reg.tipo === 'entrada' || reg.tipo === 'intervalo' || reg.tipo === 'volta-intervalo' || reg.tipo === 'saida'
        );
    } else if (tipo === 'justificativa') {
        registrosFiltrados = registros.filter(reg => reg.tipo === 'justificativa');
    } else {
        registrosFiltrados = registros; // Todos os registros
    }

    console.log("Registros filtrados:", registrosFiltrados); // Verificação
    atualizarTabela(registrosFiltrados);
}



// Atualizar a tabela com os dados filtrados
function atualizarTabela(registros) {
    const tbody = document.querySelector("#tabela-historico tbody");
    tbody.innerHTML = ""; // Limpa a tabela

    if (registros.length === 0) {
        const row = document.createElement("tr");
        const emptyCell = document.createElement("td");
        emptyCell.textContent = "Nenhum registro encontrado";
        emptyCell.colSpan = 4;
        row.appendChild(emptyCell);
        tbody.appendChild(row);
        return;
    }

    registros.forEach(registro => {
        const row = document.createElement("tr");

        const dataCell = document.createElement("td");
        dataCell.textContent = registro.data;
        row.appendChild(dataCell);

        const horaCell = document.createElement("td");
        horaCell.textContent = registro.hora;
        row.appendChild(horaCell);

        const tipoCell = document.createElement("td");
        tipoCell.textContent = registro.tipo;
        row.appendChild(tipoCell);

        const obsCell = document.createElement("td");
        obsCell.textContent = registro.observacao || "-";
        row.appendChild(obsCell);

        const cellArquivo = row.insertCell();
        if (registro.arquivoAnexado) {
            const link = document.createElement("a");
            link.href = registro.arquivoAnexado;
            link.textContent = registro.nomeArquivo; // Exibe o nome do arquivo
            link.target = "_blank"; // Abre em uma nova aba
            cellArquivo.appendChild(link);
        } else {
            cellArquivo.textContent = "Nenhum"; // Indica ausência de arquivo
        }

        tbody.appendChild(row);
    });
}


// Carrega o histórico ao abrir a página
document.addEventListener("DOMContentLoaded", carregarHistorico);
console.log(localStorage.getItem("register"));


//Fim histórico

//Armazenamento local dos dados
let registerLocalStorage = getRegisterLocalStorage();
//Fim armazenamento