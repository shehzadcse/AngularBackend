var aws = require("aws-sdk");
var multer = require("multer");
var multerS3 = require("multer-s3");

//aws sdk setup
var s3 = new aws.S3({
  accessKeyId: process.env.AWS_SDK_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SDK_SECRET_ACCESS_KEY,
});

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "video/x-flv": "flv",
  "video/mp4": "mp4",
  "image/gif": "gif",
  "application/x-mpegURL": "m3u8",
  "video/3gpp": "3gp",
  "video/quicktime": "mov",
  "video/x-msvideo": "avi",
  "video/x-ms-wmv": "wmv",
  "application/pdf": "pdf",
};
console.log(process.env.AWS_SDK_S3_BUCKET_NAME);
exports.upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_SDK_S3_BUCKET_NAME,
    acl: "public-read",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function (req, file, cb) {
      // console.log(file, "----------------> file");
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      // console.log(file.originalname, "---------------------> file");
      const name = file.originalname.toLowerCase().split(" ").join("-");
      const ext = file.originalname.toLowerCase().split(".")[
        file.originalname.toLowerCase().split(".").length - 1
      ];
      cb(
        null,
        name.split(".").join("-").split("/").join("-") +
          "-" +
          Date.now() +
          "." +
          ext
      );
    },
  }),
});
