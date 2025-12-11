import { fetchOutStock, fetchStock, fetchVariantsStock } from "../api/stock/stockService";
import AddPosition from "../components/stock/addPosition";
import OutStockList from "../components/stock/outStockList";
import StockList from "../components/stock/stockList";
import VariantsList from "../components/stock/variantsList";

export default async function Stock() {

    const invoices = await fetchStock();
    const variants = await fetchVariantsStock()
    const outStocks = await fetchOutStock()

    return (
        <section className="stock">
            <h2>Out stoks</h2>
            <OutStockList invoices={outStocks} />
            <h1>Stock</h1>
            <StockList invoices={invoices} />
            <AddPosition />
            <VariantsList variants={variants}/>
        </section>
    );
}
