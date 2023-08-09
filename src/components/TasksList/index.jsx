import { connect } from 'react-redux';
import {
  updateTaskState,
  deleteTask,
  renameTask,
  startEditTask,
  finishEditTask,
} from '../../store/slices/todoSlice';
import {
  MdDelete as Delete,
  MdDriveFileRenameOutline as Edit,
  MdCheck as Check,
  MdUndo as Undo,
  MdSave as Save,
} from 'react-icons/md';
import styles from './TasksList.module.sass';
import classNames from 'classnames';
import { Formik } from 'formik';
import { TASK_VALIDATION_SCHEMA } from '../../utils/validate/validationSchemas';
import Input from '../Input';

/*
    TODO :
  * - input -> formikInput
  ! - normalize fonts 
  ! - add adaptive for mobiles
  ! - make constants and replace them to constants.sass
*/

const TasksList = ({
  tasks,
  editingTaskId,
  removeTask,
  updateTask,
  editTask,
  startEdit,
  finishEdit,
}) => {
  const deleteBtnClassName = classNames(styles.btn, styles.deleteBtn);
  const renameBtnClassName = classNames(styles.btn, styles.renameBtn);
  const checkBtnClassName = classNames(styles.btn, styles.checkBtn);

  const checkTaskHandler = (id, isChecked) => {
    updateTask(id, { isChecked: !isChecked });
  };

  const editTaskHandler = (id, updatedValue) => {
    editTask(id, updatedValue);
  };

  const setEdit = id => (editingTaskId !== id ? startEdit(id) : finishEdit());

  return (
    <ul className={styles.tasksList}>
      {tasks.map((t, index) => (
        <li key={t.id}>
          <div
            className={styles.task}
            style={{
              textDecoration: `${t.isChecked ? 'line-through' : 'none'}`,
            }}
          >
            {editingTaskId === t.id ? (
              <Formik
                initialValues={{ task: t.task }}
                validationSchema={TASK_VALIDATION_SCHEMA}
              >
                <Input name='task' autoFocus />
              </Formik>
            ) : (
              <>
                {index + 1}. {t.task}
              </>
            )}
          </div>
          <div className={styles.btnWrapper}>
            <button
              className={renameBtnClassName}
              onClick={() => setEdit(t.id)}
            >
              {editingTaskId === t.id ? <Save /> : <Edit />}
            </button>
            <button
              onClick={() => removeTask(t.id)}
              className={deleteBtnClassName}
            >
              <Delete />
            </button>
            <button
              className={checkBtnClassName}
              onClick={() => checkTaskHandler(t.id, t.isChecked)}
            >
              {!t.isChecked ? <Check /> : <Undo />}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

const mapStateToProps = ({ todoList }) => todoList;

const mapDispatchToProps = dispatch => ({
  removeTask: id => dispatch(deleteTask(id)),
  updateTask: (id, updatedState) =>
    dispatch(updateTaskState({ id, updatedState })),
  editTask: (id, updatedValue) => dispatch(renameTask({ id, updatedValue })),
  startEdit: id => dispatch(startEditTask(id)),
  finishEdit: () => dispatch(finishEditTask()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TasksList);
