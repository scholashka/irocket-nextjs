'use client';
import { motion, useAnimation, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect } from 'react';

type Props = {
    isCold: boolean;
    percentage: number;
    stroke?: number;
    arcDegrees?: number;
};

export default function ArcProgress({
    isCold,
    percentage,
    stroke = 15,
    arcDegrees = 240,
}: Props) {
    const internalSize = 200;
    const radius = (internalSize - stroke) / 2;
    const startAngle = (360 - arcDegrees) / 2;
    const endAngle = startAngle + arcDegrees;
    const polarToCartesian = (angle: number) => {
        const rad = (angle * Math.PI) / 180;
        return {
            x: internalSize / 2 + radius * Math.cos(rad),
            y: internalSize / 2 + radius * Math.sin(rad),
        };
    };

    const start = polarToCartesian(startAngle);
    const end = polarToCartesian(endAngle);

    const largeArcFlag = arcDegrees > 180 ? 1 : 0;

    const pathData = `
    M ${start.x} ${start.y}
    A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y}
  `;

    const pathLength = radius * Math.PI * (arcDegrees / 180);
    const controls = useAnimation();

    const progressValue = useMotionValue(0);
    const angle = useTransform(progressValue, (val) => {
        return startAngle + (arcDegrees * val) / 100;
    });

    const endX = useTransform(angle, (a) => {
        const rad = (a * Math.PI) / 180;
        return internalSize / 2 + radius * Math.cos(rad);
    });
    const endY = useTransform(angle, (a) => {
        const rad = (a * Math.PI) / 180;
        return internalSize / 2 + radius * Math.sin(rad);
    });

    useEffect(() => {
        const offset = pathLength * (1 - percentage / 100);
        controls.start({ strokeDashoffset: offset, transition: { duration: 1.5, ease: 'easeOut' } });

        const controlsProgress = animate(progressValue, percentage, {
            duration: 1.5,
            ease: 'easeOut',
        });

        return () => controlsProgress.stop();
    }, [percentage, pathLength, controls, progressValue]);

    const renderGradientColor = (isCold: boolean) => {
        if (isCold) {
            return <linearGradient id="arcGradient1" gradientTransform="rotate(90)">
                <stop offset="0" stopColor="rgba(1, 0, 200, 1)" />
                <stop offset="100%" stopColor="rgba(54, 252, 240, 1)" />
            </linearGradient>

        } else {
            return <linearGradient id="arcGradient2" gradientTransform="rotate(90)">
                <stop offset="0" stopColor="rgba(255, 149, 43, 1)" />
                <stop offset="100%" stopColor="rgba(233, 0, 0, 1)" />
            </linearGradient>
        }
    }
    return (
        <svg viewBox={`0 25 ${internalSize} ${internalSize - 50}`} className="w-full h-full absolute overflow-visible rotate-90 mx-auto">
            <defs>
                {renderGradientColor(isCold)}
            </defs>

            <path
                d={pathData}
                fill="none"
                stroke="#2A3749"
                strokeWidth={stroke}
                strokeLinecap="round"
            />

            <motion.path
                d={pathData}
                fill="none"
                stroke={isCold ? "url(#arcGradient1)" : "url(#arcGradient2)"}
                strokeWidth={stroke}
                strokeLinecap="round"
                strokeDasharray={pathLength}
                strokeDashoffset={pathLength}
                animate={controls}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                style={{
                    filter: 'blur(5px)',
                    opacity: 1,
                }}
            />
            <motion.g
                style={{
                    x: endX,
                    y: endY,
                    rotate: -90,
                }}
            >
                <text
                    x={0}
                    y={0}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize={stroke * 2}
                >
                    {isCold ? '❄️' : '🔥'}
                </text>
            </motion.g>
        </svg>
    );
}