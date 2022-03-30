import type { CoverImage } from "typings/post";

import Image from "next/image";

type Props = {
  coverImage: CoverImage;
};

const PostCover: React.FC<Props> = ({ coverImage }) => {
  return (
    <div className="relative w-full aspect-w-16 aspect-h-9">
      <Image
        src={coverImage.src}
        layout="fill"
        className="object-cover hover:scale-110 transition-transform"
        alt={coverImage.name}
      />
    </div>
  );
};

export default PostCover;
