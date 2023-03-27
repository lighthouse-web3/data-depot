import { Request, Response, NextFunction } from 'express'
import { CustomError } from '../../errors'
import { getDealDetails } from './service'

export const dealsDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const dealId = req.params.dealId
    if (!dealId) {
      return next(new CustomError('invalid DealID', 406, 'invalid DealID'))
    }

    const data = await getDealDetails({ dealId })

    if (data.Deals.length == 0) {
      return res.status(406).send({
        message: `No match found for deal: ${dealId}`,
      })
    }

    const _data = data.Deals.map((deal) => ({
      VerifiedDealStatus: deal.DealInfo.Proposal.VerifiedDeal,
      EstimatedDealEnds: deal.DealInfo.Proposal.EndEpochAsDate,
      DealEndsAtEpoch: deal.DealInfo.Proposal.EndEpoch,
      DealStartAtEpoch: deal.DealInfo.Proposal.StartEpoch,
      PieceCid: deal.DealInfo.Proposal.PieceCID['/'],
      Miner: deal.DealInfo.Proposal.Provider,
      State: deal.DealInfo.State,
      DealId: deal.DealID,
      PieceSize: deal.DealInfo.Proposal.PieceSize,
      PayloadCID: deal.DealInfo.Proposal.Label,
    }))
    return res.status(200).send({
      deals: _data,
    })
  } catch (err: any) {
    next(err)
  }
}
