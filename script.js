// Copy data from milkData.js
let milkRecords = JSON.parse(localStorage.getItem("milkRecords")) || defaultMilkRecords;
displayRecords(milkRecords);
// Run when page loads
window.onload = function () {

    displayRecords(milkRecords);

    document.getElementById("search")
        .addEventListener("keyup", filterRecords);

    document.getElementById("filter")
        .addEventListener("change", filterRecords);

};

// ---------------------------
// Display Records
// ---------------------------
function displayRecords(recordsList) {

    const body = document.getElementById("tableBody");

    body.innerHTML = "";

    if (recordsList.length === 0) {

        body.innerHTML =
            "<tr><td colspan='10'>No Records Found</td></tr>";

        document.getElementById("recordCount").innerHTML =
            "Showing 0 Records";

        return;
    }

    document.getElementById("recordCount").innerHTML =
        "Showing " + recordsList.length + " Records";

    recordsList.forEach(record => {

        body.innerHTML += `
        <tr>
            <td>${record.entry_id}</td>
            <td>${record.member_id}</td>
            <td>${record.member_name}</td>
            <td>${record.date}</td>
            <td>${record.session}</td>
            <td>${record.quantity_litres}</td>
            <td>${record.fat_pct ?? "N/A"}</td>
            <td>${record.rate}</td>
            <td>${record.amount}</td>
            <td>
                <button class="viewBtn"
                onclick="viewDetails(${record.entry_id})">
                View
                </button>
            </td>
        </tr>
        `;

    });

}

// ---------------------------
// Search + Filter
// ---------------------------
function filterRecords() {

    let searchText =
        document.getElementById("search").value.toLowerCase();

    let session =
        document.getElementById("filter").value;

    let filtered = records.filter(record => {

        let matchName =
            record.member_name.toLowerCase().includes(searchText);

        let matchId =
            record.member_id.toLowerCase().includes(searchText);

        let matchSession =
            session === "All" || record.session === session;

        return (matchName || matchId) && matchSession;

    });

    displayRecords(filtered);

}

// ---------------------------
// Add Record
// ---------------------------
function addRecord() {

    let memberId =
        document.getElementById("memberId").value.trim();

    let memberName =
        document.getElementById("memberName").value.trim();

    let date =
        document.getElementById("date").value;

    let session =
        document.getElementById("session").value;

    let quantity =
        Number(document.getElementById("quantity").value);

    let fat =
        document.getElementById("fat").value;

    let rate =
        Number(document.getElementById("rate").value);

    if (
        memberId === "" ||
        memberName === "" ||
        date === "" ||
        quantity <= 0 ||
        rate <= 0
    ) {
        alert("Please fill all required fields.");
        return;
    }

    let amount = quantity * rate;

    let newRecord = {

        entry_id: records.length + 1,

        member_id: memberId,

        member_name: memberName,

        date: date,

        session: session,

        quantity_litres: quantity,

        fat_pct: fat === "" ? null : Number(fat),

        rate: rate,

        amount: amount

    };

    records.push(newRecord);
    localStorage.setItem(
        "milkRecords",
        JSON.stringify(milkRecords)
    );

    displayRecords(records);

    clearForm();

}

// ---------------------------
// Clear Form
// ---------------------------
function clearForm() {

    document.getElementById("memberId").value = "";

    document.getElementById("memberName").value = "";

    document.getElementById("date").value = "";

    document.getElementById("session").value = "Morning";

    document.getElementById("quantity").value = "";

    document.getElementById("fat").value = "";

    document.getElementById("rate").value = "";

}

// ---------------------------
// View Details
// ---------------------------
function viewDetails(id) {

    localStorage.setItem("selectedRecord", id);

    window.location.href = "details.html";

}
