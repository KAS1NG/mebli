'use client';

import React, { useState } from 'react';
import styles from '@/app/styles/TagList.module.scss';

interface TagListProps {
    onTagSelect: (selectedTags: string) => void;
}

const TagList: React.FC<TagListProps> = ({ onTagSelect }) => {
    const tags = ['Диван', 'Ліжко', 'Шафа', 'Шафа-купе', 'Тумба', 'Стілень', 'Стіл', 'Журнальний', 'Письмовий', "Комп'ютерний", 'Кухнонний', 'Кухня', 'Полиця', 'Дерево', 'Метал', 'Матрац', 'Крісло', 'Обідній']
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState<string>('');

    const handleTagClick = (tag: string) => {
        let updatedTags;
        if (selectedTags.includes(tag)) {
            updatedTags = selectedTags.filter((t) => t !== tag);
        } else {
            updatedTags = [...selectedTags, tag];
        }
        setSelectedTags(updatedTags);
        setTagInput(updatedTags.join(' '));
        onTagSelect(updatedTags.join(' '));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setTagInput(value);

        const uniqueTags = Array.from(new Set(value.split(' ').filter((tag) => tag.trim() !== '')));
        setSelectedTags(uniqueTags);
        onTagSelect(uniqueTags.join(' '));
    };

    return (
        <div className={styles.tagListContainer}>
            <div className={styles.inputContainer}>
                <input
                    type="text"
                    id="tags"
                    name="tags"
                    className={styles.tagInput}
                    value={tagInput}
                    onChange={handleInputChange}
                    placeholder="Введіть Тег через пробіл"
                    required
                />
            </div>
            <div className={styles.tagList}>
                {tags.map((tag) => (
                    <button
                        key={tag}
                        className={`${styles.tag} ${selectedTags.includes(tag) ? styles.selected : ''
                            }`}
                        onClick={() => handleTagClick(tag)}
                    >
                        {tag}
                    </button>
                ))}
            </div>

        </div>
    );
};

export default TagList;
