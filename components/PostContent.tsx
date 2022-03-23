type Props = {
  content: string;
};

const PostContent: React.FC<Props> = ({ content }) => {
  return <div dangerouslySetInnerHTML={{ __html: content }} />;
};

export default PostContent;
