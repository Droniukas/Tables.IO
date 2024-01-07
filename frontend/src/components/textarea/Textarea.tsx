'use client';

import { TextareaAutosize } from '@mui/material';
import { KeyboardEvent, useRef, useState } from 'react';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import styles from './textarea.module.scss';

type TextareaProps = {
  onEnter: (newValue: string) => void;
  onOutsideClick: (newValue: string) => void;
  defaultValue: string;
};

export default function Textarea(props: TextareaProps) {
  const { onEnter, onOutsideClick, defaultValue } = props;

  const [value, setValue] = useState(defaultValue);

  const ref = useRef<HTMLTextAreaElement>(null);

  const onTextareaKeypress = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      onEnter(value);
    }
  };

  useOutsideClick(ref, () => onOutsideClick(value), [onOutsideClick]);

  return (
    <TextareaAutosize
      value={value}
      autoFocus
      onFocus={(event) => event.target.setSelectionRange(event.target.value.length, event.target.value.length)}
      onChange={(event) => setValue(event.target.value)}
      className={styles.textarea}
      onKeyDown={onTextareaKeypress}
      ref={ref}
    />
  );
}
