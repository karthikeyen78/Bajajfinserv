import React, { useState} from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  suggestions: string[];
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, suggestions }) => {
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    setShowSuggestions(false);
    onSearch(suggestion);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setShowSuggestions(false);
      onSearch(inputValue);
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder="Search for doctors..."
        data-testid="autocomplete-input"
        className="search-input"
      />
      {showSuggestions && suggestions.length > 0 && (
        <div className="suggestions-dropdown">
          {suggestions.slice(0, 3).map((suggestion, index) => (
            <div
              key={index}
              className="suggestion-item"
              data-testid="suggestion-item"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar; 