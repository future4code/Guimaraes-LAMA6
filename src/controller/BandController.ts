import { Request, Response } from "express";
import { BandBusiness } from "../business/BandBusiness";


export class BandController {

    async createBand(req: Request, res: Response) {

        try {
            
            const input: any = {
                name: req.body.name,
                music_genre: req.body.music_genre,
                responsible: req.body.responsible,
                token: req.headers.authorization
            }

            const bandBusiness = new BandBusiness()
            await bandBusiness.createBand(input)

            res.status(200).send("Banda cadastrada com sucesso!")

        } catch (error:any) {
            res.status(400).send({ error:error.message })
        }

    }
    

    async getDetails(req: Request, res: Response) {

        try {

            const id = req.body.id
            const name = req.body.name

            const bandBusiness = new BandBusiness()
            const result = await bandBusiness.getDetails(id, name)

            res.status(200).send( { result })

        } catch (error:any) {
            res.status(400).send( { error: error.message } )
        }
    }
}