import githubLogo from "./assets/github-mark-white.svg";

const Footer = () => {
  return (
    <footer className="mt-auto py-4 pt-8 text-center flex items-center space-x-2 text-slate-400">
      <span>Created by @sugyan</span>
      <a
        href="https://github.com/sugyan/hima-dango"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={githubLogo} alt="GitHub Logo" className="w-6 h-6" />
      </a>
    </footer>
  );
};
export default Footer;
