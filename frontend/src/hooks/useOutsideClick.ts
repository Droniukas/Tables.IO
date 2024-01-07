import { DependencyList, RefObject, useEffect } from 'react';

export function useOutsideClick(ref: RefObject<any>, onOutsideClick: () => void, deps: DependencyList = []) {
  useEffect(() => {
    const onClick = ({ target }: any) => !ref.current?.contains(target) && onOutsideClick?.();
    document.addEventListener('mousedown', onClick);

    return () => {
      document.removeEventListener('mousedown', onClick);
    };
  }, deps);
}
