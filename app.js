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
	updateTotalProductsRemovedTable();
}

function updateTotalProductsRemovedTable() {
}

document.addEventListener("DOMContentLoaded", function () {
	updateInventoryTable();
	updateTotalProductsRemovedTable();
});

function updateInventoryTable() {
	const inventoryTableBody = document.getElementById("inventoryTableBody");
	const inventoryData = JSON.parse(localStorage.getItem("inventoryData")) || [];

	// Clear the table body
	inventoryTableBody.innerHTML = "";

	inventoryData.forEach((entry, index) => {
		const leftOnTruck =
			entry.productLoaded - entry.productLeftOver - entry.productRemoved;

		const row = document.createElement("tr");
		row.innerHTML = `
          <td>${entry.date}</td>
          <td>${entry.truckNumber}</td>
          <td>${entry.product}</td>
          <td>${entry.productLoaded}</td>
          <td>${entry.productLeftOver}</td>
          <td>${
						entry.productLoaded - entry.productLeftOver
					}</td> <!-- Calculate Total Product Used -->
          <td>${entry.productRemoved}</td>
          <td class="left-on-truck">${leftOnTruck}</td> <!-- Display Left on Truck -->
          <td><button onclick="deleteRow(${index})" class="delete-button">X</button></td>
      `;
		inventoryTableBody.appendChild(row);
	});
}
