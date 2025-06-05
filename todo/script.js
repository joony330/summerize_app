const input = document.getElementById('todo-input');
const addButton = document.getElementById('add-btn');
const list = document.getElementById('todo-list');

addButton.addEventListener('click', addItem);
input.addEventListener('keyup', function(event){
    if(event.key === 'Enter'){ addItem(); }
});

function addItem(){
    const text = input.value.trim();
    if(!text) return;
    const li = document.createElement('li');
    li.classList.add('todo-item');
    li.innerHTML = `<label><input type="checkbox"> ${text}</label> <button class="delete-btn">X</button>`;
    list.appendChild(li);
    input.value = '';
}

list.addEventListener('click', function(event){
    if(event.target.tagName === 'INPUT') {
        const label = event.target.parentElement;
        label.classList.toggle('completed', event.target.checked);
    }
    if(event.target.classList.contains('delete-btn')){
        event.target.parentElement.remove();
    }
});
