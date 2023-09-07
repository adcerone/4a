let dataPerson = [];

const addDataPerson = (firstName, lastName, age, status , dni) => {
    let persona = {
        dni,
        firstName,
        lastName,
        age,
        status
    }
    dataPerson.push(persona);
}

const clickAddPerson = () =>{
    let dni = document.getElementById("dni").value;
    let firstName = document.querySelector("#firstName").value;
    let lastName = document.getElementById("lastName").value;
    let age = document.getElementById("age").value;
    let status = document.getElementById("status").value;
    
    if (dni.trim() === '' || firstName.trim() === '' || lastName.trim() === '' || age.trim() === '') {
        Swal.fire({
            icon: 'error',
            title: 'Campos Vacíos',
            text: 'Por favor, complete los campos obligatorios.',
        });
        return; 
    }

    if (isDniDuplicate(dni)) {
        Swal.fire({
            icon: 'error',
            title: 'DNI Duplicado',
            text: 'El DNI ya existe en la lista.',
        });
        return; 
    }
    
    addDataPerson(firstName,lastName,age,status,dni);
    document.getElementById("person").reset();
    document.getElementById("dni").focus();
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Registro exitoso..!',
        showConfirmButton: false,
        timer: 1000
    })
    listDataPerson(dataPerson);
    console.table(dataPerson);
    console.log(dni);
}

const listDataPerson = (arrayDataPersona) =>{
    let list = '';
    if(arrayDataPersona.length > 0 ){
        arrayDataPersona.forEach( (person,index) => {
            let status = returnStatuString(parseInt(person.status));
            list += `<tr>
                    <td>${person.dni}</td>
                    <td>${person.firstName} ${person.lastName}</td>
                    <td>${person.age}</td>
                    <td>${status}</td>
                    <td><button class="btn btn-primary" onclick="deletePersonOne(${index})">Eliminar</button></td>
                    </tr>`;
        });
    }
    else{
        list =`<tr>
                <td class="text-center" colspan="5"> NO EXISTE RESULTADO </td>
            </tr>`;
    }
    document.getElementById("listPerson").innerHTML = list;
}

const returnStatuString = (status) =>{
    switch(status){
        case 1: return "Activo"; break;
        case 2: return "Inactivo"; break;
        case 3: return "En Espera"; 
    }
}

const filterInput = () =>{
    let search = document.getElementById("search").value;
    search = search.trimStart().toLowerCase();
    document.getElementById("search").value = search;
    console.log(search);
    let filterArray = dataFilterPersona(search);
    listDataPerson(filterArray);
}

const dataFilterPersona = (search) =>{
    return dataPerson.filter((person)=>{
        return person.firstName.toLowerCase().includes(search) ||
               person.lastName.toLowerCase().includes(search);
    })
}

const deletePersonOne = (position) => {
    Swal.fire({
        title: 'ESTA SEGURO?',
        text: "Deseas eliminar este registro!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Eliminarlo.'
    }).then((result) => {
        if (result.isConfirmed) {
            let originalIndex = getOriginalIndex(position);
            if (originalIndex !== -1) {
                dataPerson.splice(originalIndex, 1);
                listDataPerson(dataPerson);
                Swal.fire(
                    'Eliminado!',
                    'El registro fue eliminado.',
                    'success'
                );
            } else {
                Swal.fire(
                    'Error!',
                    'No se encontró el índice original.',
                    'error'
                );
            }
        }
    });
}

const getOriginalIndex = (filteredIndex) => {
    let search = document.getElementById("search").value.trimStart().toLowerCase();
    let filterArray = dataFilterPersona(search);

    if (filteredIndex >= 0 && filteredIndex < filterArray.length) {
        let originalPerson = filterArray[filteredIndex];
        let originalIndex = dataPerson.findIndex(person =>
            person.firstName.toLowerCase() === originalPerson.firstName.toLowerCase() &&
            person.lastName.toLowerCase() === originalPerson.lastName.toLowerCase() &&
            person.dni === originalPerson.dni
        );

        return originalIndex;
    }
    return -1;
}

const isDniDuplicate = (dni) => {
    return dataPerson.some(person => person.dni === dni);
};
