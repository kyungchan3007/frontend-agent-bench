import { BarController, BarElement, CategoryScale, Chart as ChartJS, LinearScale } from "chart.js";
import { Chart } from "react-chartjs-2";

// 파일을 불러오는 순간 실행되는 등록 코드 (부수 효과)
ChartJS.register(BarController, BarElement, CategoryScale, LinearScale);

export function BarChart({ labels, values }: { labels: string[]; values: number[] }) {
  return <Chart type="bar" data={{ labels, datasets: [{ label: "막대", data: values }] }} />;
}
