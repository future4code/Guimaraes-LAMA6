import { BandDatabase } from "../data/BandDatabase";
import { ShowsDatabase } from "../data/ShowsDatabase";
import { CustomError, FestivalClosed, InvalidStartTime, InvalidWeekDay, MissingInformation, NotFound } from "../error/BaseError";
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
            throw new FestivalClosed()
        }

        if ( ( start_time < 8 ) && ( start_time > 23 ) ) {
            throw new FestivalClosed()
        }

        if (end_time < start_time) {
            throw new InvalidStartTime()
        }

        if (end_time == start_time) {
            throw new InvalidStartTime()
        }

        const bandDatabase = new BandDatabase()
        const bandExists = await bandDatabase.getDetails(band_id)

        if (!bandExists) {
            throw new NotFound()
        }

        const checkday = await this.showsDatabase.checkDay(week_day)

        for (let show of checkday) {
            if (show.start_time == start_time) {
                throw new CustomError(400, "Horário não disponível.")
            }
            if ((start_time < show.end_time) && (start_time > show.start_time)) {
                throw new CustomError(400, "Horário não disponível.")
            }
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


    async showsOfTheDay(weekDay: string) {

        if (!weekDay) {
            throw new MissingInformation()
        }

        const result = await this.showsDatabase.showsOfTheDay(weekDay)

        if (!result) {
            throw new CustomError(400, "Não há shows agendados para este dia.")
        }

        return result

    }
}