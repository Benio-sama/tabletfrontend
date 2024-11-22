export function Menu() {
    return (
        <>
            <nav className="navbar">
                <ul className="navbar-list">
                    <li className="navbar-item">
                        <a href="/kezdolap">Kezdolap</a>
                    </li>
                    <li className="navbar-item">
                        <a href="/tabletek-lista">Lista</a>
                    </li>
                    <li className="navbar-item">
                        <a href="/tabletek-felvetel">Felvetel</a>
                    </li>
                    <li className="navbar-item">
                        <a href="/tabletek-torles">Torles</a>
                    </li>
                    <li className="navbar-item">
                        <a href="/tabletek-modosit">Modositas</a>
                    </li>
                    <li className="navbar-item">
                        <a href="/tabletekfullcrud">Minden az egyben</a>
                    </li>
                </ul>
            </nav>
        </>
    )
}