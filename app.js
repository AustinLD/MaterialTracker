const trackingBody = document.getElementById('trackingBody');

function createTableCell(text, isDeleteButton = false) {
  const cell = document.createElement('td');

  // Check if text is a string before using toLowerCase
  if (typeof text === 'string') {
    // Add space between "truck" and truck number
    if (text.startsWith('truck')) {
      const truckNumber = text.substring(5); // Extract truck number
      cell.textContent = `Truck ${truckNumber}`;
    } else {
      cell.textContent = text;
    }

    // Capitalize "batts" and "blow"
    const lowerCaseText = text.toLowerCase();
    if (lowerCaseText === 'batts' || lowerCaseText === 'blow') {
      cell.textContent = text.toUpperCase();
    }
  } else {
    cell.textContent = text;
  }

  // Add a delete button for non-empty rows
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

  // Add Delete button for the "timestamp" cell
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
    createTableCellWithDelete(timestamp, newRow), // Timestamp with Delete button
  ];

  cells.forEach(cell => newRow.appendChild(cell));
  trackingBody.appendChild(newRow);
}

function deleteRow(row) {
  row.remove();
}