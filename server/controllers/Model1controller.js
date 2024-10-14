require('dotenv').config(); // 환경 변수 로드
const axios = require('axios');

exports.handleModel1Request = async (req, res) => {
  const { contents, selectedItem } = req.body;

  // selectedItem 값이 1일 때 DALL·E API 호출
  if (selectedItem === '1') {
    try {
      // DALL·E 3 모델을 사용하여 이미지 생성
      const response = await axios.post(
        'https://api.openai.com/v1/images/generations',
        {
          prompt: contents,  // contents를 프롬프트로 사용
          n: 1,  // 1개의 이미지 생성
          size: '1024x1024',  // 이미지 크기
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,  // API 키
            'Content-Type': 'application/json',
          }
        }
      );

      // 생성된 이미지 URL 가져오기
      const imageUrl = response.data.data[0].url;

      // 클라이언트에 이미지 URL 반환
      res.status(200).json({ imageUrl });

    } catch (error) {
      console.error('Error generating image:', error.response ? error.response.data : error.message);
      res.status(500).json({ message: '이미지 생성 중 오류 발생' });
    }
  } else if (selectedItem === '2') {
    res.json({ message: '2입니다.' });
  } else if (selectedItem === '3') {
    res.json({ message: '3입니다.' });
  } else if (selectedItem === '4') {
    res.json({ message: '4입니다.' });
  } else {
    res.json({ message: '잘못된 선택입니다.' });
  }
};
