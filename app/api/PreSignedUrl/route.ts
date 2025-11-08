import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { NextRequest, NextResponse } from 'next/server';

const r2 = new S3Client({
  region: 'auto',
  endpoint: process.env.R2_DEFAULT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

export async function POST(req: NextRequest) {
  try {
    const { fileName, fileType, operation, key } = await req.json();

    // For generating signed Url to upload.
    if (operation === 'upload') {
      const key = `image/${Date.now()}-${fileName}`;

      const command = new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME!,
        Key: key,
        ContentType: fileType,
      });

      const signedUrl = await getSignedUrl(r2, command, { expiresIn: 300 });

      return NextResponse.json(
        {
          message: 'Recept uploaded successfully',
          signedUrl,
          key,
        },
        { status: 200 }
      );

      // for generating pre signed url for download.
    } else if (operation === 'download') {
      if (!key) {
        return NextResponse.json(
          {
            message: 'key is required for download',
          },
          { status: 400 }
        );
      }
      const downloadCommand = new GetObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: key,
      });
      const signedUrl = await getSignedUrl(r2, downloadCommand, {
        expiresIn: 3000,
      });
      return NextResponse.json(
        {
          signedUrl,
          operation: 'download',
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error('Presigned URL generation error: ', error);
    return NextResponse.json(
      { error: 'Failed to generate URL' },
      { status: 500 }
    );
  }
}
