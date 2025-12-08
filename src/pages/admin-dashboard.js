/**
 * Admin Dashboard Page
 * Main admin interface for managing products and inquiries
 */

export async function adminDashboard(env) {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Admin Dashboard - B2B Product Exhibition</title>
  <link rel="stylesheet" href="/css/main.css">
  <style>
    .admin-layout {
      display: flex;
      min-height: 100vh;
    }
    .admin-sidebar {
      width: 250px;
      background: var(--text-dark);
      color: white;
      padding: 2rem 0;
      position: fixed;
      height: 100vh;
      overflow-y: auto;
    }
    .admin-content {
      flex: 1;
      margin-left: 250px;
      padding: 2rem;
      background: var(--bg-light);
      min-height: 100vh;
    }
    .admin-header {
      background: white;
      padding: 1.5rem 2rem;
      margin: -2rem -2rem 2rem -2rem;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .sidebar-nav {
      list-style: none;
    }
    .sidebar-nav li {
      margin: 0;
    }
    .sidebar-nav a {
      display: flex;
      align-items: center;
      padding: 1rem 2rem;
      color: #9ca3af;
      text-decoration: none;
      transition: all 0.3s;
    }
    .sidebar-nav a:hover,
    .sidebar-nav a.active {
      background: rgba(255,255,255,0.1);
      color: white;
    }
    .stat-card {
      background: white;
      padding: 1.5rem;
      border-radius: 0.5rem;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .stat-card h3 {
      color: var(--text-light);
      font-size: 0.875rem;
      font-weight: 500;
      margin-bottom: 0.5rem;
    }
    .stat-card .stat-value {
      font-size: 2rem;
      font-weight: 700;
      color: var(--primary-color);
    }
    .table-container {
      background: white;
      border-radius: 0.5rem;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      overflow: hidden;
    }
    .table {
      width: 100%;
      border-collapse: collapse;
    }
    .table th {
      background: var(--bg-light);
      padding: 1rem;
      text-align: left;
      font-weight: 600;
      color: var(--text-dark);
      border-bottom: 2px solid var(--border-color);
    }
    .table td {
      padding: 1rem;
      border-bottom: 1px solid var(--border-color);
    }
    .table tr:hover {
      background: var(--bg-light);
    }
    .badge {
      display: inline-block;
      padding: 0.25rem 0.75rem;
      border-radius: 1rem;
      font-size: 0.85rem;
      font-weight: 500;
    }
    .badge-pending {
      background: #fef3c7;
      color: #92400e;
    }
    .badge-processing {
      background: #dbeafe;
      color: #1e40af;
    }
    .badge-completed {
      background: #d1fae5;
      color: #065f46;
    }
    .tab-nav {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 2rem;
      border-bottom: 2px solid var(--border-color);
    }
    .tab-btn {
      padding: 1rem 1.5rem;
      background: none;
      border: none;
      border-bottom: 3px solid transparent;
      color: var(--text-light);
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s;
    }
    .tab-btn:hover {
      color: var(--primary-color);
    }
    .tab-btn.active {
      color: var(--primary-color);
      border-bottom-color: var(--primary-color);
    }
    .tab-content {
      display: none;
    }
    .tab-content.active {
      display: block;
    }
    @media (max-width: 768px) {
      .admin-sidebar {
        width: 100%;
        height: auto;
        position: relative;
      }
      .admin-content {
        margin-left: 0;
      }
    }
  </style>
</head>
<body>
  <div class="admin-layout">
    <!-- Sidebar -->
    <aside class="admin-sidebar">
      <div style="padding: 0 2rem 2rem 2rem;">
        <h2 style="color: var(--accent-color); font-size: 1.5rem;">B2B Admin</h2>
      </div>
      <ul class="sidebar-nav">
        <li><a href="#" data-tab="overview" class="active">📊 Overview</a></li>
        <li><a href="#" data-tab="products">📦 Products</a></li>
        <li><a href="#" data-tab="inquiries">💬 Inquiries</a></li>
        <li><a href="#" id="logout-btn">🚪 Logout</a></li>
      </ul>
    </aside>

    <!-- Main Content -->
    <main class="admin-content">
      <div class="admin-header">
        <div>
          <h1 style="font-size: 1.5rem; margin-bottom: 0.25rem;">Dashboard</h1>
          <p style="color: var(--text-light); font-size: 0.9rem;">Welcome back, <span id="admin-username">Admin</span></p>
        </div>
        <div>
          <button id="logout-btn-header" class="btn btn-secondary">Logout</button>
        </div>
      </div>

      <!-- Overview Tab -->
      <div id="overview-tab" class="tab-content active">
        <div class="grid grid-3" style="margin-bottom: 2rem;">
          <div class="stat-card">
            <h3>Total Products</h3>
            <div class="stat-value" id="stat-products">0</div>
          </div>
          <div class="stat-card">
            <h3>Total Inquiries</h3>
            <div class="stat-value" id="stat-inquiries">0</div>
          </div>
          <div class="stat-card">
            <h3>Pending Inquiries</h3>
            <div class="stat-value" id="stat-pending">0</div>
          </div>
        </div>

        <h2 style="font-size: 1.25rem; margin-bottom: 1rem; color: var(--text-dark);">Recent Inquiries</h2>
        <div class="table-container">
          <table class="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Product</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody id="recent-inquiries-tbody">
              <tr><td colspan="5" style="text-align: center;">Loading...</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Products Tab -->
      <div id="products-tab" class="tab-content">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
          <h2 style="font-size: 1.25rem; color: var(--text-dark);">Manage Products</h2>
          <button id="add-product-btn" class="btn btn-primary">+ Add Product</button>
        </div>
        <div class="table-container">
          <div id="products-list">Loading...</div>
        </div>
      </div>

      <!-- Inquiries Tab -->
      <div id="inquiries-tab" class="tab-content">
        <h2 style="font-size: 1.25rem; margin-bottom: 1.5rem; color: var(--text-dark);">Manage Inquiries</h2>
        <div class="table-container">
          <div id="inquiries-list">Loading...</div>
        </div>
      </div>
    </main>
  </div>

  <script src="/js/main.js"></script>
  <script src="/js/admin.js"></script>
</body>
</html>`;

  return new Response(html, {
    headers: {
      'Content-Type': 'text/html;charset=UTF-8',
    },
  });
}
