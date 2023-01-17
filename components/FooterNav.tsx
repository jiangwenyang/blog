import Link from "./Link";

interface Link {
  name: string;
  url: string;
}

interface Props {
  data: Link[];
}

const Social: React.FC<Props> = ({ data }) => {
  return (
    <ul className="flex flex-col space-y-4 text-left">
      {data.map((item) => (
        <li key={item.name}>
          <Link href={item.url} className="capitalize text-lg">
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Social;
