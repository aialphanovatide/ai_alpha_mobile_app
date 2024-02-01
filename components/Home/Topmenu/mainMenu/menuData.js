const menuData = [
  {
    id: 1,
    icon: 'BTC',
    name: 'Bitcoin',
    subMenuOptions: null,
    isActive: true,
    iconImage: {
      light: {
        active: require('../../../../assets/images/topMenu/Active/bitcoin.png'),
        inactive: require('../../../../assets/images/topMenu/Inactive/bitcoin.png'),
      },
      dark: {
        active: require('../../../../assets/images/topMenu/Dark/Active/bitcoin.png'),
        inactive: require('../../../../assets/images/topMenu/Dark/Inactive/bitcoin.png'),
      },
    },
  },
  {
    id: 2,
    icon: 'ETH',
    name: 'Ethereum',
    subMenuOptions: null,
    isActive: true,
    iconImage: {
      light: {
        active: require('../../../../assets/images/topMenu/Active/ethereum.png'),
        inactive: require('../../../../assets/images/topMenu/Inactive/ethereum.png'),
      },
      dark: {
        active: require('../../../../assets/images/topMenu/Dark/Active/ethereum.png'),
        inactive: require('../../../../assets/images/topMenu/Dark/Inactive/ethereum.png'),
      },
    },
  },
  {
    id: 3,
    icon: 'RL',
    name: 'RootLink',
    subMenuOptions: [
      {
        id: 31,
        coin: 'ATOM',
        imageUri: 'https://cdn-icons-png.flaticon.com/512/3393/3393948.png',
      },
      {
        id: 32,
        coin: 'DOT',
        imageUri: 'https://cdn-icons-png.flaticon.com/512/3393/3393948.png',
      },
      {
        id: 33,
        coin: 'QNT',
        imageUri: 'https://cdn-icons-png.flaticon.com/512/3393/3393948.png',
      },
    ],
    iconImage: {
      light: {
        active: require('../../../../assets/images/topMenu/Active/rootlink.png'),
        inactive: require('../../../../assets/images/topMenu/Inactive/rootlink.png'),
      },
      dark: {
        active: require('../../../../assets/images/topMenu/Dark/Active/rootlink.png'),
        inactive: require('../../../../assets/images/topMenu/Dark/Inactive/rootlink.png'),
      },
    },
    isActive: false,
  },
  {
    id: 4,
    icon: 'BB',
    name: 'BaseBlock',
    subMenuOptions: [
      {
        id: 41,
        coin: 'ADA',
        imageUri: 'https://cdn-icons-png.flaticon.com/512/3393/3393948.png',
      },
      {
        id: 42,
        coin: 'SOL',
        imageUri: 'https://cdn-icons-png.flaticon.com/512/3393/3393948.png',
      },
      {
        id: 43,
        coin: 'AVAX',
        imageUri: 'https://cdn-icons-png.flaticon.com/512/3393/3393948.png',
      },
    ],
    isActive: true,
    iconImage: {
      light: {
        active: require('../../../../assets/images/topMenu/Active/baseblock.png'),
        inactive: require('../../../../assets/images/topMenu/Inactive/baseblock.png'),
      },
      dark: {
        active: require('../../../../assets/images/topMenu/Dark/Active/baseblock.png'),
        inactive: require('../../../../assets/images/topMenu/Dark/Inactive/baseblock.png'),
      },
    },
  },
  {
    id: 5,
    icon: 'CC',
    name: 'CoreChain',
    subMenuOptions: [
      {
        id: 51,
        coin: 'NEAR',
        imageUri: 'https://cdn-icons-png.flaticon.com/512/3393/3393948.png',
      },
      {
        id: 52,
        coin: 'FTM',
        imageUri: 'https://cdn-icons-png.flaticon.com/512/3393/3393948.png',
      },
      {
        id: 53,
        coin: 'KAS',
        imageUri: 'https://cdn-icons-png.flaticon.com/512/3393/3393948.png',
      },
    ],
    isActive: false,
    iconImage: {
      light: {
        active: require('../../../../assets/images/topMenu/Active/corechain.png'),
        inactive: require('../../../../assets/images/topMenu/Inactive/corechain.png'),
      },
      dark: {
        active: require('../../../../assets/images/topMenu/Dark/Active/corechain.png'),
        inactive: require('../../../../assets/images/topMenu/Dark/Inactive/corechain.png'),
      },
    },
  },
  {
    id: 6,
    icon: 'XP',
    name: 'X Payments',
    subMenuOptions: [
      {
        id: 61,
        coin: 'XLM',
        imageUri: 'https://cdn-icons-png.flaticon.com/512/3393/3393948.png',
      },
      {
        id: 62,
        coin: 'ALGO',
        imageUri: 'https://cdn-icons-png.flaticon.com/512/3393/3393948.png',
      },
      {
        id: 63,
        coin: 'ETH3',
        imageUri: 'https://cdn-icons-png.flaticon.com/512/3393/3393948.png',
      },
    ],
    isActive: true,
    iconImage: {
      light: {
        active: require('../../../../assets/images/topMenu/Active/xpayments.png'),
        inactive: require('../../../../assets/images/topMenu/Inactive/xpayments.png'),
      },
      dark: {
        active: require('../../../../assets/images/topMenu/Dark/Active/xpayments.png'),
        inactive: require('../../../../assets/images/topMenu/Dark/Inactive/xpayments.png'),
      },
    },
  },
  {
    id: 7,
    icon: 'LSDs',
    name: 'LSDs',
    subMenuOptions: [
      {
        id: 71,
        coin: 'LDO',
        imageUri: 'https://cdn-icons-png.flaticon.com/512/3393/3393948.png',
      },
      {
        id: 72,
        coin: 'RPL',
        imageUri: 'https://cdn-icons-png.flaticon.com/512/3393/3393948.png',
      },
      {
        id: 73,
        coin: 'XRP',
        imageUri: 'https://cdn-icons-png.flaticon.com/512/3393/3393948.png',
      },
    ],
    isActive: false,
    iconImage: {
      light: {
        active: require('../../../../assets/images/topMenu/Active/lsds.png'),
        inactive: require('../../../../assets/images/topMenu/Inactive/lsds.png'),
      },
      dark: {
        active: require('../../../../assets/images/topMenu/Dark/Active/lsds.png'),
        inactive: require('../../../../assets/images/topMenu/Dark/Inactive/lsds.png'),
      },
    },
  },
  {
    id: 8,
    icon: 'BL',
    name: 'BoostLayer',
    subMenuOptions: [
      {
        id: 81,
        coin: 'MATIC',
        imageUri: 'https://cdn-icons-png.flaticon.com/512/3393/3393948.png',
      },
      {
        id: 82,
        coin: 'ARB',
        imageUri: 'https://cdn-icons-png.flaticon.com/512/3393/3393948.png',
      },
      {
        id: 83,
        coin: 'OP',
        imageUri: 'https://cdn-icons-png.flaticon.com/512/3393/3393948.png',
      },
    ],
    isActive: false,
    iconImage: {
      light: {
        active: require('../../../../assets/images/topMenu/Active/boostlayer.png'),
        inactive: require('../../../../assets/images/topMenu/Inactive/boostlayer.png'),
      },
      dark: {
        active: require('../../../../assets/images/topMenu/Dark/Active/boostlayer.png'),
        inactive: require('../../../../assets/images/topMenu/Dark/Inactive/boostlayer.png'),
      },
    },
  },
  {
    id: 9,
    icon: 'TN',
    name: 'TruthNodes',
    subMenuOptions: [
      {
        id: 91,
        coin: 'LINK',
        imageUri: 'https://cdn-icons-png.flaticon.com/512/3393/3393948.png',
      },
      {
        id: 92,
        coin: 'API3',
        imageUri: 'https://cdn-icons-png.flaticon.com/512/3393/3393948.png',
      },
      {
        id: 93,
        coin: 'BAND',
        imageUri: 'https://cdn-icons-png.flaticon.com/512/3393/3393948.png',
      },
    ],
    isActive: false,
    iconImage: {
      light: {
        active: require('../../../../assets/images/topMenu/Active/truthnodes.png'),
        inactive: require('../../../../assets/images/topMenu/Inactive/truthnodes.png'),
      },
      dark: {
        active: require('../../../../assets/images/topMenu/Dark/Active/truthnodes.png'),
        inactive: require('../../../../assets/images/topMenu/Dark/Inactive/truthnodes.png'),
      },
    },
  },
  {
    id: 10,
    icon: 'NT',
    name: 'NexTrade',
    subMenuOptions: [
      {
        id: 101,
        coin: 'UNI',
        imageUri: 'https://cdn-icons-png.flaticon.com/512/3393/3393948.png',
      },
      {
        id: 102,
        coin: 'SUSHI',
        imageUri: 'https://cdn-icons-png.flaticon.com/512/3393/3393948.png',
      },
      {
        id: 103,
        coin: 'CAKE',
        imageUri: 'https://cdn-icons-png.flaticon.com/512/3393/3393948.png',
      },
    ],
    isActive: false,
    iconImage: {
      light: {
        active: require('../../../../assets/images/topMenu/Active/nextrade.png'),
        inactive: require('../../../../assets/images/topMenu/Inactive/nextrade.png'),
      },
      dark: {
        active: require('../../../../assets/images/topMenu/Dark/Active/nextrade.png'),
        inactive: require('../../../../assets/images/topMenu/Dark/Inactive/nextrade.png'),
      },
    },
  },
  {
    id: 11,
    icon: 'CS',
    name: 'CycleSwap',
    subMenuOptions: [
      {
        id: 111,
        coin: 'DYDX',
        imageUri: 'https://cdn-icons-png.flaticon.com/512/3393/3393948.png',
      },
      {
        id: 112,
        coin: 'GMX',
        imageUri: 'https://cdn-icons-png.flaticon.com/512/3393/3393948.png',
      },
      {
        id: 113,
        coin: 'VELO',
        imageUri: 'https://cdn-icons-png.flaticon.com/512/3393/3393948.png',
      },
    ],
    isActive: false,
    iconImage: {
      light: {
        active: require('../../../../assets/images/topMenu/Active/cycleswap.png'),
        inactive: require('../../../../assets/images/topMenu/Inactive/cycleswap.png'),
      },
      dark: {
        active: require('../../../../assets/images/topMenu/Dark/Active/cycleswap.png'),
        inactive: require('../../../../assets/images/topMenu/Dark/Inactive/cycleswap.png'),
      },
    },
  },
  {
    id: 12,
    icon: 'DF',
    name: 'DiverseFi',
    subMenuOptions: [
      {
        id: 121,
        coin: 'AAVE',
        imageUri: 'https://cdn-icons-png.flaticon.com/512/3393/3393948.png',
      },
      {
        id: 122,
        coin: 'PENDLE',
        imageUri: 'https://cdn-icons-png.flaticon.com/512/3393/3393948.png',
      },
      {
        id: 123,
        coin: '1INCH',
        imageUri: 'https://cdn-icons-png.flaticon.com/512/3393/3393948.png',
      },
    ],
    isActive: false,
    iconImage: {
      light: {
        active: require('../../../../assets/images/topMenu/Active/diversefi.png'),
        inactive: require('../../../../assets/images/topMenu/Inactive/diversefi.png'),
      },
      dark: {
        active: require('../../../../assets/images/topMenu/Dark/Active/diversefi.png'),
        inactive: require('../../../../assets/images/topMenu/Dark/Inactive/diversefi.png'),
      },
    },
  },
  {
    id: 13,
    icon: 'IC',
    name: 'IntelliChain',
    subMenuOptions: [
      {
        id: 131,
        coin: 'OCEAN',
        imageUri: 'https://cdn-icons-png.flaticon.com/512/3393/3393948.png',
      },
      {
        id: 132,
        coin: 'FET',
        imageUri: 'https://cdn-icons-png.flaticon.com/512/3393/3393948.png',
      },
      {
        id: 133,
        coin: 'RNDR',
        imageUri: 'https://cdn-icons-png.flaticon.com/512/3393/3393948.png',
      },
    ],
    isActive: false,
    iconImage: {
      light: {
        active: require('../../../../assets/images/topMenu/Active/intellichain.png'),
        inactive: require('../../../../assets/images/topMenu/Inactive/intellichain.png'),
      },
      dark: {
        active: require('../../../../assets/images/topMenu/Dark/Active/intellichain.png'),
        inactive: require('../../../../assets/images/topMenu/Dark/Inactive/intellichain.png'),
      },
    },
  },
];

export default menuData;