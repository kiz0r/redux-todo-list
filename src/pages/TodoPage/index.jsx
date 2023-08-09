import { connect } from 'react-redux';
import TaskField from '../../components/TaskField';
import TasksList from '../../components/TasksList';
import styles from './TodoPage.module.sass';

const TodoPage = ({ tasks }) => {
  return (
    <section>
      <div className={styles.frame}>
        <div className={styles.frameHeading}>Todos ({tasks.length})</div>
        <div className={styles.frameBody}>
          <TaskField />
          <TasksList />
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = ({ todoList }) => todoList;

export default connect(mapStateToProps)(TodoPage);
