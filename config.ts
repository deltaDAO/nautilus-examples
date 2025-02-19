import { PricingConfigWithoutOwner } from '@deltadao/nautilus'

export enum Network {
  GENX = 'GENX',
  PONTUSXDEV = 'PONTUSXDEV',
  PONTUSXTEST = 'PONTUSXTEST',
  OASISSAPPHIRE = 'OASISSAPPHIRE' // Production MVP config
}

export const NETWORK_CONFIGS: {
  [key in Network]: NetworkConfig
} = {
  [Network.GENX]: {
    chainId: 100,
    network: 'genx',
    metadataCacheUri: 'https://aquarius510.v4.delta-dao.com',
    nodeUri: 'https://rpc.genx.minimal-gaia-x.eu',
    providerUri: 'https://provider.v4.genx.delta-dao.com',
    subgraphUri: 'https://subgraph.v4.genx.minimal-gaia-x.eu',
    oceanTokenAddress: '0x0995527d3473b3a98c471f1ed8787acd77fbf009',
    oceanTokenSymbol: 'OCEAN',
    fixedRateExchangeAddress: '0xAD8E7d2aFf5F5ae7c2645a52110851914eE6664b',
    dispenserAddress: '0x94cb8FC8719Ed09bE3D9c696d2037EA95ef68d3e',
    nftFactoryAddress: '0x6cb85858183B82154921f68b434299EC4281da53',
    providerAddress: '0x68C24FA5b2319C81b34f248d1f928601D2E5246B'
  },
  [Network.PONTUSXDEV]: {
    chainId: 32456,
    network: 'pontusxdev',
    metadataCacheUri: 'https://aquarius.pontus-x.eu',
    nodeUri: 'https://rpc.dev.pontus-x.eu',
    providerUri: 'https://provider.dev.pontus-x.eu',
    subgraphUri: 'https://subgraph.dev.pontus-x.eu',
    oceanTokenAddress: '0xdF171F74a8d3f4e2A789A566Dce9Fa4945196112',
    oceanTokenSymbol: 'OCEAN',
    fixedRateExchangeAddress: '0x8372715D834d286c9aECE1AcD51Da5755B32D505',
    dispenserAddress: '0x5461b629E01f72E0A468931A36e039Eea394f9eA',
    nftFactoryAddress: '0xFdC4a5DEaCDfc6D82F66e894539461a269900E13',
    providerAddress: '0x68C24FA5b2319C81b34f248d1f928601D2E5246B'
  },[Network.PONTUSXTEST]: {
    chainId: 32457,
    network: 'pontusxtest',
    metadataCacheUri: 'https://aquarius.pontus-x.eu',
    nodeUri: 'https://rpc.test.pontus-x.eu',
    providerUri: 'https://provider.test.pontus-x.eu',
    subgraphUri: 'https://subgraph.test.pontus-x.eu',
    oceanTokenAddress: '0x5B190F9E2E721f8c811E4d584383E3d57b865C69',
    oceanTokenSymbol: 'OCEAN',
    fixedRateExchangeAddress: '0xcE0F39abB6DA2aE4d072DA78FA0A711cBB62764E',
    dispenserAddress: '0xaB5B68F88Bc881CAA427007559E9bbF8818026dE',
    nftFactoryAddress: '0x2C4d542ff791890D9290Eec89C9348A4891A6Fd2',
    providerAddress: '0x9546d39CE3E48BC942f0be4AA9652cBe0Aff3592'
  },
  [Network.OASISSAPPHIRE]: { // Production MVP config
    chainId: 23294,
    network: 'oasis_sapphire',
    metadataCacheUri: 'https://aquarius.main.pontus-x.eu',
    nodeUri: 'https://rpc.main.pontus-x.eu/0953a56072a9a7ca46f57498453d2b3d',
    providerUri: 'https://provider.main.pontus-x.eu',
    subgraphUri: 'https://subgraph.main.pontus-x.eu',
    oceanTokenAddress: '0x39d22B78A7651A76Ffbde2aaAB5FD92666Aca520',
    oceanTokenSymbol: 'OCEAN',
    fixedRateExchangeAddress: '0xE0a3fd09646dDA15f119b6Ad9Fcd1A110c432e1E',
    dispenserAddress: '0x9B7d696023Cf6f7Fbc8B7F4a9cEaACC46d7E9A24',
    nftFactoryAddress: '0x2b4E0fA953Ac6f762cb0cC6736d257a0509C9f9B',
    providerAddress: '0x566c1Bd445392Fd3bCd7D7D8D63dd0d8f3B14571'
  },
}

// These are example pricing configurations with prefilled contract addresses of the payment tokens
export const PRICING_CONFIGS: PricingConfig = {
  [Network.GENX]: {
    FREE: {
      type: 'free'
    },
    FIXED_OCEAN: {
      type: 'fixed',
      freCreationParams: {
        fixedRateAddress: '0xAD8E7d2aFf5F5ae7c2645a52110851914eE6664b',
        baseTokenAddress: '0x0995527d3473b3a98c471f1ed8787acd77fbf009',
        baseTokenDecimals: 18,
        datatokenDecimals: 18,
        fixedRate: '1',
        marketFee: '0',
        marketFeeCollector: '0x0000000000000000000000000000000000000000'
      }
    },
    FIXED_EUROE: {
      type: 'fixed',
      freCreationParams: {
        fixedRateAddress: '0xAD8E7d2aFf5F5ae7c2645a52110851914eE6664b',
        baseTokenAddress: '0xe974c4894996E012399dEDbda0bE7314a73BBff1',
        baseTokenDecimals: 6, // adapted for EUROe decimals
        datatokenDecimals: 18,
        fixedRate: '1', // this is the price
        marketFee: '0',
        marketFeeCollector: '0x0000000000000000000000000000000000000000'
      }
    }
  },
  [Network.PONTUSXDEV]: {
    FREE: {
      type: 'free'
    },
    FIXED_OCEAN: {
      type: 'fixed',
      freCreationParams: {
        fixedRateAddress: '0x8372715D834d286c9aECE1AcD51Da5755B32D505',
        baseTokenAddress: '0xdF171F74a8d3f4e2A789A566Dce9Fa4945196112',
        baseTokenDecimals: 18,
        datatokenDecimals: 18,
        fixedRate: '1', // this is the price
        marketFee: '0',
        marketFeeCollector: '0x0000000000000000000000000000000000000000'
      }
    },
    FIXED_EUROE: {
      type: 'fixed',
      freCreationParams: {
        fixedRateAddress: '0x8372715D834d286c9aECE1AcD51Da5755B32D505',
        baseTokenAddress: '0x8A4826071983655805bF4f29828577Cd6b1aC0cB',
        baseTokenDecimals: 18, // adapted for EUROe decimals
        datatokenDecimals: 18,
        fixedRate: '1', // this is the price
        marketFee: '0',
        marketFeeCollector: '0x0000000000000000000000000000000000000000'
      }
    }
  },
  [Network.PONTUSXTEST]: {
    FREE: {
      type: 'free'
    },
    FIXED_OCEAN: {
      type: 'fixed',
      freCreationParams: {
        fixedRateAddress: '0xcE0F39abB6DA2aE4d072DA78FA0A711cBB62764E',
        baseTokenAddress: '0x5B190F9E2E721f8c811E4d584383E3d57b865C69',
        baseTokenDecimals: 18,
        datatokenDecimals: 18,
        fixedRate: '1', // this is the price
        marketFee: '0',
        marketFeeCollector: '0x0000000000000000000000000000000000000000'
      }
    },
    FIXED_EUROE: {
      type: 'fixed',
      freCreationParams: {
        fixedRateAddress: '0xcE0F39abB6DA2aE4d072DA78FA0A711cBB62764E',
        baseTokenAddress: '0xdd0a0278f6BAF167999ccd8Aa6C11A9e2fA37F0a',
        baseTokenDecimals: 6, // adapted for EUROe decimals
        datatokenDecimals: 18,
        fixedRate: '1', // this is the price
        marketFee: '0',
        marketFeeCollector: '0x0000000000000000000000000000000000000000'
      }
    },
    FIXED_LOGGING: {
      type: 'fixed',
      freCreationParams: {
        fixedRateAddress: '0xcE0F39abB6DA2aE4d072DA78FA0A711cBB62764E',
        baseTokenAddress: '0x300Dad6baD13ab3d4d44Ac7102a4f25c14cc1e82',
        baseTokenDecimals: 18,
        datatokenDecimals: 18,
        fixedRate: '1', // this is the price
        marketFee: '0',
        marketFeeCollector: '0x0000000000000000000000000000000000000000'
      }
    }
  },
  [Network.OASISSAPPHIRE]: { // Production MVP config
    FREE: {
      type: 'free'
    },
    FIXED_LOGGING: {
      type: 'fixed',
      freCreationParams: {
        fixedRateAddress: '0xE0a3fd09646dDA15f119b6Ad9Fcd1A110c432e1E',
        baseTokenAddress: '0x431aE822B6D59cc96dA181dB632396f58932dA9d',
        baseTokenDecimals: 18,
        datatokenDecimals: 18,
        fixedRate: '2.95', // this is the price in PTX logging token, ONLY CHANGE THIS VALUE TO ADJUST THE PRICE
        marketFee: '0',
        marketFeeCollector: '0x0000000000000000000000000000000000000000'
      }
    }
  }
}

export type NetworkConfig = {
  chainId: number
  network: string
  metadataCacheUri: string
  nodeUri: string
  providerUri: string
  subgraphUri: string
  oceanTokenAddress: string
  oceanTokenSymbol: string
  fixedRateExchangeAddress: string
  dispenserAddress: string
  nftFactoryAddress: string
  providerAddress?: string
  explorerUri?: string
  startBlock?: number
  transactionBlockTimeout?: number
  transactionConfirmationBlocks?: number
  transactionPollingTimeout?: number
  gasFeeMultiplier?: number
  opfCommunityFeeCollector?: string
  veAllocate?: string
  veOCEAN?: string
  veDelegation?: string
  veFeeDistributor?: string
  veDelegationProxy?: string
  DFRewards?: string
  DFStrategyV1?: string
  veFeeEstimate?: string
  sdk?: string
}

export type PricingConfig = {
  [key in Network]: {
    [key: string]: PricingConfigWithoutOwner
  }
}
