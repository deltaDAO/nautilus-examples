import { Nautilus } from '@deltadao/nautilus'

export async function access(nautilus: Nautilus, assetDid?: string) {
  const accessUrl = await nautilus.access({
    assetDid: assetDid ||
      'did:op:69062f31842a0f6042c4b48b4173d8053e2e71a5f7d9be08483e475d9aa5f432'
  })

  console.log('Download URL: ', accessUrl)
}
