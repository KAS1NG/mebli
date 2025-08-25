// app/delivery/page.tsx
"use client";

import React from "react";
import "../styles/DeliveryPage.scss";

export default function DeliveryPage() {
  return (
    <section className="delivery">
      <div className="container">
        <h1 className="delivery__title">Доставка</h1>
        <p className="delivery__intro">
          Ми подбаємо, щоб ваші меблі прибули швидко та безпечно.  
          Оберіть найзручніший спосіб доставки для вашого замовлення.
        </p>

        <div className="delivery__block">
          <h2>1. Доставка по Сумській області</h2>
          <p>
            Ми співпрацюємо з провідними транспортними компаніями (<strong>Нова Пошта</strong>, 
            <strong>Meest</strong>, <strong>Делівері</strong>), щоб забезпечити вам швидке та надійне отримання меблів.  
            Термін доставки зазвичай складає <strong>7 робочих днів</strong>.
          </p>
        </div>

        <div className="delivery__block">
          <h2>2. Кур’єрська доставка</h2>
          <p>
            У містах, де є наші шоуруми та склади, доступна послуга <strong>доставки кур’єром додому</strong>.  
            Ми доставимо меблі з підйомом у квартиру чи будинок та допоможемо з розпакуванням.
          </p>
        </div>

        <div className="delivery__block">
          <h2>3. Самовивіз</h2>
          <p>
            Ви можете самостійно забрати замовлення зі складу або шоуруму в місті <strong>Ромни</strong>.  
            Перед приїздом, будь ласка, узгодьте час з нашим менеджером.
          </p>
        </div>

        <div className="delivery__block">
          <h2>4. Доставка Україною</h2>
          <p>
            Ми здійснюємо доставку меблів за Україною.  
            Термін та вартість розраховується індивідуально в залежності від області та обсягу замовлення.
          </p>
        </div>

        <div className="delivery__note">
          <p>
            ℹ️ Вартість доставки залежить від габаритів та ваги меблів.  
            Детальні умови уточнюйте у нашого менеджера під час оформлення замовлення.
          </p>
        </div>
      </div>
    </section>
  );
}
