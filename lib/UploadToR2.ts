import axios from 'axios';

export async function UploadToR2(file: File) {
  try {
    const response = await axios.post('/api/PreSignedUrl', {
      fileName: file.name,
      fileType: file.type,
    });

    const { signedUrl, key } = await response.data;

    await axios.put(signedUrl, file, {
      headers: {
        'Content-Type': file.type,
      },
    });
    return { success: true, key };
  } catch (error) {
    console.error('Upload Error', error);
    return { success: false, error };
  }
}
