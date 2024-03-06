//
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="flex justify-between bg-white items-center py-4 px-1 fixed w-1/3 top-0 z-10">
      <Link href="/" className="flex items-center">
        <img src="/FOTDLogo.png" alt="FOTD Logo" className="w-36 h-10" />
      </Link>
      <div className="flex items-center">
        <Link href="/trend" className="flex flex-col items-center ml-4">
          <img src="/trend.png" alt="Trends" className="w-6 h-6" />
          <span className="text-xs mt-1">트렌드</span>
        </Link>
        <Link href="/createpost" className="flex flex-col items-center ml-4">
          <img src="/submit.png" alt="Write" className="w-5 h-5" />
          <span className="text-xs mt-2">글쓰기</span>
        </Link>

        <Link href="/chats" className="flex flex-col items-center ml-4">
          <img src="/chat.png" alt="Chat" className="w-6 h-6" />
          <span className="text-xs mt-1">채팅</span>
        </Link>

        <Link href="/profile" className="flex flex-col items-center ml-4">
          <img src="/profile.png" alt="Profile" className="w-6 h-6 " />
          <span className="text-xs mt-1">프로필</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
