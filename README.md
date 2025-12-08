# B2B Product Exhibition Website

A professional B2B product exhibition website built on Cloudflare Workers with D1 database.

## Features

### Frontend
- **Home**: Company introduction and featured products
- **Products**: Product listing and detail pages
- **About**: Company information and credentials
- **Contact**: Contact information and inquiry form
- **Responsive Design**: Optimized for mobile, tablet, and desktop

### Backend Admin
- **Admin Login**: Secure authentication
- **Product Management**: CRUD operations for products
- **Inquiry Management**: View and manage customer inquiries

## Tech Stack

- **Backend**: Cloudflare Workers
- **Database**: Cloudflare D1 (SQLite)
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Styling**: Tailwind CSS

## Getting Started

### Prerequisites
- Node.js (v18 or later)
- Cloudflare account
- Wrangler CLI

### Installation

1. Install dependencies:
\`\`\`bash
npm install
\`\`\`

2. Create D1 database:
\`\`\`bash
wrangler d1 create b2b_database
\`\`\`

3. Update `wrangler.toml` with your database ID

4. Initialize database schema:
\`\`\`bash
wrangler d1 execute b2b_database --file=./schema/schema.sql
\`\`\`

5. Run development server:
\`\`\`bash
npm run dev
\`\`\`

6. Deploy to Cloudflare:
\`\`\`bash
npm run deploy
\`\`\`

## Project Structure

\`\`\`
cf_b2b/
├── src/
│   ├── index.js              # Main worker entry
│   ├── api/
│   │   ├── router.js         # API routing
│   │   └── handlers/         # API handlers
│   └── pages/
│       ├── router.js         # Page routing
│       └── *.js              # Page templates
├── public/
│   ├── css/                  # Stylesheets
│   ├── js/                   # Client-side JavaScript
│   └── images/               # Images
├── schema/
│   └── schema.sql            # Database schema
├── package.json
└── wrangler.toml             # Cloudflare Workers config
\`\`\`

## License

MIT
