import styles from "./footer.module.css";
const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div>
        <p>FICOHSA</p>
        <a href="mailto:weik@weikstudio.com">MAIL: ingjeffersonfag@gmail.com</a>
        <a className="py-0 my-0" href="tel:+57304-364-9269">
          PHONE: +57 3136636011
        </a>
      </div>
      <div className="footer-ws-divider">
        <hr />
      </div>

      <div>
        <p className="footer-copyright col-12 py-0 my-0 mt-1">
          Copyrigth &#169; 2024 Ficohsa - JeffersonAlmanza
        </p>
      </div>
    </footer>
  );
};

export default Footer;
