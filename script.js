const formEmployee = document.getElementById("form-employee");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const mobileInput = document.getElementById("mobile");
const tableBody = document.querySelector("table tbody");

const submit = document.getElementById("submit");
const contIdEdit = document.getElementById("contIdEdit");

class Empolyee{
    constructor(id, name, email, mobile){
        this.id = id;
        this.name = name;
        this.email = email;
        this.mobile = mobile;
    }

    addNewEmpolyee(){
        Empolyee.htmlRowCode(this.id, this.name, this.email, this.mobile);
        return this;
    }

    storeEmpolyee(){
        const allData = JSON.parse(localStorage.getItem("employees")) ?? [];
        allData.push({id:this.id, name:this.name, email:this.email, mobile:this.mobile });
        localStorage.setItem("employees",JSON.stringify(allData));
    }

    updateEmployee(id){
        const newItem = {id:this.id, name:this.name, email:this.email, mobile:this.mobile };
        const updatedData = JSON.parse(localStorage.getItem("employees")).map((item)=>{

            if(item.id == id){
                return newItem;
            }else{
                return item;
            }
        })

        localStorage.setItem("employees", JSON.stringify(updatedData));
    }
    // static means alot but I made it here to used that without assign to a variable.
    static showAllEmployees(){
        if(localStorage.getItem("employees")){
            JSON.parse(localStorage.getItem("employees")).forEach((item)=>{
                Empolyee.htmlRowCode(item.id, item.name, item.email, item.mobile);
            })
        }
    }

    static htmlRowCode(id, name, email, mobile){
        const trElement = document.createElement("tr");
        trElement.innerHTML = `
        <tr>
                    <td>${name}</td>
                    <td>${email}</td>
                    <td>${mobile}</td>
                    <td>
                        <button class="edit" data-id="${id}">Edit</button>
                        <button class="delete" data-id="${id}">Delete</button>
                    </td>
                </tr>
        `;
        tableBody.appendChild(trElement);
    }

}

Empolyee.showAllEmployees();

formEmployee.onsubmit = (event) =>{
    event.preventDefault();

    if(!contIdEdit.value){
        let id = Math.floor(Math.random() * 100)
        const newEmp = new Empolyee(id, nameInput.value, emailInput.value, mobileInput.value);
    
        newEmp.addNewEmpolyee().storeEmpolyee();
        
    }else{
        const id = contIdEdit.value;
        const newEmp = new Empolyee(id, nameInput.value, emailInput.value, mobileInput.value);
        newEmp.updateEmployee(id);
        submit.value = 'submit';
        tableBody.innerHTML = '';
        Empolyee.showAllEmployees();
    }
    nameInput.value = '';
    emailInput.value = '';
    mobileInput.value = '';
    contIdEdit.value = '';
}

tableBody.onclick = (event) =>{
    if(event.target.classList.contains("delete")){
        const id = event.target.getAttribute("data-id");
        const emps = JSON.parse(localStorage.getItem("employees"));
        const newData = emps.filter(item => item.id !== +id);
        localStorage.setItem("employees",JSON.stringify(newData));
        event.target.parentElement.parentElement.remove();

    }else if(event.target.classList.contains("edit")){
        const id = event.target.getAttribute("data-id");
        const item = JSON.parse(localStorage.getItem("employees")).find(item=>item.id === +id);

        nameInput.value = item.name;
        emailInput.value = item.email;
        mobileInput.value = item.mobile;
        contIdEdit.value = id;
        submit.value = "update";
        
    }
}
