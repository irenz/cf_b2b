/**
 * Admin Dashboard JavaScript
 * Handles all admin dashboard functionality
 */

// Check authentication
const token = localStorage.getItem('admin_token');
if (!token) {
  window.location.href = '/admin/login';
}

// Verify token on page load
API.post('/admin/verify', { token })
  .catch(() => {
    localStorage.removeItem('admin_token');
    window.location.href = '/admin/login';
  });

// Add authorization header to all API requests
const originalPost = API.post;
const originalPut = API.put;
const originalDelete = API.delete;
const originalGet = API.get;

API.get = function(endpoint) {
  return fetch(`${this.baseURL}${endpoint}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  }).then(res => res.json());
};

API.post = function(endpoint, data) {
  return fetch(`${this.baseURL}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  }).then(res => res.json());
};

API.put = function(endpoint, data) {
  return fetch(`${this.baseURL}${endpoint}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  }).then(res => res.json());
};

API.delete = function(endpoint) {
  return fetch(`${this.baseURL}${endpoint}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  }).then(res => res.json());
};

// Logout functionality
function logout() {
  localStorage.removeItem('admin_token');
  window.location.href = '/admin/login';
}

document.getElementById('logout-btn').addEventListener('click', (e) => {
  e.preventDefault();
  logout();
});

document.getElementById('logout-btn-header').addEventListener('click', logout);

// Tab Navigation
const tabButtons = document.querySelectorAll('[data-tab]');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    const tabName = button.getAttribute('data-tab');

    // Update active states
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));

    button.classList.add('active');
    document.getElementById(`${tabName}-tab`).classList.add('active');

    // Load data for specific tabs
    if (tabName === 'products') {
      loadProducts();
    } else if (tabName === 'inquiries') {
      loadInquiries();
    }
  });
});

// Load Dashboard Stats
async function loadDashboardStats() {
  try {
    const response = await API.get('/admin/stats');
    if (response.success) {
      const { total_products, total_inquiries, pending_inquiries, recent_inquiries } = response.data;

      document.getElementById('stat-products').textContent = total_products || 0;
      document.getElementById('stat-inquiries').textContent = total_inquiries || 0;
      document.getElementById('stat-pending').textContent = pending_inquiries || 0;

      // Display recent inquiries
      const tbody = document.getElementById('recent-inquiries-tbody');
      if (recent_inquiries && recent_inquiries.length > 0) {
        tbody.innerHTML = recent_inquiries.map(inquiry => `
          <tr>
            <td>${inquiry.name}</td>
            <td>${inquiry.email}</td>
            <td>${inquiry.product_name || 'General Inquiry'}</td>
            <td><span class="badge badge-${inquiry.status}">${inquiry.status}</span></td>
            <td>${new Date(inquiry.created_at).toLocaleDateString()}</td>
          </tr>
        `).join('');
      } else {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align: center;">No recent inquiries</td></tr>';
      }
    }
  } catch (error) {
    console.error('Error loading stats:', error);
  }
}

// Load Products
async function loadProducts() {
  try {
    const response = await API.get('/products');
    if (response.success) {
      const products = response.data || [];
      const container = document.getElementById('products-list');

      if (products.length === 0) {
        container.innerHTML = '<p style="padding: 2rem; text-align: center;">No products found.</p>';
        return;
      }

      container.innerHTML = `
        <table class="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Featured</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${products.map(product => `
              <tr>
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.category || 'N/A'}</td>
                <td>${product.is_featured ? '⭐ Yes' : 'No'}</td>
                <td><span class="badge ${product.is_active ? 'badge-completed' : 'badge-pending'}">${product.is_active ? 'Active' : 'Inactive'}</span></td>
                <td>
                  <button onclick="editProduct(${product.id})" class="btn btn-primary" style="padding: 0.5rem 1rem; font-size: 0.85rem; margin-right: 0.5rem;">Edit</button>
                  <button onclick="deleteProduct(${product.id})" class="btn" style="background: #dc2626; color: white; padding: 0.5rem 1rem; font-size: 0.85rem;">Delete</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      `;
    }
  } catch (error) {
    console.error('Error loading products:', error);
    document.getElementById('products-list').innerHTML = '<p style="padding: 2rem; text-align: center; color: red;">Error loading products</p>';
  }
}

// Load Inquiries
async function loadInquiries() {
  try {
    const response = await API.get('/inquiries');
    if (response.success) {
      const inquiries = response.data || [];
      const container = document.getElementById('inquiries-list');

      if (inquiries.length === 0) {
        container.innerHTML = '<p style="padding: 2rem; text-align: center;">No inquiries found.</p>';
        return;
      }

      container.innerHTML = `
        <table class="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Product</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${inquiries.map(inquiry => `
              <tr>
                <td>${inquiry.id}</td>
                <td>${inquiry.name}</td>
                <td>${inquiry.email}</td>
                <td>${inquiry.product_name || 'General'}</td>
                <td><span class="badge badge-${inquiry.status}">${inquiry.status}</span></td>
                <td>${new Date(inquiry.created_at).toLocaleDateString()}</td>
                <td>
                  <button onclick="viewInquiry(${inquiry.id})" class="btn btn-primary" style="padding: 0.5rem 1rem; font-size: 0.85rem; margin-right: 0.5rem;">View</button>
                  <button onclick="deleteInquiry(${inquiry.id})" class="btn" style="background: #dc2626; color: white; padding: 0.5rem 1rem; font-size: 0.85rem;">Delete</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      `;
    }
  } catch (error) {
    console.error('Error loading inquiries:', error);
    document.getElementById('inquiries-list').innerHTML = '<p style="padding: 2rem; text-align: center; color: red;">Error loading inquiries</p>';
  }
}

// Product Management Functions
window.editProduct = function(id) {
  showNotification('Product editing feature coming soon', 'info');
  // TODO: Implement product editing modal
};

window.deleteProduct = async function(id) {
  if (!confirm('Are you sure you want to delete this product?')) {
    return;
  }

  try {
    await API.delete(`/products/${id}`);
    showNotification('Product deleted successfully', 'success');
    loadProducts();
  } catch (error) {
    showNotification('Error deleting product', 'error');
  }
};

document.getElementById('add-product-btn').addEventListener('click', () => {
  showNotification('Add product feature coming soon', 'info');
  // TODO: Implement add product modal
});

// Inquiry Management Functions
window.viewInquiry = async function(id) {
  try {
    const response = await API.get(`/inquiries/${id}`);
    if (response.success) {
      const inquiry = response.data;
      alert(`
Inquiry Details:
----------------
Name: ${inquiry.name}
Email: ${inquiry.email}
Company: ${inquiry.company || 'N/A'}
Phone: ${inquiry.phone || 'N/A'}
Country: ${inquiry.country || 'N/A'}
Product: ${inquiry.product_name || 'General Inquiry'}
Message: ${inquiry.message}
Status: ${inquiry.status}
Date: ${new Date(inquiry.created_at).toLocaleString()}
      `);
      // TODO: Implement better inquiry viewing modal
    }
  } catch (error) {
    showNotification('Error loading inquiry details', 'error');
  }
};

window.deleteInquiry = async function(id) {
  if (!confirm('Are you sure you want to delete this inquiry?')) {
    return;
  }

  try {
    await API.delete(`/inquiries/${id}`);
    showNotification('Inquiry deleted successfully', 'success');
    loadInquiries();
    loadDashboardStats();
  } catch (error) {
    showNotification('Error deleting inquiry', 'error');
  }
};

// Initialize dashboard
loadDashboardStats();
