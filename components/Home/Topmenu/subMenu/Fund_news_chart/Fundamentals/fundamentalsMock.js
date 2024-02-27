export const fundamentalsMock = {
  eth: {
    hacks: {
      events: [
        {
          id: 1,
          date: 'July 2016',
          hack_name: 'The DAO Attack',
          incident_description:
            'A vulnerability in the DAO smart contract allowed an attacker to steal $60 million worth of ETH.',
          consequences:
            'The DAO was forced to shut down, and the stolen ETH was not recovered.',
          mitigation_measure:
            'The Ethereum Foundation implemented a hard fork to reverse the DAO attack and to prevent similar attacks in the future.',
        },
        {
          id: 2,
          date: 'June 2017',
          hack_name: 'The DAO Attack',
          incident_description:
            'A vulnerability in the DAO smart contract allowed an attacker to steal $60 million worth of ETH.',
          consequences:
            'The DAO was forced to shut down, and the stolen ETH was not recovered.',
          mitigation_measure:
            'The Ethereum Foundation implemented a hard fork to reverse the DAO attack and to prevent similar attacks in the future.',
        },
        {
          id: 3,
          date: 'November 2018',
          hack_name: 'The DAO Attack',
          incident_description:
            'A vulnerability in the DAO smart contract allowed an attacker to steal $60 million worth of ETH.',
          consequences:
            'The DAO was forced to shut down, and the stolen ETH was not recovered.',
          mitigation_measure:
            'The Ethereum Foundation implemented a hard fork to reverse the DAO attack and to prevent similar attacks in the future.',
        },
        {
          id: 4,
          date: 'February 2019',
          hack_name: 'The DAO Attack',
          incident_description:
            'A vulnerability in the DAO smart contract allowed an attacker to steal $60 million worth of ETH.',
          consequences:
            'The DAO was forced to shut down, and the stolen ETH was not recovered.',
          mitigation_measure:
            'The Ethereum Foundation implemented a hard fork to reverse the DAO attack and to prevent similar attacks in the future.',
        },
        {
          id: 5,
          date: 'May 2022',
          hack_name: 'The DAO Attack',
          incident_description:
            'A vulnerability in the DAO smart contract allowed an attacker to steal $60 million worth of ETH.',
          consequences:
            'The DAO was forced to shut down, and the stolen ETH was not recovered.',
          mitigation_measure:
            'The Ethereum Foundation implemented a hard fork to reverse the DAO attack and to prevent similar attacks in the future.',
        },
      ],
    },
    introduction: {
      description:
        'Ethereum aims to address the limitations of traditional blockchains by enabling the creation of over 3,000 DApps and smart contracts that are currently running on the protocol.',
      dataItems: [
        'Market capitalization of over $25 billion',
        '4 billion unique addresses and facilitated',
        'Over $150 billion in transaction volume',
        'Leading platform for decentralised innovation',
      ],
    },
    tokenDistribution: {
      chartData: [
        {title: 'Exchanges', percentage: 26, color: '#399AEA'},
        {title: 'Institutions', percentage: 22, color: '#20CBDD'},
        {title: 'Miners', percentage: 21, color: '#C539B4'},
        {title: 'ETH Foundation', percentage: 17, color: '#FF3BC3'},
        {title: 'Retail Investors', percentage: 14, color: '#FFC53D'},
      ],
    },
    tokenomics: {
      content: [
        {
          name: 'Ethereum',
          symbol: 'ETH',
          circulatingSupply: 120251000,
          totalSupply: Infinity,
          inflationary: true,
        },
        {
          name: 'Solana',
          symbol: 'SOL',
          circulatingSupply: 426247459,
          totalSupply: 564532025,
          inflationary: null,
        },
        {
          name: 'Cardano',
          symbol: 'ADA',
          circulatingSupply: 34964744027,
          totalSupply: 45000000000,
          inflationary: true,
        },
      ],
    },
    tokenUtility: {
      content: [
        {
          title: 'Gas Fees and Transactions Settlements',
          image: {
            light: require('../../../../../../assets/images/fundamentals/coins/eth/vam/light/Gfats.png'),
            dark: require('../../../../../../assets/images/fundamentals/coins/eth/vam/dark/Gfats.png'),
          },
          text: 'All ERC-20 transactions require ETH to pay gas fees.',
        },
        {
          title: 'Staking',
          image: {
            light: require('../../../../../../assets/images/fundamentals/coins/eth/vam/light/Staking.png'),
            dark: require('../../../../../../assets/images/fundamentals/coins/eth/vam/dark/Staking.png'),
          },
          text: 'ETH holders can stake their tokens to become validators or delegate them to validators.',
        },
        {
          title: 'Platform Currency',
          image: {
            light: require('../../../../../../assets/images/fundamentals/coins/eth/vam/light/PlatformCurrency.png'),
            dark: require('../../../../../../assets/images/fundamentals/coins/eth/vam/dark/PlatformCurrency.png'),
          },
          text: 'Developers deploy DApps on Ethereum using ETH, paying in ETH at every step from contract creation to execution.',
        },
        {
          title: 'Interoperability and Layer 2 Solutions',
          image: {
            light: require('../../../../../../assets/images/fundamentals/coins/eth/vam/light/Interoperability.png'),
            dark: require('../../../../../../assets/images/fundamentals/coins/eth/vam/dark/Interoperability.png'),
          },
          text: 'Cross-Chain Interactions: ETH is often used in cross-chain interoperability solutions to interact with multiple blockchain networks. \n*Layer 2 Scaling with ETH:* ETH is used in Layer 2 solutions for transaction fees, network security via staking, and collateral for asset transfers between Layer 2 and Ethereum mainnet',
        },
        {
          title: 'Decentralised Finance (DeFi)',
          image: {
            light: require('../../../../../../assets/images/fundamentals/coins/eth/vam/light/DeFi.png'),
            dark: require('../../../../../../assets/images/fundamentals/coins/eth/vam/dark/DeFi.png'),
          },
          text: 'Collateral for Loans and Borrowing: Many DeFi platforms allow users to lock up their ETH as collateral to borrow other assets or take out loans.\n *Yield Farming and Liquidity Provision:* Users can stake or lend their ETH in DeFi protocols to earn interest or a portion of the transaction fees.',
        },
        {
          title: 'Governance',
          image: {
            light: require('../../../../../../assets/images/fundamentals/coins/eth/vam/light/Governance.png'),
            dark: require('../../../../../../assets/images/fundamentals/coins/eth/vam/dark/Governance.png'),
          },
          text: 'Some platforms and protocols use ETH to grant voting rights in decentralised autonomous organisations (DAOs) or other governance structures.',
        },
      ],
    },
    valueAccrualMechanisms: {
      content: [
        {
          title: 'Token Burning',
          image: {
            light: require('../../../../../../assets/images/fundamentals/coins/eth/vam/light/TokenBurning.png'),
            dark: require('../../../../../../assets/images/fundamentals/coins/eth/vam/dark/TokenBurning.png'),
          },
          text: "Implemented with the London Hard Fork in August 2021, Ethereum's EIP-1559 introduced a token burning mechanism where a base fee for transactions, dynamically adjusted by the protocol based on network activity, is burned. This reduces Ether's circulating supply and can potentially lead to a deflationary state, particularly during high network usage, if the amount of burned ETH surpasses new ETH issuance.",
        },
        {
          title: 'Token Buyback',
          image: {
            light: require('../../../../../../assets/images/fundamentals/coins/eth/vam/light/TokenBuyback.png'),
            dark: require('../../../../../../assets/images/fundamentals/coins/eth/vam/dark/TokenBuyback.png'),
          },
          text: 'Ethereum does not have an official token buyback mechanism as a part of its protocol design or economic policy.',
        },
      ],
    },
    vestingSchedules: {
      displayName: 'Ethereum',
      schedules: [
        {
          date: 'March 2024',
          tokens: 4999992,
        },
        {
          date: 'August 2024',
          tokens: 25003622,
        },
      ],
    },
    revenueModel: {
      revenues: [
        {
          title: 'Annualised Revenue',
          subtitle: '*Cumulative last 1yr revenue',
          value: 1562000000,
        },
        {
          title: 'Fees (1Y)',
          subtitle: '*Cumulative last 1yr fees',
          value: 614880,
        },
      ],
    },
    competitors: {
      cryptosData: [
        {
          crypto: 'Ethereum',
          symbol: 'ETH',
          image: require('../../../../../../assets/images/fundamentals/coins/eth/competitors/ETH.png'),
          maxValue: Infinity,
          percentageValue: 100,
          inflationary: false,
          typeOfToken: ['Utility', 'Governance', 'Staking'],
          marketCap: [280.2, 280202067789],
          tvl: 32.8,
          color: '#399AEA',
          tps: [15],
          fee: 0.0006,
          apr: 3.42,
          revenue: 17110000,
          activeDevs: 35.63,
          activeUsers: 320450,
          inflationRate: [
            {year: 2022, value: 4.5},
            {year: 2023, value: -0.16},
          ],
        },
        {
          crypto: 'Solana',
          symbol: 'SOL',
          image: require('../../../../../../assets/images/fundamentals/coins/eth/competitors/SOL.png'),
          maxValue: Infinity,
          percentageValue: 75,
          inflationary: false,
          typeOfToken: ['Utility', 'Governance', 'Staking'],
          marketCap: [42.8, 42824274816],
          tvl: 1.671,
          color: '#20CBDD',
          tps: [65000],
          fee: 0.00025,
          apr: 7.19,
          revenue: 95500000,
          activeDevs: 73.47,
          activeUsers: 427190,
          inflationRate: [
            {year: 2022, value: 8},
            {year: 2023, value: 8},
          ],
        },
        {
          crypto: 'Cardano',
          symbol: 'ADA',
          image: require('../../../../../../assets/images/fundamentals/coins/eth/competitors/ADA.png'),
          maxValue: Infinity,
          percentageValue: 78,
          inflationary: true,
          typeOfToken: ['Utility', 'Governance'],
          marketCap: [13.4, 13412098765],
          tvl: 0.257,
          color: '#399AEA',
          tps: [1000],
          fee: 0.07,
          apr: 2.97,
          revenue: 166000000,
          activeDevs: 166.8,
          activeUsers: 42520,
          inflationRate: null,
        },
        {
          crypto: 'Avalanche',
          symbol: 'AVAX',
          image: require('../../../../../../assets/images/fundamentals/coins/eth/competitors/AVAX.png'),
          maxValue: '720 million AVAX',
          percentageValue: 49,
          inflationary: false,
          marketCap: [13.12, 13120973958],
          tvl: 0.642,
          color: '#C539B4',
          tps: [4500],
          fee: 0.000025,
          apr: 8.55,
          revenue: 17110000,
          activeDevs: 35.63,
          activeUsers: 47990,
          inflationRate: null,
        },
      ],
    },
    upgrades: {
      events: [
        {
          id: 1,
          date: 'Aug 2021',
          upgrade_name: 'London Hard Fork',
          upgrade_overview:
            'Introduced a new fee structure to make Ethereum transaction fees more predictable. It also started burning a part of the transaction fees, reducing the overall supply of Ether over time.',
          upgrade_impact:
            "This upgrade significantly impacted Ethereum's economic policy by introducing a deflationary mechanism.",
        },
        {
          id: 2,
          date: 'Sep 2022',
          upgrade_name: 'The Merge',
          upgrade_overview:
            'Introduced a new fee structure to make Ethereum transaction fees more predictable. It also started burning a part of the transaction fees, reducing the overall supply of Ether over time.',
          upgrade_impact:
            "This upgrade significantly impacted Ethereum's economic policy by introducing a deflationary mechanism.",
        },
        {
          id: 3,
          date: 'April 2023',
          upgrade_name: 'Shanghai Upgrade',
          upgrade_overview:
            'Introduced a new fee structure to make Ethereum transaction fees more predictable. It also started burning a part of the transaction fees, reducing the overall supply of Ether over time.',
          upgrade_impact:
            "This upgrade significantly impacted Ethereum's economic policy by introducing a deflationary mechanism.",
        },
        {
          id: 4,
          date: 'Q1/Q2 2024',
          upgrade_name: 'Cancun-Deneb',
          upgrade_overview:
            'Introduced a new fee structure to make Ethereum transaction fees more predictable. It also started burning a part of the transaction fees, reducing the overall supply of Ether over time.',
          upgrade_impact:
            "This upgrade significantly impacted Ethereum's economic policy by introducing a deflationary mechanism.",
        },
        {
          id: 5,
          date: 'Ongoing',
          upgrade_name: 'Ongoing development: Surge & Shard Phase 2 and beyond',
          upgrade_overview:
            'Introduced a new fee structure to make Ethereum transaction fees more predictable. It also started burning a part of the transaction fees, reducing the overall supply of Ether over time.',
          upgrade_impact:
            "This upgrade significantly impacted Ethereum's economic policy by introducing a deflationary mechanism.",
        },
        {
          id: 6,
          date: 'Early 2024',
          upgrade_name: 'EIP 4844 (Potential)',
          upgrade_overview:
            'Introduced a new fee structure to make Ethereum transaction fees more predictable. It also started burning a part of the transaction fees, reducing the overall supply of Ether over time.',
          upgrade_impact:
            "This upgrade significantly impacted Ethereum's economic policy by introducing a deflationary mechanism.",
        },
        {
          id: 7,
          date: 'Mid 2024',
          upgrade_name: 'Mid 2024: EIP-4337 (Potential)',
          upgrade_overview:
            'Introduced a new fee structure to make Ethereum transaction fees more predictable. It also started burning a part of the transaction fees, reducing the overall supply of Ether over time.',
          upgrade_impact:
            "This upgrade significantly impacted Ethereum's economic policy by introducing a deflationary mechanism.",
        },
        {
          id: 8,
          date: 'Late 2024',
          upgrade_name: 'Surge & Shard Phase 1',
          upgrade_overview:
            'Introduced a new fee structure to make Ethereum transaction fees more predictable. It also started burning a part of the transaction fees, reducing the overall supply of Ether over time.',
          upgrade_impact:
            "This upgrade significantly impacted Ethereum's economic policy by introducing a deflationary mechanism.",
        },
        {
          id: 9,
          date: 'Early 2025',
          upgrade_name: 'Long-term: EVM 3.0 Vision',
          upgrade_overview:
            'Introduced a new fee structure to make Ethereum transaction fees more predictable. It also started burning a part of the transaction fees, reducing the overall supply of Ether over time.',
          upgrade_impact:
            "This upgrade significantly impacted Ethereum's economic policy by introducing a deflationary mechanism.",
        },
      ],
    },
    dApps: {
      mainImage: require('../../../../../../assets/images/fundamentals/coins/eth/dApps/dapps.png'),
      protocols: [
        {
          name: 'Uniswap',
          description:
            'Decentralised exchange (DEX) for trading Ethereum-based tokens',
          tvl: 3710000000,
          benefits:
            'Decentralised and permissionless way to trade Ethereum-based tokens, which helps to increase the liquidity of these tokens and to make them more accessible to users.',
          image: require('../../../../../../assets/images/fundamentals/coins/eth/dApps/hexagons/uniswap.png'),
        },
        {
          name: 'Aave',
          description: 'Decentralised lending and borrowing platform.',
          tvl: 5939000000,
          benefits:
            'Decentralised and permissionless way for users to borrow and lend Ethereum-based tokens, which helps to increase the utilisation of these tokens and to create new financial products and services.',
          image: require('../../../../../../assets/images/fundamentals/coins/eth/dApps/hexagons/aave.png'),
        },
        {
          name: 'MakerDAO',
          description: 'Decentralised stablecoin issuer.',
          tvl: 7761000000,
          benefits:
            'MakerDAO issues the DAI stablecoin, which is one of the most popular stablecoins in the crypto ecosystem. DAI provides a stable and reliable store of value, which helps to attract users to the Ethereum ecosystem and to make it more attractive to institutional investors.',
          image: require('../../../../../../assets/images/fundamentals/coins/eth/dApps/hexagons/makerdao.png'),
        },
        {
          name: 'Lido Finance',
          description:
            'A decentralised staking protocol that allows users to stake their ETH without having to run their own node.',
          tvl: 22140000000,
          benefits:
            'Lido Finance makes it easier for users to participate in staking, which helps to increase the security of the Ethereum network and to provide a source of passive income for stakers.',
          image: require('../../../../../../assets/images/fundamentals/coins/eth/dApps/hexagons/lido.png'),
        },
        {
          name: 'Curve',
          description: 'Decentralised exchange for stablecoin trading.',
          tvl: 1842000000,
          benefits:
            'Decentralised and permissionless way to trade stablecoins, which helps to improve the stability of the Ethereum ecosystem and to make it more attractive to institutional investors.',
          image: require('../../../../../../assets/images/fundamentals/coins/eth/dApps/hexagons/curve.png'),
        },
        {
          name: 'Synthetix',
          description:
            'A decentralised exchange for synthetic assets, which are tokens that track the price of real-world assets such as stocks and commodities.',
          tvl: 375570000,
          benefits:
            'Synthetix provides a decentralised and permissionless way to trade synthetic assets, which helps to expand the range of financial products and services available on Ethereum.',
          image: require('../../../../../../assets/images/fundamentals/coins/eth/dApps/hexagons/synthetix.png'),
        },
        {
          name: 'dYdX',
          description: 'A decentralised margin trading platform.',
          tvl: 282000000,
          benefits:
            'dYdX provides a decentralised and permissionless way to trade crypto assets with leverage, which helps to increase the liquidity of these assets and to create new financial products and services.',
          image: require('../../../../../../assets/images/fundamentals/coins/eth/dApps/hexagons/dydx.png'),
        },
        {
          name: 'Compound Protocol',
          description:
            'An algorithmic interest rate protocol that offers both borrowing and lending services.',
          tvl: 2034000000,
          benefits:
            'Compound Protocol provides a decentralised and permissionless way to borrow and lend Ethereum-based tokens, which helps to increase the utilisation of these tokens and to create new financial products and services.',
          image: require('../../../../../../assets/images/fundamentals/coins/eth/dApps/hexagons/compound.png'),
        },
      ],
    },
  },
  btc: {
    tokenUtility: {
      content: [
        {
          title: 'Collateral Asset',
          image: {
            light: require('../../../../../../assets/images/fundamentals/coins/btc/vam/light/CollateralAsset.png'),
            dark: require('../../../../../../assets/images/fundamentals/coins/btc/vam/dark/CollateralAsset.png'),
          },
          text: "While the DeFi ecosystem is more developed on platforms like Ethereum, Bitcoin is increasingly used as collateral for lending, borrowing, or in synthetic assets on various DeFi platforms, especially through protocols that enable Bitcoin's use on other blockchains (like wrapped Bitcoin on Ethereum).",
        },
        {
          title: 'Emerging Ecosystem',
          image: {
            light: require('../../../../../../assets/images/fundamentals/coins/btc/vam/light/EmergingEcosystem.png'),
            dark: require('../../../../../../assets/images/fundamentals/coins/btc/vam/dark/EmergingEcosystem.png'),
          },
          text: "With the introduction of projects like Ordinals and others, there's a growing interest in exploring the programmable aspects of Bitcoin. Although Bitcoin's scripting language is not as expressive as Ethereum's, recent innovations are expanding what can be done on the Bitcoin blockchain in terms of smart contracts and decentralised applications (DApps).",
        },
        {
          title: 'Medium of Exchange',
          image: {
            light: require('../../../../../../assets/images/fundamentals/coins/btc/vam/light/MediumOfExchange.png'),
            dark: require('../../../../../../assets/images/fundamentals/coins/btc/vam/dark/MediumOfExchange.png'),
          },
          text: 'While not as widely accepted as traditional currencies, BTC is increasingly used for online and offline transactions. Merchants around the world accept BTC payments, and dedicated payment processors facilitate its integration into everyday transactions.',
        },
        {
          title: 'Security and Descentralization',
          image: {
            light: require('../../../../../../assets/images/fundamentals/coins/btc/vam/light/SecurityAndDescentralization.png'),
            dark: require('../../../../../../assets/images/fundamentals/coins/btc/vam/dark/SecurityAndDescentralization.png'),
          },
          text: "BTC's Proof-of-Work (PoW) consensus mechanism, though energy-intensive, ensures a highly secure and decentralised network. This incentivizes miners to maintain the network's integrity and protects it from manipulation or control by any single entity.",
        },
        {
          title: 'Store of Value',
          image: {
            light: require('../../../../../../assets/images/fundamentals/coins/btc/vam/light/StoreOfValue.png'),
            dark: require('../../../../../../assets/images/fundamentals/coins/btc/vam/dark/StoreOfValue.png'),
          },
          text: "BTC's limited supply (21 million), combined with its strong security and track record as the first and most widely adopted cryptocurrency, make it a popular choice for long-term value storage. Investors see BTC as a hedge against inflation and traditional financial system uncertainties, potentially appreciating in value over time.",
        },
      ],
    },
    valueAccrualMechanisms: {
      content: [
        {
          title: 'Bitcoin Halving',
          image: {
            light: require('../../../../../../assets/images/fundamentals/coins/btc/vam/light/BitcoinHalving.png'),
            dark: require('../../../../../../assets/images/fundamentals/coins/btc/vam/dark/BitcoinHalving.png'),
          },
          text: 'Approximately every four years, bitcoin undergoes a process called "halving". During this event, the reward for mining Bitcoin transactions is halved, along with its inflation rate.  Halving is designed to control the supply of new Bitcoins, ultimately contributing to its deflationary characteristics. The most recent halving took place on 11 May 2020, reducing the block reward from 12.5 to 6.25 BTC, and the next halving is expected to take place in April 2024.',
        },
        {
          title: 'Token Burning',
          image: {
            light: require('../../../../../../assets/images/fundamentals/coins/btc/vam/light/TokenBurning.png'),
            dark: require('../../../../../../assets/images/fundamentals/coins/btc/vam/dark/TokenBurning.png'),
          },
          text: 'Bitcoin does not have a built-in token burning mechanism as an intrinsic part of its protocol or economic model.',
        },
        {
          title: 'Token Buyback',
          image: {
            light: require('../../../../../../assets/images/fundamentals/coins/btc/vam/light/TokenBuyback.png'),
            dark: require('../../../../../../assets/images/fundamentals/coins/btc/vam/dark/TokenBuyback.png'),
          },
          text: 'The protocol does not have an official token buyback mechanism as a part of its protocol design or economic policy.',
        },
      ],
    },
    tokenomics: {
      content: [
        {
          name: 'Bitcoin',
          symbol: 'BTC',
          circulatingSupply: 19540000,
          totalSupply: 21000000,
          inflationary: false,
        },
      ],
    },
    tokenDistribution: {
      chartData: [{title: 'Bitcoin', percentage: 100, color: '#399AEA'}],
    },
    revenueModel: {
      title: 'Fees',
      subtitle: '*Cumulative last 1 year fees',
      value: 1440000000,
    },
    competitors: {
      cryptosData: [],
    },
    hacks: {
      events: [
        {
          id: 1,
          date: '2018',
          hack_name: 'Exchange hack: Coincheck',
          incident_description:
            'Coincheck lost 585 million NEM tokens through a phishing attack.',
          consequences:
            'Loss of $530 million at the time, reputational damage for the exchange.',
          mitigation_measure:
            'Improvement of security infrastructure, user education on phishing scams, implementation of anti-phishing tools, multi-factor authentication, and code verification processes.',
        },
        {
          id: 2,
          date: '2019',
          hack_name: 'Exchange hack: Binance',
          incident_description:
            'Binance lost 7,000 BTC through a phishing attack.',
          consequences:
            'Loss of $40 million at the time, temporary service interruption.',
          mitigation_measure:
            'Enhanced security measures, user compensation for lost funds, phishing simulations for employees, stricter email authentication, and increased user education campaigns.',
        },
        {
          id: 3,
          date: '2022',
          hack_name: 'Bridge hack: Ronin Network',
          incident_description:
            'Ronin Network lost $625 million in cryptocurrency through a bridge exploit.',
          consequences:
            'Loss of funds for Axie Infinity players, damage to the DeFi ecosystem.',
          mitigation_measure:
            'Network upgrade, investigation and bounty for attackers, user compensation, implementation of cross-chain communication protocols, formalised security assessments, and automated risk monitoring.',
        },
        {
          id: 4,
          date: '2022',
          hack_name: 'Bridge hack: Wormhole',
          incident_description:
            'Wormhole lost $320 million through a bridge exploit.',
          consequences:
            'Loss of funds for users, concerns about cross-chain security.',
          mitigation_measure:
            'Network upgrade, collaboration with law enforcement, user compensation, implementation of threshold signatures, secure enclaves, and independent security audits.',
        },
        {
          id: 5,
          date: '2022',
          hack_name: 'Phising Attack: Tesla',
          incident_description:
            "Tesla's website was compromised, displaying a fake Bitcoin payment option.",
          consequences: 'Reputational damage for Tesla, potential user scams.',
          mitigation_measure:
            'Removal of the fake payment option, website security assessment, deployment of web application firewalls, intrusion detection systems, and security training for employees.',
        },
        {
          id: 6,
          date: '2023',
          hack_name: 'Nomad Bridge',
          incident_description:
            'Nomad Bridge lost $190 million in a cross-chain attack.',
          consequences:
            'Loss of funds for users, concerns about interoperability across blockchains.',
          mitigation_measure:
            'Network upgrade, investigation and bounty for attackers, user compensation, implementation of secure multi-party computation protocols, decentralised key management, and continuous security monitoring.',
        },
        {
          id: 7,
          date: '2023',
          hack_name: 'Mixin Network',
          incident_description:
            'Mixin Network lost $200 million in a cryptocurrency attack.',
          consequences:
            'Loss of funds for users, concerns about exchange security.',
          mitigation_measure:
            'Investigation and collaboration with law enforcement, user compensation, implementation of secure enclaves, multi-signature transactions, and penetration testing.',
        },
      ],
    },
    upgrades: {
      events: [
        {
          id: 1,
          date: 'Live',
          upgrade_name: 'Taproot Deployment',
          upgrade_overview:
            'Enhanced privacy and efficiency through complex transactions.',
          upgrade_impact: 'Increased adoption and privacy for users.',
        },
        {
          id: 2,
          date: '2024',
          upgrade_name: 'Schnorr Signatures',
          upgrade_overview:
            'Further improved privacy with indistinguishable multi-signature transactions',
          upgrade_impact:
            'Enhanced fungibility and attractiveness for Bitcoin.',
        },
        {
          id: 3,
          date: 'Ongoing',
          upgrade_name: 'Lightning Network Expansion',
          upgrade_overview:
            'Second-layer scaling solution for fast and cheap off-chain transactions.',
          upgrade_impact:
            'Improved scalability and usability for everyday payments.',
        },
        {
          id: 4,
          date: 'Live',
          upgrade_name: 'Ordinals Protocol',
          upgrade_overview:
            'Data inscription on satoshis, enabling NFTs and other collectibles.',
          upgrade_impact:
            'Attracts new users and developers, potentially increasing Total Value Locked (TVL).',
        },
        {
          id: 5,
          date: 'Ongoing',
          upgrade_name: 'Bitcoin Improvement Proposals (BIPs)',
          upgrade_overview:
            'Proposals for new features and functionalities, like Pay to Metadata and Confidential Transactions.',
          upgrade_impact:
            'Enhanced security, privacy, and usability for Bitcoin.',
        },
        {
          id: 6,
          date: 'May 2024',
          upgrade_name: 'Halving event',
          upgrade_overview:
            'Block reward reduction for miners, historically leading to price increases.',
          upgrade_impact:
            'Potential for significant price increase, affecting the market dynamics of Bitcoin.',
        },
      ],
    },
    dApps: null,
  },
  // ada: {
  //   tokenomics: {
  //     content: [
  //       {
  //         name: 'Cardano',
  //         symbol: 'ADA',
  //         circulatingSupply: 34964744027,
  //         totalSupply: 45000000000,
  //         inflationary: true,
  //       },
  //       {
  //         name: 'Ethereum',
  //         symbol: 'ETH',
  //         circulatingSupply: 120251000,
  //         totalSupply: Infinity,
  //         inflationary: true,
  //       },
  //       {
  //         name: 'Solana',
  //         symbol: 'SOL',
  //         circulatingSupply: 426247459,
  //         totalSupply: 564532025,
  //         inflationary: null,
  //       },
  //     ],
  //   },
  //   tokenDistribution: {
  //     chartData: [
  //       {title: 'Public Sales', percentage: 57.6, color: '#399AEA'},
  //       {title: 'Team and Foundation', percentage: 11.5, color: '#20CBDD'},
  //       {title: 'Staking Rewards', percentage: 30.9, color: '#C539B4'},
  //       {title: 'Binance Launchpad', percentage: 1.01, color: '#FF3BC3'},
  //       {title: 'Bridge Governance Tokens', percentage: 0.97, color: '#FFC53D'},
  //       {title: 'Layer 2 (L2)', percentage: 0.96, color: '#399AEA'},
  //       {title: 'BRC-20', percentage: 0.72, color: '#20CBDD'},
  //       {
  //         title: 'Decentralised Exchange (DEX)',
  //         percentage: 0.66,
  //         color: '#C539B4',
  //       },
  //       {title: 'Zero Knowledge (ZK)', percentage: 1.07, color: '#FF3BC3'},
  //     ],
  //   },
  //   tokenUtility: {
  //     content: [
  //       {
  //         title: 'Transaction Fees',
  //         image: {
  //           light: require('../../../../../../assets/images/fundamentals/coins/baseblock/ada/vam/light/TransactionFees.png'),
  //           dark: require('../../../../../../assets/images/fundamentals/coins/baseblock/ada/vam/dark/TransactionFees.png'),
  //         },
  //         text: 'ADA is used to pay for transactions on the Cardano blockchain, including sending and receiving ADA, interacting with smart contracts, and creating new assets.',
  //       },
  //       {
  //         title: 'Staking',
  //         image: {
  //           light: require('../../../../../../assets/images/fundamentals/coins/baseblock/ada/vam/light/Staking.png'),
  //           dark: require('../../../../../../assets/images/fundamentals/coins/baseblock/ada/vam/dark/Staking.png'),
  //         },
  //         text: 'ADA holders can stake their tokens to become stake pool operators or delegate their stake to existing pools.',
  //       },
  //       {
  //         title: 'Governance',
  //         image: {
  //           light: require('../../../../../../assets/images/fundamentals/coins/baseblock/ada/vam/light/Governance.png'),
  //           dark: require('../../../../../../assets/images/fundamentals/coins/baseblock/ada/vam/dark/Governance.png'),
  //         },
  //         text: 'ADA holders have voting rights on proposals that shape the future of the Cardano network, such as protocol upgrades, parameter changes, and funding for development projects',
  //       },
  //     ],
  //   },
  //   valueAccrualMechanisms: {
  //     content: [
  //       {
  //         title: 'Fee Burning',
  //         image: {
  //           light: require('../../../../../../assets/images/fundamentals/coins/baseblock/ada/vam/light/TokenBurning.png'),
  //           dark: require('../../../../../../assets/images/fundamentals/coins/baseblock/ada/vam/dark/TokenBurning.png'),
  //         },
  //         text: 'Cardano does not have a built-in token burning mechanism as an intrinsic part of its protocol or economic model.',
  //       },
  //       {
  //         title: 'Token Buyback',
  //         image: {
  //           light: require('../../../../../../assets/images/fundamentals/coins/baseblock/ada/vam/light/TokenBuyback.png'),
  //           dark: require('../../../../../../assets/images/fundamentals/coins/baseblock/ada/vam/dark/TokenBuyback.png'),
  //         },
  //         text: 'Cardano does not have a built-in token buyback mechanism as an intrinsic part of its protocol or economic model.',
  //       },
  //     ],
  //   },
  //   vestingSchedules: {
  //     content: [
  //       {
  //         year: '2023',
  //         tokenRelease: 1448995450,
  //       },
  //       {
  //         year: '2024',
  //         tokenRelease: 1448995450,
  //       },
  //       {
  //         year: '2025',
  //         tokenRelease: 1448995450,
  //       },
  //     ],
  //   },
  //   revenueModel: {
  //     content: [
  //       {
  //         title: 'Fees (1Y)',
  //         subtitle: '*Cumulative last 1 year fees',
  //         value: 2660000,
  //       },
  //     ],
  //   },
  //   competitors: {
  //     cryptosData: [
  //       {
  //         crypto: 'Cardano',
  //         symbol: 'ADA',
  //         image: require('../../../../../../assets/images/fundamentals/coins/eth/competitors/ADA.png'),
  //         maxValue: Infinity,
  //         percentageValue: 78,
  //         inflationary: false,
  //         typeOfToken: ['Utility'],
  //         marketCap: [17.69, 17693125209],
  //         tvl: 0.345,
  //         color: '#399AEA',
  //         tps: [250],
  //         fee: 0.16,
  //         apr: 3.65,
  //         revenue: 4900000,
  //         activeDevs: 126.1,
  //         activeUsers: 0,
  //         inflationRate: null,
  //       },
  //       {
  //         crypto: 'Ethereum',
  //         symbol: 'ETH',
  //         image: require('../../../../../../assets/images/fundamentals/coins/eth/competitors/ETH.png'),
  //         maxValue: Infinity,
  //         percentageValue: 100,
  //         inflationary: false,
  //         typeOfToken: ['Utility'],
  //         marketCap: [280.1, 280104365594],
  //         tvl: 32.8,
  //         color: '#399AEA',
  //         tps: [30],
  //         fee: 0.0007,
  //         apr: 3.61,
  //         revenue: 2120000000,
  //         activeDevs: 135.93,
  //         activeUsers: 378270,
  //         inflationRate: [
  //           {year: 2022, value: 0.07},
  //           {year: 2023, value: 0.44},
  //         ],
  //       },
  //       {
  //         crypto: 'Solana',
  //         symbol: 'SOL',
  //         image: require('../../../../../../assets/images/fundamentals/coins/eth/competitors/SOL.png'),
  //         maxValue: Infinity,
  //         percentageValue: 77,
  //         inflationary: true,
  //         typeOfToken: ['Utility'],
  //         marketCap: [42.8, 42844716123],
  //         tvl: 1.671,
  //         color: '#20CBDD',
  //         tps: [65000],
  //         fee: 0.00025,
  //         apr: 6,
  //         revenue: 19180000,
  //         activeDevs: 73.47,
  //         activeUsers: 427190,
  //         inflationRate: [
  //           {year: 2022, value: 8},
  //           {year: 2023, value: 8},
  //         ],
  //       },
  //       {
  //         crypto: 'Polkadot',
  //         symbol: 'DOT',
  //         image: require('../../../../../../assets/images/fundamentals/coins/baseblock/ada/competitors/polkadot.png'),
  //         maxValue: '45 billion DOT',
  //         percentageValue: 94,
  //         inflationary: true,
  //         typeOfToken: ['Governance', 'Staking', 'Bonding'],
  //         marketCap: [9.061, 9061013701],
  //         tvl: 0,
  //         color: '#895EF6',
  //         tps: [1000],
  //         fee: 0.00001,
  //         apr: 13.88,
  //         revenue: 166000000,
  //         activeDevs: 114.73,
  //         activeUsers: 6510,
  //         inflationRate: [
  //           {year: 2022, value: 10},
  //           {year: 2023, value: 7.8},
  //         ],
  //       },
  //       {
  //         crypto: 'Avalanche',
  //         symbol: 'AVAX',
  //         image: require('../../../../../../assets/images/fundamentals/coins/eth/competitors/AVAX.png'),
  //         maxValue: '720 million AVAX',
  //         percentageValue: 49,
  //         inflationary: false,
  //         marketCap: [13.12, 13120973958],
  //         tvl: 0.642,
  //         color: '#C539B4',
  //         tps: [4500, 6500],
  //         fee: 0.000025,
  //         apr: 9.5,
  //         revenue: 17110000,
  //         activeDevs: 35.63,
  //         activeUsers: 47990,
  //         inflationRate: null,
  //       },
  //     ],
  //   },
  //   hacks: {
  //     events: [
  //       {
  //         id: 1,
  //         date: 'October 2020',
  //         hack_name: 'DoS Attack',
  //         incident_description:
  //           "A large-scale DDoS attack targeted Cardano's network, causing temporary downtime and congestion.",
  //         consequences:
  //           'Temporary disruption of transaction processing and network congestion, but no funds were lost.',
  //         mitigation_measure:
  //           'Implementation of additional network security measures, collaboration with cloud providers, and the use of firewalls, load balancers, and rate-limiting mechanisms to enhance network resilience.',
  //       },
  //       {
  //         id: 2,
  //         date: 'March 2021',
  //         hack_name: 'Smart Contract Vulnerability',
  //         incident_description:
  //           "A vulnerability in a smart contract on Cardano's network was discovered, posing a potential risk of funds being stolen.",
  //         consequences:
  //           'The vulnerability was patched before any funds were lost.',
  //         mitigation_measure:
  //           'Implementation of a rigorous smart contract review process, including peer review, formal verification, and security audits. Establishment of a bounty program to encourage vulnerability discovery.',
  //       },
  //       {
  //         id: 3,
  //         date: 'October 2022',
  //         hack_name: 'Phishing Attack',
  //         incident_description:
  //           'A phishing attack targeted Cardano users, attempting to trick them into revealing private keys.',
  //         consequences: 'Some users were affected, potentially losing funds.',
  //         mitigation_measure:
  //           'Issuing warnings about the phishing attack, providing guidance on identifying and avoiding phishing scams, and emphasising user education.',
  //       },
  //       {
  //         id: 4,
  //         date: 'April 2023',
  //         hack_name: 'Wallet Vulnerability',
  //         incident_description:
  //           'A vulnerability in a popular Cardano wallet was discovered, posing a potential risk of funds being stolen.',
  //         consequences:
  //           'The vulnerability was patched before any funds were lost.',
  //         mitigation_measure:
  //           'Wallet developers issued a patch, advised users to update to the latest version, and encouraged users to choose reputable wallet providers. Cardano emphasises the importance of keeping software up to date.',
  //       },
  //       {
  //         id: 5,
  //         date: 'December 2023',
  //         hack_name: 'Cardano Scam',
  //         incident_description:
  //           'Orchestrated by unscrupulous actors, the scam targets Cardano community members, offering fictitious ADA rewards through a deceptive narrative related to non-existent events. Victims are lured with promises of additional ADA rewards.',
  //         consequences:
  //           'Substantial losses for several ADA holders, with users reported losing over 200,000 ADA after falling prey to the scam.',
  //         mitigation_measure:
  //           'The incident has been brought to light by the Cardano Community X account, raising awareness within the community. Users are advised to exercise caution, verify events, and be wary of unsolicited reward schemes.',
  //       },
  //     ],
  //   },
  //   upgrades: {
  //     events: [
  //       {
  //         id: 1,
  //         date: 'Sep 2022',
  //         upgrade_name: 'Basho Hard Fork',
  //         upgrade_overview: 'Basho hard fork.',
  //         upgrade_impact: 'Implemented upgrade.',
  //       },
  //       {
  //         id: 2,
  //         date: 'Feb 2023',
  //         upgrade_name: 'Allegra Hard Fork',
  //         upgrade_overview: 'Allegra hard fork.',
  //         upgrade_impact: 'Implemented upgrade.',
  //       },
  //       {
  //         id: 3,
  //         date: 'March 2021',
  //         upgrade_name: 'Mary Hard Fork',
  //         upgrade_overview: 'Mary hard fork.',
  //         upgrade_impact: 'Implemented upgrade.',
  //       },
  //       {
  //         id: 4,
  //         date: 'July 2020',
  //         upgrade_name: 'Shelley Hard Fork',
  //         upgrade_overview: 'Shelley hard fork.',
  //         upgrade_impact: 'Implemented upgrade.',
  //       },
  //       {
  //         id: 5,
  //         date: 'September 2017',
  //         upgrade_name: 'Byron Hard Fork',
  //         upgrade_overview: 'Byron hard fork.',
  //         upgrade_impact: 'Implemented upgrade.',
  //       },
  //       {
  //         id: 6,
  //         date: 'Q4 2023',
  //         upgrade_name: 'Voltaire Hard Fork',
  //         upgrade_overview: 'Voltaire hard fork.',
  //         upgrade_impact: 'Pending implementation, impact to be determined.',
  //       },
  //       {
  //         id: 7,
  //         date: 'Q1 2024',
  //         upgrade_name: 'Hydra Hard Fork',
  //         upgrade_overview: 'Hydra hard fork.',
  //         upgrade_impact: 'Pending implementation, impact to be determined.',
  //       },
  //       {
  //         id: 8,
  //         date: 'Q2 2024',
  //         upgrade_name: 'Djed Stablecoin',
  //         upgrade_overview: 'Djed stablecoin.',
  //         upgrade_impact: 'Pending implementation, impact to be determined.',
  //       },
  //       {
  //         id: 9,
  //         date: 'Q3 2024',
  //         upgrade_name: 'Atala Prism',
  //         upgrade_overview: 'Atala prism.',
  //         upgrade_impact: 'Pending implementation, impact to be determined.',
  //       },
  //       {
  //         id: 10,
  //         date: 'Ongoing',
  //         upgrade_name: 'Ongoing Development',
  //         upgrade_overview:
  //           'Ongoing funding and development of innovative projects through Project Catalyst.',
  //         upgrade_impact:
  //           'Ongoing support for innovation and development within the Cardano ecosystem.',
  //       },
  //     ],
  //   },
  //   dApps: {
  //     mainImage: require('../../../../../../assets/images/fundamentals/coins/eth/dApps/dapps.png'),
  //     protocols: [
  //       {
  //         name: 'MuesliSwap',
  //         description:
  //           'First DEX on Cardano, enabling users to trade Cardano-native tokens (CNFTs) without a centralised intermediary.',
  //         tvl: 2830000,
  //         image: require('../../../../../../assets/images/fundamentals/coins/eth/dApps/hexagons/uniswap.png'),
  //       },
  //       {
  //         name: 'Genius Yield',
  //         description:
  //           'First DeFi platform on Cardano, offering a variety of staking and lending services.',
  //         tvl: 0,
  //         image: require('../../../../../../assets/images/fundamentals/coins/eth/dApps/hexagons/aave.png'),
  //       },
  //       {
  //         name: 'Maladex',
  //         description:
  //           'User-friendly DEX with a simple and intuitive interface, supporting on-chain order matching.',
  //         tvl: 0,
  //         image: require('../../../../../../assets/images/fundamentals/coins/eth/dApps/hexagons/makerdao.png'),
  //       },
  //       {
  //         name: 'Cardano NFT Marketplace',
  //         description:
  //           'Largest NFT marketplace on Cardano, featuring a wide variety of NFTs for users to choose from.',
  //         tvl: 0,
  //         image: require('../../../../../../assets/images/fundamentals/coins/eth/dApps/hexagons/lido.png'),
  //       },
  //       {
  //         name: 'Ardana',
  //         description:
  //           'Sidechain to scale Cardano, utilising a sharding architecture to distribute transactions across multiple chains.',
  //         tvl: 0,
  //         image: require('../../../../../../assets/images/fundamentals/coins/eth/dApps/hexagons/curve.png'),
  //       },
  //     ],
  //   },
  // },
  // avax: {
  //   tokenUtility: {
  //     content: [
  //       {
  //         title: 'Transaction Fees',
  //         image: {
  //           light: require('../../../../../../assets/images/fundamentals/coins/baseblock/avax/vam/light/TransactionFees.png'),
  //           dark: require('../../../../../../assets/images/fundamentals/coins/baseblock/avax/vam/dark/TransactionFees.png'),
  //         },
  //         text: 'AVAX is used to pay for transaction fees on the Avalanche blockchain',
  //       },
  //       {
  //         title: 'Staking',
  //         image: {
  //           light: require('../../../../../../assets/images/fundamentals/coins/baseblock/avax/vam/light/Staking.png'),
  //           dark: require('../../../../../../assets/images/fundamentals/coins/baseblock/avax/vam/dark/Staking.png'),
  //         },
  //         text: "AVAX holders can stake their tokens to become validators or delegators, participating in the network's consensus mechanism and securing its operations.",
  //       },
  //       {
  //         title: 'Subnets Creation and Operation',
  //         image: {
  //           light: require('../../../../../../assets/images/fundamentals/coins/baseblock/avax/vam/light/SubnetsCreationAndOperations.png'),
  //           dark: require('../../../../../../assets/images/fundamentals/coins/baseblock/avax/vam/dark/SubnetsCreationAndOperation.png'),
  //         },
  //         text: 'Avalanche allows for the creation of custom subnetworks (subnets), and AVAX is used as the primary currency within these subnets. ',
  //       },
  //       {
  //         title: 'Asset Creation and Trading',
  //         image: {
  //           light: require('../../../../../../assets/images/fundamentals/coins/baseblock/avax/vam/light/AssetCreationAndTrading.png'),
  //           dark: require('../../../../../../assets/images/fundamentals/coins/baseblock/avax/vam/dark/AssetCreationAndTrading.png'),
  //         },
  //         text: 'The Avalanche network supports the creation of custom digital assets, and AVAX is used as a base asset for trading and liquidity purposes.',
  //       },
  //       {
  //         title: 'Governance',
  //         image: {
  //           light: require('../../../../../../assets/images/fundamentals/coins/baseblock/avax/vam/light/Governance.png'),
  //           dark: require('../../../../../../assets/images/fundamentals/coins/baseblock/avax/vam/dark/Governance.png'),
  //         },
  //         text: 'AVAX holders have voting rights on proposals that shape the future of the Avalanche network',
  //       },
  //     ],
  //   },
  //   valueAccrualMechanisms: {
  //     content: [
  //       {
  //         title: 'Token Burning',
  //         image: {
  //           light: require('../../../../../../assets/images/fundamentals/coins/baseblock/avax/vam/light/TokenBurning.png'),
  //           dark: require('../../../../../../assets/images/fundamentals/coins/baseblock/avax/vam/dark/TokenBurning.png'),
  //         },
  //         text: 'With each transaction on the Avalanche Network, the transaction fee paid in AVAX is burned, leading to a deflationary mechanism.',
  //       },
  //       {
  //         title: 'Token Buyback',
  //         image: {
  //           light: require('../../../../../../assets/images/fundamentals/coins/baseblock/avax/vam/light/TokenBuyback.png'),
  //           dark: require('../../../../../../assets/images/fundamentals/coins/baseblock/avax/vam/dark/TokenBuyback.png'),
  //         },
  //         text: 'Avalanche does not have a built-in token buyback mechanism as an intrinsic part of its protocol or economic model.',
  //       },
  //     ],
  //   },
  // },
  // sol: {
  //   tokenUtility: {
  //     content: [
  //       {
  //         title: 'Transaction Fees',
  //         image: {
  //           light: require('../../../../../../assets/images/fundamentals/coins/baseblock/sol/vam/light/TransactionFees.png'),
  //           dark: require('../../../../../../assets/images/fundamentals/coins/baseblock/sol/vam/dark/TransactionFees.png'),
  //         },
  //         text: 'Every transaction on the Solana network, including token transfers, smart contract interactions, and data storage, requires gas fees paid in SOL.',
  //       },
  //       {
  //         title: 'Staking',
  //         image: {
  //           light: require('../../../../../../assets/images/fundamentals/coins/baseblock/sol/vam/light/Staking.png'),
  //           dark: require('../../../../../../assets/images/fundamentals/coins/baseblock/sol/vam/dark/Staking.png'),
  //         },
  //         text: "SOL holders can stake their tokens to become validators or delegate them to existing validators, participating in the network's Proof-of-Stake (PoS) consensus mechanism.",
  //       },
  //       {
  //         title: 'Anchor System Participation',
  //         image: {
  //           light: require('../../../../../../assets/images/fundamentals/coins/baseblock/sol/vam/light/AnchorSystemParticipation.png'),
  //           dark: require('../../../../../../assets/images/fundamentals/coins/baseblock/sol/vam/dark/AnchorSystemParticipation.png'),
  //         },
  //         text: 'Anchors are trusted intermediaries that bridge Solana with real-world assets and other blockchains. SOL serves as the reserve currency for assets issued on Solana through anchors, ensuring their liquidity and stability.',
  //       },
  //       {
  //         title: 'Governance',
  //         image: {
  //           light: require('../../../../../../assets/images/fundamentals/coins/baseblock/sol/vam/light/Governance.png'),
  //           dark: require('../../../../../../assets/images/fundamentals/coins/baseblock/sol/vam/dark/Governance.png'),
  //         },
  //         text: 'SOL holders have voting rights on proposals that shape the future of the Solana network, such as protocol upgrades, fee structures, and treasury allocations.',
  //       },
  //     ],
  //   },
  //   valueAccrualMechanisms: {
  //     content: [
  //       {
  //         title: 'Token Burning',
  //         image: {
  //           light: require('../../../../../../assets/images/fundamentals/coins/baseblock/sol/vam/light/TokenBurning.png'),
  //           dark: require('../../../../../../assets/images/fundamentals/coins/baseblock/sol/vam/dark/TokenBurning.png'),
  //         },
  //         text: '50% of all transaction fees paid in SOL on the network are permanently removed from circulation through burning. This mechanism effectively reduces the overall supply of SOL over time.',
  //       },
  //       {
  //         title: 'Token Buyback',
  //         image: {
  //           light: require('../../../../../../assets/images/fundamentals/coins/baseblock/sol/vam/light/TokenBuyback.png'),
  //           dark: require('../../../../../../assets/images/fundamentals/coins/baseblock/sol/vam/dark/TokenBuyback.png'),
  //         },
  //         text: 'Solana does not have a built-in token buyback mechanism as an intrinsic part of its protocol or economic model.',
  //       },
  //     ],
  //   },
  // },
  // xrp: {
  //   tokenUtility: {
  //     content: [
  //       {
  //         title: 'Transaction Fees',
  //         image: {
  //           light: require('../../../../../../assets/images/fundamentals/coins/xpayments/rpl/vam/light/TransactionFees.png'),
  //           dark: require('../../../../../../assets/images/fundamentals/coins/xpayments/rpl/vam/dark/TransactionFees.png'),
  //         },
  //         text: 'XRP is used to pay transaction fees on the XRP Ledger.',
  //       },
  //       {
  //         title: 'Decentralised Exchange (DEX) Functionality',
  //         image: {
  //           light: require('../../../../../../assets/images/fundamentals/coins/xpayments/rpl/vam/light/DecentralisedExchangeFunctionality.png'),
  //           dark: require('../../../../../../assets/images/fundamentals/coins/xpayments/rpl/vam/dark/DecentralisedExchangeFunctionality.png'),
  //         },
  //         text: 'XRP is used to pay transaction fees on the XRP The XRP Ledger includes a built-in decentralised exchange. XRP can be directly traded with other currencies (both fiat and digital) on this exchange, providing liquidity and facilitating seamless currency conversions within the network.',
  //       },
  //       {
  //         title: 'Escrow Transactions',
  //         image: {
  //           light: require('../../../../../../assets/images/fundamentals/coins/xpayments/rpl/vam/light/EscrowTransactions.png'),
  //           dark: require('../../../../../../assets/images/fundamentals/coins/xpayments/rpl/vam/dark/EscrowTransactions.png'),
  //         },
  //         text: 'The XRP Ledger allows users to create escrow accounts using XRP. This feature enables the locking of a certain amount of XRP until specified conditions are met, supporting secure, conditional transactions.',
  //       },
  //       {
  //         title: 'Interledger Protocol Compatibility',
  //         image: {
  //           light: require('../../../../../../assets/images/fundamentals/coins/xpayments/rpl/vam/light/InterledgerProtocolCompatibility.png'),
  //           dark: require('../../../../../../assets/images/fundamentals/coins/xpayments/rpl/vam/dark/InterledgerProtocolCompatibility.png'),
  //         },
  //         text: "XRP is designed to work seamlessly with the Interledger Protocol (ILP), which aims to connect various payment networks. This enhances XRP's utility in facilitating smooth and efficient cross-network transactions.",
  //       },
  //     ],
  //   },
  //   valueAccrualMechanisms: {
  //     content: [
  //       {
  //         title: 'Token Burning',
  //         image: {
  //           light: require('../../../../../../assets/images/fundamentals/coins/xpayments/rpl/vam/light/TokenBurning.png'),
  //           dark: require('../../../../../../assets/images/fundamentals/coins/xpayments/rpl/vam/dark/TokenBurning.png'),
  //         },
  //         text: 'The XRP Ledger has a burn mechanism designed to control spam transactions on the network. When an escrow account expires and the conditions are met, the XRP is released, and the account is closed. In some cases, the escrow account may not be claimed, and the XRP is burned.',
  //       },
  //       {
  //         title: 'Token Buyback',
  //         image: {
  //           light: require('../../../../../../assets/images/fundamentals/coins/xpayments/rpl/vam/light/TokenBuyback.png'),
  //           dark: require('../../../../../../assets/images/fundamentals/coins/xpayments/rpl/vam/dark/TokenBuyback.png'),
  //         },
  //         text: 'Ripple (XRP) does not have a built-in token buyback mechanism. However, Ripple Labs, the company behind the XRP Ledger, has occasionally bought back XRP tokens to enhance the value of XRP, attract partners, and make it more scalable for global use.',
  //       },
  //     ],
  //   },
  // },
  // xlm: {
  //   tokenUtility: {
  //     content: [
  //       {
  //         title: 'Transaction Fees',
  //         image: {
  //           light: require('../../../../../../assets/images/fundamentals/coins/xpayments/xlm/vam/light/TransactionFees.png'),
  //           dark: require('../../../../../../assets/images/fundamentals/coins/xpayments/xlm/vam/dark/TransactionFees.png'),
  //         },
  //         text: 'XLM is used to cover transaction fees on the Stellar network.',
  //       },
  //       {
  //         title: 'Governance',
  //         image: {
  //           light: require('../../../../../../assets/images/fundamentals/coins/xpayments/xlm/vam/light/Governance.png'),
  //           dark: require('../../../../../../assets/images/fundamentals/coins/xpayments/xlm/vam/dark/Governance.png'),
  //         },
  //         text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla velit itaque repellat odit expedita porro, ex, aperiam quis commodi, tempore et! Eos delectus cumque reiciendis, minima sapiente earum rerum possimus.',
  //       },
  //       {
  //         title: 'Asset Issuance',
  //         image: {
  //           light: require('../../../../../../assets/images/fundamentals/coins/xpayments/xlm/vam/light/AssetIssuance.png'),
  //           dark: require('../../../../../../assets/images/fundamentals/coins/xpayments/xlm/vam/dark/AssetIssuance.png'),
  //         },
  //         text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla velit itaque repellat odit expedita porro, ex, aperiam quis commodi, tempore et! Eos delectus cumque reiciendis, minima sapiente earum rerum possimus.',
  //       },
  //       {
  //         title: 'Asset Issuance',
  //         image: {
  //           light: require('../../../../../../assets/images/fundamentals/coins/xpayments/xlm/vam/light/AssetIssuance.png'),
  //           dark: require('../../../../../../assets/images/fundamentals/coins/xpayments/xlm/vam/dark/AssetIssuance.png'),
  //         },
  //         text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla velit itaque repellat odit expedita porro, ex, aperiam quis commodi, tempore et! Eos delectus cumque reiciendis, minima sapiente earum rerum possimus.',
  //       },
  //       {
  //         title: 'Staking',
  //         image: {
  //           light: require('../../../../../../assets/images/fundamentals/coins/xpayments/xlm/vam/light/Staking.png'),
  //           dark: require('../../../../../../assets/images/fundamentals/coins/xpayments/xlm/vam/dark/Staking.png'),
  //         },
  //         text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla velit itaque repellat odit expedita porro, ex, aperiam quis commodi, tempore et! Eos delectus cumque reiciendis, minima sapiente earum rerum possimus.',
  //       },
  //     ],
  //   },
  // },
};
