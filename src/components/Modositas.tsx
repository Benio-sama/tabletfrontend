import { Menu } from "./Menu";
import { useEffect, useState } from "react";
import { Tablet } from "../tablet";

export function Modositas() {
    const [tablet, setTablet] = useState<Tablet[]>([]);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editValues, setEditValues] = useState<Partial<Tablet>>({});

    useEffect(() => {
        async function load() {
            const response = await fetch("http://localhost:4444/tablets");
            const tabletData = await response.json();
            setTablet(tabletData);
        }
        load();
    }, []);

    const handleEditClick = (tablet: Tablet) => {
        setEditingId(tablet.id);
        setEditValues(tablet);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof Tablet) => {
        setEditValues({
            ...editValues,
            [field]: e.target.type === 'number' ? parseFloat(e.target.value) : e.target.value
        });
    };

    const handleSave = async () => {
        if (editingId !== null) {
            try {
                const response = await fetch(`http://localhost:4444/tablets/${editingId}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(editValues)
                });
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData);
                } else {
                    setTablet(tablet.map(t => (t.id === editingId ? { ...t, ...editValues } : t)));
                    setEditingId(null);
                }
            } catch (error) {
                console.error(error);
            }
        }
    };

    const handleCancel = () => {
        setEditingId(null);
        setEditValues({});
    };

    return (
        <>
            <Menu />
            <h1>Modify Tablets</h1>
            <div className="center">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Operating system</th>
                            <th>Clock speed</th>
                            <th>Cores</th>
                            <th>Size</th>
                            <th>Resolution</th>
                            <th>RAM</th>
                            <th>Reviews</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tablet.map((tablet, index) => (
                            <tr key={index}>
                                <td>{tablet.id}</td>
                                <td>
                                    {editingId === tablet.id ? (
                                        <input
                                            type="text"
                                            value={editValues.name || ''}
                                            onChange={(e) => handleInputChange(e, "name")}
                                        />
                                    ) : (
                                        tablet.name
                                    )}
                                </td>
                                <td>
                                    {editingId === tablet.id ? (
                                        <input
                                            type="text"
                                            value={editValues.os || ''}
                                            onChange={(e) => handleInputChange(e, "os")}
                                        />
                                    ) : (
                                        tablet.os
                                    )}
                                </td>
                                <td>
                                    {editingId === tablet.id ? (
                                        <input
                                            type="number"
                                            step="0.01"
                                            value={editValues.clock_speed || ''}
                                            onChange={(e) => handleInputChange(e, "clock_speed")}
                                        />
                                    ) : (
                                        tablet.clock_speed
                                    )}
                                </td>
                                <td>
                                    {editingId === tablet.id ? (
                                        <input
                                            type="number"
                                            value={editValues.cores || ''}
                                            onChange={(e) => handleInputChange(e, "cores")}
                                        />
                                    ) : (
                                        tablet.cores
                                    )}
                                </td>
                                <td>
                                    {editingId === tablet.id ? (
                                        <input
                                            type="number"
                                            step="0.1"
                                            value={editValues.size || ''}
                                            onChange={(e) => handleInputChange(e, "size")}
                                        />
                                    ) : (
                                        tablet.size
                                    )}
                                </td>
                                <td>
                                    {editingId === tablet.id ? (
                                        <input
                                            type="text"
                                            value={editValues.resolution || ''}
                                            onChange={(e) => handleInputChange(e, "resolution")}
                                        />
                                    ) : (
                                        tablet.resolution
                                    )}
                                </td>
                                <td>
                                    {editingId === tablet.id ? (
                                        <input
                                            type="number"
                                            value={editValues.ram || ''}
                                            onChange={(e) => handleInputChange(e, "ram")}
                                        />
                                    ) : (
                                        tablet.ram
                                    )}
                                </td>
                                <td>
                                    {editingId === tablet.id ? (
                                        <input
                                            type="number"
                                            value={editValues.reviews || ''}
                                            onChange={(e) => handleInputChange(e, "reviews")}
                                        />
                                    ) : (
                                        tablet.reviews
                                    )}
                                </td>
                                <td>
                                    {editingId === tablet.id ? (
                                        <input
                                            type="number"
                                            value={editValues.price || ''}
                                            onChange={(e) => handleInputChange(e, "price")}
                                        />
                                    ) : (
                                        tablet.price
                                    )}
                                </td>
                                <td>
                                    {editingId === tablet.id ? (
                                        <>
                                            <button onClick={handleSave}>Save</button>
                                            <button onClick={handleCancel}>Cancel</button>
                                        </>
                                    ) : (
                                        <button onClick={() => handleEditClick(tablet)}>Edit</button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
