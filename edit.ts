import { Nautilus, AssetBuilder, ConsumerParameterBuilder, CredentialListTypes, ServiceBuilder, LifecycleStates  } from '@deltadao/nautilus' 

export async function editServiceOffering(nautilus: Nautilus) {
    const aquariusAsset = await nautilus.getAquariusAsset(
        `did:op:c9ee9ef8c3879e75d5b4fc95d2ac0bc0145a4a52fe385df5c223b8484a3816f6` // Change DID if needed
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
    // const serviceBuilder = new ServiceBuilder({ aquariusAsset, serviceId: aquariusAsset.services[0].id })
    // const service = serviceBuilder
    //.addTrustedAlgorithmPublisher('0x28080F654eED6CC00e8b16F4841E92CD0c2C0778')
    //    .build()
    // const asset = assetBuilder.addService(service)
    //     .build()

    // Setup an SaaS asset
    const asset = assetBuilder.addAdditionalInformation({
        saas: {
            redirectUrl: 'https://delta-dao.com/nautilus',
            paymentMode: 'payperuse'
        }
    }).build()

    const result = await nautilus.edit(asset)

    console.log('Edit complete:', result)
}

export async function editLifecycle(nautilus: Nautilus) {
    const aquariusAsset = await nautilus.getAquariusAsset('did:op:c9ee9ef8c3879e75d5b4fc95d2ac0bc0145a4a52fe385df5c223b8484a3816f6')

      const tx = await nautilus.setAssetLifecycleState(
        aquariusAsset,
        LifecycleStates.REVOKED_BY_PUBLISHER
      )
      console.log('Edit lifecycle complete:', tx)
}