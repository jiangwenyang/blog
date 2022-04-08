import Link from "next/link";
import Image from "next/image";

const Intro: React.FC = () => {
  return (
    <div className="py-6">
      <Image
        src="/tom.jpg"
        width={100}
        height={100}
        alt="jiangwenyang"
        className="rounded-full"
      />
      <article className="prose dark:prose-invert max-w-none mt-4">
        <p>
          我叫<Link href="/about">蒋文杨</Link>
          ，1995年出生于重庆。5年前端开发工程师，阅读和电影爱好者，业余做饭人和专职铲屎官。
        </p>
        <p>
          写这个博客的初衷是记录我学习和生活的点滴，如果能在此之外帮助到你，我将不胜荣幸。
        </p>
        <p>
          你可以免费阅读本博客的所有内容，如果对文章内容有任何问题，你可以在每篇文章后进行评论，也可以通过Email
          (u19950930@gmail.com)随时联系我。
        </p>
        <p>
          你也可以通过Follow我的
          <a href="https://github.com/jiangwenyang">Github</a>
          或者
          <a href="https://twitter.com/jiang_wenyang">Twitter</a>
          ,我会不定期分享一些有趣的东西。
        </p>
      </article>
    </div>
  );
};

export default Intro;
