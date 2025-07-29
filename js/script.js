document.getElementById("searchBtn").addEventListener('click', handleSearch)
document.getElementById("homeSearchInput").addEventListener('keypress', (e) => {
   if (e.key === "Enter") handleSearch();
})

function handleSearch() {
   const query = document.getElementById("homeSearchInput").value.trim().toLowerCase();

   if (!query) {
      alert("Please enter something to search");
      return;
   }

   // Keywords for deciding where to go
   const festivalKeywords = ["festival", "festivals", "diwali", "holi", "durga", "onam", "pongal", "ganesh chaturthi"];
   const cuisineKeywords = ["cuisine", "food", "dish", "meal", "dosa", "vada", "samosa", "rasgulla", "aloo paratha"];

   if (festivalKeywords.some(word => query.includes(word))) {
      window.location.href = `festivals.html?search=${encodeURIComponent(query)}`;
   }
   else if (cuisineKeywords.some(word => query.includes(word))) {
      window.location.href = `cuisines.html?search=${encodeURIComponent(query)}`;
   }
   else {
      // Default fallback (e.g., to explore page)
      // window.location.href = `explore.html?search=${encodeURIComponent(query)}`;
      alert("Sorry No match found!")
   }
}