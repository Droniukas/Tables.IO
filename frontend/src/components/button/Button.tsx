import { ButtonType } from "@/models/enums/ButtonType";
import { Color } from "@/models/enums/Color";
import { Size } from "@/models/enums/Size";
import { State } from "@/models/enums/State";
import styles from "./button.module.scss";
import React, { useEffect } from "react";
import { SvgIconProps } from "@mui/material";

type ButtonProps = {
  color: Color;
  size: Size;
  type: ButtonType;
  active?: boolean;
  icon?: React.ComponentType<SvgIconProps>;
  text?: string;
};
const Button = (props: ButtonProps) => {
  const { color, size, type, active, icon: Icon, text } = props;

  let hasOnlyIcon = false;
  let hasSpecialButtonType = false;
  switch (type) {
    case ButtonType.ONLY_ICON:
      hasOnlyIcon = true;
      break;
    case ButtonType.ONLY_ICON_COLORED:
      hasOnlyIcon = true;
      hasSpecialButtonType = true;
      break;
    case ButtonType.ONLY_ICON_NEUTRAL:
      hasOnlyIcon = true;
      hasSpecialButtonType = true;
      break;
  }

  const buttonSizeClasses = `${
    styles[`${size}${hasOnlyIcon ? "-only-icon" : ""}`]
  } ${size === Size.LARGE && "bigger-paragraph-regular"}`;

  const buttonOtherClasses = `${
    hasSpecialButtonType
      ? styles[`${type}-${active ? "active" : "default"}-${color}`]
      : styles[`default-${active ? "active" : "default"}-${color}`]
  }`;

  const iconSizeClasses = styles[`${size}-icon`];

  const contentColorClasses = `
  ${active ? styles.light : ""} ${
    type === ButtonType.ONLY_ICON_NEUTRAL && !active ? styles.neutral : ""
  } ${type === ButtonType.ONLY_ICON_COLORED && !active ? styles[color] : ""}`;

  const ButtonIcon = () =>
    Icon && type !== ButtonType.NO_ICON ? (
      <Icon className={`${iconSizeClasses} ${contentColorClasses}`} />
    ) : null;

  return (
    <button
      className={`${styles.button} ${buttonSizeClasses} ${buttonOtherClasses} ${contentColorClasses}`}
    >
      {type !== ButtonType.ICON_RIGHT && <ButtonIcon />}
      {text}
      {type === ButtonType.ICON_RIGHT && <ButtonIcon />}
    </button>
  );
};

export default Button;
