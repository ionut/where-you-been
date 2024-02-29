import styles from './Footer.module.css'

function Footer() {
    return (
        <footer className={styles.footer}>
            <p className={styles.copyright}></p>Copyright @ {new Date().getFullYear()} WorldWise
        </footer>
    )
}

export default Footer
