import { StateOperator } from '@ngxs/store';

export function sortEntities<T>(sortFn: (a: T, b: T) => number): StateOperator<T[]> {
  return (items) => [...items].sort(sortFn);
}
