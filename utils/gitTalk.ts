import Gitalk from "gitalk";

const initGitalk = (container: string, id: string) => {
  const gitalkOptions = {
    clientID: process.env.NEXT_PUBLIC_GIT_TALK_CLIENT_ID!,
    clientSecret: process.env.NEXT_PUBLIC_GIT_TALK_CLIENT_SECRET!,
    repo: process.env.NEXT_PUBLIC_GIT_TALK_REPO!,
    owner: process.env.NEXT_PUBLIC_GIT_TALK_OWNER!,
    admin: [process.env.NEXT_PUBLIC_GIT_TALK_OWNER!],
    createIssueManually: true,
    id,
  };
  const gitalk = new Gitalk(gitalkOptions);

  gitalk.render("gitalk-container");
};

export default initGitalk;
