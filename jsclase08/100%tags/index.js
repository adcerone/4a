let dataProduct = [];
let dataCart = [];
let dataUsers = [];


//restaura el carrito-----------------------------------------------------------------------------

const restoreFromStorage = () => {
    const cart = localStorage.getItem('cart');
    if (cart != null) {
        try {
            dataCart = JSON.parse(cart);
        } catch (error) {
            console.error("Error:", error);
    }
}};

restoreFromStorage();


//agrega productos-----------------------------------------------------------------------------------------
const addDataProduct = (itemNumber, title, description, price, image) => {
    let product = {
        itemNumber,
        title,
        description,
        price,
        image,
    };
    dataProduct.push(product);
}

addDataProduct("0", "Vela Orquídea de Medianoche", "La Vela Orquídea de Medianoche está elaborada a mano con cera de soja de primera calidad e infusionada con una cautivadora mezcla de pétalos de orquídea, jazmín y vainilla. Su fragancia embriagadora crea un ambiente relajante, perfecto para las tardes de descanso. La vela viene en un elegante envase de vidrio y tiene una duración de aproximadamente 40 horas", "$25", "../material extra/Midnight Orchid Candle.png");
addDataProduct("1", "Spray de Ambiente Serenata Dichosa", "Deleita tus sentidos con el Spray de Ambiente Serenata Dichosa. Infundido con notas de lavanda, manzanilla y almizcle suave, esta bruma aromática refresca al instante cualquier habitación, promoviendo la relajación y la serenidad. El spray viene en una elegante botella de vidrio morado y contiene 100 ml de producto.", "$18", "../material extra/Blissful Serenade Room Spray.png");
addDataProduct("2", "Difusor de Varillas Bosque Encantado", "Transforma tu espacio vital en un Bosque Encantado con este difusor de varillas. El cautivador aroma de cedro, pino fresco y bergamota llena el aire, creando una atmósfera tranquila y mística. El difusor incluye varillas de ratán naturales y una botella de vidrio decorativa que dura hasta tres meses.", "$35", "../material extra/Enchanted Forest Reed Diffuser.png");
addDataProduct("3", "Derretibles de Cera Citrus", "Llena tu hogar con la refrescante fragancia de los Derretibles de Cera Citrus. Elaborados a partir de una mezcla de aceites esenciales puros y cera de soja natural, estos derretibles liberan un estallido de cítricos, incluyendo limón, naranja y pomelo. Cada paquete contiene seis cubos, ofreciendo horas de fragancia.", "$12", "../material extra/Citrus Zest Wax Melts.png");
addDataProduct("4", "Candelabro Sueños Celestiales", "Añade un toque de belleza celestial a tu espacio con el Candelabro Sueños Celestiales. Elaborado con metal plateado de alta calidad, presenta intrincados recortes de estrellas y lunas que proyectan patrones fascinantes cuando se enciende una vela en su interior. Este versátil candelabro puede alojar tanto velas pequeñas como de té.", "$30", "../material extra/Celestial Dreams Candle Holder.png");

//crea cards--------------------------------------------------------------------------------------------------
dataProduct.forEach((element) => {
    const newDiv = document.createElement("div");
    newDiv.className = "card";
    newDiv.styleName = "width: 18rem;"
                                            
    const newImg = document.createElement("img");
    newImg.src = element.image;
    newImg.alt = element.title;
    newImg.className = "card-img img-fluid";

    const newDiv2 = document.createElement("div")
    newDiv2.className = "card-img-overlay";
    
    const newH3 = document.createElement("h3");
    newH3.textContent = element.title;
                                            
    const newP = document.createElement("p");
    newP.textContent = element.description;
                                            
    const newPr = document.createElement("p");
    newPr.className = "price";
    newPr.textContent = element.price;

    const newButtonB = document.createElement("button");
    newButtonB.className = "button position-absolute bottom-0 start-0"; 
        const newIBB = document.createElement("i");
        newIBB.className = "fas fa-shopping-cart"
        newIBB.textContent = "añadir al carrito"
        newButtonB.appendChild(newIBB);
        newButtonB.addEventListener("click", () => {
            addDataCart(element);
            localStorage.setItem('cart', JSON.stringify(dataCart));
        })
        
    const newButtonF = document.createElement("button");
    newButtonF.className = "button position-absolute bottom-0 end-0"; 
        const newIBF = document.createElement("i");
        newIBF.className = "fa-sharp fa-regular fa-star"
        newIBF.textContent = "añadir a favoritos"
        newButtonF.appendChild(newIBF);
        newButtonF.addEventListener("click", () => {
            favs.push(element);
            sessionStorage.setItem('favs', JSON.stringify(favs));
        })
                                            
    newDiv.appendChild(newImg);
    newDiv.appendChild(newDiv2)
    newDiv2.appendChild(newH3);
    newDiv2.appendChild(newP);
    newDiv2.appendChild(newPr);
    newDiv2.appendChild(newButtonB);
    newDiv2.appendChild(newButtonF);
                                            
    document.getElementById("products").appendChild(newDiv);
});

//añade elemento al carrito----------------------------------------------------------------------------------

const addDataCart = (element) => {
    dataCart.push(element);
}

//crea display del carrito-----------------------------------------------------------------------------------

const displayCart = () => {
    dataCart.forEach((element) => {
        const newDiv4 = document.createElement("div");
        newDiv4.className = "row justify-content-evenly";

        const newH3 = document.createElement("h3");
        newH3.className = "h3";
        newH3.textContent = element.title;

        const newP = document.createElement("p");
        newP.className = "p";
        newP.textContent = element.price;

        const newButton = document.createElement("button");
        newButton.className = "button";
        newButton.textContent = "quitar";
        newButton.addEventListener("click", () => {
            const index = dataCart.findIndex(cartItem => cartItem.itemNumber === element.itemNumber);
            if (index !== -1) {
                dataCart.splice(index, 1);
                newDiv4.remove();
                localStorage.setItem('cart', JSON.stringify(dataCart));
            }
        });

        newDiv4.appendChild(newH3);
        newDiv4.appendChild(newP);
        newDiv4.appendChild(newButton);

        const modalCart = document.getElementById("modalCart");
        modalCart.appendChild(newDiv4);
    });
};

//vacia el carrito-------------------------------------------------------------------------------------------

const eraseCart = () => {
    containerDiv = document.getElementById("modalCart");

    while (containerDiv.firstChild) {
    containerDiv.removeChild(containerDiv.firstChild);
    dataCart.length = 0; 
    localStorage.setItem('cart', JSON.stringify(dataCart));
    }
};


//------------------------------------------------------------------------------registro

//restaura usuarios registrados-----------------------------------------------------------------------------

const restoreFromStorage2 = () => {
    const users = localStorage.getItem('users');
    if (users != null) {
        try {
            dataUsers = JSON.parse(users);
        } catch (error) {
            console.error("Error:", error);
    }
}};

restoreFromStorage2();


//agrega usuarios----------------------------------------------------------------------------------------
const addDataUser = (firstName, lastName, userName, password, logged) => {
    let user = {
        firstName,
        lastName,
        userName,
        password,
        logged, 
    };
    dataUsers.push(user);
};

const registerUser = () => {
    const firstName = document.getElementById('firstNameInput').value;
    const lastName = document.getElementById('lastNameInput').value;
    const username = document.getElementById('usernameInput').value;
    const password = document.getElementById('passwordInput').value;
    const logged = false
    
    if (!firstName || !lastName || !username || !password) {
        alert("hay campos sin completar.");
        return;
    }
   
    const isUsernameTaken = dataUsers.some(user => user.username === username);
    if (isUsernameTaken) {
        alert("El nombre de usuario ya está en uso.");
        return;
    }

    const newUser = {
      firstName,
      lastName,
      username,
      password,
      logged,
    };
  
    dataUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(dataUsers));

    document.getElementById('firstNameInput').value = '';
    document.getElementById('lastNameInput').value = '';
    document.getElementById('usernameInput').value = '';
    document.getElementById('passwordInput').value = '';
    alert("Registro exitoso!");
    showLogin();
};

//--------------------------------------------------------------------------------login

const loginUser = () => {
    const username = document.getElementById('loginUsernameInput').value;
    const password = document.getElementById('loginPasswordInput').value;
    const stayLogged = document.getElementById('stayLogged').checked;

    const user = dataUsers.find(user => user.username === username && user.password === password);

    if (user) {
        user.logged = true;
        welcome(user);
        showWelcome();
        if (stayLogged) {
            localStorage.setItem('users', JSON.stringify(dataUsers));            
        }
    } else {

        alert("nombre de usuario o contraseña incorrecta.");
    }

    document.getElementById('loginUsernameInput').value = '';
    document.getElementById('loginPasswordInput').value = '';
};


//--------------------------------------------------------------------------------logout

const logoutUser = (user) => {
    user.logged = false;
    localStorage.setItem('users', JSON.stringify(dataUsers));
};

const user = dataUsers.find(user => user.logged == true); 
if (user) {
    logoutUser(user);
};

//mensaje de bienvenida-------------------------------------------------------------

const welcome = (user) => {
    const welcomeDiv = document.createElement("div");
    welcomeDiv.className = "container";

    const welcomeMessage = document.createElement("p");
    welcomeMessage.textContent = `bienvenido/a, ${user.firstName} ${user.lastName}!`;

    welcomeDiv.appendChild(welcomeMessage);
    
    document.getElementById("welcome").appendChild(welcomeDiv);
};

//alterna entre registro y login-----------------------------------------------------------------------

const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const welcomeMessage = document.getElementById('welcome');
const logBtn = document.getElementById('logBtn');
const regBtn = document.getElementById('regBtn');
const outBtn = document.getElementById('outBtn');

const showRegister = () => {
    registerForm.style.display = 'block';
    loginForm.style.display = 'none';
    welcomeMessage.style.display = 'none';
};

const showLogin = () => {
    registerForm.style.display = 'none';
    loginForm.style.display = 'block';
    welcomeMessage.style.display = 'none';
};

const showWelcome = () => {
    registerForm.style.display = 'none';
    loginForm.style.display = 'none';
    welcomeMessage.style.display = 'block';
    outBtn.style.display = 'block';
    logBtn.style.display = 'none';
    regBtn.style.display = 'none';
};

const isLogged = dataUsers.some(user => user.logged === true);
    if (isLogged) {
        showWelcome();
};

//alterna entre login y perfil----------------------------------------------------------------------------------



