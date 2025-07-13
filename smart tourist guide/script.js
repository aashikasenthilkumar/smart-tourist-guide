window.onload = function () {
  const user = localStorage.getItem("username");
  if (!user && document.body.classList.contains("dashboard-page")) {
    alert("Login first!");
    window.location.href = "index.html";
  }
  if (user) document.getElementById("user").innerText = user;
  showPlaces();
};

function logout() {
  localStorage.clear();
  window.location.href = "index.html";
}

function addPlace() {
  const name = document.getElementById("placeName").value;
  const desc = document.getElementById("description").value;
  const link = document.getElementById("location").value;

  if (!name || !desc || !link) {
    alert("Fill all fields.");
    return;
  }

  const newPlace = { name, desc, link };
  let places = JSON.parse(localStorage.getItem("places") || "[]");
  places.push(newPlace);
  localStorage.setItem("places", JSON.stringify(places));

  document.getElementById("placeName").value = "";
  document.getElementById("description").value = "";
  document.getElementById("location").value = "";

  showPlaces();
}

function showPlaces() {
  const keyword = document.getElementById("search")?.value.toLowerCase() || "";
  const places = JSON.parse(localStorage.getItem("places") || "[]");
  const output = document.getElementById("output");
  output.innerHTML = "";

  const filtered = places.filter(p => 
    p.name.toLowerCase().includes(keyword) || 
    p.desc.toLowerCase().includes(keyword)
  );

  filtered.forEach(p => {
    output.innerHTML += `
      <div class="card">
        <h4>${p.name}</h4>
        <p>${p.desc}</p>
        <a href="${p.link}" target="_blank">View on Map</a>
      </div>
    `;
  });
}