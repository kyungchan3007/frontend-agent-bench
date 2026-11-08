import { getUser } from "../generated/sdk.gen";
import type { User } from "../generated/types.gen";

export async function fetchUser(userId: string): Promise<User> {
  const { data } = await getUser({ path: { userId }, throwOnError: true });
  return data;
}
