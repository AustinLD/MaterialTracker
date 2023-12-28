const trackingBody = document.getElementById('trackingBody');

// Load existing data from localStorage on page load
document.addEventListener('DOMContentLoaded', () => {
  loadStoredData();
});

function createTableCell(text, isDeleteButton = false) {
  const cell = document.createElement('td');

  if (typeof text === 'string') {
    if (text.startsWith('truck')) {
      const truckNumber = text.substring(5);
      cell.textContent = `Truck ${truckNumber}`;
    } else {
      cell.textContent = text;
    }

    const lowerCaseText = text.toLowerCase();
    if (lowerCaseText === 'batts' || lowerCaseText === 'blow') {
      cell.textContent = text.toUpperCase();
    }
  } else {
    cell.textContent = text;
  }

  if (isDeleteButton) {
    const deleteButton = createDeleteButton(cell.parentNode);
    cell.appendChild(deleteButton);
  }

  return cell;
}

function createDeleteButton(row) {
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'X';
  deleteButton.onclick = function () {
    deleteRow(row);
  };
  return deleteButton;
}

function createTableCellWithDelete(text, row) {
  const cell = document.createElement('td');
  cell.textContent = text;

  const deleteButton = createDeleteButton(row);
  cell.appendChild(deleteButton);

  return cell;
}

function trackMaterials() {
  const truckInput = document.getElementById('truckInput');
  const materialSelect = document.getElementById('materialSelect');
  const materialCount = document.getElementById('materialCount');

  const truck = truckInput.value.trim();
  const materialType = materialSelect.value;
  const count = parseInt(materialCount.value, 10);

  if (isNaN(count)) {
    alert('Please enter a valid material count.');
    return;
  }

  const timestamp = new Date().toLocaleString();

  const newRow = document.createElement('tr');
  const cells = [
    createTableCell(truck),
    createTableCell(materialType),
    createTableCell(count),
    createTableCellWithDelete(timestamp, newRow),
  ];

  cells.forEach(cell => newRow.appendChild(cell));
  trackingBody.appendChild(newRow);

  // Save the updated data to localStorage
  saveDataToLocalStorage();
}

function deleteRow(row) {
  row.remove();

  // Save the updated data to localStorage
  saveDataToLocalStorage();
}

function saveDataToLocalStorage() {
  const tableData = [];

  trackingBody.querySelectorAll('tr').forEach(row => {
    const rowData = {
      truck: row.cells[0].textContent,
      materialType: row.cells[1].textContent,
      count: row.cells[2].textContent,
      timestamp: row.cells[3].textContent,
    };
    tableData.push(rowData);
  });

  localStorage.setItem('trackingData', JSON.stringify(tableData));
}

function loadStoredData() {
  const storedData = localStorage.getItem('trackingData');

  if (storedData) {
    const tableData = JSON.parse(storedData);

    tableData.forEach(data => {
      const newRow = document.createElement('tr');
      const cells = [
        createTableCell(data.truck),
        createTableCell(data.materialType),
        createTableCell(data.count),
        createTableCellWithDelete(data.timestamp, newRow),
      ];

      cells.forEach(cell => newRow.appendChild(cell));
      trackingBody.appendChild(newRow);
    });
  }
}