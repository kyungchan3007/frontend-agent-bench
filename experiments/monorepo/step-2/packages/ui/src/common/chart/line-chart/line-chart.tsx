import { CategoryScale, Chart as ChartJS, LinearScale, LineController, LineElement, PointElement } from "chart.js";
import { Chart } from "react-chartjs-2";

// 측정용(#61): 화면에서는 쓰지 않는다. 파일을 불러오는 순간 실행되는 등록 코드 (부수 효과)
ChartJS.register(LineController, LineElement, PointElement, CategoryScale, LinearScale);

export function LineChart({ labels, values }: { labels: string[]; values: number[] }) {
  return <Chart type="line" data={{ labels, datasets: [{ label: "추이", data: values }] }} />;
}
