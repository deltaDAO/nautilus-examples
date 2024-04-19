import * as dotenv from 'dotenv'
import { LogLevel, Nautilus } from '@deltadao/nautilus'
import { Network, NETWORK_CONFIGS, PRICING_CONFIGS } from './config'
import { Wallet, providers } from 'ethers'
import { access } from './access'
import { compute, getComputeStatus, retrieveComputeResult } from './compute'
import {
  publishAccessDataset,
  publishComputeAlgorithm,
  publishComputeDataset
} from './publish'
import { editAlgoMetadata, editServicePrice, editToSaas, editTrustedAlgorithms, revokeAsset } from './edit'
dotenv.config()

// load config based on selected network
if (!process.env.NETWORK) {
  throw new Error(
    `Set your networn in the .env file. Supported networks are ${Object.values(
      Network
    ).join(', ')}.`
  )
}
const selectedEnvNetwork = process.env.NETWORK.toUpperCase()
if (!(selectedEnvNetwork in Network)) {
  throw new Error(
    `Invalid network selection: ${selectedEnvNetwork}. Supported networks are ${Object.values(
      Network
    ).join(', ')}.`
  )
}
console.log(`Your selected NETWORK is ${Network[selectedEnvNetwork]}`)
const networkConfig = NETWORK_CONFIGS[selectedEnvNetwork]
const pricingConfig = PRICING_CONFIGS[selectedEnvNetwork]

// Setting up ethers wallet
const privateKey = process.env.PRIVATE_KEY as string // make sure to setup your PRIVATE_KEY in .env file
const provider = new providers.JsonRpcProvider(networkConfig.nodeUri)
const wallet = new Wallet(privateKey, provider)

async function main() {
  Nautilus.setLogLevel(LogLevel.Verbose) // optional to show more nautilus internal logs
  const nautilus = await Nautilus.create(wallet, networkConfig)

  /* ℹ️ comment in/out whatever you want to test
    (adding or removing "//" at the beginning of the line) ℹ️ */

  // PUBLISH FUNCTIONS
  // await publishAccessDataset(nautilus, networkConfig, pricingConfig, wallet)
  // await publishComputeDataset(nautilus, networkConfig, pricingConfig, wallet)
  // await publishComputeAlgorithm(nautilus, networkConfig, pricingConfig, wallet)

  // EDIT SERVICE OFFERING
  // await editServicePrice(
  //   nautilus, 
  //   'did:op:28f9071186903265bb4426b6f1f644cd3ab32714a04a2644c4947de2be424a77', // change this as needed to your asset DID
  //   '2' // the new price
  // )
  // await editTrustedAlgorithms(
  //   nautilus, 
  //   'did:op:a44101519ef6f4cf5011139ee7b0ae775140dbe54d0355e2f6518b55b0942f4b', // change this as needed to your asset DID
  //   ['did:op:28f9071186903265bb4426b6f1f644cd3ab32714a04a2644c4947de2be424a77'], // array of trusted algorithms
  //   [] // alternatively use this as an array of trusted publisher addresses
  // )
  // await editToSaas(
  //   nautilus, 
  //   'did:op:e6a84ccb4b9423c451018cc0aeb02805c5cb1cf764d2dfa14bb1c092181aed74', // change this as needed to your asset DID
  //   'https://nautilus.delta-dao.com', // redirect URL for your Saas
  //   'payperuse' // payment mode (either 'payperuse' or 'subscription')
  // )
  // await editAlgoMetadata(
  //   nautilus,
  //   'did:op:28f9071186903265bb4426b6f1f644cd3ab32714a04a2644c4947de2be424a77', // change this as needed to your asset DID
  //   '18.17.1', // container image tag
  //   'sha256:91e37377b960d0b15d3c15d15321084163bc8d950e14f77bbc84ab23cf3d6da7' // container image checksum
  // )
  // await revokeAsset(
  //   nautilus,
  //   'did:op:0f54c5c7a4dd9e4bb86330996b80b962c47c25efcf42df2da500bc636f75ea31' // change this as needed to your asset DID
  // )

  // DOWNLOAD DATA
  // const userdata = {
  //   key: 'value',
  //   key1: 'value',
  //   key2: 'value'
  // }
  // await access(nautilus, 'did:op:...', userdata)

  // COMPUTE FLOW
  // const computeJob = await compute(nautilus)
  // await getComputeStatus(nautilus, networkConfig.providerUri, computeJob.jobId)

  // RETRIEVE RESULTS
  // await retrieveComputeResult(
  //   nautilus,
  //   networkConfig.providerUri,
  //   computeJob.jobId
  // )
}

main()
