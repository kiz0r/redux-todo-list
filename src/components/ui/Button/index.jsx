import styles from './Button.module.sass';

const Button = ({ type, children, onClick, ...restProps }) => {
  return (
    <button className={styles.btn} type={type} onClick={onClick} {...restProps}>
      {children}
    </button>
  );
};

export default Button;
