'use client';

import Giscus from '@giscus/react';

export default function Comments() {
  return (
    <section className="mt-10 pt-10 border-t border-gray-200">
      <Giscus
        id="comments"
        repo="sh38038038/sh380"
        repoId="R_kgDOQ-AKyg"
        category="Comments"
        categoryId="DIC_kwDOQ-AKys4C1PPu"
        mapping="pathname"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="bottom"
        theme="light" // 그냥 'light'로 고정
        lang="ko"
        loading="lazy"
      />
    </section>
  );
}