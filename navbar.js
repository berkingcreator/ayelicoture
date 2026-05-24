function toggleMenu() {
    document.getElementById('mobileMenu').classList.toggle('translate-x-full');
    document.getElementById('navIcon').classList.toggle('open');
}
function closeMenu() {
    document.getElementById('mobileMenu').classList.add('translate-x-full');
    document.getElementById('navIcon').classList.remove('open');
}
document.addEventListener('contextmenu', e => e.preventDefault());
