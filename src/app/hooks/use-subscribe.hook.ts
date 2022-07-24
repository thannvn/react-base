/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from 'react';
import { Observable, Subject, take, takeUntil } from 'rxjs';

export default function useSubscribe() {
  const [destroy$, setDestroy] = useState(new Subject<void>());
  const subscribeOne = useMemo(
    () =>
      <T>(observable: Observable<T>, callback: (value: T) => void) =>
        observable.pipe(take(1)).subscribe(callback),
    []
  );

  const subscribeUntilDestroy = useMemo(
    () =>
      <T>(observable: Observable<T>, callback: (value: T) => void) =>
        observable.pipe(takeUntil(destroy$)).subscribe(callback),
    [destroy$]
  );

  useEffect(
    () => () => {
      destroy$.next();
      destroy$.complete();
    },
    [destroy$]
  );

  return { subscribeOne, subscribeUntilDestroy, setDestroy };
}
