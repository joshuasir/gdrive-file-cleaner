# Google Drive File Cleaner
This Node.js script utility automates the cleanup of files in Google Drive that are older than a specified number of days. It can be paired with automation scripts to regularly maintain and manage your Google Drive storage efficiently.


## Usage

1. **Setup Google Drive API Credentials**:
   - Obtain Google Cloud credentials (JSON file) with appropriate permissions for the Google Drive API.

2. **Install Dependencies**:
   ```bash
   npm install
   ```
   
3. **Configure Script:**:
   - Update credentials.json with your Google Cloud credentials.
   - Modify daysThreshold variable in driveFileCleaner.js to set the number of days files should be kept before deletion.

4. **Run the Script:**
   ```bash
   node rm_img.js
   ```
5. **Integrate Automation:**
   Integrate with task schedulers (e.g., cron jobs) or CI/CD pipelines for regular automated cleanup of Google Drive files.
