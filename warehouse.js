// Function to record incoming deliveries
function recordIncomingDelivery() {
	const product = document.getElementById("incomingProduct").value;
	const quantity = parseInt(document.getElementById("incomingQuantity").value);

	if (!product || isNaN(quantity) || quantity <= 0) {
		alert("Please enter a valid product name and quantity.");
		return;
	}

	updateInventory(product, quantity); // Update inventory with positive quantity for incoming delivery
}

// Function to update the inventory based on recorded transactions
function updateInventory(product, quantity) {
	let inventoryData = JSON.parse(localStorage.getItem("inventoryData")) || [];

	// Find the entry for the product in inventory data
	let productEntry = inventoryData.find((entry) => entry.product === product);

	// If product entry doesn't exist, create a new one
	if (!productEntry) {
		productEntry = { product: product, quantity: 0 };
		inventoryData.push(productEntry);
	}

	// Update the quantity for the product
	productEntry.quantity += quantity;

	// Update local storage with the modified inventory data
	localStorage.setItem("inventoryData", JSON.stringify(inventoryData));

	// Update the display of inventory table
	updateInventoryTable();
}

// Function to update the display of inventory table
function updateInventoryTable() {
	const inventoryTableBody = document.getElementById("inventoryTableBody");
	const inventoryData = JSON.parse(localStorage.getItem("inventoryData")) || [];

	// Clear the table body
	inventoryTableBody.innerHTML = "";

	// Populate the table with inventory data
	inventoryData.forEach((entry) => {
		const row = document.createElement("tr");
		row.innerHTML = `
          <td>${entry.product}</td>
          <td>${
						entry.quantity || 0
					}</td> <!-- Use 0 as default value if quantity is undefined -->
      `;
		inventoryTableBody.appendChild(row);
	});
}

// Function to load inventory data when the page loads
function loadInventoryData() {
	// Call updateInventoryTable to populate the table with existing inventory data
	updateInventoryTable();
}

// Call loadInventoryData when the page loads
document.addEventListener("DOMContentLoaded", loadInventoryData);

// Function to remove quantity
function removeQuantity() {
  const product = document.getElementById('incomingProduct').value;
  const quantity = parseInt(document.getElementById('incomingQuantity').value);

  if (!product || isNaN(quantity) || quantity <= 0) {
      alert('Please enter a valid product name and quantity.');
      return;
  }

  updateInventory(product, -quantity); // Update inventory with negative quantity to remove
}

