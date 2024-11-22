import { useEffect, useState } from "react";
import { Tablet } from "../tablet";
import { Menu } from "./Menu";

export function Lista() {
    const [tablet, setTablet] = useState<Tablet[]>([]);
    const [filteredTablet, setFilteredTablet] = useState<Tablet[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortField, setSortField] = useState<"name" | "price" | null>(null);
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

    useEffect(() => {
        async function load() {
            const response = await fetch("http://localhost:4444/tablets");
            const tablet = await response.json();
            setTablet(tablet);
            setFilteredTablet(tablet);
        }
        load();
    }, []);

    useEffect(() => {
        let filtered = tablet;
        if (searchQuery.trim()) {
            if (!isNaN(Number(searchQuery))) {
                filtered = tablet.filter((t) =>
                    t.price.toString().includes(searchQuery)
                );
            } else {
                filtered = tablet.filter((t) =>
                    t.name.toLowerCase().includes(searchQuery.toLowerCase())
                );
            }
        }
        if (sortField) {
            filtered = filtered.sort((a, b) => {
                if (sortField === "name") {
                    return sortOrder === "asc"
                        ? a.name.localeCompare(b.name)
                        : b.name.localeCompare(a.name);
                } else if (sortField === "price") {
                    return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
                }
                return 0;
            });
        }

        setFilteredTablet(filtered);
    }, [searchQuery, sortField, sortOrder, tablet]);

    return (
        <div>
            <Menu />
            <h1>Tabletek Lista</h1>
            <div className="controls">
                <input
                    type="text"
                    placeholder="Keresés név alapján..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button onClick={() => {
                    setSortField("name");
                    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
                }}>
                    Rendezés név szerint ({sortOrder === "asc" ? "⬆️" : "⬇️"})
                </button>
                <button onClick={() => {
                    setSortField("price");
                    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
                }}>
                    Rendezés ár szerint ({sortOrder === "asc" ? "⬆️" : "⬇️"})
                </button>
            </div>
            <div className="card-container">
                {filteredTablet.map((tablet) => (
                    <div className="card" key={tablet.id}>
                        <h2>{tablet.name} - {tablet.price} Ft</h2>
                        <p>{tablet.os} - {tablet.ram} GB RAM</p>
                        <p>{tablet.clock_speed} GHz - {tablet.cores} cores</p>
                        <p>{tablet.size}" - {tablet.resolution}p - {tablet.reviews}db review</p>
                    </div>
                ))}
            </div>
        </div>
    );
}