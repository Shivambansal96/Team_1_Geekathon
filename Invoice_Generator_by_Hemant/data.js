let review=document.getElementById("review")
review.addEventListener("click",()=>{
    
    var rows = document.querySelectorAll("tr.single-row");

    let finalRows = ''
    let finalAmt = 0

        var oldItems = document.querySelectorAll('.print-item');
        if(oldItems.length)
        {
            oldItems.forEach((item)=>{
                console.log(item,"fddff")
                item.remove()
            })
        }

    rows.forEach((currentRow) => {
        
        var product =  currentRow.querySelector('.product').value
        var unit = currentRow.querySelector(".unit").value;
        var price = currentRow.querySelector(".price").value;

        let amt = unit * price;
        let row =  '<tr class="print-item">';
        row += '<td>'+product+'</td>';
        row += '<td>'+unit+'</td>';
        row += '<td>'+price+'</td>';
        row += '<td>'+ (unit * price )+'</td>';
        row += '</tr>';
        
        finalRows += row;
        finalAmt += amt 
    });

    document.getElementById("finalResult").insertAdjacentHTML("afterbegin",finalRows);
    document.getElementById('subtotal-amount').innerHTML  = (finalAmt).toFixed(2)
    document.getElementById("totalDis").innerHTML = '<span>'+ (finalAmt + 25).toFixed(2) +'</span>'; 

let whom2=document.getElementById("whom2").value;
document.getElementById("whom").value=whom2

let from=document.getElementById("from").value;
document.getElementById("from3").value=from


let mailTo=document.getElementById("to2").value
document.getElementById("idTo").value=mailTo



let addTo=document.getElementById("address_to").value
document.getElementById("addTo").value=addTo

let addFrom=document.getElementById("FromAdd").value
document.getElementById("billAdd").value=addFrom



//let billFrom=document.getElementById("from").value


let mailFrom=document.getElementById("fromMail").value
document.getElementById("billmail").value=mailFrom

// this data is for 1st part invoice number and date
let vNumber=document.getElementById("voice").value
document.getElementById("voice_popup").value=vNumber

//fetch tha value for current date
let currentDate=document.getElementById("cDate").innerText
document.getElementById("cdate").innerText=currentDate



//now data fetch for due date

 let due_date=document.getElementById("Ddate").value
 document.getElementById("dueDate_popup").value =due_date

})



