'use client'
import Image from "next/image";
import styles from "../styles/Gallery.module.scss";
import { Circle } from "lucide-react";


const photos = [
  "https://res.cloudinary.com/dnwcmqbtm/image/upload/v1760299514/file_000000007c88624697b69268a71a3078_s9l8fr.png",
  "https://res.cloudinary.com/dnwcmqbtm/image/upload/v1760302511/file_0000000039c06243bac18db740a71a31_axy2hd.png",
  "https://res.cloudinary.com/dnwcmqbtm/image/upload/v1758790294/6fc0e5dd-c2a8-423d-80b6-3b3c7a3fb800.webp",
  // "https://res.cloudinary.com/dnwcmqbtm/image/upload/v1760299514/file_000000007c88624697b69268a71a3078_s9l8fr.png",
];

const items = [
  {
    id: 1,
    name: "Диван Прадо",
    position: { top: '65%', left: '16.5%' },
    preview: 'https://res.cloudinary.com/dnwcmqbtm/image/upload/v1758364347/70763a00-57db-4151-a834-9238f4859c11.webp',
    link: 'https://mebliromny.com.ua/products/dyvan-prado/138'
  },
  {
    id: 2,
    name: "Шафа Версаль",
    position: { top: '30%', left: '76%' },
    preview: 'https://res.cloudinary.com/dnwcmqbtm/image/upload/v1760001051/42475d53-5031-47e2-ab95-e983ce39db6b.webp',
    link: 'https://mebliromny.com.ua/products/shafa-versal/184'
  },
]

const items2 = [
  {
    id: 1,
    name: "Стілець комп'ютерний Фокус",
    position: { top: '57%', left: '12%' },
    preview: 'https://res.cloudinary.com/dnwcmqbtm/image/upload/v1758698566/2c93637c-f4a6-4176-8f86-d4e43b09271f.webp',
    link: 'https://mebliromny.com.ua/products/stilets-kompyuternyi-fokus/149'
  },
  {
    id: 2,
    name: "Ліжко Еріка",
    position: { top: '54%', left: '45%' },
    preview: 'https://res.cloudinary.com/dnwcmqbtm/image/upload/v1758778499/17ffab1c-b084-42a2-ad4e-67434aff46ac.webp',
    link: 'https://mebliromny.com.ua/products/lizhko-erika/152'
  },
  {
    id: 3,
    name: "Комод Франческо",
    position: { top: '60%', left: '93%' },
    preview: 'https://res.cloudinary.com/dnwcmqbtm/image/upload/v1758444142/d1a25f82-5109-4ee5-aa2b-24f25ea380af.webp',
    link: 'https://mebliromny.com.ua/products/komod-franchesko/141'
  },
]

const items3 = [
  {
    id: 1,
    name: "Стіл обідній Венеція слонова кістка",
    position: { top: '57%', left: '36%' },
    preview: 'https://res.cloudinary.com/dnwcmqbtm/image/upload/v1758790296/27f8ec50-daa5-4f5b-92e5-34829c9ce787.webp',
    link: 'https://mebliromny.com.ua/products/stil-obidnii-venetsiya-slonova-kistka/154'
  },
  {
    id: 2,
    name: "Стілець Сицилія",
    position: { top: '56%', left: '67%' },
    preview: 'https://res.cloudinary.com/dnwcmqbtm/image/upload/v1758791970/fe772039-5db5-40c3-a7ec-af471f088848.webp',
    link: 'https://mebliromny.com.ua/products/stilets-sytsyliya/158'
  },
]

function page() {
  return (
    <main>
      <div className={styles.wrapper}>
        <div className={styles.imageContainer}>
          <Image
            src={photos[1]}
            alt="Моє фото"
            fill
            priority
            className={styles.image}
            sizes="100vw"
          />

          {/* інтерактивні точки */}
          {items2.map((item) => (
            <a
              key={item.id}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.pin}
              style={item.position}
            >
              <div className={styles.dot}>
                <span className={styles.icon}>
                  <Circle />
                </span>
              </div>
              <div className={styles.tooltip}>
                <Image
                  src={item.preview}
                  alt={item.name}
                  width={180}
                  height={120}
                  className={styles.preview}
                />
                <p>{item.name}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.imageContainer}>
          <Image
            src={photos[0]}
            alt="Моє фото"
            fill
            priority
            className={styles.image}
            sizes="100vw"
          />

          {/* інтерактивні точки */}
          {items.map((item) => (
            <a
              key={item.id}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.pin}
              style={item.position}
            >
              <div className={styles.dot}>
                <span className={styles.icon}>
                  <Circle />
                </span>
              </div>
              <div className={styles.tooltip}>
                <Image
                  src={item.preview}
                  alt={item.name}
                   width={180}
                  height={120}
                  className={styles.preview}
                />
                <p>{item.name}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.imageContainer}>
          <Image
            src={photos[2]}
            alt="Моє фото"
            fill
            priority
            className={styles.image}
            sizes="100vw"
          />

          {/* інтерактивні точки */}
          {items3.map((item) => (
            <a
              key={item.id}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.pin}
              style={item.position}
            >
              <div className={styles.dot}>
                <span className={styles.icon}>
                  <Circle />
                </span>
              </div>
              <div className={styles.tooltip}>
                <Image
                  src={item.preview}
                  alt={item.name}
                   width={180}
                  height={120}
                  className={styles.preview}
                />
                <p>{item.name}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </main>
  )
}

export default page