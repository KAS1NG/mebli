import { useRef, useState, useCallback, useMemo, useEffect } from 'react';
import Link from 'next/link';
import "@/app/styles/CategoryDropdown.scss";

interface Subcategory {
    id: number;
    name: string;
    title: string;
}

interface Category {
    id: number;
    name: string;
    subcategories?: Subcategory[];
}

interface CategoryDropdownProps {
    categories: Category[];
}

const CategoryDropdown: React.FC<CategoryDropdownProps> = ({ categories }) => {
    const [isOpen, setIsOpen] = useState(false);
    const timeoutRef = useRef<number | null>(null);
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    // Функція для перемикання стану відкриття/закриття випадаючого меню
    const toggleDropdown = useCallback(() => {
        setIsOpen((prevIsOpen) => !prevIsOpen);
    }, []);

    // Відкриття випадаючого меню при наведенні
    const handleMouseEnter = useCallback(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setIsOpen(true);
    }, []);

    // Throttling функція для закриття меню через 200 мс після відведення миші
    const handleMouseLeave = () => {
        // Встановлюємо таймер для закриття списку через 200 мс
        timeoutRef.current = window.setTimeout(() => {
            setIsOpen(false);
        }, 300);
    };

    // змінювати фокус на кнопці, коли меню відкривається чи закривається
    useEffect(() => {
        if (!isOpen && buttonRef.current) {
            buttonRef.current.focus();
        }
    }, [isOpen]);

    // Мемоізуємо рендеринг субкатегорій для уникнення зайвих рендерів
    const renderSubcategories = useCallback(
        (subcategories: Subcategory[]) => (
            <ul className="sub-menu">
                {subcategories.map(({ id, name, title }) => (
                    <li key={id}>
                        <Link href={`/products?page=1&query=${title}`} onClick={toggleDropdown}>
                            {name}
                        </Link>
                    </li>
                ))}
            </ul>
        ),
        [toggleDropdown]
    );

    // Мемоізуємо відображення категорій
    const renderedCategories = useMemo(
        () =>
            categories.map(({ id, name, subcategories }) => (
                <li key={id}>
                    <div className="categoryItem">{name}</div>
                    {subcategories && renderSubcategories(subcategories)}
                </li>
            )),
        [categories, renderSubcategories]
    );

    return (
        <div
            className={`category-dropdown ${isOpen ? 'open' : ''}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <button
                className="dropdown-button"
                onClick={toggleDropdown}
                aria-haspopup="true"
                aria-expanded={isOpen}
            >
                Категорії
                <span className={`arrow ${isOpen ? 'open' : ''}`}>▼</span>
            </button>

            {isOpen && (
                <ul className="dropdown-menu">
                    <div className="dropdown-container">{renderedCategories}</div>
                </ul>
            )}
        </div>
    );
};

export default CategoryDropdown;