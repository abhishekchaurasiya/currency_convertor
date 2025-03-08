import { useState, useEffect } from "react";
import axios from "axios";

// const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${currency}`);
// const json = await response.json();

const url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies`;

function useCurrencyInfo(currency: string) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${url}/${currency}.json`);
        setData(data[currency]);
      } catch (error) {
        console.error("Error fetching currency data:", error);
      }
    };
    fetchData();
  }, [currency]);

  return data;
}

export default useCurrencyInfo;
