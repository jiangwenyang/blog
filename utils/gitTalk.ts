import Gitalk from "gitalk";

const initGitalk = (container: string, id: string) => {
  console.log("环境变量");
  console.log(process.env.NEXT_PUBLIC_GIT_TALK_CLIENT_ID);
  console.log(process.env.NEXT_PUBLIC_GIT_TALK_CLIENT_SECRET);

  const gitalkOptions = {
    clientID: process.env.NEXT_PUBLIC_GIT_TALK_CLIENT_ID!,
    clientSecret: process.env.NEXT_PUBLIC_GIT_TALK_CLIENT_SECRET!,
    repo: process.env.NEXT_PUBLIC_GIT_TALK_REPO!,
    owner: process.env.NEXT_PUBLIC_GIT_TALK_OWNER!,
    admin: [process.env.NEXT_PUBLIC_GIT_TALK_OWNER!],
    id,
  };
  const gitalk = new Gitalk(gitalkOptions);

  gitalk.render("gitalk-container");
};

export default initGitalk;
