import { Nautilus } from '@deltadao/nautilus'

export async function access(nautilus: Nautilus) {
  const accessUrl = await nautilus.access({
    assetDid:
      'did:op:8ca612cfc6ffac030ca1a0f3d63f2ba72ec6e409d487f19a815b43bc11160b34'
  })

  console.log('Download URL: ', accessUrl)
}
