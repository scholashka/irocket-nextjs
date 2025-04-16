import Image from 'next/image';
import React from 'react';
import CircularProgress from './CircularProgress';

type Props = {
    casinoName: string;
    casinoLogoUrl: string;
    providerName: string;
    providerLogoUrl: string;
    gameImageUrl: string;
    srp: number;
    rtp: number;
    link: string;
    gameName: string;
    lastUpdate: string;
    spinCount: number;
};

export default function RtpIndicatorComponent({
    casinoName,
    casinoLogoUrl,
    providerName,
    providerLogoUrl,
    gameImageUrl,
    srp,
    rtp,
    link,
    gameName,
    lastUpdate,
    spinCount
}: Props) {
    const diff = rtp - srp;
    const isCold = diff < 0;

    const renderProgressBar = () => {
        return <div className="relative flex justify-center items-center mt-6 md:pt-0 md:mt-4 w-[140px] h-[120px] md:w-[200px] md:h-[160px] ">
            <CircularProgress percentage={Math.abs(diff * 10)} isCold={isCold} />
            <Image src={gameImageUrl} alt="Game" width={92} height={92} className='z-10 relative md:w-[128px] md:h-[128px]' />
        </div>
    }
    const renderRTP = () => {
        return <>
            <div className="text-center text-white text-xl md:text-4xl font-black m-0">{srp.toFixed(1)}%</div>
            <div className="text-center text-xs md:text-base text-cyan-400 flex justify-center items-center gap-1">
                {isCold ?
                    '🥶' : '🥵'
                } RTP {diff.toFixed(2)}%
            </div>
        </>
    }

    const renderStats = () => {
        return <div className="hidden md:block bg-[#0B1B32] p-[20px] rounded-2xl text-sm space-y-2">
            <div className="flex justify-between">
                <span className="flex items-center gap-1">
                    SRP <span className="text-xs text-gray-400 cursor-help">ⓘ</span>
                </span>
                <span>{srp.toFixed(1)}%</span>
            </div>
            <div className="flex justify-between">
                <span>Game RTP</span>
                <span>{rtp.toFixed(1)}%</span>
            </div>
            <div className="flex justify-between">
                <span>Difference</span>
                <span className="flex items-center gap-1">
                    {isCold && '🧊🧊🧊🧊'}
                    {diff.toFixed(2)}%
                </span>
            </div>
            <hr className="border-gray-600" />
            <div className="flex items-center justify-center gap-2 text-xs text-[#36FCF0] mt-2">
                <Image src='/icons/clock.png' width={14} height={14} alt='clock' />
                <span>Last Update: {lastUpdate} based on {spinCount} Spins</span>
            </div>
        </div>
    }
    const renderButton = () => {
        return <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:block bg-[#3736FA] text-center py-3 rounded-full text-white font-bold hover:opacity-90 transition"
        >
            Play Now at {casinoName}
        </a>
    }
    const renderTopBar = () => {
        return <div className="hidden md:flex justify-between items-center relative before:absolute before:w-[2px] before:h-[28px] before:bg-gray-600 before:left-[50%] z-10 before:mt-[4px] before:mb-[4px]">
            <div className="hidden md:flex items-center gap-2">
                <Image src={casinoLogoUrl} alt="Casino logo" width={36} height={36} />
                <div className="leading-tight">
                    <div className="text-[#607E9D] text-xs">Casino</div>
                    <div className="text-white text-sm">{casinoName}</div>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <div className="leading-tight">
                    <div className="text-[#607E9D] text-xs">Created by</div>
                    <div className="text-white text-sm text-right">{providerName}</div>
                </div>
                <Image src={providerLogoUrl} alt="Provider logo" width={36} height={36} />
            </div>
        </div>
    }

    return <>
        <div className="bg-[#0B1B32] md:bg-[#021024] rounded-3xl md:p-5 w-[180px] md:w-[398px] h-[260px] md:h-[568px] text-white font-semibold shadow-xl space-y-4">
            {renderTopBar()}
            <div className='bg-[#021024] rounded-3xl m-0 pb-2 flex flex-col items-center'>
                {renderProgressBar()}
                {renderRTP()}
            </div>
            {renderStats()}
            {renderButton()}

            <div className='flex md:hidden justify-between items-center p-2 pl-4 pr-4'>
                <div>
                    <p className='text-white text-sm'>{gameName}</p>
                    <span className='text-xs text-[#607E9D]'>by {providerName}</span>
                </div>
                <div className='bg-[#021024] rounded-full p-1'>
                    <span className='flex items-center justify-center text-cyan-400 w-[20px] h-[20px] cursor-pointer'>ⓘ</span>
                </div>
            </div>
        </div>
    </>
}