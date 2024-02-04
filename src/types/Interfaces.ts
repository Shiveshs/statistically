export interface dataType {
  country: string;
  region: string;
  happiness_rank: number;
  happiness_score: number;
  economy_gdp_per_capita: number;
  family: number;
  health_life_expectancy: number;
  freedom: number;
  trust_government_corruption: number;
  generosity: number;
  dystopia_residual: number;
}

export interface dropdownOption {
  value: string;
  label: string;
}

export interface scoreOption {
  label: string;
  filterCondition: (score: number) => boolean;
}

export interface columnDefinition {
  header: string | React.ReactElement;
  cell: string | React.ReactElement;
}

export interface ChartData {
  labels: any;
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
    hoverBackgroundColor?: string;
  }[];
}
