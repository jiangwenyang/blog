import Image from "next/image";
import Link from "next/link";

const Logo: React.FC = () => (
  <div>
    <Link href="/">
      <a className="flex items-center">
        <Image
          src="/logo.svg"
          width={128}
          height={70}
          alt="jiangwenyang's blog"
        />
      </a>
    </Link>
  </div>
);

export default Logo;
