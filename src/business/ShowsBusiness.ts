import { BandDatabase } from "../data/BandDatabase";
import { ShowsDatabase } from "../data/ShowsDatabase";
import { CustomError, InvalidStartTime, InvalidWeekDay, MissingInformation, NotFound } from "../error/BaseError";
import { IdGenerator } from "../services/IdGenerator";


export class ShowsBusiness {

    private showsDatabase: ShowsDatabase
    constructor() {
        this.showsDatabase = new ShowsDatabase()
    }

    async setShow(show: any) {

        const { week_day, start_time, end_time, band_id } = show

        if ( !week_day || !start_time || !end_time || !band_id ) {
            throw new MissingInformation()
        }

        if ( week_day !== "sexta-feira" && week_day !== "sábado" && week_day !== "domingo") {
            throw new InvalidWeekDay()
        }

        if ( !Number.isInteger(start_time) && !Number.isInteger(end_time) ) {
            throw new InvalidStartTime()
        }

        if ( ( start_time < 8 ) && ( start_time > 23 ) ) {
            throw new InvalidStartTime()
        }

        const bandDatabase = new BandDatabase()
        const bandExists = await bandDatabase.getDetails(band_id)

        if (!bandExists) {
            throw new NotFound()
        }

        const checkAvailable = await this.showsDatabase.checkAvailable(start_time, end_time, week_day)
        console.log(checkAvailable)
        if ( checkAvailable ) {
            throw new CustomError(400, "Horário não disponível.")
        }

        const idGenerator = new IdGenerator();
        const id = idGenerator.generate();

        const input = {
            id,
            week_day,
            start_time,
            end_time,
            band_id
        }

        await this.showsDatabase.setShow(input)

    }


}