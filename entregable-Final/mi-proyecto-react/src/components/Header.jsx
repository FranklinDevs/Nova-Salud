function Header() {
  return (
    // CONTENEDOR CENTRADO PARA EL HEADER
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <header style={{ 
        backgroundColor: "#0074D9", 
        color: "white", 
        padding: "15px 20px",
        width: '100%',
        maxWidth: '1200px',
        textAlign: 'center'
      }}>
        <h1>Botica Nova Salud 💊</h1>
        <nav>
          {}
        </nav>
      </header>
    </div>
  )
}

export default Header