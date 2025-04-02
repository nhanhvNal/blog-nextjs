"use client";

import { SessionProvider, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function HomeContainer() {
  const { data, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status]);

  return (
    <div>
      <h1>Chào mừng đến với Blog!</h1>
      <p>Đây là nơi chia sẻ những bài viết hay về lập trình và công nghệ.</p>
      <Link href="/blog">
        <button>Xem tất cả bài viết</button>
      </Link>

      <div>
        <button
          onClick={async () => {
            try {
              await signOut({ redirect: true });
            } catch (error) {}
          }}
        >
          Sign out
        </button>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <SessionProvider>
      <HomeContainer />
    </SessionProvider>
  );
}
