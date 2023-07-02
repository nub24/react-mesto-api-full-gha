function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <p className="footer__content">{`© ${currentYear} Mesto Russia`}</p>
    </footer>
  );
}

export default Footer;
