import styles from './Card.module.css'

export function Card({ cardClicked, cardNumber }: { cardClicked: (index: number) => void, cardNumber: number }) {
    const handleClick = () => {
        cardClicked(cardNumber);
    }
    return <div className={styles.card} onClick={handleClick}>
        Soy la card: {cardNumber}
    </div>
}