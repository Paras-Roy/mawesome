import styles from '../styles/Footer.module.css'


export default function Footer() {
    return (
        <footer className={styles.footer}>
            mawesome by - <a className={styles.link} href="https://github.com/paras-roy">Paras Roy</a> | <a className={styles.link} href="https://github.com/paras-roy/mawesome">Source Code on Github</a>
        </footer>
    )
}