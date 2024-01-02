import { RefObject, useEffect } from 'react';

export function useOutsideClick(ref: RefObject<any>, onOutsideClick: () => void) {
  useEffect(() => {
    const onClick = ({ target }: any) => !ref.current?.contains(target) && onOutsideClick?.();
    document.addEventListener('mousedown', onClick);

    return () => {
      console.log('removing event listener');
      document.removeEventListener('mousedown', onClick);
    };
  }, []);
}
