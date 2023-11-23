import React from "react";
import styles from "./header.module.css";
import Image from "next/image";
import logo from "./resources/logo.svg";
import placeholderProfilePick from "./resources/profile pick.jpg";

const Header = () => {
  return (
    <div className={styles.header}>
      <Image src={logo} alt={"Tables.IO"} className={styles.logo} />
      <Image
        src={placeholderProfilePick}
        alt={""}
        className={styles.profilePick}
      />
    </div>
  );
};

export default Header;
