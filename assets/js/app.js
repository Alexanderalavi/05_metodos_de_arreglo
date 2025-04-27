const dataTareas = [
    {id: 16, nombre: "Hacer Mercado", realizada: true},
    {id: 60, nombre: "Estudiar para la prueba", realizada: false},
    {id: 24, nombre: "Sacar a pasear a toby", realizada: false}

]

const listaTareas = document.querySelector("#tareas")
const inputTarea = document.querySelector("#inputTarea")
const btnAgregar = document.querySelector("#agregarTarea")
const tareasTotal = document.querySelector("#total")
const tareasRealizadas = document.querySelector("#realizadas")


renderTareas()
actualizarTareas()


btnAgregar.addEventListener("click", agregarTarea);

function renderTareas() {
    let html = "";
    dataTareas.forEach((tarea) => {
        html += `
            <li class="listaTarea">
                    <p>${tarea.id}</p>
                    <p class="${tarea.realizada ? "realizada" : ""}">${tarea.nombre}</p>
                    <input class="tarea-revisar" type="checkbox" data-id="${tarea.id}" ${tarea.realizada ? "checked" : ""}>
                    <button data-id="${tarea.id}" class="eliminar-tarea">
                        Eliminar
                    </button>
            </li>`

    })
    listaTareas.innerHTML = html;

    const botonesEliminar = document.querySelectorAll(".eliminar-tarea")
    botonesEliminar.forEach(boton =>
        boton.addEventListener("click", ele => {
            const id = Number(ele.currentTarget.dataset.id)
            borrarTarea(id)
        }))
    const comprobacion = document.querySelectorAll(".tarea-revisar")
    comprobacion.forEach(checkbox => {
        checkbox.addEventListener("change", (e) => {
            const id = parseInt(e.target.dataset.id)
            const tarea = dataTareas.find(t => t.id === id)
            if (tarea) {
                tarea.realizada = e.target.checked;
                renderTareas()
                actualizarTareas()
            }
        })
    })
    actualizarTareas()
}


function agregarTarea() {
    const nuevaTarea = inputTarea.value
    if (nuevaTarea.trim() !== "") {
        const id = parseInt(Date.now().toString().slice(-4))
        dataTareas.push({ id: id, nombre: nuevaTarea, realizada: false })
    }
    inputTarea.value = ""
    renderTareas()
    actualizarTareas()
}

function borrarTarea(id) {
    const indice = dataTareas.findIndex((ele) => ele.id === id)
    if (indice !== -1) {
        dataTareas.splice(indice, 1)
        renderTareas()
        actualizarTareas()
    }
}

function actualizarTareas(){
    tareasTotal.textContent = dataTareas.length
    const realizadas = dataTareas.filter(tarea => tarea.realizada).length
    tareasRealizadas.textContent = realizadas
}