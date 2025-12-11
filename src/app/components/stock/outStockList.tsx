"use client"
import { IStock } from "@/app/types/stock";
import styles from "../../styles/stock/stockList.module.scss";
import { createStock } from "@/app/api/stock/stockService";

interface StockListProps {
    invoices: IStock[];
}

export default function OutStockList({ invoices }: StockListProps) {

    const AddInStock = (variantId?: number) => {
        if (variantId) {
            createStock(variantId)
        }
    }

    return (
        <div className={styles.tableWrapper}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Назва</th>
                        <th>Колір</th>
                        <th>Розмір</th>
                        <th>Виготовлення</th>
                        <th>К-сть</th>
                        <th>Функції</th>
                    </tr>
                </thead>

                <tbody>
                    {invoices.map((item, index) => (
                        <tr key={index}>
                            <td>{item.variant.name}</td>
                            <td>{item.variant.color}</td>
                            <td>{item.variant.size}</td>
                            <td>{item.variant.manufactureTime}</td>
                            <td>{item.quantity}</td>
                            <td>
                                <button onClick={() => AddInStock(item.variant.id)}>Поновити</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
