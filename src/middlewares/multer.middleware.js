import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    //file ko console.log karake dekhna jarur, you get many things 
    
    //file.originalname matlab jo naam user ne save kiya hai wahi naam se save kar lo , kinda not a good practice agar ek hi naam ke jyada files aa agye to , ususally upload ka kaam is very less , you can do changes after you complete the project
    cb(null, file.originalname);
  },
});

export const upload = multer({ 
    storage: storage 
});
