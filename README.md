
# **Playwright Test Automation**

This repository contains a set of automated tests using [Playwright](https://playwright.dev/).

## **Prerequisites**
Before running the tests, ensure the following requirements are met:

1. **Node.js and npm installed**:
   - Download and install Node.js from [nodejs.org](https://nodejs.org/).
   - Verify the installation:
     ```bash
     node -v
     npm -v
     ```

2. **Playwright Installation**:
   Playwright can be installed directly via npm, and it comes with the necessary browser support.

3. **Visual Studio Code Installed**:
   - Download and install Visual Studio Code from [code.visualstudio.com](https://code.visualstudio.com/).

4. **Playwright Test for VSCode Extension**:
   - Install the extension from the VSCode extension marketplace. Search for **Playwright Test for VSCode** or [download it here](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright).

---

## **Initial Setup**

### **1. Clone the Repository**
Clone this repository to your local machine:
```bash
git clone <repository-url>
cd <repository-name>
```

### **2. Install Dependencies**
Run the following command to install the project dependencies:
```bash
npm install
```

### **3. Install Browsers**
Playwright will automatically download the necessary browsers for testing. To ensure everything is ready, run:
```bash
npx playwright install
```

---

## **Running Tests**

### **1. From the Command Line**
- **Run all tests**:
  ```bash
  npx playwright test
  ```

- **Run tests in a specific browser**:
  ```bash
  npx playwright test --project=chromium
  npx playwright test --project=firefox
  npx playwright test --project=webkit
  ```

- **Run a specific test**:
  ```bash
  npx playwright test tests/test-name.spec.js
  ```

- **Run tests in headed mode (non-headless)**:
  ```bash
  npx playwright test --headed
  ```

- **Retry failed tests**:
  ```bash
  npx playwright test --retries=1
  ```

### **2. From Visual Studio Code**
- Open the project in **Visual Studio Code**.
- Ensure the **Playwright Test for VSCode** extension is installed.
- From the sidebar, click on the Playwright icon (test logo).
- Run tests directly from the test explorer:
  - Right-click a specific test or file and select **Run Test**.
  - You can also debug tests by selecting **Debug Test**.

---

## **Generating Reports**

### **1. HTML Report**
After running tests, Playwright generates an interactive HTML report in the `test-report` directory. To view it:

```bash
npx playwright show-report
```

This will open the report in your default browser.

### **2. Screenshots and Traces**
- **Screenshots**: Automatically generated for failed tests.
- **Traces (Trace Viewer)**: Enabled for all tests as per configuration (`trace: 'on'` in `playwright.config.js`).
- To view traces:
  ```bash
  npx playwright show-trace trace.zip
  ```

---

## **Project Structure**

```plaintext
├── tests/               # Directory containing test files
│   ├── example.spec.js  # Example test file
├── playwright.config.js # Playwright configuration file
├── package.json         # Project dependencies
├── README.md            # Project instructions
└── test-report/         # Generated report (HTML)
```

---

## **Additional Configuration**

To customize the project settings:
- Edit the `playwright.config.js` file to adjust:
  - Available browsers.
  - Trace, screenshot, and video configurations.
  - Default timeout settings.

---

## **Support**

If you encounter issues when running tests:
1. Ensure all dependencies are installed correctly:
   ```bash
   npm install
   ```
2. Verify you have the latest versions of Playwright and the required browsers:
   ```bash
   npx playwright install
   ```

Refer to the [Playwright official documentation](https://playwright.dev/docs/intro) for more information.
