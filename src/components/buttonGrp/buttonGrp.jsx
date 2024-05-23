import React from "react";
import clsx from "clsx";
import { Button } from "antd";

import styles from "./buttonGrp.module.scss";

const ButtonGrp = ({ buttons, className }) => {
  return (
    <div className={clsx(styles.btnGrp, className)}>
      {buttons.map(({ display, type, className, onClick }) => (
        <Button
          type={type}
          className={clsx(
            styles.btn,
            { [styles.outlineBtn]: type === "outline", [styles.filledBtn]: type === "filled" },
            className
          )}
          onClick={onClick}
        >
          {display}
        </Button>
      ))}
    </div>
  );
};
export default React.memo(ButtonGrp);
