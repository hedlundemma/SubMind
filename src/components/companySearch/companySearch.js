import React, { useState } from 'react';

const CompanySearch = () => {
  const hardcodedCompanies = [
    'Netflix',
    'DisneyPlus',
    'Spotify'
  ];

  const [searchText, setSearchText] = useState('');
  const [filteredCompanies, setFilteredCompanies] = useState([]);

  const handleInputChange = (e) => {
    const inputText = e.target.value;
    setSearchText(inputText);

    // Filter companies based on user input
    const filtered = hardcodedCompanies.filter((company) =>
      company.toLowerCase().includes(inputText.toLowerCase())
    );
    setFilteredCompanies(filtered);
  };

  const handleSelectCompany = (selectedCompany) => {
    setSearchText(selectedCompany);
    // Handle the selected company (e.g., store it in state or use it for subscription creation)
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search for a company..."
        value={searchText}
        onChange={handleInputChange}
      />
      {filteredCompanies.length > 0 && (
        <ul>
          {filteredCompanies.map((company) => (
            <li key={company} onClick={() => handleSelectCompany(company)}>
              {company}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CompanySearch;
