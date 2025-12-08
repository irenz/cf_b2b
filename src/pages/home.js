/**
 * Home Page
 * Displays company introduction and featured products
 */

import { createLayout } from './layout';

export async function homePage(env) {
  const content = `
    <!-- Hero Section -->
    <section class="hero">
      <div class="container">
        <h1>Welcome to Our B2B Product Exhibition</h1>
        <p>Your trusted partner for high-quality industrial products and innovative solutions worldwide</p>
        <div style="margin-top: 2rem;">
          <a href="/products" class="btn btn-primary" style="margin-right: 1rem;">Browse Products</a>
          <a href="/contact" class="btn btn-secondary">Contact Us</a>
        </div>
      </div>
    </section>

    <!-- Company Introduction -->
    <section class="container" style="margin-top: 3rem;">
      <div style="text-align: center; max-width: 800px; margin: 0 auto;">
        <h2 style="font-size: 2rem; margin-bottom: 1rem; color: var(--primary-color);">About Our Company</h2>
        <p style="color: var(--text-light); font-size: 1.1rem; line-height: 1.8;">
          We are a leading manufacturer and supplier of high-quality industrial products.
          With over 20 years of experience, we serve clients across the globe with innovative
          solutions and exceptional customer service. Our commitment to quality and reliability
          has made us a trusted partner in the industry.
        </p>
      </div>
    </section>

    <!-- Company Features -->
    <section class="container" style="margin-top: 3rem;">
      <h2 style="text-align: center; font-size: 2rem; margin-bottom: 2rem; color: var(--primary-color);">Why Choose Us</h2>
      <div class="grid grid-3">
        <div class="card">
          <div class="card-content" style="text-align: center;">
            <div style="font-size: 3rem; color: var(--primary-color); margin-bottom: 1rem;">🏆</div>
            <h3 class="card-title">Premium Quality</h3>
            <p class="card-description">
              All products undergo strict quality control and meet international standards.
            </p>
          </div>
        </div>
        <div class="card">
          <div class="card-content" style="text-align: center;">
            <div style="font-size: 3rem; color: var(--primary-color); margin-bottom: 1rem;">🌍</div>
            <h3 class="card-title">Global Reach</h3>
            <p class="card-description">
              Serving customers in over 50 countries with reliable logistics and support.
            </p>
          </div>
        </div>
        <div class="card">
          <div class="card-content" style="text-align: center;">
            <div style="font-size: 3rem; color: var(--primary-color); margin-bottom: 1rem;">💼</div>
            <h3 class="card-title">Expert Service</h3>
            <p class="card-description">
              Professional team ready to provide customized solutions for your needs.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="container" style="margin-top: 3rem; margin-bottom: 3rem;">
      <h2 style="text-align: center; font-size: 2rem; margin-bottom: 2rem; color: var(--primary-color);">Featured Products</h2>
      <div id="featured-products" class="grid grid-3">
        <div class="spinner"></div>
      </div>
      <div style="text-align: center; margin-top: 2rem;">
        <a href="/products" class="btn btn-primary">View All Products</a>
      </div>
    </section>
  `;

  const scripts = `
    <script>
      // Load featured products
      async function loadFeaturedProducts() {
        try {
          const response = await API.get('/products/featured');
          const products = response.data || [];

          const container = document.getElementById('featured-products');

          if (products.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: var(--text-light);">No featured products available.</p>';
            return;
          }

          container.innerHTML = products.map(product => \`
            <div class="card">
              <img src="\${product.image_url || '/images/placeholder.jpg'}" alt="\${product.name}" class="card-image">
              <div class="card-content">
                <h3 class="card-title">\${product.name}</h3>
                <p class="card-description">\${product.description || 'No description available'}</p>
                <a href="/products/\${product.id}" class="btn btn-primary">View Details</a>
              </div>
            </div>
          \`).join('');
        } catch (error) {
          console.error('Error loading featured products:', error);
          document.getElementById('featured-products').innerHTML =
            '<p style="text-align: center; color: var(--text-light);">Unable to load products. Please try again later.</p>';
        }
      }

      loadFeaturedProducts();
    </script>
  `;

  const html = createLayout('Home', content, scripts);

  return new Response(html, {
    headers: {
      'Content-Type': 'text/html;charset=UTF-8',
    },
  });
}
