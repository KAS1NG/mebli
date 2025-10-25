"use client";

import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";
import type { Engine } from "@tsparticles/engine";
import styles from "../styles/HalloweenParticles.module.scss";

export default function HalloweenParticles() {
    const [ready, setReady] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine: Engine) => {
            await loadFull(engine);
        }).then(() => setReady(true));
    }, []);

    if (!ready) return null;

    return (
        <div className={styles.wrapper}>
            <Particles
                id="tsparticles"
                options={{
                    fullScreen: true,
                    background: { color: "transparent" },
                    fpsLimit: 60,
                    detectRetina: true,
                    particles: {
                        number: { value: 5 },
                        shape: {
                            type: "image",
                            options: {
                                image: [
                                    {
                                        src: "/bat.png", // 👈 шлях до твоєї картинки (у папці public)
                                        width: 32,
                                        height: 32,
                                    },
                                ],
                            },
                        },
                        opacity: { value: 1 },
                        size: { value: { min: 20, max: 40 } },
                        move: {
                            enable: true,
                            speed: 2,
                            direction: "none",
                            random: true,
                            straight: false,
                            outModes: { default: "out" },
                        },
                    },
                }}
            />
        </div>
    );
}
