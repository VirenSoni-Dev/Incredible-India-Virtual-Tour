document.addEventListener("DOMContentLoaded", () => {
   // ✅ Load festival data
   loadFestivalsData();
});

let festivals = [];

async function loadFestivalsData() {
   try {
      const response = await fetch("data/festivals.json");
      if (!response.ok) throw new Error("Data fetch failed");
      festivals = await response.json();
      populateStates("all");
      applyFilters();
   } catch (error) {
      console.error("Error loading festivals:", error);
      document.getElementById("gallery").innerHTML = `<p style="text-align:center; font-family:'Poppins', sans-serif; font-size:3em; font-weight:bold;">⚠️ Sorry, data could not be loaded.</p>`;
   }
}

function populateStates(region) {
   const stateSelect = document.getElementById("stateSelect");
   stateSelect.innerHTML = '<option value="all">All States</option>';
   const filteredStates = [...new Set(festivals.filter(f => region === 'all' || f.region === region).map(f => f.state))];
   filteredStates.forEach(state => {
      const option = document.createElement("option");
      option.value = state;
      option.textContent = state;
      stateSelect.appendChild(option);
   });
   stateSelect.disabled = filteredStates.length === 0;
}

function applyFilters() {
   const search = document.getElementById("searchInput").value.toLowerCase();
   const region = document.getElementById("regionSelect").value;
   const state = document.getElementById("stateSelect").value;
   const gallery = document.getElementById("gallery");
   gallery.innerHTML = "";

   const results = festivals.filter(f =>
      (search === "" || f.title.toLowerCase().includes(search)) &&
      (region === "all" || f.region === region) &&
      (state === "all" || f.state === state)
   );

   if (results.length === 0) {
      gallery.innerHTML = `<p style="text-align:center; font-family:'Poppins', sans-serif; font-size:3em; font-weight:bold;">😢 Sorry, no content found.</p>`;
      return;
   }

   results.forEach(f => {
      const card = document.createElement("div");
      card.className = "home-card";
      card.innerHTML = `
            <div class="card-image">
                <img src="${f.image}" alt="${f.title}">
            </div>
            <div class="card-content">
                <h4>${f.title}</h4>
                <p>${f.description}</p>
            </div>
        `;
      gallery.appendChild(card);
   });
}

document.addEventListener("DOMContentLoaded", () => {
   // Get search term from URL
   const params = new URLSearchParams(window.location.search);
   const autoSearch = params.get("search");

   if (autoSearch) {
      const input = document.getElementById("searchInput");
      input.value = autoSearch;   // Fill the search box
      applyFilters();             // Trigger filter function
   }
});