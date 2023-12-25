import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './header.module.scss';
import logo from './resources/logo.svg';
import placeholderProfilePick from './resources/profile pick.jpg';

function Header() {
  return (
    <div className={styles.header}>
      <Link href="/">
        <Image priority src={logo} alt="Tables.IO" className={styles.logo} />
      </Link>
      <Image src={placeholderProfilePick} alt="" className={styles.profilePick} />
    </div>
  );
}

export default Header;
