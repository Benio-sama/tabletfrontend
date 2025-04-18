import { useEffect, useState } from "react";
import { Tablet } from "../tablet";

export function Minden() {
    const [tablet, setTablet] = useState<Tablet[]>([]);
    const [filteredTablet, setFilteredTablet] = useState<Tablet[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortField, setSortField] = useState<"name" | "price" | null>(null);
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
    const [editMode, setEditMode] = useState<{ [key: number]: boolean }>({});
    const [editedTablet, setEditedTablet] = useState<Tablet | null>(null);

    // Adatok betöltése
    useEffect(() => {
        async function load() {
            const response = await fetch("http://localhost:4444/tablets");
            const tablet = await response.json();
            setTablet(tablet);
            setFilteredTablet(tablet);
        }
        load();
    }, []);

    // Szűrés és rendezés
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

    // Szerkesztési mód kezelése
    const handleEditClick = (tablet: any) => {
        setEditedTablet(tablet);
        setEditMode(prev => ({ ...prev, [tablet.id]: true }));
    };

    const handleSave = async () => {
        if (editedTablet) {
            const response = await fetch(`http://localhost:4444/tablets/${editedTablet.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(editedTablet),
            });
            if (response.ok) {
                setTablet((prev) =>
                    prev.map((t) =>
                        t.id === editedTablet.id ? editedTablet : t
                    )
                );
                setEditMode(prev => ({ ...prev, [editedTablet.id]: false }));
                setEditedTablet(null);
            }
        }
    };

    const handleCancel = () => {
        if (editedTablet) {
            setEditedTablet(null);
            setEditMode(prev => {
                const updated = { ...prev };
                delete updated[editedTablet.id];
                return updated;
            });
        }
    };

    const handleChange = (field: string, value: string) => {
        if (editedTablet) {
            setEditedTablet({ ...editedTablet, [field]: value });
        }
    };

    return (
        <div>
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
                    <div
                        className="card"
                        key={tablet.id}
                        onClick={() => handleEditClick(tablet)}
                    >
                        {editMode[tablet.id] ? (
                            <div>
                                <input
                                    type="text"
                                    value={editedTablet?.name || tablet.name}
                                    onChange={(e) => handleChange("name", e.target.value)}
                                />
                                <input
                                    type="number"
                                    value={editedTablet?.price || tablet.price}
                                    onChange={(e) => handleChange("price", e.target.value)}
                                />
                                <button onClick={handleSave}>Mentés</button>
                                <button onClick={handleCancel}>Mégse</button>
                            </div>
                        ) : (
                            <div>
                                <h2>{tablet.name} - {tablet.price} Ft</h2>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
