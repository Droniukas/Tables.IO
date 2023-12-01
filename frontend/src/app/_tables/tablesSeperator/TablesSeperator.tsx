import React from "react";
import styles from "./tablesSeperator.module.scss";
import NotInterestedRoundedIcon from "@mui/icons-material/NotInterestedRounded";

const TablesSeperator = () => {
  return (
    <tr>
      <td colSpan={Number.MAX_SAFE_INTEGER}>
        <div className={styles.container}>
          <svg height='10px' width={"100%"}>
            <rect
              x={0}
              y={"50%"}
              width={"100%"}
              height={1}
              rx={0.5}
              className={styles.svgLine}
            />
          </svg>
          <div className={styles.centerContent}>
            Rejected <NotInterestedRoundedIcon />
          </div>
          <svg height='10px' width={"100%"}>
            <rect
              x={0}
              y={"50%"}
              width={"100%"}
              height={1}
              rx={0.5}
              className={styles.svgLine}
            />
          </svg>
        </div>
      </td>
    </tr>
  );
};

export default TablesSeperator;
