# Playwright Automation Framework

End-to-end test automation framework for UI (eBay) and API (Petstore) testing.

## 📁 Project Structure

```
├── data/              # API config, routes, payloads, schemas
├── fixtures/          # Test fixtures (api, ebay)
├── helpers/           # Helper functions
├── page-objects/      # Page Object Model (pages & components)
├── test-data/         # Test data files
├── tests/
│   ├── api/          # API tests
│   └── ui/           # UI tests
└── utils/             # Utility functions
```

## 🚀 Getting Started

```bash
npm install
npx playwright install
```

## 🧪 Running Tests

```bash
# All tests
npm test

# UI tests only
npm test -- tests/ui

# API tests only
npm test -- tests/api

# Specific file
npm test -- tests/api/pet.spec.ts

# UI mode / Debug / Headed
npm run test:ui
npm run test:debug
npm run test:headed

# Specific browser
npm run test:chromium
npm run test:webkit
```

## 📊 Reports

```bash
npm run report
```

## ⚙️ Configuration

- **UI Base URL**: `https://www.ebay.com/`
- **API Base URL**: `https://petstore.swagger.io/v2`
- **Browsers**: Chromium, WebKit
- **Note**: API tests are configured to run only on Chromium
- Config: `playwright.config.ts`

## 🛠️ Scripts

| Script                  | Description     |
| ----------------------- | --------------- |
| `npm test`              | Run all tests   |
| `npm run test:ui`       | UI mode         |
| `npm run test:debug`    | Debug mode      |
| `npm run test:headed`   | Visible browser |
| `npm run test:chromium` | Chromium only   |
| `npm run test:webkit`   | WebKit only     |
| `npm run report`        | Show report     |
