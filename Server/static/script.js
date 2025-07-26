async function loadLocations() {
  try {
    const res = await fetch("/get_location_names");
    const data = await res.json();
    const locationSelect = document.getElementById("location");

    data.locations.forEach(loc => {
      const opt = document.createElement("option");
      opt.value = loc;
      opt.text = loc;
      locationSelect.appendChild(opt);
    });
  } catch (error) {
    console.error("Failed to load locations:", error);
  }
}

async function predictPrice() {
  const sqft = document.getElementById("sqft").value;
  const bhk = document.getElementById("bhk").value;
  const bath = document.getElementById("bath").value;
  const location = document.getElementById("location").value;

  const formData = new FormData();
  formData.append("total_sqft", sqft);
  formData.append("location", location);
  formData.append("bhk", bhk);
  formData.append("bath", bath);

  try {
    const res = await fetch("/predict_home_price", {
      method: "POST",
      body: formData
    });

    const data = await res.json();
    document.getElementById("result").innerText = `Estimated Price: ₹ ${data.estimated_price} Lakhs`;
  } catch (error) {
    document.getElementById("result").innerText = "Error fetching prediction.";
    console.error("Prediction error:", error);
  }
}

window.onload = loadLocations;
