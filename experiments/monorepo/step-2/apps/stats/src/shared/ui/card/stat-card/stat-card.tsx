import { Card } from "@repo/ui/card";

// 인기 도서 · 월별 대출이 함께 쓰는 앱 공통 카드: 이름과 수치 목록을 받는다
type StatCardProps = {
  title: string;
  rows: { key: string; label: string; value: string }[];
};

export function StatCard({ title, rows }: StatCardProps) {
  return (
    <Card title={title}>
      {rows.map((r) => (
        <p key={r.key} data-testid="stat-row">
          {r.label} {r.value}
        </p>
      ))}
    </Card>
  );
}
