import React from "react";
import "./style.css";

interface IButton {
  id?: string;
  text: string | React.ReactNode;
  className?: string;
  onClick?: (event?: any) => void;
}

export default function Button({ id, text, className, onClick }: IButton) {
  return (
    <button id={id} className={`btn ${className ?? ""}`} onClick={onClick}>
      {text}
    </button>
  );
}
