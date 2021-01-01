import ReactDOM from 'react-dom';
import React from 'react';
import styles from 'styles.less'

ReactDOM.render(
    <div className={styles.main}>
        <div className={styles.inner}>Hello</div>
        <div className={`${styles.inner} ${styles.combination}`}> world!!!</div>
    </div>,
    document.getElementById('root'));
