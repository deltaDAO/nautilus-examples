import * as dotenv from 'dotenv'
import { LogLevel, Nautilus, AssetBuilder, FileTypes, ServiceTypes, ServiceBuilder, UrlFile, ConsumerParameterBuilder } from '@deltadao/nautilus'
import { Network, NETWORK_CONFIG, PRICING_CONFIG } from './config'
import { Wallet, providers } from 'ethers'
dotenv.config()

// load config based on selected network
if (!process.env.NETWORK) {
    throw new Error(`Set your networn in the .env file. Supported networks are ${Object.values(Network).join(', ')}.`);
}
const selectedEnvNetwork = (process.env.NETWORK).toUpperCase()
if (!(selectedEnvNetwork in Network)) {
    throw new Error(`Invalid network selection: ${selectedEnvNetwork}. Supported networks are ${Object.values(Network).join(', ')}.`);
}
console.log(`Your selected NETWORK is ${Network[selectedEnvNetwork]}`)
const networkConfig = NETWORK_CONFIG[selectedEnvNetwork]
const pricingConfig = PRICING_CONFIG[selectedEnvNetwork]

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
    await publishAccessDataset(nautilus)
    await publishComputeDataset(nautilus)
    await publishComputeAlgorithm(nautilus)

    // DOWNLOAD DATA
    // await access(nautilus)

    // COMPUTE FLOW
    // const computeJob = await compute(nautilus)
    // await getComputeStatus(nautilus, computeJob.jobId)

    // RETRIEVE RESULTS
    //await retrieveComputeResult(nautilus, computeJob.jobId)

}

async function publishAccessDataset(nautilus: Nautilus) {
    const owner = await wallet.getAddress()
    console.log(`Your address is ${owner}`)

    const serviceBuilder = new ServiceBuilder(ServiceTypes.ACCESS, FileTypes.URL) // access type dataset with URL data source

    const urlFile: UrlFile = {
        type: 'url', // there are multiple supported data source types, see https://docs.oceanprotocol.com/developers/storage
        url: 'https://www.delta-dao.com/.well-known/did.json', // link to your file or api
        method: 'GET', // HTTP request method
        // headers: {
        //     Authorization: 'Basic XXX' // optional headers field e.g. for basic access control
        // }
    }

    const service = serviceBuilder
        .setServiceEndpoint(networkConfig.providerUri)
        .setTimeout(86400)
        .addFile(urlFile)
        .setPricing(pricingConfig.FREE)
        .setDatatokenNameAndSymbol('My Datatoken Name', 'SYMBOL') // important for following access token transactions in the explorer
        .build()

    const assetBuilder = new AssetBuilder()
    const asset = assetBuilder
        .setType('dataset')
        .setName('Access Dataset Name')
        .setDescription('Access Dataset Description (supports Markdown)')
        .setAuthor('Company Name')
        .setLicense('MIT')
        .addService(service)
        .setOwner(owner)
        .build()

    const result = await nautilus.publish(asset)
    console.log(result)
}

async function publishComputeDataset(nautilus: Nautilus) {
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
        url: 'https://www.delta-dao.com/.well-known/did.json', // link to your file or api
        method: 'GET',
        // headers: {
        //     Authorization: 'Basic XXX' // optional headers field e.g. for basic access control
        // }
    }

    const service = serviceBuilder
        .setServiceEndpoint(networkConfig.providerUri)
        .setTimeout(86400)
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

async function publishComputeAlgorithm(nautilus: Nautilus) {
    const owner = await wallet.getAddress()
    console.log(`Your address is ${owner}`)

    const serviceBuilder = new ServiceBuilder(ServiceTypes.COMPUTE, FileTypes.URL)

    const urlFile: UrlFile = {
        type: 'url',
        url: 'https://raw.githubusercontent.com/deltaDAO/files/main/demo.js', // link to your algorithm logic, will be run using the defined conatainer
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
        container: { // https://hub.docker.com/layers/library/node/18.17.1/images/sha256-91e37377b960d0b15d3c15d15321084163bc8d950e14f77bbc84ab23cf3d6da7?context=explore
            entrypoint: 'node $ALGO',
            image: 'node',
            tag: '18.17.1',
            checksum: 'sha256:91e37377b960d0b15d3c15d15321084163bc8d950e14f77bbc84ab23cf3d6da7'
        }
    }

    const assetBuilder = new AssetBuilder()

    const asset = assetBuilder
        .setType('algorithm')
        .setName('Compute Algorithm Name')
        .setDescription('Compute Algorithm description (supports Markdown)') // supports markdown
        .setAuthor('Your Company Name')
        .setLicense('MIT')
        .setAlgorithm(algoMetadata)
        .addService(service)
        .setOwner(owner)
        .build()

    const result = await nautilus.publish(asset)
    console.log(result)
}

async function compute(nautilus: Nautilus) {
    console.log(`Your address is ${await wallet.getAddress()}`)

    const dataset = {
        did: 'did:op:1c96f7ff7e98f9a3fe271a6e59db4b28b9730c955f6ddf3c7bec5632ef90986a', // any 'compute' dataset
        // userdata: { // optional 
        //     myNumberParam: 8
        // }
    }

    const algorithm = {
        did: 'did:op:b39190deee2d92b74a02fbb01381599ae03b6630ceec362339a136c8fe1e413e', // any 'compute' algorithm allowed to be run on the given dataset (needs to be whitelisted on the dataset)
    }

    const computeConfig = {
        dataset,
        algorithm
    }

    const computeJob = await nautilus.compute(computeConfig)
    console.log('COMPUTE JOB: ', computeJob)
    return Array.isArray(computeJob) ? computeJob[0] : computeJob
}

async function access(nautilus: Nautilus) {

    const accessUrl = await nautilus.access({
        assetDid: 'did:op:7c2024f5f09a5837c3ce060531d59348fee296dc643bcb3e6dc89860672c3db8'
    })
    console.log('Download URL: ', accessUrl)
}

async function retrieveComputeResult(nautilus: Nautilus, jobId?: string) {
    const computeResult = await nautilus.getComputeResult({
        jobId: jobId || '38d3ab56002844ac92fd72803129654b',
        providerUri: networkConfig.providerUri
    })
    console.log('Compute Result URL: ', computeResult)
}

async function getComputeStatus(nautilus: Nautilus, jobId?: string) {
    const computeJobStatus = await nautilus.getComputeStatus({
        jobId: jobId || 'bfd2eb0418c44a229d8346d66e3384bd',
        providerUri: networkConfig.providerUri
    })
    console.log('Compute Job Status: ', computeJobStatus)
}

main()