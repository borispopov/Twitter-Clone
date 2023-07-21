import { GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const REGION ='us-west-2';
const ACCESS_KEY = 'AKIA5IVB3WOUL3W7DSMZ';
const SECRET_KEY = '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';

const s3 = new S3Client({
  region: REGION,
  credentials: {
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_KEY
  }
});

const BUCKET = 'twitterimages1'

const uploadToS3 = async ({ file, key }) => {
  try {
    console.log('in upload: ', file)
    const command = new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype,
    })
    const res = await s3.send(command);
    console.log(res)
    return key;
  } catch (err) {
    console.log(err)
    return err
  }
}

const GetFromS3 = async ({ key }) => {
  try {
    const command = new GetObjectCommand({
      Bucket: BUCKET,
      Key: key,
    })
    const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
    return url
  } catch (err) {
    return err
  }
}

export { uploadToS3, GetFromS3 }