// Selecting Elements

const journalText = document.getElementById("journalText");
const saveBtn = document.getElementById("saveBtn");
const backBtn = document.getElementById("backBtn");
const bgColor = document.getElementById("bgColor");


// ---------------------------
// Load saved journal
// ---------------------------

const savedJournal = localStorage.getItem("journal");

if (savedJournal !== null) {
    journalText.value = savedJournal;
}


// ---------------------------
// Load saved background colour
// ---------------------------

const savedColor = localStorage.getItem("backgroundColor");

if (savedColor !== null) {
    document.body.style.backgroundColor = savedColor;
    bgColor.value = savedColor;
}


// ---------------------------
// Save Journal
// ---------------------------

saveBtn.addEventListener("click", function () {

    localStorage.setItem("journal", journalText.value);

    alert("Journal saved successfully!");

});


// ---------------------------
// Change Background Colour
// ---------------------------

bgColor.addEventListener("input", function () {

    document.body.style.backgroundColor = bgColor.value;

    localStorage.setItem("backgroundColor", bgColor.value);

});


// ---------------------------
// Back Button
// ---------------------------

backBtn.addEventListener("click", function () {

    window.location.href = "main.html";

});