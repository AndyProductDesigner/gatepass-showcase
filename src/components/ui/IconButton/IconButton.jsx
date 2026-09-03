import './IconButton.css';

export default function IconButton({
  icon: Icon,
  label,
  onClick,
  disabled = false,
}) {
  return (
    <button
      className="icon-button"
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      disabled={disabled}
    >
      <Icon className="icon-button__icon" aria-hidden="true" />
    </button>
  );
}
