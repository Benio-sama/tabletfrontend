import { Tablet } from "../tablet";
interface Props {
    tablet: Tablet[];
    cim: string;
}

export function Kartya(props: Props) {
    return (
        <div className="card">
            <h2>{props.cim}</h2>
            {props.tablet?.map((tablet, index) => (
                <div key={index}>
                    <h4>{tablet.name}</h4>
                    <p>{tablet.price} Ft</p>
                </div>
            ))}
        </div>
    )
}