export interface fileRecord {
  id: string,
  userName: string,
  fileName: string,
  fileSize: number,
  mimeType: string,
  payloadCid: string,
  pieceCid: string,
  pieceSize: number,
  fileStatus: string,
  createdAt: number,
  lastUpdate: number,
}
