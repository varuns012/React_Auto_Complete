import React, { useEffect, useState } from "react";
import "./AutoFilled.css";
import { Card, Input, Typography, Select } from "antd";
import axios from "axios";

const { Title } = Typography;

function AutoFilled() {
  const [searchFood, setSearchFood] = useState([]);
  const [searchValue, setSearchValue] = useState([]);
  const [optionsSelected, setOptionsSelected] = useState("");


  const searchHandle = (text) => {
    setOptionsSelected(text)
    if(!text) {
      setSearchValue([])
    } else {
      let textMatches = searchFood.filter((food) => {
        const regex = new RegExp(`${text}`);
        return food.name.match(regex) || food.capital.match(regex);
      });
    setSearchValue(textMatches);
  }
  };

  useEffect(() => {
    const loadCountries = async () => {
      const resp = await axios.get("https://restcountries.eu/rest/v2/all");
      setSearchFood(resp.data);
    };
    loadCountries();
  }, []);

  return (
    <div className="search_container">
      <div className="auto_filled">
        <Title className="auto_filled_title" level={5}>
          Auto Filled Web App
        </Title>
      </div>
      
      <Input
        placeholder="Search...."
        onChange={(e) => searchHandle(e.target.value)}
        style={{ width: "500px" }}
        value={optionsSelected}
      />
      <Card className="name_card">
      {searchValue &&
        searchValue.map((item, index) => {
          return (
            <div
            className="name_cont"
              key={index}
              style={{ marginTop: "5%", cursor: "pointer" }}
            >
              <p
                className="contact"
                onClick={() => {
                  setOptionsSelected(item && item.name);
                  setSearchValue([]);
                }}
              >
                Capital: {item.name}
              </p>
            </div>
          );
        })}
      </Card>
    </div>
  );
}
export default AutoFilled;
