import '../Style/HeaderFooter.css';

function HeaderFooter({ type }) {
  return (
    <div className={`header-footer ${type}`}>
      <div className="header-footer-content">
        <h1>Blogg.NU</h1>
        {/* <nav>
          <a href="/hem">Hem</a>
          <a href="/bloggar">Bloggar</a>
          <a href="/kategorier">Kategorier</a>
          <a href="/om oss">Om oss</a>
        </nav> */}
      </div>
    </div>
  );
}

export default HeaderFooter;
