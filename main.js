const productForm = document.forms['productsForm'];


let productslist = JSON.parse(localStorage.getItem('products')) || [];
let indexEdited = null;


productForm.onsubmit = (e) => {
    e.preventDefault();
    if (productForm.productName.value == '' || productForm.price.value == '' || productForm.quantity.value == '' || productForm.price.value <= 0 || productForm.quantity.value <= 0) {
        alert('Please fill in all fields correctly.');
        return;
    }

    const product = {
        productName: productForm.productName.value,
        price: productForm.price.value,
        quantity: productForm.quantity.value,
    }
    if (indexEdited != null) {
        productslist[indexEdited] = product;
        indexEdited = null;
    } else {
        productslist.push(product);
    }
    localStorage.setItem('products', JSON.stringify(productslist));
    productForm.reset();
    console.log(productslist);
    displayProducts();
}

const displayProducts = () => {
    const items = productslist.map((item, index) => {
        return `<tr>
        <td>${index + 1}</td>
        <td>${item.productName}</td>
        <td>${item.price}</td>
        <td>${item.quantity}</td>
        <td>${(item.price * item.quantity)}</td>
        <td><button onclick="deleteProducts(${index})" class="delete-btn">Delete</button></td>
        <td><button onclick="editProducts(${index})" class="edit-btn">Edit</button></td>
        </tr>`
    });
    document.querySelector('.productTableBody').innerHTML = items.join('');

}

const deleteProducts = (index) => {
    productslist.splice(index, 1);
    localStorage.setItem('products', JSON.stringify(productslist));
    displayProducts();
}

const editProducts = (index) => {
    const editeitem = productslist[index];
    productForm.productName.value = editeitem.productName;
    productForm.price.value = editeitem.price;
    productForm.quantity.value = editeitem.quantity;
    indexEdited = index;

}


displayProducts();