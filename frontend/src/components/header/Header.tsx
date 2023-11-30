import React from "react";
import styles from "./header.module.scss";
import Image from "next/image";
import logo from "./resources/logo.svg";
import placeholderProfilePick from "./resources/profile pick.jpg";
import Link from "next/link";

const Header = () => {
  return (
    <div className={styles.header}>
      <Link href={"/"}>
        <Image priority src={logo} alt={"Tables.IO"} className={styles.logo} />
      </Link>
      <Image
        src={placeholderProfilePick}
        alt={""}
        className={styles.profilePick}
      />
    </div>
  );
};

export default Header;
