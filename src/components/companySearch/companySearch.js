import React, { useState } from 'react';
import styled from "styled-components";

const hardcodedCompanies = [
  { name: 'netflix', displayName: 'Netflix' },
  { name: 'disneyPlus', displayName: 'Disney+' },
  { name: 'spotify', displayName: 'Spotify' }
];


const CompanyListItem = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 16px;
`;

const CompanySearch = () => {
  const [searchText, setSearchText] = useState('');
  const [filteredCompanies, setFilteredCompanies] = useState([]);

  const handleInputChange = (e) => {
    const inputText = e.target.value;
    setSearchText(inputText);

    if (inputText === '') {
      setFilteredCompanies([]);
    } else {
      const filtered = hardcodedCompanies.filter((company) =>
        company.displayName.toLowerCase().includes(inputText.toLowerCase())
      );
      setFilteredCompanies(filtered);
    }
  };

  const handleSelectCompany = (selectedCompany) => {
    setSearchText(selectedCompany.displayName);
    // Handle the selected company 
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
            <CompanyListItem key={company.name} onClick={() => handleSelectCompany(company)}>
              <img src={`logo/${company.name}.svg`} alt={company.displayName} width={"30px"}/>
              {company.displayName}
            </CompanyListItem>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CompanySearch;
