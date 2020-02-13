
window.onload = function () {
    DAOgetAllRegisters();
    dataTable();
}

$("#btnPreRegisterRegister").click(function () {
    preRegisterRegister();
});

$("#registerRegisterForm").submit(function (event) {
    event.preventDefault();
    DAOregisterRegister();
});

$("#updateRegisterForm").submit(function (event) {
    event.preventDefault();
    DAOupdateRegister();
});

$("#deleteRegisterForm").submit(function (event) {
    event.preventDefault();
    DAOdeleteRegister();
});

function DAOgetAllRegisters() {

    var response = httpGet(`http://${IP_DO_SERVIDOR}:3000/register`);
    fillRegisterTable(registerTableBody, response);
    drawGraph();

}

function DAOregisterRegister() {

    var name = $('#register_name').val();
    var company = $('#register_company').val();
    var value = $('#register_value').val();

    var url = `http://${IP_DO_SERVIDOR}:3000/register`;
    var data = `register_name=${name}&register_company=${company}&register_value=${value}`;

    var response = httpPost(url, data);

    createRegisterToRegisterTable(registerTableBody, response);
    cleanRegisterRegisterForm();
    drawGraph();
    $('#registerRegisterModal').modal('hide');

}

function DAOupdateRegister() {

    var id = $('#id_registerUpd').val();
    var name = $('#register_nameUpd').val();
    var company = $('#register_companyUpd').val();
    var value = $('#register_valueUpd').val();

    var url = `http://${IP_DO_SERVIDOR}:3000/register/${id}`;
    var data = `id=${id}&register_name=${name}&register_company=${company}&register_value=${value}`;

    httpPut(url, data);

    DAOgetAllRegisters();
    cleanUpdateRegisterForm();
    $('#updateRegisterModal').modal('hide');

}

function preRegisterRegister() {
    cleanRegisterRegisterForm();
}

function preUpdateRegister(id) {

    cleanUpdateRegisterForm();
    var data = id.getAttribute("dataID");

    var response = httpGet(`http://${IP_DO_SERVIDOR}:3000/register/${data}`);

    $('#id_registerUpd').val(response.id);
    $('#register_nameUpd').val(response.register_name);
    $('#register_companyUpd').val(response.register_company);
    $('#register_valueUpd').val(response.register_value);
    $('#updateUserModal').modal('show');

}

function preDeleteRegister(id) {

    cleanUpdateRegisterForm();
    var data = id.getAttribute("dataID");
    var response = httpGet(`http://${IP_DO_SERVIDOR}:3000/register/${data}`);

    var text = `R$${response.register_value} do Sr.(a) ${response.register_name} da Empresa ${response.register_company}`;

    $('#textDel').html(text);
    $('#id_registerDel').val(response.id);
    $('#deleteRegisterModal').modal('show');

}

function DAOdeleteRegister() {

    var id = $('#id_registerDel').val();
    httpDelete(`http://${IP_DO_SERVIDOR}:3000/register/${id}`);
    DAOgetAllRegisters();
    $('#deleteRegisterModal').modal('hide');

}

function fillRegisterTable(table, data) {

    table.innerHTML = "";

    data.forEach(function (register) {
        createRegisterToRegisterTable(table, register);
    });

}

//Insere Registro na Lista de Registros
function createRegisterToRegisterTable(table, register) {

    var tr = document.createElement("tr");
    var td1 = document.createElement("td");
    var td2 = document.createElement("td");
    var td3 = document.createElement("td");
    var td4 = document.createElement("td");
    var td5 = document.createElement("td");

    td1.innerHTML = register.id;
    td2.innerHTML = register.register_name;
    td3.innerHTML = register.register_company;
    td4.innerHTML = "R$ " + register.register_value;
    td5.innerHTML = `<button class="btn btn-rounded btn-warning" dataID="${register.id}" 
                        data-toggle="modal" data-target="#updateRegisterModal"
                        data-backdrop="static" onclick="preUpdateRegister(this)">
                        Editar</button>
                     <button class="btn btn-rounded btn-danger" dataID="${register.id}"
                        data-toggle="modal" data-target="#deleteRegisterModal"
                        data-backdrop="static" onclick="preDeleteRegister(this)">
                        Excluir</button>`;

    td1.setAttribute("data-title", "ID");
    td2.setAttribute("data-title", "Nome");
    td3.setAttribute("data-title", "Empresa");
    td4.setAttribute("data-title", "Valor");
    td5.setAttribute("data-title", "Ações");

    td5.style = "text-align: center;"

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);

    table.appendChild(tr);

}

//Insere Registro na Lista de Registros
function createRegisterToTotalRegisterTable(table, company, value) {

    var tr = document.createElement("tr");
    var td1 = document.createElement("td");
    var td2 = document.createElement("td");

    td1.innerHTML = company;
    td2.innerHTML = "R$ " + value.toFixed(2);

    td1.setAttribute("data-title", "Empresa");
    td2.setAttribute("data-title", "Valor");

    tr.appendChild(td1);
    tr.appendChild(td2);

    table.appendChild(tr);

}

function cleanRegisterRegisterForm() {
    $('#register_name').val("");
    $('#register_company').val("");
    $('#register_value').val("");
}

function cleanUpdateRegisterForm() {
    $('#id_registerUpd').val("");
    $('#register_nameUpd').val("");
    $('#register_companyUpd').val("");
    $('#register_valueUpd').val("");
}

function drawGraph() {

    var response = httpGet(`http://${IP_DO_SERVIDOR}:3000/register`);

    var valuePerCompanies = [];
    var companies = [];
    var values = [];

    //Retira as repetições de Empresas da Lista
    response.forEach(function (register) {

        if (!(companies.includes(register.register_company))) {
            companies.push(register.register_company);
            values.push(0);
        }

    });

    //Busca o Valor de cada Empresa especificamente e os soma
    companies.forEach(function (company, index) {

        response.forEach(function (register) {

            if (register.register_company == company) {
                values[index] += register.register_value;
            }

        });

    });

    // Forma o Array Estruturado para a inserção do C3 Charts
    companies.forEach(function (company, index) {
        valuePerCompanies[index] = [company, values[index]];
    });

    // Ordena o Array de acordo com os Valores Totais de Lucros
    valuePerCompanies.sort(function (a, b) {
        return a[1] - b[1];
    });

    valuePerCompanies.reverse();

    var table = $("#registerTotalTableBody")[0];
    table.innerHTML = "";

    // Preenche a Tabela de Valores Totais por Empresa
    valuePerCompanies.forEach(function (company) {
        createRegisterToTotalRegisterTable(table, company[0], company[1]);
    });

    // Desenha o Gráfico de Pizza
    if ($('#companyValueGraph').length) {
        var chart = c3.generate({
            bindto: "#companyValueGraph",
            data: {
                columns: valuePerCompanies,
                type: 'pie',

                colors: {
                    data1: '#5969ff',
                    data2: '#ff407b'
                }
            },
            pie: {
                label: {
                    format: function (value, ratio, id) {
                        return d3.format('$')(value);
                    }
                }
            }
        });
    }

    // Desenha o Gráfico de Barras
    if ($('#companyValueBars').length) {
        var chart = c3.generate({
            bindto: "#companyValueBars",

            data: {
                columns: valuePerCompanies,
                type: 'bar',
                colors: {
                    data1: '#5969ff',
                    data2: '#ff407b',
                    data3: '#64ced3'
                }
            },
            axis: {
                y: {
                    show: true,
                },
                x: {
                    show: false,
                }
            },
            grid: {
                y: {
                    lines: [{ value: 0 }]
                }
            }
        });

    }

}