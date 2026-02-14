import styles from './SegmentedControl.module.css';

interface SegmentedControlProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

export function SegmentedControl({ label, options, value, onChange }: SegmentedControlProps) {
  return (
    <div className={styles.wrapper}>
      <span className={styles.label} id={`seg-${label}`}>{label}</span>
      <div
        className={styles.track}
        role="radiogroup"
        aria-labelledby={`seg-${label}`}
        aria-label={label}
      >
        {options.map((option) => (
          <button
            key={option}
            type="button"
            role="radio"
            aria-checked={value === option}
            className={`${styles.pill} ${value === option ? styles.active : ''}`}
            onClick={() => onChange(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
