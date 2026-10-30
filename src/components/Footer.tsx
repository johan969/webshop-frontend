type FooterProps = {
  showCookieInfo: () => void;
};

function Footer({ showCookieInfo }: FooterProps) {
  return (
    <footer className="footer">
      <p>&copy; 2026 E.J.E.A. All rights reserved. </p>

      <button type="button" className="footer-cookie" onClick={showCookieInfo}>
        Info om cookies
      </button>
    </footer>
  );
}

export default Footer;
