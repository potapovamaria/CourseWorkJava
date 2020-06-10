function checkRules() {
    var role = localStorage.getItem('role')

    if (role === "ROLE_ADMIN") {
        document.getElementById('classDeleteCar').hidden = false;
        document.getElementById('classDeleteMaster').hidden = false;
        document.getElementById('classDeleteService').hidden = false;
        document.getElementById('classDeleteWork').hidden = false;
        document.getElementById('classAddForm').hidden = false;
        document.getElementById('addingWorkButton').hidden = false;
        document.getElementById('classEditing').hidden = false;
    }
    document.getElementById('classShowCars').hidden = false;
    document.getElementById('classShowMasters').hidden = false;
    document.getElementById('classShowWorks').hidden = false;
    document.getElementById('classShowServices').hidden = false;
    document.getElementById('classFindCar').hidden = false;
    document.getElementById('classFindMaster').hidden = false;
    document.getElementById('classFindService').hidden = false;
    document.getElementById('classFindWork').hidden = false;
}

function createTableWork(tab, table) {
    var nameRow = document.createElement('tr');

    var id = document.createElement('td');
    id.textContent = "id";
    nameRow.appendChild(id);
    var date_work = document.createElement('td');
    date_work.textContent = "date_work";
    nameRow.appendChild(date_work);
    var car_id = document.createElement('td');
    car_id.textContent = "car_id";
    nameRow.appendChild(car_id);
    var master_id = document.createElement('td');
    master_id.textContent = "master_id";
    nameRow.appendChild(master_id);
    var service_id = document.createElement('td');
    service_id.textContent = "service_id"
    nameRow.appendChild(service_id);

    tab.appendChild(nameRow);

    for(var i = 0; i < table.id.length;i++) {
        var tr = document.createElement('tr')

        var td1 = document.createElement('td');
        td1.textContent = table.id[i];
        tr.appendChild(td1);

        var td2 = document.createElement('td');
        td2.textContent = table.dateWork[i];
        tr.appendChild(td2);

        var td3 = document.createElement('td');
        td3.textContent = table.car_id[i];
        tr.appendChild(td3);

        var td4 = document.createElement('td');
        td4.textContent = table.master_id[i];
        tr.appendChild(td4);

        var td5 = document.createElement('td');
        td5.textContent = table.service_id[i];
        tr.appendChild(td5);

        tab.appendChild(tr);
    }
}

function createTableService(tab, table) {
    var nameRow = document.createElement('tr');

    var id = document.createElement('td');
    id.textContent = "id";
    nameRow.appendChild(id);
    var costForeign = document.createElement('td');
    costForeign.textContent = "cost_foreign";
    nameRow.appendChild(costForeign);
    var costOur = document.createElement('td');
    costOur.textContent = "cost_our";
    nameRow.appendChild(costOur);
    var name = document.createElement('td');
    name.textContent = "name";
    nameRow.appendChild(name);
    tab.appendChild(nameRow);
    for(var i = 0; i < table.id.length;i++) {
        var tr = document.createElement('tr')

        var td1 = document.createElement('td');
        td1.textContent = table.id[i];
        tr.appendChild(td1);

        var td2 = document.createElement('td');
        td2.textContent = table.costForeign[i];
        tr.appendChild(td2);

        var td3 = document.createElement('td');
        td3.textContent = table.costOur[i];
        tr.appendChild(td3);

        var td4 = document.createElement('td');
        td4.textContent = table.name[i];
        tr.appendChild(td4);

        tab.appendChild(tr);
    }
}

function createTableMaster(tab, table) {
    var nameRow = document.createElement('tr');

    var id = document.createElement('td');
    id.textContent = "id";
    nameRow.appendChild(id);
    var name = document.createElement('td');
    name.textContent = "name";
    nameRow.appendChild(name);
    tab.appendChild(nameRow);
    for(var i = 0; i < table.id.length;i++) {
        var tr = document.createElement('tr')

        var td1 = document.createElement('td');
        td1.textContent = table.id[i];
        tr.appendChild(td1);

        var td2 = document.createElement('td');
        td2.textContent = table.name[i];
        tr.appendChild(td2);

        tab.appendChild(tr);
    }
}

function createTableCar(tab, table) {
    var nameRow = document.createElement('tr');

    var id = document.createElement('td');
    id.textContent = "id";
    nameRow.appendChild(id);
    var color = document.createElement('td');
    color.textContent = "color";
    nameRow.appendChild(color);
    var is_foreign = document.createElement('td');
    is_foreign.textContent = "is_foreign";
    nameRow.appendChild(is_foreign);
    var mark = document.createElement('td');
    mark.textContent = "mark";
    nameRow.appendChild(mark);
    var num = document.createElement('td');
    num.textContent = "num"
    nameRow.appendChild(num);
    tab.appendChild(nameRow);

    for(var i = 0; i < table.id.length;i++) {
        var tr = document.createElement('tr')

        var td1 = document.createElement('td');
        td1.textContent = table.id[i];
        tr.appendChild(td1);

        var td2 = document.createElement('td');
        td2.textContent = table.color[i];
        tr.appendChild(td2);

        var td3 = document.createElement('td');
        td3.textContent = table.isForeign[i];
        tr.appendChild(td3);

        var td4 = document.createElement('td');
        td4.textContent = table.mark[i];
        tr.appendChild(td4);

        var td5 = document.createElement('td');
        td5.textContent = table.num[i];
        tr.appendChild(td5);

        tab.appendChild(tr);
    }
}

function deleteWorkById(elem) {
    var id_ = document.getElementById("deleteWork").value;
    var xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.open('POST', 'http://localhost:8080/app/delete/works/' + id_, true);
    xmlHttpRequest.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
    xmlHttpRequest.send()
    var countMessage = 0;
    xmlHttpRequest.addEventListener("readystatechange", () => {
        if (xmlHttpRequest.readyState === 4 && xmlHttpRequest.status === 200) {
            var data = JSON.parse(xmlHttpRequest.responseText);
            var table = {
                "id": [],
                "dateWork": [],
                "car_id": [],
                "master_id": [],
                "service_id": []
            };
            var personData;
            for (var i = 0; i < data.length; i++) {
                personData = data[i];
                table.id.push(personData.id);
                table.dateWork.push(personData.dateWork);
                table.car_id.push(personData.cars.id)
                table.master_id.push(personData.masters.id)
                table.service_id.push(personData.services.id)
            }

            if (elem != null){
                elem.innerHTML = "";
            }

            var tab =document.createElement('table');

            createTableWork(tab, table);

            elem.appendChild(tab);
        } else if (xmlHttpRequest.status === 500 && countMessage < 1) {
            countMessage++;
            alert("There is no work with id " + id_)
        }
    });
}
function createTableShowWorks(elem) {
    var xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.open('GET', 'http://localhost:8080/app/works', true);
    xmlHttpRequest.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
    xmlHttpRequest.send()
    xmlHttpRequest.addEventListener("readystatechange", () => {
        if (xmlHttpRequest.readyState === 4 && xmlHttpRequest.status === 200) {

            var data = JSON.parse(xmlHttpRequest.responseText);
            var table = {
                "id": [],
                "dateWork": [],
                "car_id": [],
                "master_id": [],
                "service_id": []
            };
            var personData;
            for (var i = 0; i < data.length; i++) {
                personData = data[i];
                table.id.push(personData.id);
                table.dateWork.push(personData.dateWork);
                table.car_id.push(personData.cars.id)
                table.master_id.push(personData.masters.id)
                table.service_id.push(personData.services.id)
            }

            if (elem != null){
                elem.innerHTML = "";
            }

            var tab =document.createElement('table');

            createTableWork(tab, table);

            elem.appendChild(tab);
        }
    });
}

function deleteCarById(elem) {
    var id_ = document.getElementById("deleteCar").value;
    var xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.open('POST', 'http://localhost:8080/app/delete/cars/' + id_, true);
    xmlHttpRequest.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
    xmlHttpRequest.send()
    var countMessage = 0;
    xmlHttpRequest.addEventListener("readystatechange", () => {
        if (xmlHttpRequest.readyState === 4 && xmlHttpRequest.status === 200) {

            var data = JSON.parse(xmlHttpRequest.responseText);
            var table = {
                "id": [],
                "color": [],
                "isForeign": [],
                "mark": [],
                "num": []
            };
            var personData;
            for (var i = 0; i < data.length; i++) {
                personData = data[i];
                table.id.push(personData.id);
                table.color.push(personData.color);
                table.isForeign.push(personData.isForeign)
                table.mark.push(personData.mark)
                table.num.push(personData.num)
            }
            if (elem != null){
                elem.innerHTML = "";
            }

            var tab =document.createElement('table');

            createTableCar(tab, table);
            elem.appendChild(tab);
        } else if (xmlHttpRequest.status === 500 && countMessage < 1) {
            countMessage++;
            alert("There is no car with id " + id_)
        }
    });
}

function createTableShowCars(elem) {
    var xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.open('GET', 'http://localhost:8080/app/cars', true);
    xmlHttpRequest.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
    xmlHttpRequest.send()

    xmlHttpRequest.addEventListener("readystatechange", () => {
        if (xmlHttpRequest.readyState === 4 && xmlHttpRequest.status === 200) {

            var data = JSON.parse(xmlHttpRequest.responseText);
            var table = {
                "id": [],
                "color": [],
                "isForeign": [],
                "mark": [],
                "num": []
            };
            var personData;
            for (var i = 0; i < data.length; i++) {
                personData = data[i];
                table.id.push(personData.id);
                table.color.push(personData.color);
                table.isForeign.push(personData.isForeign)
                table.mark.push(personData.mark)
                table.num.push(personData.num)
            }
            if (elem != null){
                elem.innerHTML = "";
            }
            var tab =document.createElement('table');
            createTableCar(tab, table);
            elem.appendChild(tab);
        }
    });
}

function deleteServiceById(elem) {
    var id_ = document.getElementById("deleteService").value;
    var xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.open('POST', 'http://localhost:8080/app/delete/services/' + id_, true);
    xmlHttpRequest.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));

    var countMessage = 0;
    xmlHttpRequest.addEventListener("readystatechange", () => {
        if (xmlHttpRequest.readyState === 4 && xmlHttpRequest.status === 200) {

            var data = JSON.parse(xmlHttpRequest.responseText);
            var table = {
                "id": [],
                "costForeign": [],
                "costOur":[],
                "name":[]
            };

            var personData;
            for (var i = 0; i < data.length; i++) {
                personData = data[i];
                table.id.push(personData.id);
                table.costForeign.push(personData.costForeign);
                table.costOur.push(personData.costOur)
                table.name.push(personData.name)
            }

            if (elem != null){
                elem.innerHTML = "";
            }


            var tab =document.createElement('table');

            createTableService(tab, table);
            elem.appendChild(tab);
        } else if (xmlHttpRequest.status === 500 && countMessage < 1) {
            countMessage++;
            alert("There is no service with id " + id_)
        }

    });
    xmlHttpRequest.send()
}

function createTableShowServices(elem) {
    var xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.open('GET', 'http://localhost:8080/app/services', true);
    xmlHttpRequest.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
    xmlHttpRequest.send()
    var countMessage = 0;
    xmlHttpRequest.addEventListener("readystatechange", () => {
        if (xmlHttpRequest.readyState === 4 && xmlHttpRequest.status === 200) {

            var data = JSON.parse(xmlHttpRequest.responseText);
            var table = {
                "id": [],
                "costForeign": [],
                "costOur":[],
                "name":[]
            };
            var personData;
            for (var i = 0; i < data.length; i++) {
                personData = data[i];
                table.id.push(personData.id);
                table.costForeign.push(personData.costForeign);
                table.costOur.push(personData.costOur)
                table.name.push(personData.name)
            }
            if (elem != null){
                elem.innerHTML = "";
            }
            var tab =document.createElement('table');
            createTableService(tab, table);
            elem.appendChild(tab);
        }
    });
}

function deleteMasterById(elem) {
    var id_ = document.getElementById("deleteMaster").value;
    var xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.open('POST', 'http://localhost:8080/app/delete/masters/' + id_, true);
    xmlHttpRequest.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
    xmlHttpRequest.send()
    xmlHttpRequest.addEventListener("readystatechange", () => {
        if (xmlHttpRequest.readyState === 4 && xmlHttpRequest.status === 200) {

            var data = JSON.parse(xmlHttpRequest.responseText);
            var table = {
                "id": [],
                "name":[]
            };
            var personData;
            for (var i = 0; i < data.length; i++) {
                personData = data[i];
                table.id.push(personData.id);
                table.name.push(personData.name)
            }
            if (elem != null){
                elem.innerHTML = "";
            }
            var tab =document.createElement('table');
            createTableMaster(tab, table);
            elem.appendChild(tab);
        } else if (xmlHttpRequest.status === 500 && countMessage < 1) {
            countMessage++;
            alert("There is no master with id " + id_)
        }
    });
}

function createTableShowMasters(elem) {
    var xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.open('GET', 'http://localhost:8080/app/masters', true);
    xmlHttpRequest.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
    xmlHttpRequest.send()
    xmlHttpRequest.addEventListener("readystatechange", () => {
        if (xmlHttpRequest.readyState === 4 && xmlHttpRequest.status === 200) {

            var data = JSON.parse(xmlHttpRequest.responseText);
            var table = {
                "id": [],
                "name":[]
            };
            var personData;
            for (var i = 0; i < data.length; i++) {
                personData = data[i];
                table.id.push(personData.id);
                table.name.push(personData.name)
            }
            if (elem != null){
                elem.innerHTML = "";
            }
            var tab =document.createElement('table');
            createTableMaster(tab, table);
            elem.appendChild(tab);
        }
    });
}

function getWorkById (elem) {
    var id_ = document.getElementById("findWork").value;
    var xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.open('GET', 'http://localhost:8080/app/works/' + id_, true);
    xmlHttpRequest.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
    xmlHttpRequest.send()
    var countMessage = 0;
    xmlHttpRequest.addEventListener("readystatechange", () => {
        if (xmlHttpRequest.readyState === 4 && xmlHttpRequest.status === 200) {
            var data = JSON.parse(xmlHttpRequest.responseText);
            var table = {
                "id": [],
                "dateWork": [],
                "car_id": [],
                "master_id": [],
                "service_id": []
            };
            var personData;


            personData = data;
            table.id.push(personData.id);
            table.dateWork.push(personData.dateWork);
            table.car_id.push(personData.cars.id)
            table.master_id.push(personData.masters.id)
            table.service_id.push(personData.services.id)


            if (elem != null){
                elem.innerHTML = "";
            }

            var tab =document.createElement('table');

            createTableWork(tab, table);

            elem.appendChild(tab);
        } else if (xmlHttpRequest.status === 404 && countMessage < 1) {
            countMessage++;
            alert("There is no work with id " + id_)
        }
    });
};

function getCarById(elem) {
    var id_ = document.getElementById("findCar").value;
    var xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.open('GET', 'http://localhost:8080/app/cars/' + id_, true);
    xmlHttpRequest.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
    xmlHttpRequest.send()
    var countMessage = 0;
    xmlHttpRequest.addEventListener("readystatechange", () => {
        if(xmlHttpRequest.status === 500) {
            document.location.href = "file:///C:/Users/Mary/IdeaProjects/newProj/demo/ilda/signIn/signIn.html"
        } else if (xmlHttpRequest.readyState === 4 && xmlHttpRequest.status === 200) {
            var data = JSON.parse(xmlHttpRequest.responseText);
            var table = {
                "id": [],
                "color": [],
                "isForeign": [],
                "mark": [],
                "num": []
            };
            var personData;
            personData = data;
            table.id.push(personData.id);
            table.color.push(personData.color);
            table.isForeign.push(personData.isForeign)
            table.mark.push(personData.mark)
            table.num.push(personData.num)

            if (elem != null) {
                elem.innerHTML = "";
            }

            var tab = document.createElement('table');

            createTableCar(tab, table);

            elem.appendChild(tab);
        } else if (xmlHttpRequest.status === 404 && countMessage < 1) {
            countMessage++;
            alert("There is no car with id " + id_)
        }

    });
}

function getMasterById(elem) {
    var id_ = document.getElementById("findMaster").value;
    var xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.open('GET', 'http://localhost:8080/app/masters/' + id_, true);
    xmlHttpRequest.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
    xmlHttpRequest.send()
    var countMessage = 0;
    xmlHttpRequest.addEventListener("readystatechange", () => {
        if (xmlHttpRequest.readyState === 4 && xmlHttpRequest.status === 200) {
            var data = JSON.parse(xmlHttpRequest.responseText);
            var table = {
                "id": [],
                "name":[]
            };
            var personData;

            personData = data;
            table.id.push(personData.id);
            table.name.push(personData.name)


            if (elem != null){
                elem.innerHTML = "";
            }


            var tab =document.createElement('table');

            createTableMaster(tab, table);

            elem.appendChild(tab);
        } else if (xmlHttpRequest.status === 404 && countMessage < 1) {
            countMessage++;
            alert("There is no master with id " + id_)
        }

    });
}

function getServiceById() {
    var id_ = document.getElementById("findService").value;
    var xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.open('GET', 'http://localhost:8080/app/services/' + id_, true);
    xmlHttpRequest.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
    xmlHttpRequest.send()

    var countMessage = 0;
    xmlHttpRequest.addEventListener("readystatechange", () => {

        if (xmlHttpRequest.readyState === 4 && xmlHttpRequest.status === 200) {
            var data = JSON.parse(xmlHttpRequest.responseText);
            var table = {
                "id": [],
                "costForeign": [],
                "costOur":[],
                "name":[]
            };
            var personData;

            personData = data;
            table.id.push(personData.id);
            table.costForeign.push(personData.costForeign);
            table.costOur.push(personData.costOur)
            table.name.push(personData.name)


            if (elem != null){
                elem.innerHTML = "";
            }

            var tab =document.createElement('table');

            createTableService(tab, table);

            elem.appendChild(tab);
        } else if (xmlHttpRequest.status === 404 && countMessage < 1) {
            countMessage++;
            alert("There is no service with id " + id_)
        }
    });
}

function getInfo(elem) {

    if (elem != null) {
        elem.innerHTML = "";
    }
    var type = document.getElementById("adding").value;
    if (type === "Master") {

        var name =document.createElement('label');
        name.textContent ="name ";
        var nameField = document.createElement('input');
        nameField.placeholder = "Enter master id";
        nameField.id = "nameFieldMaster";
        var button = document.createElement('button');
        button.id = "addMaster";
        button.type = "button";
        button.textContent = "add Master"
        elem.appendChild(name);
        elem.appendChild(nameField);
        elem.appendChild(button);
        document.getElementById("addMaster").onclick = function () {
            let json = JSON.stringify({
                "name": document.getElementById("nameFieldMaster").value,
            });
            var xmlHttpRequest = new XMLHttpRequest();
            xmlHttpRequest.open('POST', 'http://localhost:8080/app/addMaster', true);
            xmlHttpRequest.setRequestHeader('Content-type', 'application/json; charset=utf-8');
            xmlHttpRequest.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
            xmlHttpRequest.send(json)
            var k = 0;
            xmlHttpRequest.addEventListener("readystatechange", () => {
                if (xmlHttpRequest.readyState === 4 && (xmlHttpRequest.status === 200)) {
                    alert("Adding master was successful")
                } else if (xmlHttpRequest.status!== 200 && k < 1) {
                    k++
                    alert("Adding master was not successful")
                }
            });
        }
    }
    else if(type === "Car") {
        var color = document.createElement('label')
        color.textContent = "color ";
        var colorField = document.createElement('input');
        colorField.id = "colorFieldCar";
        colorField.placeholder = "Enter car color";
        var is_foreign = document.createElement('label')
        is_foreign.textContent = "is car foreign";
        var is_foreignField = document.createElement('input');
        is_foreignField.type = "checkbox"
        is_foreignField.checked = false;
        is_foreignField.id = "is_foreignFieldCar"
        var mark = document.createElement('label')
        mark.textContent = "mark";
        var markField = document.createElement('input');
        markField.id = "markFieldCar";
        markField.placeholder = "Enter car mark";
        var num = document.createElement('label');
        num.textContent = "car number";
        var numField = document.createElement('input');
        numField.id = "numFieldCar";
        numField.placeholder = "Enter car number";
        var button = document.createElement('button');
        button.id = "addCar";
        button.type = "button";
        button.textContent = "add Car"
        elem.appendChild(color)
        elem.appendChild(colorField)
        elem.appendChild(is_foreign)
        elem.appendChild(is_foreignField)
        elem.appendChild(mark);
        elem.appendChild(markField);
        elem.appendChild(num);
        elem.appendChild(numField);
        elem.appendChild(button);
        document.getElementById("addCar").onclick = function () {
            var c = document.querySelector('#is_foreignFieldCar');
            var is_foreignCheck
            if (c.checked) {
                is_foreignCheck = true;
            } else {
                is_foreignCheck = false;
            }
            let json = JSON.stringify({
                "color": document.getElementById("colorFieldCar").value,
                "isForeign": is_foreignCheck,
                "mark": document.getElementById("markFieldCar").value,
                "num": document.getElementById("numFieldCar").value
            });
            var xmlHttpRequest = new XMLHttpRequest();
            xmlHttpRequest.open('POST', 'http://localhost:8080/app/addCar', true);
            xmlHttpRequest.setRequestHeader('Content-type', 'application/json; charset=utf-8');
            xmlHttpRequest.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
            xmlHttpRequest.send(json)
            var k = 0;
            xmlHttpRequest.addEventListener("readystatechange", () => {
                if (xmlHttpRequest.readyState === 4 && (xmlHttpRequest.status === 200)) {
                    alert("Adding car was successful")
                } else if (xmlHttpRequest.status!== 200 && k < 1) {
                    k++
                    alert("Adding car was not successful")
                }
            });
        }

    }
    else if (type === "Service") {

        var cost_foreign = document.createElement('label')
        cost_foreign.textContent = "cost foreign ";

        var cost_foreignField = document.createElement('input');
        cost_foreignField.id = "cost_foreignFieldService";
        cost_foreignField.placeholder = "Enter cost for foreign cars";

        var costOur = document.createElement('label')
        costOur.textContent = "our cost";

        var costOurField = document.createElement('input');
        costOurField.id = "costOurFieldService";
        costOurField.placeholder = "Enter cost for our cars";

        var name = document.createElement('label')
        name.textContent = "service name";

        var nameField = document.createElement('input');
        nameField.id = "nameFieldService";
        nameField.placeholder = "Enter service name";

        var button = document.createElement('button');
        button.id = "addService";
        button.type = "button";
        button.textContent = "add Service"

        elem.appendChild(cost_foreign);
        elem.appendChild(cost_foreignField);
        elem.appendChild(costOur);
        elem.appendChild(costOurField);
        elem.appendChild(name);
        elem.appendChild(nameField);
        elem.appendChild(button);


        document.getElementById("addService").onclick = function () {
            let json = JSON.stringify({
                "costForeign": document.getElementById("cost_foreignFieldService").value,
                "costOur": document.getElementById("costOurFieldService").value,
                "name": document.getElementById("nameFieldService").value
            });
            var xmlHttpRequest = new XMLHttpRequest();
            xmlHttpRequest.open('POST', 'http://localhost:8080/app/addService', true);
            xmlHttpRequest.setRequestHeader('Content-type', 'application/json; charset=utf-8');
            xmlHttpRequest.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
            xmlHttpRequest.send(json)
            var k = 0;
            xmlHttpRequest.addEventListener("readystatechange", () => {
                if (xmlHttpRequest.readyState === 4 && (xmlHttpRequest.status === 200)) {
                    alert("Adding service was successful")
                } else if (xmlHttpRequest.status!== 400 && xmlHttpRequest.status !== 200 && k < 1) {
                    k++
                    alert("Adding service was not successful")
                } else if (xmlHttpRequest.status === 400 && k < 1) {
                    k++;
                    alert("Incorrect cost")
                }
            });
        }
    }
}


let carWork;
let masterWork;
let serviceWork;

function createAddWork(elem) {

    if(elem != null) {
        elem.innerHTML = "";
    }
    localStorage.setItem('carInfo', null)
    localStorage.setItem('masterInfo', null)
    localStorage.setItem('serviceInfo', null)

    var newButton = document.createElement('button');
    newButton.id = "addWorkButton"
    newButton.textContent = "add Work";
    newButton.type = "button";
    elem.appendChild(newButton);

    var xmlHttpRequestMasters = new XMLHttpRequest();
    xmlHttpRequestMasters.open('GET', 'http://localhost:8080/app/masters', true);
    xmlHttpRequestMasters.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
    xmlHttpRequestMasters.send()
    var k = 0;
    xmlHttpRequestMasters.addEventListener("readystatechange", () => {
        if (xmlHttpRequestMasters.readyState === 4 && (xmlHttpRequestMasters.status === 200)) {
            var dataMasters = JSON.parse(xmlHttpRequestMasters.responseText);
            var table = {
                "id": [],
                "name":[]
            };
            var personData;
            for (var i = 0; i < dataMasters.length; i++) {
                personData = dataMasters[i];
                table.id.push(personData.id);
                table.name.push(personData.name)
            }
            var master = document.createElement('label');
            master.textContent = "Master"

            var masterField = document.createElement('select');
            masterField.id = "selectMaster";
            for (var i = 0; i < table.id.length; i++) {
                var masterOption = document.createElement('option');
                masterOption.value = table.id[i];
                masterOption.textContent = "id: "+ table.id[i] + " number: " + table.name[i];
                masterField.appendChild(masterOption);
            }
            elem.appendChild(master)
            elem.appendChild(masterField)
            masterField.onchange = function (e) {
                localStorage.setItem('masterInfo', masterField.options[masterField.selectedIndex].value )
            }
        } else if (xmlHttpRequestMasters.status !== 200 && k < 1) {
            k++
            alert("Can not get masters")
        }
    });

    var xmlHttpRequestCars = new XMLHttpRequest();
    xmlHttpRequestCars.open('GET', 'http://localhost:8080/app/cars', true);
    xmlHttpRequestCars.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
    xmlHttpRequestCars.send()
    k = 0;
    xmlHttpRequestCars.addEventListener("readystatechange", () => {
        if (xmlHttpRequestCars.readyState === 4 && (xmlHttpRequestCars.status === 200)) {
            var dataCars = JSON.parse(xmlHttpRequestCars.responseText);

            var table = {
                "id": [],
                "color": [],
                "isForeign": [],
                "mark": [],
                "num": []
            };

            var personData;

            for (var i = 0; i < dataCars.length; i++) {
                personData = dataCars[i];
                table.id.push(personData.id);
                table.color.push(personData.color);
                table.isForeign.push(personData.isForeign)
                table.mark.push(personData.mark)
                table.num.push(personData.num)
            }
            var car = document.createElement('label');
            car.textContent = "Car"

            var carField = document.createElement('select');
            carField.id = "selectCar"

            for (var i = 0; i < table.id.length; i++) {
                var carIdOption = document.createElement('option');
                carIdOption.value = table.id[i];
                carIdOption.textContent = "id: "+ table.id[i] + " number: " + table.num[i] + " " ;
                carField.appendChild(carIdOption);
            }

            elem.appendChild(car)
            elem.appendChild(carField)
            carField.onchange = function (e) {
                localStorage.setItem('carInfo', carField.options[carField.selectedIndex].value )
            }
        } else if (xmlHttpRequestCars.status !== 200 && k < 1) {
            k++
            alert("Can not get cars")
        }
    });
    var xmlHttpRequestServices = new XMLHttpRequest();
    xmlHttpRequestServices.open('GET', 'http://localhost:8080/app/services', true);
    xmlHttpRequestServices.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
    xmlHttpRequestServices.send()
    k = 0;
    xmlHttpRequestServices.addEventListener("readystatechange", () => {
        if (xmlHttpRequestServices.readyState === 4 && (xmlHttpRequestServices.status === 200)) {
            var dataService = JSON.parse(xmlHttpRequestServices.responseText);

            var table = {
                "id": [],
                "costForeign": [],
                "costOur":[],
                "name":[]
            };

            var personData;
            for (var i = 0; i < dataService.length; i++) {
                personData = dataService[i];
                table.id.push(personData.id);
                table.costForeign.push(personData.costForeign);
                table.costOur.push(personData.costOur)
                table.name.push(personData.name)
            }
            var service = document.createElement('label');
            service.textContent = "Service"

            var serviceField = document.createElement('select');
            serviceField.id = "selectService";
            for (var i = 0; i < table.id.length; i++) {
                var serviceOption = document.createElement('option');
                serviceOption.value = table.id[i];
                serviceOption.textContent = "id: "+ table.id[i] + " number: " + table.name[i];
                serviceField.appendChild(serviceOption);
            }
            elem.appendChild(service)
            elem.appendChild(serviceField)
            serviceField.onchange = function (e) {
                localStorage.setItem('serviceInfo', serviceField.options[serviceField.selectedIndex].value);
            }
        } else if (xmlHttpRequestServices.status !== 200 && k < 1) {
            k++
            alert("Can not get services")
        }
    });

    var date =  document.createElement('label');
    date.textContent = "Date";

    var dateField = document.createElement('input');
    dateField.id = "dateFieldWork";
    dateField.type = "date"

    elem.appendChild(date);
    elem.appendChild(dateField);

    newButton.onclick = function () {
        if(dateField.value === "") {
            alert("Enter date!")
        } else {
            var date = dateField.value;
            let json = JSON.stringify({
                "dateWork": date,
                "carId": localStorage.getItem('carInfo'),
                "serviceId" : localStorage.getItem('serviceInfo'),
                "masterId": localStorage.getItem('masterInfo')
            })

            var xmlHttpRequest = new XMLHttpRequest();
            xmlHttpRequest.open('POST', 'http://localhost:8080/app/addWork', true);
            xmlHttpRequest.setRequestHeader('Content-type', 'application/json; charset=utf-8');
            xmlHttpRequest.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
            xmlHttpRequest.send(json)
            var k = 0;
            xmlHttpRequest.addEventListener("readystatechange", () => {
                if (xmlHttpRequest.readyState === 4 && (xmlHttpRequest.status === 200)) {
                    alert("Adding work was successful")
                } else if (xmlHttpRequest.status!== 400 && xmlHttpRequest.status !== 200 && k < 1) {
                    k++
                    alert("Adding work was not successful")
                }
            });
        }
    }
}

function editInfo(elem) {

    if (elem != null) {
        elem.innerHTML = "";
    }

    var type = document.getElementById("editing").value;
    if (type === "Master") {

        var id = document.createElement('label')
        id.textContent = "id"
        var idField = document.createElement('input')
        idField.placeholder = "Enter master id"
        idField.id = "idFieldMaster";
        var name = document.createElement('label');
        name.textContent = "name ";
        var nameField = document.createElement('input');
        nameField.placeholder = "Enter master name";
        nameField.id = "nameFieldMaster";
        var button = document.createElement('button');
        button.id = "editMaster";
        button.type = "button";
        button.textContent = "edit Master"
        elem.appendChild(id)
        elem.appendChild(idField)
        elem.appendChild(name);
        elem.appendChild(nameField);
        elem.appendChild(button);
        document.getElementById("editMaster").onclick = function () {
            let json = JSON.stringify({
                "name": document.getElementById("nameFieldMaster").value,
            });
            var xmlHttpRequest = new XMLHttpRequest();
            xmlHttpRequest.open('POST', 'http://localhost:8080/app/edit/masters/' + idField.value, true);
            xmlHttpRequest.setRequestHeader('Content-type', 'application/json; charset=utf-8');
            xmlHttpRequest.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
            xmlHttpRequest.send(json)
            var k = 0;
            xmlHttpRequest.addEventListener("readystatechange", () => {
                if (xmlHttpRequest.readyState === 4 && (xmlHttpRequest.status === 200)) {
                    alert("Editing master was successful")
                } else if (xmlHttpRequest.status !== 200 && k < 1) {
                    k++
                    alert("Editing master was not successful")
                } else if (xmlHttpRequest.status === 400 && k < 1) {
                    k++;
                    alert("Incorrect data! Please check input")
                }
            });
        }
    } else if (type === "Car") {
        var id = document.createElement('label')
        id.textContent = "id"
        var idField = document.createElement('input')
        idField.placeholder = "Enter car id"
        idField.id = "idFieldCar";
        var color = document.createElement('label')
        color.textContent = "color ";
        var colorField = document.createElement('input');
        colorField.id = "colorFieldCar";
        colorField.placeholder = "Enter car color";
        var is_foreign = document.createElement('label')
        is_foreign.textContent = "is car foreign";
        var is_foreignField = document.createElement('input');
        is_foreignField.type = "checkbox"
        is_foreignField.checked = false;
        is_foreignField.id = "is_foreignFieldCar"
        var mark = document.createElement('label')
        mark.textContent = "mark";
        var markField = document.createElement('input');
        markField.id = "markFieldCar";
        markField.placeholder = "Enter car mark";
        var num = document.createElement('label');
        num.textContent = "car number";
        var numField = document.createElement('input');
        numField.id = "numFieldCar";
        numField.placeholder = "Enter car number";
        var button = document.createElement('button');
        button.id = "editCar";
        button.type = "button";
        button.textContent = "edit Car";
        elem.appendChild(id);
        elem.appendChild(idField);
        elem.appendChild(color)
        elem.appendChild(colorField)
        elem.appendChild(is_foreign)
        elem.appendChild(is_foreignField)
        elem.appendChild(mark);
        elem.appendChild(markField);
        elem.appendChild(num);
        elem.appendChild(numField);
        elem.appendChild(button);
        document.getElementById("editCar").onclick = function () {
            var c = document.querySelector('#is_foreignFieldCar');
            var is_foreignCheck
            if (c.checked) {
                is_foreignCheck = true;
            } else {
                is_foreignCheck = false;
            }
            let json = JSON.stringify({
                "color": document.getElementById("colorFieldCar").value,
                "isForeign": is_foreignCheck,
                "mark": document.getElementById("markFieldCar").value,
                "num": document.getElementById("numFieldCar").value
            });
            var xmlHttpRequest = new XMLHttpRequest();
            xmlHttpRequest.open('POST', 'http://localhost:8080/app/edit/cars/' + idField.value, true);
            xmlHttpRequest.setRequestHeader('Content-type', 'application/json; charset=utf-8');
            xmlHttpRequest.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
            xmlHttpRequest.send(json)
            var k = 0;
            xmlHttpRequest.addEventListener("readystatechange", () => {
                if (xmlHttpRequest.readyState === 4 && (xmlHttpRequest.status === 200)) {
                    alert("Editing car was successful")
                } else if (xmlHttpRequest.status !== 200 && k < 1) {
                    k++
                    alert("Editing car was not successful")
                } else if (xmlHttpRequest.status === 400 && k < 1) {
                    k++;
                    alert("Incorrect data! Please check input")
                }
            });
        }

    } else if (type === "Service") {
        var id = document.createElement('label')
        id.textContent = "id"
        var idField = document.createElement('input')
        idField.placeholder = "Enter service id"
        idField.id = "idFieldService";

        var cost_foreign = document.createElement('label')
        cost_foreign.textContent = "cost foreign ";

        var cost_foreignField = document.createElement('input');
        cost_foreignField.id = "cost_foreignFieldService";
        cost_foreignField.placeholder = "Enter cost for foreign cars";

        var costOur = document.createElement('label')
        costOur.textContent = "our cost";

        var costOurField = document.createElement('input');
        costOurField.id = "costOurFieldService";
        costOurField.placeholder = "Enter cost for our cars";

        var name = document.createElement('label')
        name.textContent = "service name";

        var nameField = document.createElement('input');
        nameField.id = "nameFieldService";
        nameField.placeholder = "Enter service name";

        var button = document.createElement('button');
        button.id = "editService";
        button.type = "button";
        button.textContent = "edit Service"

        elem.appendChild(id);
        elem.appendChild(idField);
        elem.appendChild(cost_foreign);
        elem.appendChild(cost_foreignField);
        elem.appendChild(costOur);
        elem.appendChild(costOurField);
        elem.appendChild(name);
        elem.appendChild(nameField);
        elem.appendChild(button);

        document.getElementById("editService").onclick = function () {
            let json = JSON.stringify({
                "costForeign": document.getElementById("cost_foreignFieldService").value,
                "costOur": document.getElementById("costOurFieldService").value,
                "name": document.getElementById("nameFieldService").value
            });
            var xmlHttpRequest = new XMLHttpRequest();
            xmlHttpRequest.open('POST', 'http://localhost:8080/app/edit/services/' + idField.value, true);
            xmlHttpRequest.setRequestHeader('Content-type', 'application/json; charset=utf-8');
            xmlHttpRequest.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
            xmlHttpRequest.send(json)
            var k = 0;
            xmlHttpRequest.addEventListener("readystatechange", () => {
                if (xmlHttpRequest.readyState === 4 && (xmlHttpRequest.status === 200)) {
                    alert("Editing service was successful")
                } else if (xmlHttpRequest.status !== 400 && xmlHttpRequest.status !== 200 && k < 1) {
                    k++
                    alert("Editing service was not successful")
                } else if (xmlHttpRequest.status === 400 && k < 1) {
                    k++;
                    alert("Incorrect data! Please check input")
                }
            });
        }
    } else if (type === "Work") {

        var id = document.createElement('label')
        id.textContent = "id"
        var idField = document.createElement('input')
        idField.placeholder = "Enter work id"
        idField.id = "idFieldWork";

        var date =  document.createElement('label');
        date.textContent = "Date";

        var dateField = document.createElement('input');
        dateField.id = "dateFieldWork";
        dateField.type = "date"

        var car =  document.createElement('label');
        car.textContent = "Car id";

        var carField = document.createElement('input');
        carField.id = "carFieldWork";
        carField.placeholder = "Enter car id";

        var master = document.createElement('label')
        master.textContent = "Master id";

        var masterField = document.createElement('input');
        masterField.id = "masterFieldWork";
        masterField.placeholder = "Enter master id";

        var service = document.createElement('label')
        service.textContent = "Service id";

        var serviceField = document.createElement('input');
        serviceField.id = "serviceFieldWork";
        serviceField.placeholder = "Enter service id";

        var button = document.createElement('button');
        button.id = "editWork";
        button.type = "button";
        button.textContent = "edit Work"

        elem.appendChild(id);
        elem.appendChild(idField);
        elem.appendChild(date);
        elem.appendChild(dateField);
        elem.appendChild(car);
        elem.appendChild(carField);
        elem.appendChild(master);
        elem.appendChild(masterField);
        elem.appendChild(service);
        elem.appendChild(serviceField);
        elem.appendChild(button);

        document.getElementById("editWork").onclick = function () {
            var date = dateField.value;
            let json = JSON.stringify({
                "dateWork": date,
                "carId": carField.value,
                "serviceId" : serviceField.value,
                "masterId": masterField.value
            });
            var xmlHttpRequest = new XMLHttpRequest();
            xmlHttpRequest.open('POST', 'http://localhost:8080/bt/edit/works/' + idField.value, true);
            xmlHttpRequest.setRequestHeader('Content-type', 'application/json; charset=utf-8');
            xmlHttpRequest.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
            xmlHttpRequest.send(json)
            var k = 0;
            xmlHttpRequest.addEventListener("readystatechange", () => {
                if (xmlHttpRequest.readyState === 4 && (xmlHttpRequest.status === 200)) {
                    alert("Editing work was successful")
                } else if (xmlHttpRequest.status !== 400 && xmlHttpRequest.status !== 200 && k < 1) {
                    k++
                    alert("Editing work was not successful")
                } else if (xmlHttpRequest.status === 400 && k < 1) {
                    k++;
                    alert("Incorrect data! Please check input")
                }
            });
        }
    }
}

