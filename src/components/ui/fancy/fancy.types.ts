export type CheckmarkProps = {
  size?: string;
  color?: string;
  checked?: boolean;
};

export type FancySearchInputProps = {
  placeholder?: string;
  width?: string;
  borderColor?: string;
  borderHeight?: string;
  borderAfterColor?: string;
  inputAlt?: boolean;
};

export interface FancyCheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  checkedColor?: string;
  uncheckedColor?: string;
  checkmarkColor?: string;
  size?: string;
  spread?: string;
  className?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onClick?: React.MouseEventHandler<HTMLLabelElement>;
}
