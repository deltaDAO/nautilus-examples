import { Nautilus, AssetBuilder, ConsumerParameterBuilder, CredentialListTypes, ServiceBuilder  } from '@deltadao/nautilus' 

export async function editServiceOffering(nautilus: Nautilus) {
    const aquariusAsset = await nautilus.getAquariusAsset(
        `did:op:0ddfc4a836acf1c3722ec60489629f3dfd9e0f82c30677a31395afb48cef95e0` // Change DID if needed
    )
    
    const assetBuilder = new AssetBuilder(aquariusAsset)

    // Example: adding consumerParameters via edit
    // const consumerParameterBuidler = new ConsumerParameterBuilder()
    // const parameter = consumerParameterBuidler.setType('text')
    //     .setName('testParam')
    //     .setDescription('a test parameter')
    //     .setDefault('value')
    //     .setLabel('Test Parameter')
    //     .setRequired(false)
    //     .build()

    // const asset = assetBuilder
    //     .setAlgorithm({
    //         ...aquariusAsset.metadata.algorithm, // Start with existing algorithm metadata
    //         // consumerParameters: [...aquariusAsset.metadata.algorithm.consumerParameters, parameter], // Example: adding new consumerParameters via edit
    //         container: { // Update container information
    //             entrypoint: 'node $ALGO',
    //             image: 'node',
    //             tag: 'lts',
    //             checksum: 'sha256:a6faa1aa0ae1981b70c075dd6ea0a1725a1d05a4cab85536460ae4e4710e8331'
    //         }
    //     })


    // Updating trusted algorithms on a service
    const serviceBuilder = new ServiceBuilder({ aquariusAsset, serviceId: aquariusAsset.services[0].id })
    const service = serviceBuilder
        //.addTrustedAlgorithmPublisher('0x28080F654eED6CC00e8b16F4841E92CD0c2C0778')
        .build()

    const asset = assetBuilder.addService(service)
        .build()
    
    // Temporary Workaround
    // TODO: remove workaround once fixed
    //@ts-ignore
    asset.ddo.ddo.services[0].compute = {
        allowNetworkAccess: false,
        allowRawAlgorithm: false,
        publisherTrustedAlgorithmPublishers: [  
            '0x28080F654eED6CC00e8b16F4841E92CD0c2C0778' // this needs to be set correctly
        ],
        publisherTrustedAlgorithms: []
    }

    const result = await nautilus.edit(asset)

    console.log('Edit complete:', result)
}