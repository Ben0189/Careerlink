import { NextResponse } from 'next/server';
import { Storage } from '@google-cloud/storage';
import formidable, { File } from 'formidable';
import { IncomingMessage } from 'http';
import { Readable } from 'stream';
import fs from 'fs';


export const config = {
  api: {
    bodyParser: false,
  },
};

const storage = new Storage({
  projectId: process.env.GCP_PROJECT_ID,
  keyFilename: process.env.GCP_KEY_FILE,
});

const bucketName = process.env.GCS_BUCKET_NAME || 'bucket-name';

function createIncomingMessage(req: Request, body: Buffer): IncomingMessage {
  const stream = new Readable();
  stream.push(body);
  stream.push(null);
  const incomingMessage = stream as unknown as IncomingMessage;
  incomingMessage.headers = Object.fromEntries(req.headers.entries());
  incomingMessage.method = req.method;
  incomingMessage.url = req.url || '';

  return incomingMessage;
}

export async function POST(req: Request) {
  const form = formidable();

  try {
    const body = await req.arrayBuffer();
    const buffer = Buffer.from(body);

    const incomingMessage = createIncomingMessage(req, buffer);

    return new Promise((resolve, reject) => {
      form.parse(incomingMessage, async (err, fields, files) => {
        if (err) {
          return resolve(
            NextResponse.json({ error: 'Error parsing the file' }, { status: 500 })
          );
        }

        const file = Array.isArray(files.resume) ? files.resume[0] : files.resume;
        if (!file || !(file as File).filepath) {
          return resolve(
            NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
          );
        }

        const singleFile = file as File;
        const fileName = `resumes/${Date.now()}_${singleFile.originalFilename}`;

        try {
          const bucket = storage.bucket(bucketName);
          const fileStream = fs.createReadStream(singleFile.filepath);

          const blob = bucket.file(fileName);
          const writeStream = blob.createWriteStream({
            resumable: false,
            contentType: singleFile.mimetype || undefined,
          });

          fileStream.pipe(writeStream);

          writeStream.on('finish', async () => {
            const publicUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`;
            resolve(
              NextResponse.json({ url: publicUrl }, { status: 200 })
            );
          });

          writeStream.on('error', (error) => {
            console.error('Error uploading file:', error);
            resolve(
              NextResponse.json({ error: 'Error uploading file' }, { status: 500 })
            );
          });
        } catch (error) {
          console.error('Error uploading to Google Cloud Storage:', error);
          resolve(
            NextResponse.json({ error: 'Error uploading to Google Cloud Storage' }, { status: 500 })
          );
        }
      });
    });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ error: 'Error processing request' }, { status: 500 });
  }
}
