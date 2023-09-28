import { ChangeEvent, Dispatch, SetStateAction } from "react";

export function onStringChange(set: Dispatch<SetStateAction<string>>) {
  return function stringChangeHandler(e: ChangeEvent<HTMLInputElement>) {
    set(e.target.value);
  };
}

export function onNumberChange(set: Dispatch<SetStateAction<number | string>>) {
  return function numberChangeHandler(e: ChangeEvent<HTMLInputElement>) {
    const parsedFloat = parseFloat(e.target.value);
    if (isNaN(parsedFloat)) set("");
    else set(parsedFloat);
  };
}
