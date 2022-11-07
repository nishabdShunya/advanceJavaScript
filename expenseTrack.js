const form = document.querySelector('#expense-form');
const amountInput = document.querySelector('#expense-amount');
const descriptionInput = document.querySelector('#description');
const categoryInput = document.querySelector('#category');
const button = document.querySelector('#btn');
const list = document.querySelector('#expense-list');

form.addEventListener('submit', addItem);

function addItem(event) {
    event.preventDefault();
    if (amountInput.value && descriptionInput.value && categoryInput.value) {
        const item = {
            amt: amountInput.value,
            dsp: descriptionInput.value,
            ctg: categoryInput.value
        }
        // Adding to the local storage
        localStorage.setItem(item.dsp, JSON.stringify(item));
        // Adding to the screen
        displayItem(item);
        // Clearing the fields
        amountInput.value = '';
        descriptionInput.value = '';
        categoryInput.value = 'None';
    }
    else {
        alert('Please enter all the fields.');
    }
}
// Defining the displayItem function
function displayItem(itemToDisplay) {
    const li = `
    <li id="${itemToDisplay.dsp}">
        \u20B9 ${itemToDisplay.amt} : ${itemToDisplay.dsp} (${itemToDisplay.ctg})
        <div>
            <button id="delete" onClick="deleteItem('${itemToDisplay.dsp}')">DELETE</button>
            <button id="edit" onClick="editItem('${itemToDisplay.amt}', '${itemToDisplay.dsp}', '${itemToDisplay.ctg}')">EDIT</button>
        </div>
    </li>`;
    list.innerHTML = list.innerHTML + li;
}
// Defining the deleteItem function
function deleteItem(itemToDelete) {
    // Removing item from local storage
    localStorage.removeItem(itemToDelete);
    // Removing item from screen
    removeItem(itemToDelete);
}
// Defining the removeItem function
function removeItem(itemToRemove) {
    const removeLi = document.getElementById(itemToRemove);
    list.removeChild(removeLi);
}
// Defining the editItem function
function editItem(amount, description, category) {
    amountInput.value = amount;
    descriptionInput.value = description;
    categoryInput.value = category;
    deleteItem(description);
}
// To prevent the list from disappearing after refresh
window.addEventListener('DOMContentLoaded', () => {
    Object.keys(localStorage).forEach((key) => {
        displayItem(JSON.parse(localStorage[key]));
    })
})