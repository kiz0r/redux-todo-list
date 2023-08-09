import { Field } from 'formik';
import styles from './Input.module.sass';
// TODO: add classes to input, span
// TODO: check it

const Input = ({ name, label, requiresValidation, ...restProps }) => {
  return (
    <Field name={name}>
      {({ field, form: { errors, touched }, meta }) => {
        return (
          <label className={styles.label}>
            {label && <span>{label}</span>}
            <input
              type='text'
              className={styles.input}
              {...field}
              {...restProps}
            />
            {requiresValidation && meta.error && meta.touched && (
              <span className={styles.error}>{meta.error}</span>
            )}
          </label>
        );
      }}
    </Field>
  );
};

export default Input;
