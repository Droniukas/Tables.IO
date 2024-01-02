'use client';

import { TextareaAutosize } from '@mui/material';
import React, { ChangeEventHandler, KeyboardEvent, useRef } from 'react';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import styles from './textarea.module.scss';

type TextareaProps = {
  value: string;
  onEnter: () => void;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  onOutsideClick: () => void;
};

export default function Textarea(props: TextareaProps) {
  const { onEnter, value, onChange, onOutsideClick } = props;

  const ref = useRef<HTMLTextAreaElement>(null);

  const onTextareaKeypress = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      onEnter();
    }
  };

  useOutsideClick(ref, onOutsideClick);

  return (
    <TextareaAutosize
      value={value}
      autoFocus
      onFocus={(event) => event.target.setSelectionRange(event.target.value.length, event.target.value.length)}
      onChange={onChange}
      className={styles.textarea}
      onKeyDown={onTextareaKeypress}
      ref={ref}
    />
  );
}
