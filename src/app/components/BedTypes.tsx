import Image from 'next/image'
import singleBed from '@/app/public/bed1.png'
import twinBed from '@/app/public/bed2.png'
import fullBed from '@/app/public/bed3.png'
import Link from 'next/link'

function BedTypes() {
  return (
    <div className='product-type__container'>
      <Link href="/products?page=1&query=односпальні">
        <div className='product-type__item'>
          <Image
            src={singleBed}
            alt='Односпальні ліжка'
            className="cart-item__image"
            width={60}              // Aspect ratio (can be set arbitrarily)
            height={56}              // Aspect ratio (can be set arbitrarily)
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div>Односпальні</div>
        </div>
      </Link>
      <Link href="/products?page=1&query=полуторні">
        <div className='product-type__item'>
          <Image
            src={twinBed}
            alt="Полуторні ліжка"
            className="cart-item__image"
            width={80}              // Aspect ratio (can be set arbitrarily)
            height={56}              // Aspect ratio (can be set arbitrarily)
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div>Полуторні</div>
        </div>
      </Link>
      <Link href="/products?page=1&query=двоспальні">
        <div className='product-type__item'>
          <Image
            src={fullBed}
            alt="Двоспальні ліжка"
            className="cart-item__image"
            width={104}              // Aspect ratio (can be set arbitrarily)
            height={56}              // Aspect ratio (can be set arbitrarily)
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div>Двоспальні</div>
        </div>
      </Link>
    </div>
  )
}

export default BedTypes