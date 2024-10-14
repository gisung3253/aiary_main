require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;

app.use(cors()); // CORS 미들웨어 추가
app.use(express.json()); // JSON 데이터 처리를 위한 미들웨어

// 루트 경로 설정
app.get('/', (req, res) => {
    res.send('루트 페이지입니다.');
});

// /ai 미들웨어 설정 및 model1Router 연결
app.use('/ai', require('./routes/model1Router'));

// 서버 시작
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
