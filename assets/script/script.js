var employeesAPI = 'http://rest.vedinas.ro/employees';

function deleteFromAPI(id) {
    console.log(id);
    fetch(
        employeesAPI + '/' + id, {
            method: 'DELETE'
        }).then(function(response) {
        return response.json();
    }).then(function(jsonResp) {
        console.log(jsonResp);
    });
}

function removeEmployee(event) {
    var remButton = event.target;
    var employeeElement = remButton.parentElement
    console.log(employeeElement);
    var employeeID = employeeElement.dataset.id
    employeeElement.remove();
    deleteFromAPI(employeeID);
}

function createEmployeeElement(employee) {
    var employeeElement = document.createElement("li");
    employeeElement.classList.add("employee");
    employeeElement.setAttribute('data-id', employee.id);
    var nameElement = document.createElement("div");
    nameElement.classList.add("name");
    nameElement.innerHTML = employee.name;
    employeeElement.appendChild(nameElement);
    var pElement = document.createElement("p");
    pElement.innerHTML = `<span>Age: ${employee.age}</span> <span>Salary: ${employee.salary}</span>`;
    employeeElement.appendChild(pElement);
    var buttonElement = document.createElement("button");
    buttonElement.classList.add("remove");
    buttonElement.innerHTML = "X";
    employeeElement.appendChild(buttonElement);
    buttonElement.addEventListener("click", removeEmployee);

    return employeeElement;
}

function listEmployees(employees) {
    // console.log(employees);
    for (var i = 0; i < employees.length; i++) {
        var employeeElement = createEmployeeElement(employees[i]);
        var agendaElement = document.querySelector(".agenda");
        agendaElement.appendChild(employeeElement);
    }
}

function deserializeResponse(response) {
    // console.dir(response);

    return response.json()
}

function getData() {
    fetch(employeesAPI)
        .then(deserializeResponse)
        .then(listEmployees)
};

function postData(employee) {
    fetch(employeesAPI, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(employee)
    }).then(function(response) {
        return response.json();
    }).then(function(jsonResp) {
        // console.log(jsonResp);
        return jsonResp;
    }).then(function(newEmployee) {
        console.log(newEmployee);
        var newEmployeeElement = createEmployeeElement(newEmployee);
        console.log(newEmployeeElement);
        var agendaElement = document.querySelector(".agenda");
        agendaElement.appendChild(newEmployeeElement);
    })
}

function addNewEmployee(event) {
    event.preventDefault();
    var newNameElement = document.getElementById("name").value;
    var newAgeElement = document.getElementById("age").value;
    var newSalaryElement = document.getElementById("salary").value;
    var newEmployee = {
        name: newNameElement,
        age: newAgeElement,
        salary: newSalaryElement
    }

    postData(newEmployee);
}



function onDOMLoad() {
    getData();
    var addEmployeeButton = document.querySelector(".add-employee");
    addEmployeeButton.addEventListener("click", addNewEmployee);

};





document.addEventListener("DOMContentLoaded", onDOMLoad);