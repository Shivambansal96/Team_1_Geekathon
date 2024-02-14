
// add a dyanamic date in date portion
document.addEventListener("DOMContentLoaded", function() {
    let cdate = document.getElementById("cDate");
    
    let date = new Date();
    let day1 = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    let currentDate = day1 + " /" + month + " /" + year;

    cdate.innerText = currentDate;





const btnPrint = document.querySelector(".print");
btnPrint.addEventListener("click", () => {
    // let model=document.getElementById("model")
console.log(window);
    window.print();
});


const btnAddRow =  document.getElementById('add-row');
const table = document.getElementById('table-body');

    btnAddRow.addEventListener('click',function(){
        var content =  document.querySelector('.single-row').innerHTML;
        let tableContent =  table.innerHTML;
        table.insertAdjacentHTML("beforeend", 
            '<tr class="single-row">'+content+'</tr>');
    })

});

// Delete function

function del(el){
    el.parentNode.parentNode.parentNode.parentNode.removeChild(el.parentNode.parentNode.parentNode);

}




function getInput() {


    var rows = document.querySelectorAll("tr.single-row");
    let totalAMt = 0;
    rows.forEach((currentRow) => {
        var unit = currentRow.querySelector(".unit").value;
        var price = currentRow.querySelector(".price").value;

        amount = unit * price;
        totalAMt += amount
         currentRow.querySelector(".amount").value = amount;
        // Calculate overall sum if needed
    });

    // append in columm
    document.getElementById('total').value = (totalAMt + 25).toFixed(2);
}

    
    
    function generatePDF(arg1,arg2) {
        
        const element = document.getElementById(arg1);
        console.log(element);

        html2pdf()
            .from(element)
            .save();

    }
    

overallSum =()=> {
    var arr = document.getElementsByName("amount");
    var total = 0;
    for(var i = 0; i < arr.length; i++) {
        if(arr[i].value) {
            total += +arr[i].value;
        }
        document.getElementById("total").value = total;
     //   document.getElementById("total").value = total;
        let subTotal=document.getElementById("subtotal-amount")
        subTotal.innerText=total

        let lastamount=document.getElementById("total")
        lastamount.innerText=total
       
    }
}

//Target row and remove from DOM;
delRow =(el)=> {
    el.parentNode.parentNode.parentNode.parentNode.removeChild(el.parentNode.parentNode.parentNode);
}



// data to be added in model
var price;
var quant;
var amount;
var prod_name;




function calculate() {
//   ids = document.getElementById("ids").value;
  prod_name = document.getElementById("product").value;
  price = document.getElementById("price").value;
  quant = document.getElementById("unit").value;
  amount = price * quant;
  document.getElementById("amount").value = amount;
  document.getElementById("product").value=prod_name;
  document.getElementById("price").value=price
  document.getElementById("unit").value=quant

}


function addData() {
    let tableBody=document.getElementById("tablehead");
    console.log(tableBody.children);
    for (let i = 0; i < tableBody.children.length; i++) {
        // const element = array[i];
        tableBody.innerHTML += '<tr><td>'  + prod_name + '</td><td>' + price + '</td> <td>' + quant + '</td><td>' + amount + '</td></tr>'
        
    }
    

  
  
}




function share(){
    let modal=document.getElementById("myModal")
    
    window.open("whatsapp://send?text="+"model"+modal.innerHTML ,"twitter window","width=600","height=300");

}


