import React from 'react';

const Footer = () => {
  return (
    <footer 
      className="bg-black bg-opacity-75 text-white py-6"
    >
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p>(주) 보야지 엑스</p>
            <p>서울특별시 용산구 한강대로 100 (한강로 2가 181)</p>
            <p>고객상담팀(수신자요금부담) 02-1234-5678 (상담시간 월~금: AM 09:00 ~ PM 06:00)</p>
          </div>
          <div className="text-center md:text-right space-x-4">
            <a href="#" className="hover:underline">서비스이용약관</a>
            <a href="#" className="hover:underline">개인정보처리방침</a>
            <a href="#" className="hover:underline">영상정보처리방침</a>
            <a href="#" className="hover:underline">우주여행문의</a>
            <a href="#" className="hover:underline">찾아오는 길</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;