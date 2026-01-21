"use client"; // 클라이언트 컴포넌트 선언

import { useEffect, useRef } from "react";

export default function Comments() {
  const commentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!commentRef.current || commentRef.current.innerHTML !== "") return;

    const script = document.createElement("script");
    script.src = "https://utteranc.es/client.js";
    script.async = true;
    script.setAttribute("repo", "hong-seohyeon/my-blog-repo"); // [변경필요] 본인 repo 이름
    script.setAttribute("issue-term", "pathname");
    script.setAttribute("label", "comment");
    script.setAttribute("theme", "github-light");
    script.crossOrigin = "anonymous";

    commentRef.current.appendChild(script);
  }, []);

  return <div ref={commentRef} className="mt-20 pt-10 border-t border-gray-100" />;
}