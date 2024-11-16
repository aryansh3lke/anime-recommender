"use client";

import React, { useEffect, useState } from "react";
import {
  Dropdown,
  DropdownMenu,
  DropdownTrigger,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import NEXT_PUBLIC_FLASK_BACKEND_PROXY_URL from "../proxy";

export default function InputBar({ handleSubmit }: { handleSubmit: Function }) {
  const [inputAnime, setInputAnime] = useState<string>("");
  const [selectedAnime, setSelectedAnime] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [isSelected, setIsSelected] = useState<boolean>(false);

  useEffect(() => {
    loadAnimeSuggestions();
  }, [inputAnime]);

  const onSubmit = async () => {
    await handleSubmit(selectedAnime);
    setInputAnime("");
    setSelectedAnime("");
    setSuggestions([]);
    setShowDropdown(false);
    setIsSelected(false);
  };

  const loadAnimeSuggestions = async () => {
    if (inputAnime.length > 0 && inputAnime !== selectedAnime) {
      console.log(NEXT_PUBLIC_FLASK_BACKEND_PROXY_URL);
      fetch(
        NEXT_PUBLIC_FLASK_BACKEND_PROXY_URL +
          `/api/get_myanimelist_suggestions?input_anime=${inputAnime}`,
      )
        .then((response) =>
          response
            .json()
            .then((data) => ({ status: response.status, body: data })),
        )
        .then(({ status, body }) => {
          if (status !== 200) {
            console.error(body.error);
            throw new Error(body.error);
          }
          setSuggestions(body.suggestions);
          setShowDropdown(true);
          setIsSelected(false);
        })
        .catch((error) => window.alert(error.message));
    } else {
      setSuggestions([]);
      setShowDropdown(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputAnime(suggestion);
    setSelectedAnime(suggestion);
    setIsSelected(true);
    setSuggestions([]);
    setShowDropdown(false);
  };

  return (
    <div className="relative flex min-h-[50px] max-w-full flex-row items-center justify-center px-8">
      <div className="relative w-full">
        <MagnifyingGlassIcon className="absolute left-5 top-3.5 h-5 w-5 scale-x-[-1] text-slate-400 sm:left-5 sm:top-3 sm:h-6 sm:w-6" />
        <input
          className={`ease min-h-12 w-full rounded-l-full border border-slate-200 bg-transparent bg-white px-4 pl-12 pr-20 text-medium text-slate-700 shadow-sm transition duration-300 placeholder:text-slate-400 hover:border-slate-300 focus:border-slate-400 focus:shadow focus:outline-none sm:pl-14 sm:text-xl`}
          value={inputAnime}
          onChange={(e) => {
            setInputAnime(e.target.value);
          }}
          placeholder="Type your favorite anime..."
          onFocus={() => setShowDropdown(true)}
        ></input>
        {showDropdown && suggestions.length > 0 && (
          <ul className="absolute left-0 z-10 max-h-24 w-full overflow-y-auto rounded-xl rounded-tr-none border border-slate-200 bg-white shadow-lg sm:max-h-48">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="cursor-pointer px-4 py-2 pl-14 text-black hover:bg-slate-100"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
      <Button
        className="h-full min-h-12 min-w-24 rounded-l-none rounded-r-full bg-blue-500 pl-5 pr-6 text-lg font-bold text-white hover:bg-blue-700 disabled:bg-blue-300 dark:bg-cyan-400 dark:hover:bg-cyan-400 dark:disabled:bg-cyan-200 dark:hover:disabled:bg-cyan-200"
        onClick={onSubmit}
        color="secondary"
        size="md"
        disabled={!isSelected}
        disableAnimation={true}
      >
        Recommend
      </Button>
    </div>
  );
}
