import './button.css';

export default function Button({
  children,
  onClick,
  variant = 'primary',
  icon: Icon,
  count,
  type = 'button',
  disabled = false,
}) {
  return (
    <button
      className={`button ${variant}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {Icon && <Icon className="button-icon" />}
      
      {children && <span>{children}</span>}
      
      {count !== undefined && (
        <span className="button-count">{count}</span>
      )}
    </button>
  );
}