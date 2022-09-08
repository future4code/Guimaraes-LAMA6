import { BandDatabase } from "../data/BandDatabase";
import { CustomError, MissingInformation, NotFound, Unauthorized } from "../error/BaseError";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";


export class BandBusiness {

    private bandDatabase: BandDatabase
    constructor() {
        this.bandDatabase = new BandDatabase()
    }

    async createBand(band: any) {

        const { token, name, music_genre, responsible } = band

        if ( !name || !music_genre || !responsible ) {
            throw new MissingInformation()
        }

        if ( !token ) {
            throw new CustomError(400, "Não foi informado um token!")
        }

        const idGenerator = new IdGenerator()
        const id = idGenerator.generate()

        const authenticator = new Authenticator()
        const userRole = authenticator.getData(token)

        if (userRole.role !== "ADMIN") {
            throw new Unauthorized()
        }

        await this.bandDatabase.createBand(id, name, music_genre, responsible)

    }


    public async getDetails(id?: string, name?: string) {

        if (!id && !name) {
            throw new MissingInformation()
        }

        if (id && name) {
            throw new CustomError(400, "Atenção! Forneça somente UM dado sobre a banda de interesse.")
        }

        const result = await this.bandDatabase.getDetails(id, name)

        if (!result) {
            throw new NotFound()
        }

        return result
    }







}