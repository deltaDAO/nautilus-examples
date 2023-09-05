import { Nautilus } from '@deltadao/nautilus'

export async function compute(nautilus: Nautilus) {
  const dataset = {
    did: 'did:op:9070303fed89dacadc05a8b2c57c178c6afed44c3bdf188a1d76271ff9b01b46' // any 'compute' dataset
    // userdata: { // optional
    //     myNumberParam: 8
    // }
  }

  const algorithm = {
    did: 'did:op:dfc9318c04cfe3378f0ee33f9778e8cce76a8bf4c9226058d59cbf8dbb6c7be5' // any 'compute' algorithm allowed to be run on the given dataset (needs to be whitelisted on the dataset)
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
