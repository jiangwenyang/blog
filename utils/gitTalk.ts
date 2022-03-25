import Gitalk from "gitalk";

const initGitalk = (container: string, id: string) => {
  const gitalkOptions = {
    clientID: process.env.GIT_TALK_CLIENT_ID!,
    clientSecret: process.env.GIT_TALK_CLIENT_SECRET!,
    repo: process.env.GIT_TALK_REPO!,
    owner: process.env.GIT_TALK_OWNER!,
    admin: [process.env.GIT_TALK_OWNER!],
    id,
  };
  const gitalk = new Gitalk(gitalkOptions);

  gitalk.render("gitalk-container");
};

export default initGitalk;
