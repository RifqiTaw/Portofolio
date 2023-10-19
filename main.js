// Mengambil value dari HTML dengan ID tertentu
let inputName = document.getElementById("inputName");
let inputPrice = document.getElementById("inputPrice");
let inputCategory = document.getElementById("inputCategory");
let inputCondition = document.getElementById("inputCondition");
let btnAdd = document.getElementById("btnAdd");
let tableBody = document.getElementById("tableBody");

// Inisialisasi Awal
let currentIndex = 0;
// 1. Penerapan Array
let items = [];

// cek apakah dilocalstorage null atau tidak.
// 2. Penerapan Looping if
if(JSON.parse(localStorage.getItem("Items")) !== null){
    // ubah jadi object JS, dan mengambil Key item dilocal
    items = JSON.parse(localStorage.getItem("Items"));
    displayItem();
}

// 3. Penerapan DOM events (addEventListener)
btnAdd.addEventListener("click",_=> {
    // kondisi jika klik add item
    if(btnAdd.innerHTML === "Add Item"){
        let item = {
            name: inputName.value,
            price: inputPrice.value,
            category: inputCategory.value,
            condition: inputCondition.value
        };
        // tambah isi array item
        items.push(item)
        // menyimpan string item dan mengubahnya ke string json
        localStorage.setItem("Items",JSON.stringify(items))
        displayItem()
    } else if(btnAdd.innerHTML === "Update Item"){
        updateItem()
    }
})
// 4. Penerapan Function
function displayItem(){
    let temp = "";
    let conditionRow = "";
    for(let i=0;i<items.length;i++){
        if(items[i].condition === "Excellent"){
            // template literal
            conditionRow = `<td class="">${items[i].condition}</td>`
        } else if(items[i].condition === "Good"){
            conditionRow = `<td class="">${items[i].condition}</td>`
        } else if(items[i].condition === "Bad"){
            conditionRow = `<td class="">${items[i].condition}</td>`
        }
        temp += `
        <tr>
            <td>${i + 1}</td>
            <td>${items[i].name}</td>
            <td>${items[i].price}</td>
            <td>${items[i].category}</td>
            ${conditionRow}
            <td>
                <i onclick="getItemInformation(${i})" title="Update" class="fa-solid me-2 text-warning fa-pen hover:cursor-pointer"></i>
                <i onclick="deleteItem(${i})" title="Delete" class="fa-solid text-danger fa-trash hover:cursor-pointer"></i>
            </td>
        </tr>`
    }
    tableBody.innerHTML = temp
}
function getItemInformation(index){
    currentIndex = index
    inputName.value = items[currentIndex].name
    inputPrice.value = items[currentIndex].price
    inputCategory.value = items[currentIndex].category
    inputCondition.value = items[currentIndex].condition
    btnAdd.classList.replace("btn-success","btn-warning")
    btnAdd.innerHTML = "Update Item"
}
function updateItem(){
    let item = {
        name: inputName.value,
        price: inputPrice.value,
        category: inputCategory.value,
        condition: inputCondition.value
    };
    items[currentIndex] = item
    displayItem()
    // create/menyimpan string item dan mengubah menjadi string JSON.
    localStorage.setItem("Items",JSON.stringify(items))
    btnAdd.classList.replace("btn-warning","btn-success")
    btnAdd.innerHTML = "Add Item"
}
function deleteItem(index){
    // menyisipkan array
    items.splice(index,1)
    displayItem()
    localStorage.setItem("Items",JSON.stringify(items))
}