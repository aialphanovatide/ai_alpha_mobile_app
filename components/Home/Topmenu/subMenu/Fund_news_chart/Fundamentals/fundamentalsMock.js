export const fundamentalsMock = {
  hacks: {
    sectionDescription:
      'The overview of security breaches helps to identify weaknesses in the network that could potentially threaten user confidence and market sentiment.',
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
  tokenomics: {
    sectionDescription:
      'Presents the supply and demand dynamics of a crypto project, similar to how central banks manage traditional currencies, affecting token supply, demand and value.',
  },
  tokenDistribution: {
    sectionDescription:
      'Shows how tokens are distributed among stakeholders at launch. This distribution directly affects the perceived value of the token and influences demand.',
  },
  tokenUtility: {
    sectionDescription:
      'Presents the supply and demand dynamics of a crypto project, similar to how central banks manage traditional currencies, affecting token supply, demand and value.',
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
    sectionDescription:
      'Shows the mechanisms that help make the token more scarce, potentially leading to an increase in its value, ultimately benefiting existing token holders.',
    options: [
      {
        name: 'Benefits',
        icon: require('../../../../../../assets/images/fundamentals/benefits.png'),
      },
      {
        name: 'USP',
        icon: require('../../../../../../assets/images/fundamentals/usp.png'),
      },
    ],
    contentData: [
      {
        option: 'Benefits',
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
      {
        option: 'USP',
        content: [
          {
            title: 'TokenBurning',
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
    ],
  },
  revenueModel: {
    sectionDescription:
      'Shows how a crypto project generates income, giving an indication of its potential to be profitable and sustainable in the long term.',
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
        marketCap: [250.3, 250331978.508],
        tvl: 26.6,
        color: '#399AEA',
        tps: [11.14],
        fee: 1.3,
        apr: 4.44,
        revenue: 2480000000,
        activeDevs: 162.87,
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
        inflationary: null,
        marketCap: [25.7, 25696025.115],
        tvl: 0.67,
        color: '#20CBDD',
        tps: [65000],
        fee: 0.01,
        apr: 8.69,
        revenue: 19180000,
        activeDevs: 82.57,
        inflationRate: [
          {year: 2022, value: 8},
          {year: 2023, value: 7},
        ],
      },
      {
        crypto: 'Cardano',
        symbol: 'ADA',
        image: require('../../../../../../assets/images/fundamentals/coins/eth/competitors/ADA.png'),
        maxValue: '45 billion ADA',
        percentageValue: 78,
        inflationary: true,
        marketCap: [13.4, 13412098.765],
        tvl: 0.25,
        color: '#895EF6',
        tps: [1000],
        fee: 0.07,
        apr: 6.94,
        revenue: 166000000,
        activeDevs: 166.8,
        inflationRate: [
          {year: 2022, value: 4.72},
          {year: 2023, value: 2.58},
        ],
      },
      {
        crypto: 'Avalanche',
        symbol: 'AVAX',
        image: require('../../../../../../assets/images/fundamentals/coins/eth/competitors/AVAX.png'),
        maxValue: '720 million AVAX',
        percentageValue: 49,
        inflationary: false,
        marketCap: [7.9, 7974837.865],
        tvl: 3,
        color: '#C539B4',
        tps: [4500, 6500],
        fee: 0.96,
        apr: 3.14,
        revenue: 33000000,
        activeDevs: 47.17,
        inflationRate: null,
      },
    ],
    sectionDescription:
      'In order to assess the market position and potential of a crypto project, key insights can be gained by comparing it to its competitors.',
    subsections: {
      marketCap: {
        sectionDescription:
          'Shows the current value of the total number of tokens held by the project, helping to gauge the relative size of one cryptocurrency against another.',
      },
      supplyModel: {
        sectionDescription:
          'Presents the mechanism by which new tokens are introduced into circulation and how the total supply of cryptocurrency is managed over time.',
      },
      typeOfToken: {
        sectionDescription:
          'Provides insight into the specific mechanisms of each project that drive token demand and value.',
      },
      TVL: {
        sectionDescription:
          'Represents the total value of assets staked in a protocol, showing investor and developer interest and demonstrating project visibility and growth potential in DeFi.',
      },
      dailyActiveUsers: {
        sectionDescription:
          'Presents the number of unique interactions per day, with higher DAUs showing greater project adoption and user engagement.',
      },
      transactionFees: {
        sectionDescription:
          'Presents the cost users pay to interact with the network, helping to gauge how cost-effective and accessible a project is.',
      },
      transactionSpeed: {
        sectionDescription:
          'Represents the time for a transaction to be processed and confirmed by the network. Faster transaction speeds improve user experience, open up more use cases and increase adoption potential.',
      },
      inflationRate: {
        sectionDescription:
          'Shows the rate at which new tokens are released into circulation. Higher inflation indicates a faster increase in supply, potentially reducing the value of individual tokens.',
      },
      APR: {
        sectionDescription:
          "The returns and benefits of participating in staking within each project's ecosystem.",
      },
      activeDevelopers: {
        sectionDescription:
          "A project's health and potential is reflected in its developer count. A higher number of active developers shows a strong team, which in turn increases the stability, innovation and adaptability of the project.",
      },
      revenue: {
        sectionDescription:
          'Revenue performance shows how effectively a project can generate income, giving an indication of its potential to be profitable and sustainable in the long term.',
      },
    },
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
    sectionDescription:
      'Presents a roadmap outlining the upcoming milestones and improvements for the protocol, offering a clear view of how the project is progressing.',
  },
  dApps: {
    mainImage: require('../../../../../../assets/images/fundamentals/coins/eth/dApps/dapps.png'),
    sectionDescription:
      'These dApps are leading the way in their ecosystem, playing a crucial role in attracting investors and creating a positive feedback loop that encourages further user and developer participation.',
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
};
