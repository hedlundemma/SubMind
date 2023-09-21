import React, { useState } from 'react';
import styled from "styled-components";

const hardcodedCompanies = [
  { name: 'amazon', displayName: 'Amazon' },
  { name: 'apple', displayName: 'Apple' },
  { name: 'discord', displayName: 'Discord' },
  { name: 'disneyPlus', displayName: 'Disney+' },
  { name: 'figma', displayName: 'Figma' },
  { name: 'instagram', displayName: 'Instagram' },
  { name: 'klarna', displayName: 'Klarna' },
  { name: 'linkedin', displayName: 'LinkedIn' },
  { name: 'messenger', displayName: 'Messenger' },
  { name: 'meta', displayName: 'Meta' },
  { name: 'netflix', displayName: 'Netflix' },
  { name: 'paypal', displayName: 'PayPal' },
  { name: 'pinterest', displayName: 'Pinterest' },
  { name: 'plus', displayName: 'Google+' },
  { name: 'reddit', displayName: 'Reddit' },
  { name: 'shopify', displayName: 'Shopify' },
  { name: 'skype', displayName: 'Skype' },
  { name: 'slack', displayName: 'Slack' },
  { name: 'snapchat', displayName: 'Snapchat' },
  { name: 'soundcloud', displayName: 'SoundCloud' },
  { name: 'spotify', displayName: 'Spotify' },
  { name: 'stripe', displayName: 'Stripe' },
  { name: 'telegram', displayName: 'Telegram' },
  { name: 'tiktok', displayName: 'TikTok' },
  { name: 'tinder', displayName: 'Tinder' },
  { name: 'trello', displayName: 'Trello' },
  { name: 'tumblr', displayName: 'Tumblr' },
  { name: 'twitch', displayName: 'Twitch' },
  { name: 'twitter', displayName: 'Twitter' },
  { name: 'vimeo', displayName: 'Vimeo' },
  { name: 'whatsapp', displayName: 'WhatsApp' },
  { name: 'wordpress', displayName: 'WordPress' },
  { name: 'xing', displayName: 'Xing' },
  { name: 'yelp', displayName: 'Yelp' },
  { name: 'youtube', displayName: 'YouTube' },
  { name: 'zoom', displayName: 'Zoom' }
];


const CompanyListItem = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 16px;
`;

const CompanySearch = (props) => {
  const [searchText, setSearchText] = useState('');
  const [filteredCompanies, setFilteredCompanies] = useState([]);

  const handleInputChange = (e) => {
    const inputText = e.target.value;
    setSearchText(inputText);
  
    if (inputText === '') {
      setFilteredCompanies([]);
    } else {
      const filtered = hardcodedCompanies
        .filter((company) =>
          company.displayName.toLowerCase().includes(inputText.toLowerCase())
        )
        .slice(0, 7);
      setFilteredCompanies(filtered);
    }
  };

  const handleSelectCompany = (selectedCompany) => {
    setSearchText(selectedCompany.displayName);
    // Handle the selected company 
    props.setService(selectedCompany.name);
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
