import axios from 'axios';

export async function DownloadFromR2(
  key: string
): Promise<
  { success: true; url: string } | { success: false; error: unknown }
> {
  try {
    const response = await axios.post('/api/PreSignedUrl', {
      key,
      operation: 'download',
    });
    const { signedUrl } = response.data;
    return { success: true, url: signedUrl };
  } catch (error) {
    return { success: false, error };
  }
}
