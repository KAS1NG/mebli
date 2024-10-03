import { useFormStatus } from "react-dom";

export default function CustomSubmitBtn({ text, classN }: { text: string, classN: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      type="submit"
      className={classN}>
      {pending ? 'Loading...' : text}
    </button>
  );
}