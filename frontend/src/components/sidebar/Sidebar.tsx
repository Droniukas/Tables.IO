"use client";
import React, { useEffect } from "react";
import styles from "./sidebar.module.scss";
import Button from "../button/Button";
import { Color } from "@/models/enums/Color";
import { Size } from "@/models/enums/Size";
import { ButtonType } from "@/models/enums/ButtonType";
import TableChartRoundedIcon from "@mui/icons-material/TableChartRounded";
import InsertChartRoundedIcon from "@mui/icons-material/InsertChartRounded";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className={styles.sidebar}>
      <Link href={"/"}>
        <Button
          color={Color.PRIMARY}
          size={Size.MEDIUM}
          type={ButtonType.ONLY_ICON_COLORED}
          icon={TableChartRoundedIcon}
          active={pathname === "/"}
        />
      </Link>
      <Link href={"/graphs"}>
        <Button
          color={Color.PRIMARY}
          size={Size.MEDIUM}
          type={ButtonType.ONLY_ICON_COLORED}
          icon={InsertChartRoundedIcon}
          active={pathname === "/graphs"}
        />
      </Link>
    </div>
  );
};

export default Sidebar;
