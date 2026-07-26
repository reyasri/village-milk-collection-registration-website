let id = Number(localStorage.getItem("selectedRecord"));

let record = milkRecords.find(r => r.entry_id === id);

if(record){

document.getElementById("entryId").innerHTML = record.entry_id;

document.getElementById("memberId").innerHTML = record.member_id;

document.getElementById("memberName").innerHTML = record.member_name;

document.getElementById("date").innerHTML = record.date;

document.getElementById("session").innerHTML = record.session;

document.getElementById("quantity").innerHTML = record.quantity_litres;

document.getElementById("fat").innerHTML =
record.fat_pct ?? "N/A";

document.getElementById("rate").innerHTML =
record.rate;

document.getElementById("amount").innerHTML =
record.amount;

let total = 0;

milkRecords.forEach(r=>{

if(r.member_id===record.member_id){

total+=r.amount;

}

});

document.getElementById("runningTotal").innerHTML="₹"+total;

}
else{

alert("Record not found");

}

function goBack(){

window.location.href="index.html";

}