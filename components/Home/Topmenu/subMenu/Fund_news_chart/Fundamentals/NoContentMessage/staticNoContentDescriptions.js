const no_content_messages = [
  {
    coin: 'xlm',
    message:
      "While currently there aren't any documented dapps built directly on Stellar, the network fosters a rich ecosystem of partnerships with various projects.",
  },
  {
    coin: 'fxs',
    message:
      "While currently there aren't any documented dApps built directly on Frax Finance, the network fosters a rich ecosystem of partnerships with various projects.",
  },
  {
    coin: 'ldo',
    message:
      "While currently there aren't any documented dapps built directly on Lido DAO the network fosters a rich ecosystem of partnerships with various projects.",
  },
  {
    coin: 'rpl',
    message:
      "While currently there aren't any documented dapps built directly on Rocket Pool, the network fosters a rich ecosystem of partnerships with various projects.",
  },
  {
    coin: 'fet',
    message:
      'There is no information regarding the dapps that are developed in Fetch.AI.',
  },
  {
    coin: 'rndr',
    message:
      "While Render Network doesn't directly host or develop dapps itself, it plays a crucial role in enabling and supporting the development and execution of decentralised applications requiring intensive GPU processing power.",
  },
];

const findMessageByCoin = coin => {
  let found = null;
  found = no_content_messages.find(item => item.coin === coin);

  return found && found !== undefined ? found.message : null;
};

export {no_content_messages, findMessageByCoin};
