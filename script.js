const form = document.getElementById('todo-form');
const input = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const doneList = document.getElementById('done-list');
const errorMsg = document.getElementById('error-msg');
const counter = document.getElementById('task-counter'); // laskurin elementti

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const taskText = input.value.trim();

  if (taskText.length < 3) {
    input.classList.add('error');
    errorMsg.classList.remove('hidden');
    return;
  }

  input.classList.remove('error');
  errorMsg.classList.add('hidden');

  const li = createTaskItem(taskText);
  taskList.appendChild(li);
  input.value = '';
  updateCounter(); // päivitä laskuri kun tehtävä lisätään
});

function createTaskItem(text) {
  const li = document.createElement('li');

  const span = document.createElement('span');
  span.textContent = text;

  const buttonContainer = document.createElement('div');

  const doneBtn = document.createElement('button');
  doneBtn.textContent = '✔';
  doneBtn.addEventListener('click', () => moveToDone(li));

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '✖';
  deleteBtn.addEventListener('click', () => {
    li.remove();
    updateCounter(); // päivitä laskuri kun tehtävä poistetaan
  });

  buttonContainer.appendChild(doneBtn);
  buttonContainer.appendChild(deleteBtn);

  li.appendChild(span);
  li.appendChild(buttonContainer);

  return li;
}

function moveToDone(taskItem) {
  taskItem.querySelector('button:nth-child(1)').remove(); // poista ✔ nappi
  doneList.appendChild(taskItem);
  updateCounter(); // päivitä laskuri kun tehtävä siirtyy valmiisiin
}

function updateCounter() {
  const count = taskList.children.length;
  counter.textContent = `Tehtäviä yhteensä: ${count}`;
}
