//without loop


// let table=document.createElement('table');
// table.border=1;
// let headerRow=document.createElement('tr');

// let th1=document.createElement('th')
// th1.textContent="Name";

// let th2=document.createElement('th')
// th2.textContent="Age";

// let th3=document.createElement('th')
// th3.textContent="Enrollment Number"

// headerRow.appendChild(th1);
// headerRow.appendChild(th2)
// headerRow.appendChild(th3);


// table.appendChild(headerRow)

// let row=document.createElement('tr');
// let td1=document.createElement('td');
// td1.textContent="RAM"
// let td2=document.createElement('td');
// td2.textContent="20"
// let td3=document.createElement('td');
// td3.textContent="74";

// row.appendChild(td1);
// row.appendChild(td2);
// row.appendChild(td3);

// table.appendChild(row);
// document.getElementById('tableContent').appendChild(table)

// ---with loop

// let table=document.createElement('table');
// table.border=1;

// const data=[
//     ["RAm",20,"Ahemdabad"],
//     ["Krish",30,"Rajkot"],
//     ["Rao",25,"bhavnagar"]
// ]

// const header=['Name', 'Age' , 'City']
// let headerRow=document.createElement('tr')

// for (let i = 0; i < header.length; i++) {
//     let th=document.createElement('th')
//     th.textContent=header[i]
//     headerRow.appendChild(th)
    
// }

// table.appendChild(headerRow)

// let row=document.createElement('tr')
// for (let i = 0; i < data.length; i++) {
//     let row=document.createElement('tr')
//     for(let j=0;j<data[i].length;j++){
//     let td=document.createElement('td')
//     td.width="50px"
//     td.height="20px"
//     td.textContent=data[i][j]
//      row.appendChild(td)
// }
//     table.appendChild(row)
// }

// document.getElementById('tableContent').appendChild(table)


//empty table
// function createTable(){
// let rowSize=document.getElementById('row').value;
// let columnnSize=document.getElementById('col').value;

// let table=document.createElement('table');
// table.border=1;
// let row=document.createElement('tr')
// for (let i = 0; i < rowSize; i++) {
//     let row=document.createElement('tr')
//     for(let j=0;j<columnnSize;j++){
//     let td=document.createElement('td')
//     td.width="50px"
//     td.height="20px"
//     td.textContent=" "
//      row.appendChild(td)
// }
//     table.appendChild(row)
// }

// document.getElementById('tableContent').appendChild(table)
// }


// function addrow(){
//     let row =table.insertRow();
//     let columnCount=table.rows[0].cell.length;

//     for(let i=0;i<=columnCount;i++){
//         let cell=row.insertCell();
//         cell.innerText="New Data"

//     }
// }
// function deleteRow(){
//     let rowCount=table.rows.length;
//     if(rowCount>1){
//         table.deleteRow(rowCount-1)
//     }

// }

// function addColumn(){
//     let rowCount=table.rows.length;

//     for (let i = 0; i < rowCount; i++) {
//         let cell;
//         if(i==0){
//             cell=document.createElement("th");
//             cell.innerHTML="newColumn"
//         }
//         else{
//             cell=document.createElement("td");
//             cell.innerHTML="New Data"
//         }
//         table.row[i].appendChild
        
//     }
    

// }

// function deleteColumn(){
//     let colCount=table.rows[0].cell.length;

//     if(colCount>1){
//         for (let i = 0; i < table.rows.length; i++) {
//             table.rows[i].deleteCell(colCount-1)
            
//         }
//     }
// }



let table; 

function createTable() {
    let rowSize = document.getElementById('row').value;
    let columnSize = document.getElementById('col').value;
    let container = document.getElementById('tableContent');

 
    container.innerHTML = "";
   


    table = document.createElement('table');
    table.border = "1";

    for (let i = 0; i < rowSize; i++) {
        let row = document.createElement('tr');
        for (let j = 0; j < columnSize; j++) {
            let td = document.createElement('td');
             td.contentEditable =true //used to edit the cell
            td.style.width = "50px";
            td.style.height = "20px";
            td.textContent = "Cell";
            row.appendChild(td);
        }
        table.appendChild(row);
    }
    container.appendChild(table);
}

function addrow() {
    if (!table) return alert("Create a table first!");
    
    let row = table.insertRow();//create new <tr>
    let columnCount = table.rows[0].cells.length;//total column because to enter that number of row cell based on column size
    console.log(table.rows[0].cells.length);
    

    for (let i = 0; i < columnCount; i++) {
        let cell = row.insertCell();//insertCell create a td inside tr
        cell.innerText = "New Row";
        cell.style.width = "50px";
        cell.contentEditable =true ;
    }
}

function deleteRow() {
    if (!table) return;
    let rowCount = table.rows.length;
    console.log(rowCount);//show a total row legnth 4
    
    if (rowCount > 0) {
        table.deleteRow(rowCount - 1);
    }
}

function addColumn() {
    if (!table) return;
    let rowCount = table.rows.length;//count row because of ,to enter row size entry in column

    for (let i = 0; i < rowCount; i++) {
        let cell = table.rows[i].insertCell();
        cell.innerHTML = "New Col";
        cell.style.width = "50px";
        cell.contentEditable =true 
    }
}

function deleteColumn() {
    if (!table) return;
    let rowCount = table.rows.length;
    let colCount = table.rows[0].cells.length;//count first row cell = column lenth

    if (colCount > 0) {
        for (let i = 0; i < rowCount; i++) {
            table.rows[i].deleteCell(colCount - 1);
        }
    }
}