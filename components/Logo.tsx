import Image from "next/image";
import Link from "next/link";

const Logo: React.FC = () => (
  <div className="text-rose-500 font-semibold text-2xl bg-white">
    <Link href="/">
      <a className="flex items-center">
        <Image
          src="/logo.svg"
          width={128}
          height={70}
          alt="jiangwenyang's blog"
        />
        <h1 className="ml-4 capitalize tracking-wider">
          jiangwenyang&rsquo;s blog
        </h1>
      </a>
    </Link>
  </div>
);

export default Logo;
