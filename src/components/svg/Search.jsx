const Search = ({ className }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="m18.293 19.707-4-4 1.414-1.414 4 4a1 1 0 0 1-1.414 1.414"
        clipRule="evenodd"
      ></path>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M10.5 16a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11m0 2a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

export default Search;
