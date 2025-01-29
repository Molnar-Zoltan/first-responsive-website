const openButton = document.getElementById('open-sidebar-button')
const mobileNavbar = document.getElementById('mobile-navbar')

  
function openSidebar() {
    mobileNavbar.classList.add('show')
    openButton.setAttribute('aria-expanded', 'true')
}
  
function closeSidebar() {
    mobileNavbar.classList.remove('show')
    openButton.setAttribute('aria-expanded', 'false')
}

function loadContent(file) {

    fetch(file)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(html => {
        document.getElementById('content').innerHTML = html;
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        document.getElementById('content').innerHTML = '<p>Error loading content.</p>';
    })

}

function showCoprightText() {
    const currentYear = new Date().getFullYear();
    const copyrightText = `&copy; ${currentYear}. All rights reserved.`;

    document.getElementById('copyright').innerHTML = copyrightText;
}


window.onload = function() {
    loadContent('/pages/home.html');
    showCoprightText();
}


