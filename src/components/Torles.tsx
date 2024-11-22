import { Menu } from "./Menu";
import { useEffect, useState } from "react";
import { Tablet } from "../tablet";

export function Torles() {
    const [tablet, setTablet] = useState<Tablet[]>([]);

    useEffect(() => {
        async function load() {
            const response = await fetch("http://localhost:4444/tablets");
            const tablet = await response.json();
            setTablet(tablet);
        }
        load();
    }, []);

    const handledelete = async (id: number) => {
        try {
            const response = await fetch('http://localhost:4444/tablets/' + id, {
                method: 'DELETE'
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData);
            } else {
                document.getElementById(id.toString())?.remove();
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Menu />
            <h1>Torles</h1>
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
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tablet?.map((tablet, index) => (
                            <tr id={tablet.id.toString()} key={index}>
                                <td>{tablet.id}</td>
                                <td>{tablet.name}</td>
                                <td>{tablet.os}</td>
                                <td>{tablet.clock_speed}</td>
                                <td>{tablet.cores}</td>
                                <td>{tablet.size}</td>
                                <td>{tablet.resolution}</td>
                                <td>{tablet.ram}</td>
                                <td>{tablet.reviews}</td>
                                <td>{tablet.price}</td>
                                <td><button onClick={() => handledelete(tablet.id)}>Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}