import * as dotenv from 'dotenv'
import { LogLevel, Nautilus } from '@deltadao/nautilus'
import { Network, NETWORK_CONFIGS, PRICING_CONFIGS } from './config'
import { Wallet, providers } from 'ethers'
import { access } from './access'
import { compute, getComputeStatus, retrieveComputeResult } from './compute'
import {
  publishAccessDataset,
  publishComputeAlgorithm,
  publishComputeDataset,
} from './publish'
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
  await publishAccessDataset(nautilus, networkConfig, pricingConfig, wallet)
  await publishComputeDataset(nautilus, networkConfig, pricingConfig, wallet)
  await publishComputeAlgorithm(nautilus, networkConfig, pricingConfig, wallet)

  // DOWNLOAD DATA
  //await access(nautilus)

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
