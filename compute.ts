import { Nautilus } from '@deltadao/nautilus'

export async function compute(nautilus: Nautilus, datasetDid?: string, algoDid?: string) {
  const dataset = {
    did: datasetDid || 'did:op:64d137d8fd1e71982efb432fa39556a6a3eb3248a2eb34dfddbef48e65c9bca2' // any 'compute' dataset
    // userdata: { // optional
    //     myNumberParam: 8
    // }
  }

  const algorithm = {
    did: algoDid || 'did:op:3a13028983ce3c0954fd4d9f41c8f1f08649907153a76d79de6dd0a3a4096110' // any 'compute' algorithm allowed to be run on the given dataset (needs to be whitelisted on the dataset)
  }

  const computeConfig = {
    dataset,
    algorithm
  }

  const computeJob = await nautilus.compute(computeConfig)
  console.log('COMPUTE JOB: ', computeJob)
  return Array.isArray(computeJob) ? computeJob[0] : computeJob
}

export async function getComputeStatus(
  nautilus: Nautilus,
  providerUri: string,
  jobId?: string
) {
  const computeJobStatus = await nautilus.getComputeStatus({
    jobId: jobId || 'bfd2eb0418c44a229d8346d66e3384bd',
    providerUri
  })
  console.log('Compute Job Status: ', computeJobStatus)
}

export async function retrieveComputeResult(
  nautilus: Nautilus,
  providerUri: string,
  jobId?: string
) {
  const computeResult = await nautilus.getComputeResult({
    jobId: jobId || '38d3ab56002844ac92fd72803129654b',
    providerUri
  })
  console.log('Compute Result URL: ', computeResult)
}
