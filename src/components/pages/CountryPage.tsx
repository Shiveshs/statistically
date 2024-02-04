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
  type CountryDetails = {
    country: string;
    region: string;
    happiness_rank: number;
    happiness_score: number;
    standard_error?: number;
    economy_gdp_per_capita: number;
    family?: number;
    health_life_expectancy: number;
    freedom: number;
    trust_government_corruption: number;
    generosity: number;
    dystopia_residual?: number;
  };
  const { state } = useLocation();

  const [countryData, setCountryData] = useState<any>(null);

  useEffect(() => {
    if (state && state.country) {
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
    return (
      <div className='container mx-auto mt-8'>No country data available.</div>
    );
  }

  const countryDetails = countryData[0];

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
    <div className='bg-gray-800 min-h-screen text-white'>
      <div className='container mx-auto mt-8'>
        <h2 className='text-3xl font-semibold mb-4'>{state.country}</h2>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-32'>
          {Object.entries<keyof CountryDetails>(countryDetails).map(
            ([key, value]) => (
              <div key={key}>
                <p className='text-lg mb-2'>
                  <strong>{key.replace(/_/g, " ")}</strong>: {value}
                </p>
              </div>
            )
          )}
        </div>

        {/* Display charts */}
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-8'>
          <div>
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
    </div>
  );
};

export default CountryPage;
