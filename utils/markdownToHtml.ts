import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkToc from "remark-toc";
import rehypeFormat from "rehype-format";
import prism from "remark-prism";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";

export default async function markdownToHtml(markdown: string) {
  const result = await unified()
    .use(remarkParse) // 解析markdown
    .use(remarkGfm) // 支持Github markdown语法扩展 https://github.github.com/gfm/
    .use(remarkToc, {
      maxDepth: 3, // 最多只显示三级标题
    })
    // 代码高亮
    .use(prism, {
      // plugins: [
      //   "autolinker",
      //   "command-line",
      //   "data-uri-highlight",
      //   "diff-highlight",
      //   "inline-color",
      //   "keep-markup",
      //   "line-numbers",
      //   "show-invisibles",
      //   "treeview",
      // ],
    })
    .use(remarkRehype) // 转换remark到rehype处理
    .use(rehypeFormat) // 格式化html
    .use(rehypeSlug) // 标题添加id配合TOC
    .use(rehypeStringify) // 输出html
    .process(markdown);

  return result.toString();
}
