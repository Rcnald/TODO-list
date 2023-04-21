const addItemContainer = document.getElementsByClassName('js-add')[0]
const addItem = document.getElementsByClassName('js-add-item')[0]
const ItemList = document.getElementsByClassName('js-list')[0]
const ItemContainer = document.getElementsByClassName('js-event-listener')[0]
const items = document.getElementsByClassName('js-item')
const itemInput = document.getElementsByClassName('js-item-input')[0]
const pendencies = document.getElementsByClassName('js-pendencies')[0]
const clearTasks = document.getElementsByClassName('js-clear-tasks')[0]

function Task(name, completed) {
    this.name = name,
    this.completed = completed || false
    this.done = function() {
        this.completed = !this.completed
    }
}

let tasks = []

function generateErrorMessage(errorType, errorMessages){
    const errorStyle = {
        red : {
            background : "o-error--red",
            icon : "bxs-error-circle",
            iconColor : "o-error__icon--red",
        },
        yellow : {
            background : "o-error--yellow",
            icon : "bxs-error",
            iconColor : "o-error__icon--yellow",
        },
        green : {
            background : "o-error--green",
            icon : "bxs-check-circle",
            iconColor : "o-error__icon--green",
        },
    }

    const exists = document.querySelector(`.${errorStyle[errorType].background}`)

    if(exists && exists.textContent === errorMessages) return 

    const error = document.createElement('div')
    error.className = `o-error ${errorStyle[errorType].background} l-error l-error__wrapper has-shown`

    const errorWrapper = document.createElement('div')
    errorWrapper.className = "o-error__wrapper l-error__wrapper"

    const errorIcon = document.createElement('i')
    errorIcon.className = `o-error__icon ${errorStyle[errorType].iconColor} bx ${errorStyle[errorType].icon}`

    const errorMessage = document.createElement('p')
    errorMessage.className = "o-error__message"
    errorMessage.textContent = errorMessages

    const errorLoading = document.createElement('div')
    errorLoading.className = "o-error__loading l-error__loading"


    errorWrapper.appendChild(errorIcon)
    errorWrapper.appendChild(errorMessage)

    error.appendChild(errorWrapper)
    error.appendChild(errorLoading)

    return error
}

function callError(color, msg){
    const body = document.getElementsByClassName('js-body')[0]
    const error = generateErrorMessage(color, msg) 
    
    if(!error) return

    function removeErrorMessage(){
        error.remove()
    }

    body.appendChild(error)
    setTimeout(removeErrorMessage, 2000)
}

function generateTask(task) {
    const item = document.createElement('li')
    item.className = "c-card__item js-item"

    const checkBox = document.createElement('input')
    checkBox.className = `c-card__check js-check-item bx ${task.completed ? "bxs-checkbox-checked" : "bx-checkbox"}`
    checkBox.setAttribute("type", "checkbox")
    checkBox.setAttribute("data-action", "check")
    checkBox.checked = task.completed

    const name = document.createElement('span')
    name.className = "c-card__name"
    name.textContent = task.name

    const editButton = document.createElement('button')
    editButton.className = "c-card__button c-card__button--edit js-edit-item"
    editButton.setAttribute("title", "Editar")
    editButton.setAttribute("data-action", "edit")
    editButton.setAttribute("value", "aa")

    const editButtonIcon = document.createElement('i')
    editButtonIcon.className = "bx bxs-edit"

    const editButtonSr = document.createElement('span')
    editButtonSr.className = "sr-only"
    editButtonSr.textContent = "Editar"
    editButtonSr.setAttribute("data-action", "edit")

    const deleteButton = document.createElement('button')
    deleteButton.className = "c-card__button c-card__button--delete js-delete-item"
    deleteButton.setAttribute("title", "Excluir")
    deleteButton.setAttribute("data-action", "delete")

    const deleteButtonIcon = document.createElement('i')
    deleteButtonIcon.className = "bx bxs-trash"

    const deleteButtonSr = document.createElement('span')
    deleteButtonSr.className = "sr-only"
    deleteButtonSr.textContent = "Excluir"
    deleteButtonSr.setAttribute("data-action", "delete")

    const editContainer = document.createElement('dialog')
    editContainer.className = "c-card__modal l-card__modal js-edit"

    const editWrapperInput = document.createElement('div')
    editWrapperInput.className = "c-card__wrapper c-card__wrapper--modal"

    const editWrapperButton = document.createElement('div')
    editWrapperButton.className = "l-wrapper c-card__wrapper"

    const editLabel = document.createElement('label')
    editLabel.className = "c-card__name"
    editLabel.textContent = "Novo nome"

    const editInput = document.createElement('input')
    editInput.className = "c-card__input c-card__input--modal js-edit-input"
    editInput.setAttribute("type", "text")
    editInput.setAttribute("placeholder", "Nome da tarefa")

    editInput.addEventListener('keypress', e => {
        if(e.key === 'Enter'){
            editSave.click()
        }
    })

    const editCancel = document.createElement('button')
    editCancel.className = "o-button o-button--cancel l-button js-edit-cancel"
    editCancel.setAttribute("data-action", "cancel")
    editCancel.textContent = "Cancelar"

    const editSave = document.createElement('button')
    editSave.className = "o-button l-button js-add-item"
    editSave.setAttribute("data-action", "save")
    editSave.textContent = "Salvar e Aplicar"
    
    item.appendChild(checkBox)
    item.appendChild(name)

    editButton.appendChild(editButtonIcon)
    editButton.appendChild(editButtonSr)

    item.appendChild(editButton)

    deleteButton.appendChild(deleteButtonIcon)
    deleteButton.appendChild(deleteButtonSr)

    item.appendChild(deleteButton)

    editWrapperInput.appendChild(editLabel)
    editWrapperInput.appendChild(editInput)
    
    editWrapperButton.appendChild(editCancel)
    editWrapperButton.appendChild(editSave)

    editContainer.appendChild(editWrapperInput)
    editContainer.appendChild(editWrapperButton)

    item.appendChild(editContainer)

    return item
}

function renderTasks(){
    ItemList.innerHTML = ""
    
    tasks.forEach(task => {
        ItemList.appendChild(generateTask(task))
    })

    const tasksNumbersCompleted = tasks.filter( (e, i) => {
        return tasks[i].completed === false
    })

    const tasksNumbers = tasksNumbersCompleted.length

    if(!tasksNumbers){
        pendencies.textContent = "Você não tem tarefas pendentes"
    }else{
        pendencies.textContent = `Você tem ${tasksNumbers} tarefas pendentes`
    }

    itemInput.focus()
}

function addTask(taskName){
    tasks.unshift(new Task(taskName))
    renderTasks()
}

function buttonAnimation (){
    const addItemName = document.getElementsByClassName('js-button-name')[0]
    const addItemIcon = document.getElementsByClassName('js-button-icon')[0]

    const toggleClass = function(){
        for(let i = 1; i <= arguments.length; i++){
            arguments[0].classList.toggle(arguments[i]);
        }
    }

    animationButton = () => {
        toggleClass(addItemIcon, 'bx-list-check','icon-animation','bx-list-plus')
        toggleClass(addItemName, 'has-disappear')
    }

    animationNameStart = () => {
        addItemName.textContent = "Adicionado"
    }
    animationNameEnd = () => {
        addItemName.textContent = "Adicionar"
        addItem.blur()
    }
    
    setTimeout(animationButton, 0)
    setTimeout(animationNameStart, 0)
    setTimeout(animationNameEnd, 2000)
    setTimeout(animationButton, 3300)
}

addItemContainer.addEventListener('submit', function(e){
    if(itemInput.value){
        addTask(itemInput.value)
        buttonAnimation()
        renderTasks()
        itemInput.value = ""
        itemInput.focus()
        callError('green', 'Tarefa adicionada com sucesso!')
    }else{
        addItem.blur()
        callError('red', 'Você não pode adicionar uma tarefa vazia!')
    }

    e.preventDefault()
})

ItemContainer.addEventListener('click', e => {
    const action = e.target.getAttribute("data-action")

    if(!action) return

    let currentItem = e.target

    while(currentItem.nodeName !== "LI"){
        currentItem = currentItem.parentElement
    }

    let currentItemIndex = [...items].indexOf(currentItem)
    
    const actions = {
        edit : function () {
            currentEditModal = currentItem.getElementsByClassName('js-edit')[0]
            currentEditInput = currentItem.getElementsByClassName('js-edit-input')[0]
            currentEditInput.value = tasks[currentItemIndex].name
            currentEditModal.showModal()
        },
        cancel : function () {
            const currentEditModal = currentItem.getElementsByClassName('js-edit')[0]

            currentEditModal.close()
        },
        save : function () {
            if(!currentEditInput.value){
                callError('red', 'Você não pode salvar uma tarefa vazia!')
                renderTasks()

                return
            }
            if(tasks[currentItemIndex].name === currentEditInput.value) {
                callError('yellow', 'Não houveram alterações na tarefa!')
                renderTasks()

                return
            }

            tasks[currentItemIndex].name = currentEditInput.value
            callError('green', 'Tarefa editada com sucesso!')
            renderTasks()
        },
        delete : function () {
            tasks.splice(currentItemIndex, 1)
            callError('green', 'Tarefa excluida com sucesso!')
            renderTasks()
        },
        check : function () {
            tasks[currentItemIndex].done()
            renderTasks()
        },
    }

    if(actions[action]){
        actions[action]()
    }
})

clearTasks.addEventListener('click', () => {
    if(!items.length){
        callError('yellow', 'Não existem tarefas para serem limpas!')
        return
    }
    tasks = []
    callError('green', 'Tarefas limpas com sucesso!')
    renderTasks()
})

renderTasks()