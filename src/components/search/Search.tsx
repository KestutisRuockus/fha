import { useContext, useState } from "react";
import "./search.css";
import { SearchContext } from "../../context/SearchContext";
import { ViewContext } from "../../context/ViewContext";

const Search = ({ onSubmit }: { onSubmit: () => void }) => {
  const [inputValue, setInputValue] = useState<string>("");

  const searchContext = useContext(SearchContext);
  if (!searchContext) {
    throw new Error("must be used within a SearchProvider");
  }

  const viewContext = useContext(ViewContext);
  if (!viewContext) {
    throw new Error("must be used within a ViewProvider");
  }

  const { setQuery } = searchContext;
  const { setView } = viewContext;

  const handleIpnutSubmit = () => {
    setQuery(inputValue.trim().toLocaleLowerCase());
    setView("images");
    setInputValue("");
    if (window.innerWidth < 768) {
      onSubmit();
    }
  };

  return (
    <div className="search">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Enter") {
            handleIpnutSubmit();
          }
        }}
      />
      <svg
        onClick={handleIpnutSubmit}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="25"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="icon icon-search"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    </div>
  );
};

export default Search;
