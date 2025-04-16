import RtpIndicatorComponent from '@/components/RtpIndicatorComponents';

export default async function Home() {
  const scenarios = [
    {
      title: 'Cold',
      data: {
        casinoName: "BlueChip",
        casinoLogoUrl: '/icons/casino-logo.png',
        providerName: "Netent",
        providerLogoUrl: '/icons/provider-logo.png',
        gameImageUrl: "/icons/starburst-slot-logo.png",
        srp: 96.5,
        rtp: 94.5,
        link: '/',
        gameName: 'Starburst',
        lastUpdate: '2 min',
        spinCount: 1234
      },
    },
    {
      title: 'Cold',
      data: {
        casinoName: "BlueChip",
        casinoLogoUrl: '/icons/casino-logo.png',
        providerName: "Netent",
        providerLogoUrl: '/icons/provider-logo.png',
        gameImageUrl: "/icons/starburst-slot-logo.png",
        srp: 96.5,
        rtp: 86.5,
        link: '/',
        gameName: 'Starburst',
        lastUpdate: '2 min',
        spinCount: 1234
      },
    },
    {
      title: 'Hot',
      data: {
        casinoName: "BlueChip",
        casinoLogoUrl: '/icons/casino-logo.png',
        providerName: "Netent",
        providerLogoUrl: '/icons/provider-logo.png',
        gameImageUrl: "/icons/crab-trap-logo.png",
        srp: 94.5,
        rtp: 96.5,
        link: '/',
        gameName: 'Crab Trap',
        lastUpdate: '2 min',
        spinCount: 1234
      },
    },
    {
      title: 'Hot',
      data: {
        casinoName: "BlueChip",
        casinoLogoUrl: '/icons/casino-logo.png',
        providerName: "Netent",
        providerLogoUrl: '/icons/provider-logo.png',
        gameImageUrl: "/icons/crab-trap-logo.png",
        srp: 86.5,
        rtp: 96.5,
        link: '/',
        gameName: 'Crab Trap',
        lastUpdate: '2 min',
        spinCount: 1234
      },
    }
  ];

  return (
    <main className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center">RTP Indicator Scenarios</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {scenarios.map((scenario, index) => (
          <div key={index} className='flex justify-center flex-col items-center'>
            <h2 className="text-lg text-center font-semibold mb-2">{scenario.title}</h2>
            <RtpIndicatorComponent {...scenario.data} />
          </div>
        ))}
      </div>
    </main>
  );
}