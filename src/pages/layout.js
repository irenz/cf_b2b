/**
 * HTML Layout Template
 * Provides common layout structure for all pages
 */

export function createLayout(title, content, additionalScripts = '') {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="B2B Product Exhibition - High-quality industrial products and solutions">
  <title>${title} - B2B Product Exhibition</title>
  <link rel="stylesheet" href="/css/main.css">
</head>
<body>
  ${createNavbar()}

  <main>
    ${content}
  </main>

  ${createFooter()}

  <script src="/js/main.js"></script>
  ${additionalScripts}
</body>
</html>`;
}

function createNavbar() {
  return `
  <nav class="navbar">
    <div class="nav-container">
      <a href="/" class="logo">B2B Products</a>
      <div class="menu-toggle">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul class="nav-menu">
        <li><a href="/" class="nav-link">Home</a></li>
        <li><a href="/products" class="nav-link">Products</a></li>
        <li><a href="/about" class="nav-link">About</a></li>
        <li><a href="/contact" class="nav-link">Contact</a></li>
        <li><a href="/admin" class="nav-link">Admin</a></li>
      </ul>
    </div>
  </nav>`;
}

function createFooter() {
  return `
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-section">
        <h3>About Us</h3>
        <p>Leading provider of high-quality industrial products and solutions worldwide.</p>
      </div>
      <div class="footer-section">
        <h3>Quick Links</h3>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/products">Products</a></li>
          <li><a href="/about">About Us</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </div>
      <div class="footer-section">
        <h3>Contact Info</h3>
        <ul>
          <li>Email: info@example.com</li>
          <li>Phone: +1 234 567 8900</li>
          <li>Address: 123 Business St, City, Country</li>
        </ul>
      </div>
      <div class="footer-section">
        <h3>Follow Us</h3>
        <ul>
          <li><a href="#" target="_blank">LinkedIn</a></li>
          <li><a href="#" target="_blank">Facebook</a></li>
          <li><a href="#" target="_blank">Twitter</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; ${new Date().getFullYear()} B2B Product Exhibition. All rights reserved.</p>
    </div>
  </footer>`;
}
