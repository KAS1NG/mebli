"use client"
import { IStockVariants } from "@/app/types/stock";
import { createStock } from "@/app/api/stock/stockService";
import styles from "../../styles/stock/stockList.module.scss";

interface VariantsListProps {
    variants: IStockVariants[];
}

export default function VariantsList({ variants }: VariantsListProps) {

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
                            <th>ID</th>
                            <th>Ітем ID</th>
                            <th>Назва</th>
                            <th>Колір</th>
                            {/* <th>Виготовлення</th> */}
                            <th>Розмір</th>
                            <th>Функції</th>
                        </tr>
                    </thead>
                    <tbody>
                        {variants.map((item, index) => (
                            <tr key={index}>
                                <td>{item.id}</td>
                                <td>{item.itemId}</td>
                                <td>{item.name}</td>
                                <td>{item.color}</td>
                                {/* <td>{item.manufactureTime}</td> */}
                                <td>{item.size}</td>
                                <td>
                                    <button onClick={()=>AddInStock(item.id)}>Додати</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
    );
}
