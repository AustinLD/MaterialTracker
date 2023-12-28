const trackingList = document.getElementById('trackingList');

function trackMaterials() {
  const truckSelect = document.getElementById('truckSelect');
  const materialSelect = document.getElementById('materialSelect');
  const materialCount = document.getElementById('materialCount');

  const truck = truckSelect.value;
  const materialType = materialSelect.value;
  const count = parseInt(materialCount.value, 10);

  if (isNaN(count)) {
    alert('Please enter a valid material count.');
    return;
  }

  const timestamp = new Date().toLocaleString();
  const trackingItem = document.createElement('li');
  trackingItem.textContent = `${truck} - ${materialType}: ${count} (Recorded at ${timestamp})`;
  trackingList.appendChild(trackingItem);

  // You can add additional logic here to save the data to a server or local storage.
}