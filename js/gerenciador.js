const Formulario = document.querySelector('#formulario')
const btnAdd = document.querySelector('#btn-adicionar')
const listaTarefas = document.querySelector('#listaTarefas')

const inputTarefa = document.querySelector('#tarefa')
const inputResponsavel = document.querySelector('#responsavel')
const inputDescri = document.querySelector('#descricao')
const inputPrioridade = document.querySelector('#prioridade')
const inputData = document.querySelector('#data')


const tarefas = []
let idEdicao = -1;

Formulario.addEventListener('submit', (evt) => {
    evt.preventDefault()

    if (idEdicao === -1) {

        const ObjTarefa = {
            id: Date.now(),
            tarefa: inputTarefa.value,
            responsavel: inputResponsavel.value,
            descricao: inputDescri.value,
            prioridade: inputPrioridade.value,
            data: inputData.value,
            status: "Aberto",
        };
        tarefas.push(ObjTarefa)

    } else {

        const tarefa = tarefas.find((item) => item.id === idEdicao);

        tarefa.tarefa = inputTarefa.value;
        tarefa.responsavel = inputResponsavel.value;
        tarefa.descricao = inputDescri.value;
        tarefa.prioridade = inputPrioridade.value;
        tarefa.data = inputData.value;

        idEdicao = -1;
    }

    
    montaCards()
    Formulario.reset()

})

function montaCards() {

    listaTarefas.innerHTML = "";

    tarefas.forEach((tarefa) => {

        const card = document.createElement("div");

        card.classList.add("card");

        if (tarefa.prioridade === "alta") {

            card.style.borderLeft = "8px solid red";

        } else if (tarefa.prioridade === "media") {

            card.style.borderLeft = "8px solid orange";

        } else {

            card.style.borderLeft = "8px solid green";

        }

        const h2 = document.createElement("h2");
        h2.textContent = tarefa.tarefa;

        const pResponsavel = document.createElement("p");
        pResponsavel.textContent = "Responsável: " + tarefa.responsavel;

        const pDescricao = document.createElement("p");
        pDescricao.textContent = tarefa.descricao;

        const pPrioridade = document.createElement("p");
        pPrioridade.textContent = "Prioridade: " + tarefa.prioridade;

        const pStatus = document.createElement("p");
        pStatus.textContent = "Status: " + tarefa.status;

        const btnEdit = document.createElement("button");
        btnEdit.textContent = "Editar";

        const btnExcluir = document.createElement("button");
        btnExcluir.textContent = "Excluir";

        const btnFinalizar = document.createElement("button");
        btnFinalizar.textContent = "Finalizar";

        btnEdit.addEventListener("click", () => {

            inputTarefa.value = tarefa.tarefa;
            inputResponsavel.value = tarefa.responsavel;
            inputDescri.value = tarefa.descricao;
            inputPrioridade.value = tarefa.prioridade;
            inputData.value = tarefa.data;

            idEdicao = tarefa.id;

        });

        btnFinalizar.addEventListener("click", () => {

            tarefa.status = "Concluída";

            montaCards();

        });

        btnExcluir.addEventListener("click", () => {

            const posicao = tarefas.findIndex((item) => item.id === tarefa.id);

            tarefas.splice(posicao, 1);

            montaCards();

        });

        card.appendChild(h2);
        card.appendChild(pResponsavel);
        card.appendChild(pDescricao);
        card.appendChild(pPrioridade);
        card.appendChild(pStatus);
        card.appendChild(btnEdit);
        card.appendChild(btnExcluir);
        card.appendChild(btnFinalizar);

        listaTarefas.appendChild(card);

    });

}