import { connect } from 'react-redux';
import { addTask } from '../../store/slices/todoSlice';
import { Field, Form, Formik } from 'formik';
import Button from '../ui/Button';
import { TASK_VALIDATION_SCHEMA as VALIDATION_SCHEMA } from '../../utils/validate/validationSchemas';
import styles from './TaskField.module.sass';
import Input from '../Input';

const TaskField = ({ newTask }) => {
  const submitFormHandler = (task, formikBag) => {
    newTask(task);
    formikBag.resetForm();
  };

  return (
    <Formik
      initialValues={{ task: '' }}
      onSubmit={submitFormHandler}
      validationSchema={VALIDATION_SCHEMA}
    >
      {formikProps => (
        <Form className={styles.form}>
          <Input name='task' requiresValidation />
          <Button type='submit'>Add</Button>
        </Form>
      )}
    </Formik>
  );
};

const mapDispatchToProps = dispatch => ({
  newTask: t => dispatch(addTask(t)),
});

export default connect(null, mapDispatchToProps)(TaskField);
