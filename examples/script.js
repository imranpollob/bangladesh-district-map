const districts = [
  "bagerhat", "bandarban", "barguna", "barisal", "bhola", "bogra", "brahmanbaria", "chandpur", "chapai nawabganj", "chittagong", "chuadanga", "comilla", "cox's bazar", "dhaka", "dinajpur", "faridpur", "feni", "gaibandha", "gazipur", "gopalganj", "habiganj", "jamalpur", "jessore", "jhalokati", "jhenaidah", "joypurhat", "khagrachari", "khulna", "kishoreganj", "kurigram", "kushtia", "lakshmipur", "lalmonirhat", "madaripur", "magura", "manikganj", "maulvibazar", "meherpur", "munshiganj", "mymensingh", "naogaon", "narail", "narayanganj", "narsingdi", "natore", "netrokona", "nilphamari", "noakhali", "pabna", "panchagarh", "patuakhali", "pirojpur", "rajbari", "rajshahi", "rangamati", "rangpur", "satkhira", "shariatpur", "sherpur", "sirajganj", "sunamganj", "sylhet", "tangail", "thakurgaon"
];

const baseMap = '../bd.png';
const mapImg = document.getElementById('map');
const loader = document.getElementById('loader');
const content = document.getElementById('content');
const districtList = document.getElementById('districts');

// Function to preload images
function preloadImages() {
  const images = [baseMap, ...districts.map(d => `../maps/${d}.png`)];
  const promises = images.map(src => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = resolve;
      img.onerror = reject;
      img.src = src;
    });
  });
  return Promise.all(promises);
}

// Populate district list
function populateList() {
  districts.forEach(district => {
    const tag = document.createElement('span');
    tag.className = 'tag';
    tag.textContent = district.replace(/\b\w/g, l => l.toUpperCase()); // Capitalize
    tag.tabIndex = 0; // Make focusable
    tag.addEventListener('mouseenter', () => {
      mapImg.src = `../maps/${district}.png`;
      mapImg.alt = `Map of Bangladesh with ${district} highlighted`;
    });
    tag.addEventListener('mouseleave', () => {
      mapImg.src = baseMap;
      mapImg.alt = 'Map of Bangladesh';
    });
    tag.addEventListener('focus', () => {
      mapImg.src = `../maps/${district}.png`;
      mapImg.alt = `Map of Bangladesh with ${district} highlighted`;
    });
    tag.addEventListener('blur', () => {
      mapImg.src = baseMap;
      mapImg.alt = 'Map of Bangladesh';
    });
    districtList.appendChild(tag);
  });
}// Start
preloadImages().then(() => {
  loader.style.display = 'none';
  content.style.display = 'block';
  populateList();
}).catch(error => {
  console.error('Error loading images:', error);
  loader.innerHTML = '<p>Error loading map. Please refresh.</p>';
});