const { google } = require('googleapis');
const credential = require('./storage_credential.json'); // Replace with the path to your credentials file

const SCOPES = ['https://www.googleapis.com/auth/drive'];

const GetDriveService = async () => {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: credential.client_email,
        private_key: credential.private_key,
      },
      scopes: SCOPES,
    });
    const driveService = google.drive({ version: 'v3', auth });
    return driveService;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const deleteOldFolders = async () => {
  const drive = await GetDriveService();
  const folderId = '...';
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  try {
    const response = await drive.files.list({
        q: `'${folderId}' in parents and mimeType='application/vnd.google-apps.folder' and trashed=false`,
        fields: 'files(id, name, createdTime)',
    });

    const folders = response.data.files;
    for (const folder of folders) {
      const createdTime = new Date(folder.createdTime);
      if (createdTime < thirtyDaysAgo) {
        await drive.files.delete({
          fileId: folder.id,
        });
        console.log(`Deleted folder: ${folder.name} (ID: ${folder.id})`);
      }
    }
  } catch (error) {
    console.error('Error deleting old folders:', error);
  }
};

// Example usage
deleteOldFolders().then(() => {
  console.log('Old folders deleted.');
});


module.exports = {
    GetDriveService,
    deleteOldFolders,
  };