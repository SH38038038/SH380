"use client";

import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

export default function ContactPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();

    if (!agreed) {
      alert("개인정보 수집 및 이용에 동의해주세요.");
      return;
    }

    setIsSubmitting(true);

    // 👇 3단계에서 얻은 본인의 키 값들을 여기에 넣어야 합니다.
    const SERVICE_ID = "service_y31r0l7";
    const TEMPLATE_ID = "template_ljj1kjz";
    const PUBLIC_KEY = "iDYTKVPSKQyqYv3-K";

    if (formRef.current) {
      emailjs
        .sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
        .then(
          (result) => {
            alert("메일이 성공적으로 전송되었습니다! 빠른 시일 내에 답변 드리겠습니다.");
            formRef.current?.reset(); // 폼 초기화
            setAgreed(false);
            setIsSubmitting(false);
          },
          (error) => {
            console.error(error.text);
            alert("전송에 실패했습니다. 잠시 후 다시 시도해주세요.");
            setIsSubmitting(false);
          }
        );
    }
  };

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
        <section className="text-center mb-12">
            {/* 👇 여기 text-gray-600을 text-[#FFACED]로 변경했습니다 */}
            <p className="text-gray-400 font-medium">
            아래 양식을 통해 내용을 등록해주시면, 빠르게 연락드리도록 하겠습니다.
            <br />
            {/* 영문은 연한 회색(gray-400)으로 두어 계층을 주었으나, 
                영문도 핑크로 원하시면 text-[#FFACED]로 바꾸시면 됩니다. */}
            <span className="text-sm text-gray-400 mt-2 block">
                If you register the contents through the form below, I'll get back to you quickly.
            </span>
            </p>
        </section>

      <form ref={formRef} onSubmit={sendEmail} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 성 (Last Name) */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-600">성 (Last Name)</label>
            <input
              type="text"
              name="last_name" // EmailJS 템플릿 변수명
              required
              className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-[#FFACED] transition-colors bg-transparent"
              placeholder="Hong"
            />
          </div>
          {/* 이름 (First Name) */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-600">이름 (First Name)</label>
            <input
              type="text"
              name="first_name"
              required
              className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-[#FFACED] transition-colors bg-transparent"
              placeholder="Seohyeon"
            />
          </div>
        </div>

        {/* 휴대폰 번호 */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-600">휴대폰 번호 (Phone)</label>
          <input
            type="tel"
            name="phone"
            className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-[#FFACED] transition-colors bg-transparent"
            placeholder="010-1234-5678"
          />
        </div>

        {/* 이메일 주소 */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-600">이메일 주소 (Email)</label>
          <input
            type="email"
            name="user_email"
            required
            className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-[#FFACED] transition-colors bg-transparent"
            placeholder="example@gmail.com"
          />
        </div>

        {/* 내용 */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-600">내용 (Message)</label>
          <textarea
            name="message"
            required
            rows={5}
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:border-[#FFACED] transition-colors resize-none"
            placeholder="문의하실 내용을 자유롭게 적어주세요."
          />
        </div>

        {/* 개인정보 동의 */}
        <div className="flex items-center gap-2 mt-4">
          <input
            type="checkbox"
            id="privacy"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="w-4 h-4 accent-[#FFACED] cursor-pointer"
          />
          <label htmlFor="privacy" className="text-sm text-gray-500 cursor-pointer select-none">
            개인정보 수집 및 이용 동의
          </label>
        </div>

        {/* 전송 버튼 */}
        <div className="text-center mt-12">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-all disabled:bg-gray-400"
          >
            {isSubmitting ? "전송 중..." : "문의하기 (Send)"}
          </button>
        </div>
      </form>
    </main>
  );
}