import { useEffect, useState } from "react";

const loadGithubUser = async (code: string) => {
  console.log(code);
};

const GitpodPanel = () => {
  const [code, updateCode] = useState<string>("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    if (code) {
      updateCode(code);
      loadGithubUser(code);
    }
  }, []);

  return (
    <span style={{ marginLeft: "2rem", marginRight: "2rem" }}>
      {code === "" ? (
        <a href="https://github.com/login/oauth/authorize?client_id=4ed88805200ec4f40fae">
          Login Github
        </a>
      ) : (
        <span>{code}</span>
      )}
    </span>
  );
};

export default GitpodPanel;
