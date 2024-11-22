import { Menu } from "./Menu"
import { useState } from "react";

export function Felvetel() {
    const [name, setName] = useState("");
    const [os, setOs] = useState("");
    const [clockspeed, setClockSpeed] = useState(0);
    const [cores, setCores] = useState(0);
    const [size, setSize] = useState(0);
    const [resolution, setResolution] = useState("");
    const [ram, setRam] = useState(0);
    const [reviews, setReviews] = useState(0);
    const [price, setPrice] = useState(0);

    const handlesubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newtablet = {
            name: name,
            os: os,
            clock_speed: clockspeed,
            cores: cores,
            size: size,
            resolution: resolution,
            ram: ram,
            reviews: reviews,
            price: price
        }

        try {
            console.log(JSON.stringify(newtablet));
            const response = await fetch("http://localhost:4444/tablets", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newtablet)
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData);
            }
            setName("");
            setOs("");
            setClockSpeed(0);
            setCores(0);
            setSize(0);
            setResolution("");
            setRam(0);
            setReviews(0);
            setPrice(0);
            alert("Sikeres felvetel")
        } catch (error) {
            console.log(error);
        }


    }

    return (
        <>
            <Menu />
            <form onSubmit={handlesubmit}>
                <h2>Felvetel</h2>
                <label htmlFor="name">Name: </label><br />
                <input className="szoveg" type="text" id="name" placeholder="name" value={name} onChange={(e) => setName(e.target.value)}></input><br />
                <label htmlFor="os">Operating system: </label><br />
                <input type="text" id="os" placeholder="operating system" value={os} onChange={(e) => setOs(e.target.value)}></input><br />
                <label htmlFor="clockspeed">Clock speed: </label><br />
                <input className="szam" type="number" id="clockspeed" placeholder="clockspeed" step={0.01} value={clockspeed} onChange={(e) => setClockSpeed(parseFloat(e.target.value))}></input><br />
                <label htmlFor="cores">Cores: </label><br />
                <input type="number" id="cores" placeholder="cores" value={cores} onChange={(e) => setCores(parseInt(e.target.value))}></input><br />
                <label htmlFor="size">Size: </label><br />
                <input type="number" id="size" placeholder="size" step={0.1} value={size} onChange={(e) => setSize(parseFloat(e.target.value))}></input><br />
                <label htmlFor="res">Resolution: </label><br />
                <input type="text" id="res" placeholder="resolution" value={resolution} onChange={(e) => setResolution(e.target.value)}></input><br />
                <label htmlFor="ram">RAM: </label><br />
                <input type="number" id="ram" placeholder="ram" value={ram} onChange={(e) => setRam(parseInt(e.target.value))}></input><br />
                <label htmlFor="number">Reviews: </label><br />
                <input type="text" id="reviews" placeholder="reviews" value={reviews} onChange={(e) => setReviews(parseInt(e.target.value))}></input><br />
                <label htmlFor="price">Price: </label><br />
                <input type="number" id="price" placeholder="price" value={price} onChange={(e) => setPrice(parseInt(e.target.value))}></input><br />
                <button type="submit">felvetel</button>
            </form>

        </>
    )
}