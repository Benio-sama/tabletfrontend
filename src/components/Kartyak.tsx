import { useState, useEffect } from "react";
import { Tablet } from "../tablet";
import { Menu } from "./Menu";
import { Kartya } from "./Kartya";

export function Kartyak() {
    const [tablet, setTablet] = useState<Tablet[]>([]);
    const [topPrice, setTopPrice] = useState<Tablet[]>([]);
    const [lowPrice, setLowPrice] = useState<Tablet[]>([]);
    const [topReview, setTopReview] = useState<Tablet[]>([]);

    useEffect(() => {
        async function load() {
            const response = await fetch("http://localhost:4444/tablets");
            const tablet = await response.json();
            setTablet(tablet);
        }
        load();

    }, []);

    useEffect(() => {
        let topprice = (
            tablet?.sort((a, b) => b.price - a.price).slice(0, 3)
        )
        setTopPrice(topprice);

        let lowprice = (
            tablet?.sort((a, b) => a.price - b.price).slice(0, 3)
        )
        setLowPrice(lowprice);

        let topreview = (
            tablet?.sort((a, b) => b.reviews - a.reviews).slice(0, 3)
        )
        setTopReview(topreview);
    }, [tablet]);


    return (
        <>
            <Menu />
            <h1>Kezdolap</h1>
            <div className="card-container">
                <Kartya tablet={topPrice} cim="A harom legdragabb tablet" />
                <Kartya tablet={lowPrice} cim="A harom legolcsobb tablet" />
                <Kartya tablet={topReview} cim="A harom legnepszerubb tablet" />
            </div>
        </>
    )
}