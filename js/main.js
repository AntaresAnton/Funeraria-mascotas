// Initialization
document.addEventListener('DOMContentLoaded', () => {
    // Run calculator if element exists
    if (document.getElementById('price-display')) {
        calculatePrice();
    }
    
    // Update year
    updateYear();
});

function updateYear() {
    const yearElements = document.querySelectorAll('.current-year');
    const currentYear = new Date().getFullYear();
    yearElements.forEach(el => {
        el.textContent = currentYear;
    });
}

// Memorial Logic
function toggleModal(modalID){
    const modal = document.getElementById(modalID);
    if(modal) modal.classList.toggle('hidden');
}

function lightCandle(btn) {
    const icon = btn.querySelector('svg');
    const countSpan = btn.querySelector('.candle-count');
    
    // Effect
    icon.classList.toggle('text-yellow-400'); // Toggle yellow color
    icon.classList.add('animate-pulse'); // Add pulse animation
    
    // Increment logic (simple simulation)
    let count = parseInt(countSpan.innerText);
    if(icon.classList.contains('text-yellow-400')) {
        count++;
    } else {
        count--;
        icon.classList.remove('animate-pulse');
    }
    countSpan.innerText = count;
}

// Urnas Filter Logic
function filterSelection(c) {
    var x, i;
    x = document.getElementsByClassName("product-item");
    if (c == "all") c = "";
    
    // Buttons style
    var btns = document.getElementsByClassName("filter-btn");
    for (i = 0; i < btns.length; i++) {
        btns[i].classList.remove("bg-primary", "text-white", "border-primary");
        btns[i].classList.add("bg-white", "text-gray-500", "border-gray-200");
        if (window.event.currentTarget == btns[i]) {
            btns[i].classList.add("bg-primary", "text-white", "border-primary");
            btns[i].classList.remove("bg-white", "text-gray-500", "border-gray-200");
        }
    }

    for (i = 0; i < x.length; i++) {
        w3RemoveClass(x[i], "hidden");
        if (x[i].className.indexOf(c) == -1) w3AddClass(x[i], "hidden");
    }
}

function w3AddClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        if (arr1.indexOf(arr2[i]) == -1) {element.className += " " + arr2[i];}
    }
}

function w3RemoveClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        while (arr1.indexOf(arr2[i]) > -1) {
            arr1.splice(arr1.indexOf(arr2[i]), 1);     
        }
    }
    element.className = arr1.join(" ");
}

// Servicios Calculator Logic
function calculatePrice() {
    const speciesEl = document.querySelector('input[name="species"]:checked');
    const weightEl = document.getElementById('weight');
    const serviceEl = document.getElementById('service');
    const weightGroup = document.getElementById('weight-group');
    const priceDisplay = document.getElementById('price-display');

    if (!speciesEl || !weightEl || !serviceEl || !weightGroup || !priceDisplay) return;

    const species = speciesEl.value;
    const weight = weightEl.value;
    const service = serviceEl.value;

    // Hide weight for cats simpler logic
    if (species === 'cat') {
        weightGroup.classList.add('opacity-50', 'pointer-events-none');
    } else {
        weightGroup.classList.remove('opacity-50', 'pointer-events-none');
    }

    let price = 0;

    if (species === 'cat') {
        // Cat Pricing fixed
        if (service === 'individual') price = 85000;
        else price = 45000;
    } else {
        // Dog Pricing
        if (service === 'individual') {
            if (weight === 'small') price = 85000;
            else if (weight === 'medium') price = 110000;
            else price = 140000;
        } else {
            if (weight === 'small') price = 45000;
            else if (weight === 'medium') price = 65000;
            else price = 85000;
        }
    }

    // Format CLT
    const formatter = new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP',
        minimumFractionDigits: 0
    });

    priceDisplay.innerText = formatter.format(price);
}
