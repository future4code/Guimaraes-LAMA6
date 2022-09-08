import { Request, Response } from "express";
import { ShowsBusiness } from "../business/ShowsBusiness";
import { ShowsDatabase } from "../data/ShowsDatabase";

export class ShowsController {

    async setShow(req: Request, res: Response) {

        try {
            
            const input = {
                week_day: req.body.weekDay, 
                start_time: req.body.startTime, 
                end_time: req.body.endTime, 
                band_id: req.body.bandId
            }

            const showsBusiness = new ShowsBusiness()
            await showsBusiness.setShow(input)

            res.status(200).send("Show agendado com sucesso!")

        } catch (error:any) {
            res.status(400).send(error.message)
        }
    }


}