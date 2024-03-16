import AWS from 'aws-sdk';

AWS.config.update({
    accessKeyId: process.env.MY_ACCESS_KEY,
    secretAccessKey: process.env.MY_SECRET_KEY
});

const s3 = new AWS.S3({});
const bucketName = process.env.MY_BUCKET_NAME;

export const uploadFile = async (folder, fileName, file) => {
    const params = {
        Bucket: bucketName,
        Key: `${folder}/`+fileName,
        Body: Buffer.from(await file.arrayBuffer()),
        ContentType: file.type,
    };
    return new Promise((resolve, reject) => {
        s3.upload(params, function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};

export const deleteFile = async (fileName) => {
    const params = {
        Bucket: bucketName,
        Key: fileName,
    };
    return new Promise((resolve, reject) => {
        s3.deleteObject(params, function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};

export const getFile = async (fileName) => {
    const params = {
        Bucket: bucketName,
        Key: fileName,
    };
    return new Promise((resolve, reject) => {
        s3.getObject(params, function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};