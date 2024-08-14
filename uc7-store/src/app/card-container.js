import styles from "./card.module.css";
import Card from "./card-produto";

export default function CardContainer(data) {
  return (
    <div className={styles.container}>
      {data.data.map((item, index) => (
        <Card
          name={item.name}
          price={item.price}
          imagePath={item.imagePath}
        ></Card>
      ))}
    </div>
  );
}
