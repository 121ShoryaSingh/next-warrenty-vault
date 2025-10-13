import axios from 'axios';

export async function DownloadToR2(key: string) {
  try {
    const response = await axios.post('/api/PreSignedUrl', {
      key,
      operation: 'download',
    });

    const { signedUrl } = await response.data;

    window.open(signedUrl, '_blank');
  } catch (error) {
    return { success: false, error };
  }
}
