import { DDO, FileInfo, LoggerInstance } from '@oceanprotocol/lib'

export interface ExtendedFileInfo extends FileInfo {
  filename?: string // this is returned by the provider, but missing in ocean.js types
  fileExtension?: string
}

export interface AlgoCustomDataFileInfo {
  fileInfo: ExtendedFileInfo
}

export interface FileInfoRequest {
  did: string
  serviceId: string
  checksum: boolean
}

export interface FileInfoResponse {
  [key: string]: any
}

function joinUrl(base: string, path: string): string {
  const cleanedBase = base.replace(/\/+$/, '')
  const cleanedPath = path.replace(/^\/+/, '')
  return cleanedBase + '/' + cleanedPath
}

async function fetchDDO(did: string) {
  const url = `https://aquarius.pontus-x.eu/api/aquarius/assets/ddo/${did}`
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  })

  if (!response.ok) {
    throw new Error(
      `Failed to fetch DDO for ${did}: ${response.status} ${response.statusText}`
    )
  }

  const data = await response.json()

  return data as DDO
}

export async function fetchFileInfo(
  body: FileInfoRequest,
  providerUrl: string
): Promise<FileInfoResponse> {
  const url = joinUrl(providerUrl, 'api/services/fileinfo')
  const options: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(body)
  }

  const response = await fetch(url, options)

  if (!response.ok) {
    throw new Error('Error ' + response.status + ': ' + response.statusText)
  }

  const data = await response.json()
  return data as FileInfo
}

export async function getAlgoCustomDataFileInfo(
  datasetDid: string
): Promise<AlgoCustomDataFileInfo> {
  try {
    const ddo = await fetchDDO(datasetDid)
    const serviceId = ddo.services[0].id
    const providerUrl = ddo.services[0].serviceEndpoint

    const fileInfo = (await fetchFileInfo(
      { did: datasetDid, serviceId, checksum: false },
      providerUrl
    )) as Omit<ExtendedFileInfo, 'fileExtension'>[]

    const fileExtension = fileInfo[0].filename?.split('.').pop() || ''

    return {
      fileInfo: {
        ...fileInfo[0],
        fileExtension
      }
    }
  } catch (error) {
    console.log("Unable to create fileinfo for the algorithm's custom data.")
    console.log(error.message)
    throw error
  }
}
