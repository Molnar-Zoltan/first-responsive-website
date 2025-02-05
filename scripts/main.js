const openButton = document.getElementById('open-sidebar-button');
const mobileNavbar = document.getElementById('mobile-navbar');
let emailText;


  
function openSidebar() {
    mobileNavbar.classList.add('show');
    openButton.setAttribute('aria-expanded', 'true');
}
  
function closeSidebar() {
    mobileNavbar.classList.remove('show');
    openButton.setAttribute('aria-expanded', 'false');
}

async function loadContent(file) {

    // fetch(file) // Old code
    // .then(response => {
    //     if (!response.ok) {
    //         throw new Error('Network response was not ok');
    //     }
    //     return response.text();
    // })
    // .then(html => {
    //     document.getElementById('content').innerHTML = html;
    // })
    // .catch(error => {
    //     console.error('There was a problem with the fetch operation:', error);
    //     document.getElementById('content').innerHTML = '<p>Error loading content.</p>';
    // })

    try {
        const response = await fetch(file);

        if (!response.ok) {
            throw new Error("Failed to load the page.");
        }

        const html = await response.text();

        document.getElementById('content').innerHTML = html;

        if (file.includes("contact")) {
            emailText = document.querySelector(".emailText");
            resizeEmailInput();
        }

    }
    catch(error) {
        console.error(error);
        ocument.getElementById('content').innerHTML = `<p>${error}</p>`;
    }

}

function showCoprightText() {
    const currentYear = new Date().getFullYear();
    const copyrightText = `&copy; ${currentYear}. All rights reserved.`;

    document.getElementById('copyright').innerHTML = copyrightText;
}


function copyText() {

    const textCopied = document.querySelector(".textCopied");
    
    emailText.select();
    emailText.setSelectionRange(0, 99999); // For mobile devices
    navigator.clipboard.writeText(emailText.value)
        .then(() => textCopied.style.display = "flex")
        .catch(error => console.error("Error copying text:", error));

    
}

function resizeEmailInput() { // Resizes the E-Mail input field to match the text length
    emailText.style.width = emailText.value.length - 1 + "ch"; 
}



document.addEventListener("DOMContentLoaded", (event) => {
    loadContent('pages/home.html');
    showCoprightText();
});

