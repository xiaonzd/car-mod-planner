import './button.css';

export default function Button({
  children,
  onClick,
  variant = 'primary',
  icon: Icon,
  count,
}) {
  return (
    <button className={`button ${variant}`} onClick={onClick}>
      {Icon && <Icon className="button-icon" />}
      
      {children && <span>{children}</span>}
      
      {count !== undefined && (
        <span className="button-count">{count}</span>
      )}
    </button>
  );
}