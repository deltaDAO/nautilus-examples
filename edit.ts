import { Nautilus, AssetBuilder  } from '@deltadao/nautilus' 

export async function editServiceOffering(nautilus: Nautilus, did: string) {
    const aquariusAsset = await nautilus.getAquariusAsset(did)
    
    const assetBuilder = new AssetBuilder(aquariusAsset)

    const asset = assetBuilder
        .setAlgorithm({
            container: {
                entrypoint: 'node $ALGO',
                image: 'node',
                tag: 'lts',
                checksum: 'sha256:a6faa1aa0ae1981b70c075dd6ea0a1725a1d05a4cab85536460ae4e4710e8331' // Update
            }
        })
        .build()
    
    const result = await nautilus.edit(asset)

    console.log(result)
}