'use client';

import { TextareaAutosize } from '@mui/material';
import { useRef, useState } from 'react';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import styles from './textarea.module.scss';

type TextareaProps = {
  onEnter: (newValue: string) => void;
  onOutsideClick: (newValue: string) => void;
  defaultValue: string;
  placeholder?: string;
  disabled?: boolean;
};

export default function Textarea(props: TextareaProps) {
  const { onEnter, onOutsideClick, defaultValue, placeholder, disabled } = props;

  const [value, setValue] = useState(defaultValue);

  const ref = useRef<HTMLTextAreaElement>(null);

  useOutsideClick(ref, () => onOutsideClick(value), [onOutsideClick]);

  return (
    <TextareaAutosize
      value={value}
      autoFocus
      onFocus={(event) => event.target.setSelectionRange(event.target.value.length, event.target.value.length)}
      onChange={(event) => setValue(event.target.value)}
      className={styles.textarea}
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          onEnter(value);
        }
      }}
      ref={ref}
      placeholder={placeholder}
      disabled={disabled}
    />
  );
}
