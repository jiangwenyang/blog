type Props = {
  content: string;
};

const PostContent: React.FC<Props> = ({ content }) => {
  return (
    <div
      className="w-full overflow-auto"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default PostContent;
