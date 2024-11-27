interface CustomBtnProps {
  text: string
  classN: string
  disabled?: boolean
}

export default function CustomSubmitBtn({ text, classN, disabled }: CustomBtnProps) {

  return (
    <button
      disabled={disabled}
      type="submit"
      className={classN}>
      {disabled ? 'Loading...' : text}
    </button>
  );
}