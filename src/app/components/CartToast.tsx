import styles from "../styles/CartToast.module.scss";

interface Props {
  show: boolean
  msg: string
}

export default function CartToast({ show, msg }: Props) {
  return show && (
    <div role="status" aria-live="polite" className={styles.toastMessage}>
      { msg }
    </div >
  )
}
