import { DetailedHTMLProps, InputHTMLAttributes } from "react";

interface InputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label: string;
  error?: string;
  touched?: boolean;
}

export default function Input({ ...props }: InputProps) {
  return (
    <div className="flex flex-col">
      <label htmlFor={props.id}>{props.label}</label>
      <input className="bg-none" {...props} />
      {props.touched && props.error && <span>{props.error}</span>}
    </div>
  );
}
