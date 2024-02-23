import { Nautilus, AssetBuilder, ConsumerParameterBuilder, CredentialListTypes, ServiceBuilder  } from '@deltadao/nautilus' 

export async function editServiceOffering(nautilus: Nautilus) {
    const aquariusAsset = await nautilus.getAquariusAsset(
        `did:op:c7ce4d1ceccb2131d6fbe80592d4d76301d108ee3f003161434f051b41317440` // Change DID if needed
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
    const service = serviceBuilder.addTrustedAlgorithmPublisher('0x9c26685b6E8e2997d9aAf3f1a642f1b1b3dB9580')
        .build()
    const asset = assetBuilder.addService(service)
        .build()

    const result = await nautilus.edit(asset)

    console.log('Edit complete:', result)
}