import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import LineChart from "../charts/LineChart";
import BarChart from "../charts/BarChart";
import dataJSON2015 from "../../jsonDataSet/2015.json";
import dataJSON2016 from "../../jsonDataSet/2016.json";
import dataJSON2017 from "../../jsonDataSet/2017.json";
import dataJSON2018 from "../../jsonDataSet/2018.json";
import dataJSON2019 from "../../jsonDataSet/2019.json";

const CountryPage: React.FC = () => {
  const { state } = useLocation();

  const [countryData, setCountryData] = useState<any>(null);

  useEffect(() => {
    if (state && state.country) {
      // Fetching data for the selected country
      const dataByYear: Record<string, any> = {
        "2015": dataJSON2015,
        "2016": dataJSON2016,
        "2017": dataJSON2017,
        "2018": dataJSON2018,
        "2019": dataJSON2019,
      };

      const countryDataArray = Object.keys(dataByYear).map((year) => {
        return dataByYear[year].find(
          (country: any) => country.country === state.country
        );
      });

      setCountryData(countryDataArray);
    }
  }, [state]);

  if (!state || !state.country || !countryData) {
    return <div>No country data available.</div>;
  }

  console.log(countryData);

  const happinessScoreData = {
    labels: countryData
      .filter((data: any) => data)
      .map((_: any, index: number) => 2015 + index),
    datasets: [
      {
        label: "Happiness Score",
        data: countryData
          .filter((data: any) => data)
          .map((data: any) => data.happiness_score),
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  };

  const happinessRankData = {
    labels: countryData
      .filter((data: any) => data)
      .map((_: any, index: number) => 2015 + index),
    datasets: [
      {
        label: "Happiness Rank",
        data: countryData
          .filter((data: any) => data)
          .map((data: any) => data.happiness_rank),
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className='container mx-auto mt-8'>
      <div className='bg-gray-800 text-white rounded p-8 shadow-md'>
        <h2 className='text-3xl font-semibold mb-4'>{state.country}</h2>

        {/* Display charts */}
        <div className='mb-6'>
          <h3 className='text-xl font-semibold mb-2'>
            Happiness Score Over the Years
          </h3>
          <LineChart chartData={happinessScoreData} />
        </div>

        <div>
          <h3 className='text-xl font-semibold mb-2'>
            Happiness Rank Over the Years
          </h3>
          <BarChart chartData={happinessRankData} />
        </div>
      </div>
    </div>
  );
};

export default CountryPage;
