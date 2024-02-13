import { Nautilus, AssetBuilder  } from '@deltadao/nautilus' 

export async function editServiceOffering(nautilus: Nautilus) {
    const aquariusAsset = await nautilus.getAquariusAsset(
        `did:op:0ea80a58e85cecbc5680f686db5d4adce9fe8852ab52332928ee110862d563e8` // Change DID if needed
    )
    
    const assetBuilder = new AssetBuilder(aquariusAsset)

    const asset = assetBuilder
        .setAlgorithm({
            container: {
                entrypoint: 'node $ALGO',
                image: 'node',
                tag: 'lts', // Updated image
                checksum: 'sha256:a6faa1aa0ae1981b70c075dd6ea0a1725a1d05a4cab85536460ae4e4710e8331' // Updated checksum
            }
        })
        .build()
    
    const result = await nautilus.edit(asset)

    console.log(result)
}