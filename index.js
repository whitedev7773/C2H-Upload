const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();

// 업로드된 파일을 원본 이름 그대로 저장하는 함수
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // 원본 이름 그대로 저장
  }
});

// 파일 업로드를 처리하는 미들웨어
const upload = multer({ storage });

// 파일 업로드 페이지 렌더링
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/upload/index.html');
});

// 파일 업로드 처리 라우트
app.post('/', upload.array('files'), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).send('No files uploaded.');
  }

  const filenames = req.files.map(file => file.filename);
  res.send('Files uploaded successfully: ' + filenames.join(', '));
});

// 서버 시작
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
