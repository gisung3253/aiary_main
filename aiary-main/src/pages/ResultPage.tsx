import Button from "@/components/Button";
import NavBar from "@/components/NavBar";
import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { PATH } from "@/routes";
import { LAYOUT_MAX_WIDTH } from "@/styles/constants";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";


export default function ResultPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const selectedItem = searchParams.get("selected");

   // useLocation을 사용해 state로 전달된 contents 값 가져오기
  const location = useLocation();
  const { contents } = location.state || { contents: "" };  // 전달된 값이 없을 때 대비

  const [imageUrl, setImageUrl] = useState("");  // 이미지 URL 상태 관리
  // 서버로 데이터를 전송하는 함수
  const sendDataToServer = async () => {
    try {
      const response = await fetch('http://localhost:3000/ai/model1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents,
          selectedItem,
        }),
      });

      const data = await response.json();
      if (data.imageUrl) {
        setImageUrl(data.imageUrl);  // 이미지 URL 저장
      }
      console.log(data); // 서버에서 보낸 응답 출력
    } catch (error) {
      console.error('Error sending data to server:', error);
    }
  };

  useEffect(() => {
    sendDataToServer();
  }, []);

  const handleShareButtonClick = () => {
    // 공유하기 버튼 클릭
    toast(<div>url을 복사했어요</div>, {
      icon: <img src="/images/url.svg" />,
    });
  };

  const handleRetryButtonClick = () => {
    navigate({
      pathname: PATH.START_PAGE,
    });
  };
  
  return (
    <div
      css={css`
        padding: 48px 20px 84px;
      `}
    >
      <NavBar>
        <NavBar.HomeButton />
      </NavBar>
      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          padding: 32px 0 28px;
        `}
      >
        <h1
          css={css`
            color: #22252d;

            /* Title/HeadLine 01 */
            font-family: Pretendard;
            font-size: 20px;
            font-style: normal;
            font-weight: 700;
            line-height: 100%; /* 20px */
            letter-spacing: -0.6px;
          `}
        >
          일기 작성 완료!
        </h1>
        <p
          css={css`
            color: #505564;
            text-align: center;

            /* Body/Body 01 */
            font-family: Pretendard;
            font-size: 16px;
            font-style: normal;
            font-weight: 500;
            line-height: 140%; /* 22.4px */
            letter-spacing: -0.48px;
            margin-top: 8px;
          `}
        >
          만들어진 그림이 마음에 드시나요?
          <br />
          친구에게 자랑하거나, 다시 만들어보세요!
        </p>
      </div>
      <div
        css={css`
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          align-self: stretch;
          width: 100%;
          aspect-ratio: 16 / 21;

          border-radius: 20px;
          background-color: #f2f4f9;
        `}
      >
         {/* 텍스트 추가 부분 */}
          <p
          css={css`
            color: #22252d;
            font-family: Pretendard;
            font-size: 20px;
            font-weight: bold;
          `}
        >
          입력한 내용: {contents || "입력된 내용이 없습니다."}
        </p>{/* 이미지가 있을 경우 화면에 표시 */}
        {imageUrl && (
          <img
            src={imageUrl}
            alt="Generated AI"
            css={css`
              width: 100%;
              border-radius: 20px;
            `}
          />
        )}

        <div
          css={css`
            display: flex;
            padding: 10px 12px;
            align-items: flex-start;
            gap: 10px;
            border-radius: 10px;
            background: #fff;
            box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.14);
            position: absolute;
            right: 17px;
            bottom: 19px;

            color: #505564;
            text-align: center;

            /* Sub Title/Sub Title 01 */
            font-family: Pretendard;
            font-size: 14px;
            font-style: normal;
            font-weight: 700;
            line-height: 100%; /* 14px */
            letter-spacing: -0.42px;
          `}
          
        >
          길게 눌러 다운로드
        </div>
      </div>
      <div
        css={css`
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 0 20px 8px;
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          margin: 0 auto;
          max-width: ${LAYOUT_MAX_WIDTH}px;
        `}
      >
        <Button
          onClick={handleShareButtonClick}
          css={css`
            padding: 12px;
          `}
        >
          <img
            src="/images/share.svg"
            css={css`
              width: 18px;
              height: 18px;
              margin-right: 6px;
            `}
          />
          공유하기
        </Button>
        <Button
          variant="gray"
          onClick={handleRetryButtonClick}
          css={css`
            padding: 12px;
          `}
        >
          <img
            src="/images/retry.svg"
            css={css`
              width: 18px;
              height: 18px;
              margin-right: 6px;
            `}
          />
          다시해보기
        </Button>
      </div>
    </div>
  );
}
