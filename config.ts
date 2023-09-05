import { PricingConfigWithoutOwner } from '@deltadao/nautilus'

export enum Network {
  PONTUSX = 'PONTUSX',
  MUMBAI = 'MUMBAI',
}

export const NETWORK_CONFIGS = {
  [Network.PONTUSX]: {
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
    providerAddress: '0x68C24FA5b2319C81b34f248d1f928601D2E5246B',
  } as NetworkConfig,
  [Network.MUMBAI]: {
    chainId: 80001,
    network: 'mumbai',
    metadataCacheUri: 'https://v4.aquarius.oceanprotocol.com',
    nodeUri: 'https://rpc-mumbai.maticvigil.com',
    providerUri: 'https://v4.provider.oceanprotocol.com',
    subgraphUri: 'https://v4.subgraph.mumbai.oceanprotocol.com',
    explorerUri: 'https://mumbai.polygonscan.com',
    oceanTokenAddress: '0xd8992Ed72C445c35Cb4A2be468568Ed1079357c8',
    oceanTokenSymbol: 'OCEAN',
    fixedRateExchangeAddress: '0x25e1926E3d57eC0651e89C654AB0FA182C6D5CF7',
    dispenserAddress: '0x21bc18b92F7551e715B490E2C2875E8532317F8d',
    startBlock: 26354458,
    transactionBlockTimeout: 50,
    transactionConfirmationBlocks: 1,
    transactionPollingTimeout: 750,
    gasFeeMultiplier: 1.1,
    nftFactoryAddress: '0x7d46d74023507D30ccc2d3868129fbE4e400e40B',
    opfCommunityFeeCollector: '0xd8839c98ca8CE07dDa4e460a71B634A4A82f8BD6',
    veAllocate: '0x3fa1d5AC45ab1Ff9CFAe227c5583Ec0484b54Ef9',
    veOCEAN: '0x061955B6980A34fce74b235f90DBe20d76f087b1',
    veDelegation: '0x96E3aE4247a01C3d40a261df1F8ead70E32E7C0c',
    veFeeDistributor: '0x35F1e6765750E874EB9d0675393A1A394A4749b4',
    veDelegationProxy: '0x51B1b14b8bfb43a2fB0b49843787Ca440200F6b7',
    DFRewards: '0x4259c164eedA7483dda2b4b622D761A88674D31f',
    DFStrategyV1: '0x1be9C72500B41c286C797D4FE727747Ae9C4E195',
    veFeeEstimate: '0xCFeF55c6ae4d250586e293f29832967a04A9087d',
  } as NetworkConfig,
}

// These are example pricing configurations with prefilled contract addresses of the payment tokens
export const PRICING_CONFIGS: PricingConfig = {
  [Network.PONTUSX]: {
    FREE: {
      type: 'free',
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
        marketFeeCollector: '0x0000000000000000000000000000000000000000',
      },
    },
    FIXED_EUROE: {
      type: 'fixed',
      freCreationParams: {
        fixedRateAddress: '0xAD8E7d2aFf5F5ae7c2645a52110851914eE6664b',
        baseTokenAddress: '0xe974c4894996E012399dEDbda0bE7314a73BBff1',
        baseTokenDecimals: 6, // adapted for EUROe decimals
        datatokenDecimals: 18,
        fixedRate: '1',
        marketFee: '0',
        marketFeeCollector: '0x0000000000000000000000000000000000000000',
      },
    },
  },
  [Network.MUMBAI]: {
    FREE: {
      type: 'free',
    },
    FIXED_OCEAN: {
      type: 'fixed',
      freCreationParams: {
        fixedRateAddress: '0x25e1926E3d57eC0651e89C654AB0FA182C6D5CF7',
        baseTokenAddress: '0xd8992Ed72C445c35Cb4A2be468568Ed1079357c8',
        baseTokenDecimals: 18,
        datatokenDecimals: 18,
        fixedRate: '1',
        marketFee: '0',
        marketFeeCollector: '0x0000000000000000000000000000000000000000',
      },
    },
    FIXED_EUROE: {
      type: 'fixed',
      freCreationParams: {
        fixedRateAddress: '0x25e1926E3d57eC0651e89C654AB0FA182C6D5CF7',
        baseTokenAddress: '0xA089a21902914C3f3325dBE2334E9B466071E5f1',
        baseTokenDecimals: 6, // adapted for EUROe decimals
        datatokenDecimals: 18,
        fixedRate: '1',
        marketFee: '0',
        marketFeeCollector: '0x0000000000000000000000000000000000000000',
      },
    },
  },
}

export type NetworkConfig = {
  chainId: number;
  network: string;
  metadataCacheUri: string;
  nodeUri: string;
  providerUri: string;
  subgraphUri: string;
  oceanTokenAddress: string;
  oceanTokenSymbol: string;
  fixedRateExchangeAddress: string;
  dispenserAddress: string;
  nftFactoryAddress: string;
  providerAddress: string;
  explorerUri?: string;
  startBlock?: number;
  transactionBlockTimeout?: number;
  transactionConfirmationBlocks?: number;
  transactionPollingTimeout?: number;
  gasFeeMultiplier?: number;
  opfCommunityFeeCollector?: string;
  veAllocate?: string;
  veOCEAN?: string;
  veDelegation?: string;
  veFeeDistributor?: string;
  veDelegationProxy?: string;
  DFRewards?: string;
  DFStrategyV1?: string;
  veFeeEstimate?: string;
}

export type PricingConfig = {
  [key in Network]: {
    [key: string]: PricingConfigWithoutOwner;
  };
};