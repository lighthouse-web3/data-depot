import axios from 'axios'

interface DealResponse {
  Pagination: {
    PerPage: number
  }
  Deals: {
    DealID: number
    DealInfo: {
      State: {
        SectorStartEpoch: number
        LastUpdatedEpoch: number
        SlashEpoch: number
        VerifiedClaim: number
      }
      Proposal: {
        PieceCID: {
          '/': string
        }
        PieceSize: number
        VerifiedDeal: boolean
        Client: string
        Provider: string
        Label: string
        StartEpoch: number
        EndEpoch: number
        StoragePricePerEpoch: string
        ProviderCollateral: string
        ClientCollateral: string
        StartEpochAsDate: string
        EndEpochAsDate: string
      }
      _id: number
      DealID: number
    }
  }[]
}

export const getDealDetails = async ({
  dealId,
}: {
  dealId: string
}): Promise<DealResponse> => {
  try {
    const { data } = await axios.get(
      `https://filecoin.tools/api/deals/list?page=1&per_page=20&selector=${dealId}&sort_by_column=status&sort_direction=-1`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    )

    return data
  } catch (err: any) {
    throw Error(err)
  }
}
