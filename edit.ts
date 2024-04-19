import { Nautilus, AssetBuilder, ConsumerParameterBuilder, CredentialListTypes, ServiceBuilder, LifecycleStates  } from '@deltadao/nautilus' 

export async function editServicePrice(nautilus: Nautilus, did: string, newPrice: string) {
    const aquariusAsset = await nautilus.getAquariusAsset(did)
    
    const result = await nautilus.setServicePrice(aquariusAsset, aquariusAsset.services[0].id, newPrice)

    console.log('Set new service price:', result)
}

export async function editToSaas(nautilus: Nautilus, did: string, redirectUrl: string, paymentMode: 'payperuse' | 'subscription'){
    const aquariusAsset = await nautilus.getAquariusAsset(did)
    
    const assetBuilder = new AssetBuilder(aquariusAsset)
    
    //  Setup an SaaS asset
    const asset = assetBuilder.addAdditionalInformation({
        ...aquariusAsset.metadata.additionalInformation,
        saas: {
            redirectUrl,
            paymentMode
        }
    }).build()

    const result = await nautilus.edit(asset)
    console.log('Edited asset as SaaS:', result)
}

export async function editTrustedAlgorithms(nautilus: Nautilus, did: string, trustedAlgorithms: string[], trustedPublishers: string[]){
    const aquariusAsset = await nautilus.getAquariusAsset(did)
    
    const assetBuilder = new AssetBuilder(aquariusAsset)
    const serviceBuilder = new ServiceBuilder({ aquariusAsset, serviceId: aquariusAsset.services[0].id })
    
    // Updating trusted publishers on a service
    if (trustedPublishers.length > 0) {
        for(const publisher of trustedPublishers){
            serviceBuilder.addTrustedAlgorithmPublisher(publisher)
        }
    }
    // Updating trusted algorithms on a service
    if (trustedAlgorithms.length > 0) {
        serviceBuilder.addTrustedAlgorithms(trustedAlgorithms.map(algo => ({ did: algo })))
    }
    
    const service = serviceBuilder.build()
    const asset = assetBuilder.addService(service).build()

    const result = await nautilus.edit(asset)
    console.log('Edited trusted a;gorithms:', result)
}

export async function editAlgoMetadata(nautilus: Nautilus, did: string, tag: string, checksum: string) {
    const aquariusAsset = await nautilus.getAquariusAsset(did)

    const assetBuilder = new AssetBuilder(aquariusAsset)
    const asset = assetBuilder.setAlgorithm({
        ...aquariusAsset.metadata.algorithm, // Start with existing algorithm metadata
        container: {
            ...aquariusAsset.metadata.algorithm?.container,
            // Updated container information
            tag,
            checksum
        }
    }).build()

    const result = await nautilus.edit(asset)
    console.log('Edit algo metadata:', result)
}

export async function revokeAsset(nautilus: Nautilus, did: string) {
    const aquariusAsset = await nautilus.getAquariusAsset(did)

    const tx = await nautilus.setAssetLifecycleState(
        aquariusAsset,
        LifecycleStates.REVOKED_BY_PUBLISHER
    )
    console.log('Edit lifecycle complete:', tx)
}