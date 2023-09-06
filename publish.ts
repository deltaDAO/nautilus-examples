import {
  AssetBuilder,
  ConsumerParameterBuilder,
  FileTypes,
  Nautilus,
  ServiceBuilder,
  ServiceTypes,
  UrlFile
} from '@deltadao/nautilus'
import { NetworkConfig } from 'config'
import { Wallet } from 'ethers'

export async function publishAccessDataset(
  nautilus: Nautilus,
  networkConfig: NetworkConfig,
  pricingConfig: any,
  wallet: Wallet
) {
  const owner = await wallet.getAddress()
  console.log(`Your address is ${owner}`)

  const serviceBuilder = new ServiceBuilder(ServiceTypes.ACCESS, FileTypes.URL) // access type dataset with URL data source

  const urlFile: UrlFile = {
    type: 'url', // there are multiple supported data source types, see https://docs.oceanprotocol.com/developers/storage
    url: 'https://raw.githubusercontent.com/deltaDAO/nautilus-examples/main/example_publish_assets/example-dataset.json', // link to your file or api
    method: 'GET' // HTTP request method
    // headers: {
    //     Authorization: 'Basic XXX' // optional headers field e.g. for basic access control
    // }
  }

  const service = serviceBuilder
    .setServiceEndpoint(networkConfig.providerUri)
    .setTimeout(60)
    .addFile(urlFile)
    .setPricing(pricingConfig.FREE)
    .setDatatokenNameAndSymbol('My Datatoken Name', 'SYMBOL') // important for following access token transactions in the explorer
    .build()

  const assetBuilder = new AssetBuilder()
  const asset = assetBuilder
    .setType('dataset')
    .setName('Access Dataset Name')
    .setDescription('Access Dataset Description')
    .setAuthor('Company Name')
    .setLicense('MIT')
    .addService(service)
    .setOwner(owner)
    .build()

  const result = await nautilus.publish(asset)
  console.log(result)
}

export async function publishComputeDataset(
  nautilus: Nautilus,
  networkConfig: NetworkConfig,
  pricingConfig: any,
  wallet: Wallet
) {
  const owner = await wallet.getAddress()
  console.log(`Your address is ${owner}`)

  const consumerParameterBuilder = new ConsumerParameterBuilder() // optional

  const cunsumerParameter = consumerParameterBuilder // optional
    .setType('number')
    .setName('myNumberParam')
    .setLabel('My Param Label')
    .setDescription('A description of my param for the enduser.')
    .setDefault('5')
    .setRequired(false)
    .build()

  const serviceBuilder = new ServiceBuilder(ServiceTypes.COMPUTE, FileTypes.URL) // compute type dataset with URL data source

  const urlFile: UrlFile = {
    type: 'url',
    url: 'https://raw.githubusercontent.com/deltaDAO/nautilus-examples/main/example_publish_assets/example-dataset.json', // link to your file or api
    method: 'GET'
    // headers: {
    //     Authorization: 'Basic XXX' // optional headers field e.g. for basic access control
    // }
  }

  const service = serviceBuilder
    .setServiceEndpoint(networkConfig.providerUri)
    .setTimeout(60)
    .addFile(urlFile)
    .setPricing(pricingConfig.FREE)
    .setDatatokenNameAndSymbol('My Datatoken Name', 'SYMBOL') // important for following access token transactions in the explorer
    .addConsumerParameter(cunsumerParameter) // optional
    .build()

  const assetBuilder = new AssetBuilder()
  const asset = assetBuilder
    .setType('dataset')
    .setName('Compute Dataset Name')
    .setDescription('Compute Dataset Description (supports Markdown)')
    .setAuthor('Company Name')
    .setLicense('MIT')
    .addService(service)
    .setOwner(owner)
    .build()

  const result = await nautilus.publish(asset)
  console.log(result)
}

export async function publishComputeAlgorithm(
  nautilus: Nautilus,
  networkConfig: NetworkConfig,
  pricingConfig: any,
  wallet: Wallet
) {
  const owner = await wallet.getAddress()
  console.log(`Your address is ${owner}`)

  const serviceBuilder = new ServiceBuilder(ServiceTypes.COMPUTE, FileTypes.URL)

  const urlFile: UrlFile = {
    type: 'url',
    url: 'https://raw.githubusercontent.com/deltaDAO/nautilus-examples/main/example_publish_assets/count-lines-algorithm.js', // link to your algorithm logic, will be run using the defined conatainer
    method: 'GET'
  }

  const service = serviceBuilder
    .setServiceEndpoint(networkConfig.providerUri)
    .setTimeout(86400)
    .addFile(urlFile)
    .setPricing(pricingConfig.FIXED_OCEAN)
    .setDatatokenNameAndSymbol('My Datatoken Name', 'SYMBOL')
    .build()

  const algoMetadata = {
    language: 'Node.js',
    version: '1.0.0',
    container: {
      // https://hub.docker.com/layers/library/node/18.17.1/images/sha256-91e37377b960d0b15d3c15d15321084163bc8d950e14f77bbc84ab23cf3d6da7?context=explore
      entrypoint: 'node $ALGO',
      image: 'node',
      tag: '18.17.1',
      checksum:
        'sha256:91e37377b960d0b15d3c15d15321084163bc8d950e14f77bbc84ab23cf3d6da7'
    }
  }

  const assetBuilder = new AssetBuilder()

  const asset = assetBuilder
    .setType('algorithm')
    .setName('Compute Algorithm Name')
    .setDescription(`Your description`) // supports markdown
    .setAuthor('Your Company Name')
    .setLicense('MIT')
    .setAlgorithm(algoMetadata)
    .addService(service)
    .setOwner(owner)
    .build()

  const result = await nautilus.publish(asset)
  console.log(result)
}
