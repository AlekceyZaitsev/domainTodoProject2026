import "./btn-add.scss";

interface buttonProps {
  title: string;
  className: string;
  disabled: boolean;
  functions?: () => void;
}

export const ButtonsAdd = (props: buttonProps) => {
  const { title, className, disabled, functions } = props;

  return (
    <button className={className} disabled={disabled} onClick={functions}>
      {title}
    </button>
  );
};
