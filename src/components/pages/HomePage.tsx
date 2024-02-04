import React, { useState, useEffect } from "react";
import BasicTable from "../table/BasicTable";
import { columnDef } from "../table/Columns";
import { dropdownOption, scoreOption } from "../../types/Interfaces";
import dataJSON2015 from "../../jsonDataSet/2015.json";
import dataJSON2016 from "../../jsonDataSet/2016.json";
import dataJSON2017 from "../../jsonDataSet/2017.json";
import dataJSON2018 from "../../jsonDataSet/2018.json";
import dataJSON2019 from "../../jsonDataSet/2019.json";
import LineChart from "../charts/LineChart";
import BarChart from "../charts/BarChart";

const HomePage: React.FC = () => {
  const options: dropdownOption[] = [
    { value: "2015", label: "2015" },
    { value: "2016", label: "2016" },
    { value: "2017", label: "2017" },
    { value: "2018", label: "2018" },
    { value: "2019", label: "2019" },
  ];

  const scoreOptions: scoreOption[] = [
    { label: "All", filterCondition: () => true },
    {
      label: "6.8 and above",
      filterCondition: (score: number) => score >= 6.8,
    },
    {
      label: "Between 4.5 and 6.8",
      filterCondition: (score: number) => score >= 4.5 && score < 6.8,
    },
    {
      label: "Between 1 and 4.5",
      filterCondition: (score: number) => score >= 1 && score < 4.5,
    },
  ];

  const dataByYear: Record<string, any> = {
    "2015": dataJSON2015,
    "2016": dataJSON2016,
    "2017": dataJSON2017,
    "2018": dataJSON2018,
    "2019": dataJSON2019,
  };

  const [selectedYear, setSelectedYear] = useState<string>("2015");
  const [selectedScore, setSelectedScore] = useState<scoreOption | null>(null);
  const [chartData, setChartData] = useState<any>(null);
  const [lineChartData, setLineChartData] = useState<any>(null);

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(event.target.value);
  };

  const handleScoreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLabel = event.target.value;
    const option = scoreOptions.find((opt) => opt.label === selectedLabel);
    setSelectedScore(option || null);
  };

  useEffect(() => {
    console.log();
    const filteredData = dataByYear[selectedYear].filter((data: any) => {
      if (!selectedScore) {
        return true;
      }
      return selectedScore.filterCondition(data.happiness_score);
    });

    setChartData({
      labels: filteredData.map((data: any) => data.country),
      datasets: [
        {
          label: `Happiness Score by year - ${selectedYear}`,
          data: dataByYear[selectedYear].map(
            (data: any) => data.happiness_score
          ),
          backgroundColor: "rgba(75,192,192,0.2)",
          borderColor: "rgba(75,192,192,1)",
          borderWidth: 1,
        },
      ],
    });

    setLineChartData({
      labels: filteredData.map((data: any) => data.country),
      datasets: [
        {
          label: `Happiness Rank by year - ${selectedYear}`,
          data: dataByYear[selectedYear].map(
            (data: any) => data.happiness_rank
          ),
          backgroundColor: "rgba(75,192,192,0.2)",
          borderColor: "rgba(75,192,192,1)",
          borderWidth: 1,
        },
      ],
    });
    console.log(
      selectedYear,
      "selectedScore",
      selectedScore,
      "dataByYear",
      dataByYear
    );
  }, [selectedYear, selectedScore]);

  return (
    <div className='flex h-screen bg-gray-800 text-white'>
      <div className='flex-1 p-6 overflow-y-auto'>
        <h1 className='text-2xl font-semibold mb-4'>Statistically</h1>
        <div className='flex'>
          <div className='flex-1 pr-6'>
            <BasicTable
              dataJSON={dataByYear[selectedYear]}
              columnDef={columnDef}
            />
            <div className='mt-6 chart-container'>
              {chartData && <LineChart chartData={lineChartData} />}
              {chartData && <BarChart chartData={chartData} />}
            </div>
          </div>
        </div>
      </div>

      <div className='w-1/4 bg-gray-900 p-6'>
        <h2 className='text-xl font-semibold mb-4'>Data by Year</h2>
        <div className='mb-4'>
          <label className='block text-sm font-medium text-gray-400 mb-2'>
            Select Year:
          </label>
          <select
            className='w-full py-2 px-4 border bg-gray-800 text-white rounded focus:outline-none focus:border-indigo-500'
            value={selectedYear}
            onChange={handleYearChange}>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <h2 className='text-xl font-semibold mb-4'>Data by Happiness Score</h2>
        <div className='mb-4'>
          <label className='block text-sm font-medium text-gray-400 mb-2'>
            Select Score:
          </label>
          <select
            className='w-full py-2 px-4 border bg-gray-800 text-white rounded focus:outline-none focus:border-indigo-500'
            value={selectedScore?.label || "All"}
            onChange={handleScoreChange}>
            {scoreOptions.map((option) => (
              <option key={option.label} value={option.label}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
