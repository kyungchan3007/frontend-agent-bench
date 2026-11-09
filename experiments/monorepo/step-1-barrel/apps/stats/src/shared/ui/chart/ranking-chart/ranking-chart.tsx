import { BarController, BarElement, CategoryScale, Chart as ChartJS, LinearScale } from "chart.js";
import { Chart } from "react-chartjs-2";

// 앱 공용 차트: 파일을 불러오는 순간 실행되는 등록 코드 (부수 효과)
ChartJS.register(BarController, BarElement, CategoryScale, LinearScale);

export function RankingChart({ labels, values }: { labels: string[]; values: number[] }) {
  return <Chart type="bar" options={{ indexAxis: "y" }} data={{ labels, datasets: [{ label: "대출 수", data: values }] }} />;
}
