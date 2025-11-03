import styles from './Card.module.css'

export function Card({ index }: {index:number}) {
    return <div className={styles.card}>
        Soy la card: {index}
    </div>
}