// import multer, { diskStorage } from "multer";
// const imageFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith("image")) {
//     cb(null, true);
//   } else {
//     cb("Please upload only images.", false);
//   }
// };
// var storage = diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, __basedir + "/resources/static/assets/uploads/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-bezkoder-${file.originalname}`);
//   },
// });
// var uploadFile = multer({ storage: storage, fileFilter: imageFilter });
// export default uploadFile;

export const toImageString = (data) => {
  return `data:${data.ext};base64,${data.buffer?.toString('base64')}`
}