const upload = require('../utils/upload');
router.post('/upload', upload.single('media'), (req, res) => {
  res.json({ url: `/uploads/${req.file.filename}` });
});
