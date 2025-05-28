export default function Omoss() {
  return (
    <section className="category-page">
      <h1 className="category-title">Om oss</h1>

      <p className="loading-text">
        Välkommen till BloggStudion! Vi är ett litet team med stort hjärta som älskar att skriva, skapa och dela historier online.
      </p>

      <p className="loading-text">
        Vår vision är att göra det enkelt för vem som helst att blogga – oavsett om du är nybörjare eller van skribent.
      </p>

      <div className="category-list">
        <div className="category-item">
          <h2 className="category-title">Kontakt</h2>
          <p className="category-link">Kiselvägen 23, 123 45 Textstad</p>
          <p className="category-link">070-123 45 67</p>
          <p className="category-link">hej@bloggstudion.se</p>
        </div>
      </div>

      <div style={{ marginTop: "2rem" }}>
        <a href="/" className="category-link">← Tillbaka till startsidan</a>
      </div>
    </section>
  );
}
