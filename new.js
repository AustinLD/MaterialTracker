// Functions for inventory management
function loadProductsOntoTruck() {
	const product = document.getElementById("loadedProduct").value;
	const quantity = parseInt(document.getElementById("loadedQuantity").value);
	const truckNumber = document.getElementById("truckNumber").value;

	if (!product || isNaN(quantity) || quantity <= 0 || !truckNumber) {
		alert("Please enter valid product, quantity, and truck number.");
		return;
	}

	const currentDate = new Date().toISOString().split("T")[0];
	let inventoryData = JSON.parse(localStorage.getItem("inventoryData")) || [];

	let currentDateData = inventoryData.find(
		(entry) =>
			entry.date === currentDate &&
			entry.truckNumber === truckNumber &&
			entry.product === product
	);

	if (!currentDateData) {
		currentDateData = {
			date: currentDate,
			truckNumber: truckNumber,
			product: product,
			productLoaded: 0,
			productLeftOver: 0,
			productRemoved: 0,
			totalProductUsed: 0,
		};
		inventoryData.push(currentDateData);
	}

	currentDateData.productLoaded += quantity;
	currentDateData.totalProductUsed += quantity; // Increment totalProductUsed

	localStorage.setItem("inventoryData", JSON.stringify(inventoryData));

	updateInventoryTable();
	updateTotalProductsRemovedTable(); // Added to update the total products removed table
}

function recordLeftOverProducts() {
	const product = document.getElementById("leftOverProduct").value;
	const leftOverQuantity = parseInt(
		document.getElementById("leftOverQuantity").value
	);
	const truckNumber = document.getElementById("truckNumber").value;

	if (
		!product ||
		isNaN(leftOverQuantity) ||
		leftOverQuantity < 0 ||
		!truckNumber
	) {
		alert("Please enter valid product, quantity, and truck number.");
		return;
	}

	const currentDate = new Date().toISOString().split("T")[0];
	let inventoryData = JSON.parse(localStorage.getItem("inventoryData")) || [];

	let currentDateData = inventoryData.find(
		(entry) =>
			entry.date === currentDate &&
			entry.truckNumber === truckNumber &&
			entry.product === product
	);

	if (!currentDateData) {
		alert("No matching truck entry found for today and the specified product.");
		return;
	}

	currentDateData.productLeftOver += leftOverQuantity;
	currentDateData.totalProductUsed =
		currentDateData.productLoaded - currentDateData.productLeftOver; // Correctly calculate Total Product Used

	localStorage.setItem("inventoryData", JSON.stringify(inventoryData));

	updateInventoryTable();
	updateTotalProductsRemovedTable(); // Added to update the total products removed table
}

function removeProductsFromTruck() {
	const product = document.getElementById("removeProduct").value;
	const removeQuantity = parseInt(
		document.getElementById("removeQuantity").value
	);
	const truckNumber = document.getElementById("truckNumber").value;

	if (!product || isNaN(removeQuantity) || removeQuantity < 0 || !truckNumber) {
		alert("Please enter valid product, quantity, and truck number.");
		return;
	}

	const currentDate = new Date().toISOString().split("T")[0];
	let inventoryData = JSON.parse(localStorage.getItem("inventoryData")) || [];

	let currentDateData = inventoryData.find(
		(entry) =>
			entry.date === currentDate &&
			entry.truckNumber === truckNumber &&
			entry.product === product
	);

	if (!currentDateData) {
		alert("No matching truck entry found for today and the specified product.");
		return;
	}

	currentDateData.productRemoved += removeQuantity;

	localStorage.setItem("inventoryData", JSON.stringify(inventoryData));

	updateInventoryTable();
	updateTotalProductsRemovedTable(); // Added to update the total products removed table
}

function deleteRow(index) {
	let inventoryData = JSON.parse(localStorage.getItem("inventoryData")) || [];

	// Remove the selected row
	inventoryData.splice(index, 1);

	localStorage.setItem("inventoryData", JSON.stringify(inventoryData));

	updateInventoryTable();
	updateTotalProductsRemovedTable(); // Ensure this function is defined
}

function updateTotalProductsRemovedTable() {
	// Implementation for updating total products removed table
	// ...
}

// Functions for warehouse inventory tracking
function recordIncomingDelivery() {
	const product = document.getElementById("incomingProduct").value;
	const quantity = parseInt(document.getElementById("incomingQuantity").value);

	if (!product || isNaN(quantity) || quantity <= 0) {
		alert("Please enter a valid product name and quantity.");
		return;
	}

	updateInventory(product, quantity); // Update inventory with positive quantity for incoming delivery
}

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
            <td>${entry.productLoaded || 0}</td>
            <td>${entry.productLeftOver || 0}</td>
            <td>${(entry.productLoaded || 0) - (entry.productLeftOver || 0)}</td>
            <td>${entry.productRemoved || 0}</td>
            <td>${((entry.productLoaded || 0) - (entry.productLeftOver || 0)) - (entry.productRemoved || 0)}</td>
        `;
        inventoryTableBody.appendChild(row);
    });
}

function loadInventoryData() {
	// Call updateInventoryTable to populate the table with existing inventory data
	updateInventoryTable();
}

function removeQuantity() {
  const product = document.getElementById('incomingProduct').value;
  const quantity = parseInt(document.getElementById('incomingQuantity').value);

  if (!product || isNaN(quantity) || quantity <= 0) {
      alert('Please enter a valid product name and quantity.');
      return;
  }

  updateInventory(product, -quantity); // Update inventory with negative quantity to remove
}

// Event listener for loading inventory data when the page loads
document.addEventListener("DOMContentLoaded", loadInventoryData);