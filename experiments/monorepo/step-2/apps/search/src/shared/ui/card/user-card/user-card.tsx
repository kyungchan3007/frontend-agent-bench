import { Card } from "@repo/ui/card";
import type { User } from "@repo/api/users";

// 측정용(#61): 화면에서는 쓰지 않는다. 같은 카드 묶음(barrel)에 있을 때 도서 카드만 가져와도 함께 따라오는지 보려고 둔다
export function UserCard({ user }: { user: User }) {
  return (
    <Card title={user.name}>
      <p className="text-sm text-text-muted">회원 번호 {user.id}</p>
    </Card>
  );
}
