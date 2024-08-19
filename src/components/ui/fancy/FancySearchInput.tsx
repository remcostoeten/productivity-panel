import { JSX } from "react/jsx-runtime";
import styles from "./css-modules/FancySearchInput.module.css";
import { FancySearchInputProps } from "./fancy.types";

export default function FancySearchInput({
  placeholder,
  width,
  borderColor,
  borderHeight,
  borderAfterColor,
  inputAlt,
}: FancySearchInputProps): JSX.Element {
  return (
    <div
      className={styles.formControl}
      style={{ "--width-of-input": width } as React.CSSProperties}
    >
      <input
        type="text"
        required
        placeholder={placeholder}
        className={
          inputAlt ? `${styles.input} ${styles.inputAlt}` : styles.input
        }
        style={
          {
            "--border-height": borderHeight,
            "--border-before-color": borderColor,
          } as React.CSSProperties
        }
      />
      <span
        className={
          inputAlt
            ? `${styles.inputBorder} ${styles.inputBorderAlt}`
            : styles.inputBorder
        }
        style={
          {
            "--border-after-color": borderAfterColor,
          } as React.CSSProperties
        }
      ></span>
    </div>
  );
}
