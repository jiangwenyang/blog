import React from "react";
import { useMDXComponent } from "next-contentlayer/hooks";
import Image from "next/image";
import type { ImageProps } from "next/image";

const RoundedImage = (props: ImageProps) => {
  return <Image {...props} className="rounded-lg" alt={props.alt} />;
};

const components = {
  Image: RoundedImage,
};

interface MdxProps {
  code: string;
}

export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code);

  return (
    <article className="prose prose-quoteless prose-neutral dark:prose-invert">
      <Component components={{ ...components }} />
    </article>
  );
}
