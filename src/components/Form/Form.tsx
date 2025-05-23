import toast from "react-hot-toast";
import style from "./form.module.css";
import { FiSearch } from "react-icons/fi";

interface FormSearchProps {
  onSubmit: (query: string) => void;
}

export default function Form({ onSubmit }: FormSearchProps) {
  function handleSubmit(formData: FormData) {
    const query = formData.get("search") as string;
    if (!query) {
      toast.error("Please enter a valid query.", {
        style: {
          borderRadius: "10px",
          background: "#444",
          color: "#fff",
        },
      });
      return;
    }
    onSubmit(query);
  }
  return (
    <form className={style.form} action={handleSubmit}>
      <input
        className={style.input}
        placeholder="What do you want to write?"
        name="search"
        autoFocus
      />
      <button className={style.button} type="submit">
        <FiSearch size="16px" />
      </button>
    </form>
  );
}
