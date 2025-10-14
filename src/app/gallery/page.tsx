'use client'
import Image from "next/image";
import styles from "../styles/Gallery.module.scss";
import { Circle } from "lucide-react";


const photos = [
  "https://res.cloudinary.com/dnwcmqbtm/image/upload/v1760299514/file_000000007c88624697b69268a71a3078_s9l8fr.png",
  "https://res.cloudinary.com/dnwcmqbtm/image/upload/v1760302511/file_0000000039c06243bac18db740a71a31_axy2hd.png",
  "https://res.cloudinary.com/dnwcmqbtm/image/upload/v1758790294/6fc0e5dd-c2a8-423d-80b6-3b3c7a3fb800.webp",
  "https://res.cloudinary.com/dnwcmqbtm/image/upload/v1760350497/file_0000000043e461f882570ce2a5ad9575_zyvhtn.png",
  "https://res.cloudinary.com/dnwcmqbtm/image/upload/v1760350497/file_000000005a70624384a03d3725bafb60_1_rvaskg.png",
];

const items = [
  {
    id: 1,
    name: "Диван Прадо",
    position: { top: '65%', left: '16.5%' },
    preview: 'https://res.cloudinary.com/dnwcmqbtm/image/upload/v1758364347/70763a00-57db-4151-a834-9238f4859c11.webp',
    link: '/products/dyvan-prado/138'
  },
  {
    id: 2,
    name: "Шафа Версаль",
    position: { top: '30%', left: '76%' },
    preview: 'https://res.cloudinary.com/dnwcmqbtm/image/upload/v1760001051/42475d53-5031-47e2-ab95-e983ce39db6b.webp',
    link: '/products/shafa-versal/184'
  },
]

const items2 = [
  {
    id: 1,
    name: "Стілець комп'ютерний Фокус",
    position: { top: '57%', left: '12%' },
    preview: 'https://res.cloudinary.com/dnwcmqbtm/image/upload/v1758698566/2c93637c-f4a6-4176-8f86-d4e43b09271f.webp',
    link: '/products/stilets-kompyuternyi-fokus/149'
  },
  {
    id: 2,
    name: "Ліжко Еріка",
    position: { top: '54%', left: '45%' },
    preview: 'https://res.cloudinary.com/dnwcmqbtm/image/upload/v1758778499/17ffab1c-b084-42a2-ad4e-67434aff46ac.webp',
    link: '/products/lizhko-erika/152'
  },
  {
    id: 3,
    name: "Комод Франческо",
    position: { top: '60%', left: '93%' },
    preview: 'https://res.cloudinary.com/dnwcmqbtm/image/upload/v1758444142/d1a25f82-5109-4ee5-aa2b-24f25ea380af.webp',
    link: '/products/komod-franchesko/141'
  },
]

const items3 = [
  {
    id: 1,
    name: "Стіл обідній Венеція слонова кістка",
    position: { top: '57%', left: '36%' },
    preview: 'https://res.cloudinary.com/dnwcmqbtm/image/upload/v1758790296/27f8ec50-daa5-4f5b-92e5-34829c9ce787.webp',
    link: '/products/stil-obidnii-venetsiya-slonova-kistka/154'
  },
  {
    id: 2,
    name: "Стілець Сицилія",
    position: { top: '56%', left: '67%' },
    preview: 'https://res.cloudinary.com/dnwcmqbtm/image/upload/v1758791970/fe772039-5db5-40c3-a7ec-af471f088848.webp',
    link: '/products/stilets-sytsyliya/158'
  },
]

const items4 = [
  {
    id: 1,
    name: "Диван Лего",
    position: { top: '57%', left: '36%' },
    preview: 'https://res.cloudinary.com/dnwcmqbtm/image/upload/v1759392094/20ab14a5-4b26-47bc-9dd5-d5dcc37c52ad.webp',
    link: '/products/dyvan-leho/170'
  },
  {
    id: 2,
    name: "Шафа-купе КРАФТ БІЛИЙ",
    position: { top: '30%', left: '64%' },
    preview: 'https://res.cloudinary.com/dnwcmqbtm/image/upload/v1758782251/2966ffcd-2d61-48f8-9fcd-6930f7a03209.webp',
    link: '/products/shafa-kupe-kraft-bilyi/153'
  },
]

const items5 = [
  {
    id: 1,
    name: "Комод в спальню MebelStar Нео 2Д4Ш Дуб ристрето",
    position: { top: '40%', left: '28%' },
    preview: 'https://res.cloudinary.com/dnwcmqbtm/image/upload/v1759603623/4eca7b44-0d1e-4d6e-8e7d-d29b32c493cc.webp',
    link: '/products/komod-v-spalnyu-mebelstar-neo-2d4sh-dub-rystreto/177'
  },
  {
    id: 2,
    name: "Диван Токіо",
    position: { top: '40%', left: '50%' },
    preview: 'https://res.cloudinary.com/dnwcmqbtm/image/upload/v1758693602/c10d09e8-9c08-4841-b045-1ffa0f3e3f19.webp',
    link: '/products/dyvan-tokio/148'
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
      <div className={styles.wrapper}>
        <div className={styles.imageContainer}>
          <Image
            src={photos[3]}
            alt="Моє фото"
            fill
            priority
            className={styles.image}
            sizes="100vw"
          />

          {/* інтерактивні точки */}
          {items4.map((item) => (
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
            src={photos[4]}
            alt="Моє фото"
            fill
            priority
            className={styles.image}
            sizes="100vw"
          />
          {/* інтерактивні точки */}
          {items5.map((item) => (
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