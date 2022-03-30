type MetaProps = {
  title: string;
  content: React.ReactNode;
  icon: React.ReactNode;
};

const Meta: React.FC<MetaProps> = ({ title, content, icon }) => {
  return (
    <div className="flex items-center ">
      <div className="mr-1 w-6">{icon}</div>
      <div className="mr-2">{title}:</div>
      <div className="text-slate-500">{content}</div>
    </div>
  );
};

export default Meta;
