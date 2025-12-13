import styles from "./Modal.module.css";

export default function Modal({children, onClose, size}) {
    return (
        <div className={styles.popUp} onClick={onClose}>
            <div className={`${styles.content} ${styles[size]}`} onClick={(event) => event.stopPropagation()}>
                {children}
            </div>
        </div>
    );
}