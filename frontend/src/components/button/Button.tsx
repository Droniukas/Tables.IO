import { ButtonType } from "@/models/enums/ButtonType";
import { Color } from "@/models/enums/Color";
import { Size } from "@/models/enums/Size";
import { State } from "@/models/enums/State";
import styles from "./button.module.scss";
import React from "react";
import { SvgIconProps } from "@mui/material";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color: Color;
  size: Size;
  buttonType: ButtonType;
  active?: boolean;
  icon?: React.ComponentType<SvgIconProps>;
  text?: string;
}
const Button: React.FC<ButtonProps> = ({
  color,
  size,
  buttonType,
  active,
  icon: Icon,
  text,
  ...props
}) => {
  let hasOnlyIcon = false;
  let hasSpecialButtonType = false;
  switch (buttonType) {
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
      ? styles[`${buttonType}-${active ? "active" : "default"}-${color}`]
      : styles[`default-${active ? "active" : "default"}-${color}`]
  }`;

  const iconSizeClasses = styles[`${size}-icon`];

  const contentColorClasses = `
  ${active ? styles.light : ""} ${
    buttonType === ButtonType.ONLY_ICON_NEUTRAL && !active ? styles.neutral : ""
  } ${
    buttonType === ButtonType.ONLY_ICON_COLORED && !active ? styles[color] : ""
  }`;

  const ButtonIcon = () =>
    Icon && buttonType !== ButtonType.NO_ICON ? (
      <Icon
        className={`${iconSizeClasses} ${
          !hasSpecialButtonType && !active
            ? styles.darkerNeutral
            : contentColorClasses
        }`}
      />
    ) : null;

  return (
    <button
      {...props}
      className={`${styles.button} ${buttonSizeClasses} ${buttonOtherClasses} ${contentColorClasses}`}
    >
      {buttonType !== ButtonType.ICON_RIGHT && <ButtonIcon />}
      {text}
      {buttonType === ButtonType.ICON_RIGHT && <ButtonIcon />}
    </button>
  );
};

export default Button;
