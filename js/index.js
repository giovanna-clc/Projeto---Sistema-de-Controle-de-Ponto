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
    const absenceFile = document.getElementById("absenceFile");
    const observationText = document.getElementById("observationText").value;
    
    if (!absenceDate) {
        alert("Por favor, selecione uma data de ausência.");
        return;
    }

    // Obtém a posição atual do usuário (se necessário)
    let userCurrentPosition = await getCurrentPosition();

    // Cria o objeto de justificativa
    let justificativa = {
        "data": absenceDate,
        "hora": getCurrentHour(),
        "localizacao": userCurrentPosition,
        "id": 1, // ID único ou pode ser incrementado
        "arquivoAnexado": absenceFile.files.length > 0 ? "Sim" : "Não",
        "observacao": observationText // Adiciona observação, se fornecida
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

//Armazenamento local dos dados
let registerLocalStorage = getRegisterLocalStorage();
//Fim armazenamento