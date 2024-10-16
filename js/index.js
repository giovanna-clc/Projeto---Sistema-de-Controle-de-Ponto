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

// TO-DO:
// alterar o nome da função
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

//Alerta registro
// TO-DO:
// Problema: os 5 segundos continuam contando
const btnCloseAlertRegister = document.getElementById("alerta-registro-ponto-fechar");
btnCloseAlertRegister.addEventListener("click", () => {
    divAlertaRegistroPonto.classList.remove("show");
    divAlertaRegistroPonto.classList.add("hidden");
});
//Fim alerta registro

//Formulario de registro de ponto
const btnBaterPonto = document.getElementById("btn-bater-ponto");
btnBaterPonto.addEventListener("click", register);
const dialogData = document.getElementById("dialog-data");
const dialogHora = document.getElementById("dialog-hora");
const dialogPonto = document.getElementById("dialog-ponto");
    //Fechamento forms manual
    const btnDialogFechar = document.getElementById("btn-dialog-fechar");
    btnDialogFechar.addEventListener("click", () => {
        dialogPonto.close();
    });
    //Fim fechamento manual
//Fim registro

//Armazenamento local dos dados
let registerLocalStorage = getRegisterLocalStorage();
//Fim armazenamento