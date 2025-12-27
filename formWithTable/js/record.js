let records = JSON.parse(localStorage.getItem("records") ?? JSON.stringify([]));

const ROOT = document.getElementById("table-root");
const table = document.createElement("table");
const tHead = document.createElement("thead");
const tBody = document.createElement("tbody");

const headers = ["name", "age", "dob", "gender", "Actions"];
headers.forEach(function (header) {
  const th = document.createElement("th");
  th.textContent = header;
  tHead.appendChild(th);
});

records.forEach(function (element) {
  const tr = document.createElement("tr");

  Object.values(element).forEach(function (text) {
    const td = document.createElement("td");
    td.textContent = text;
    tr.appendChild(td);
  });

  const actionTd = document.createElement("td");
  const dltButton = document.createElement("button");

  dltButton.textContent = "Delete";
  dltButton.setAttribute("id", "delete");

  dltButton.addEventListener("click", function () {
    console.log("Listener created for", tr);
    const rows = [...tBody.querySelectorAll("tr")];
    console.log(rows);
    
    const rowIndex = rows.indexOf(tr);
    console.log(rowIndex, tr);
    if (rowIndex !== -1) {
      tr.remove();
      records.splice(rowIndex, 1);
      localStorage.setItem("records", JSON.stringify(records));
    }
  });
  actionTd.appendChild(dltButton);
  tr.appendChild(actionTd);
  tBody.appendChild(tr);
});
table.appendChild(tHead);
table.appendChild(tBody);
ROOT.appendChild(table);
