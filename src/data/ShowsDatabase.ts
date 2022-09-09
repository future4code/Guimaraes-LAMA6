import { BaseDatabase } from "./BaseDatabase";


export class ShowsDatabase extends BaseDatabase {

    private static TABLE_NAME = "lama_shows";

    async setShow(input: any) {

        const { id, week_day, start_time, end_time, band_id } = input

        try {
            
            await this.getConnection()
                .insert({
                    id,
                    week_day,
                    start_time,
                    end_time,
                    band_id
                })
                .into(ShowsDatabase.TABLE_NAME)

        } catch (error:any) {
            throw new Error(error.sqlMessage || error.message)
        }

    }

    async checkStartTime(start_time: number) {

        try {
            
            const result = await this.getConnection()
                .select("*")
                .where("start_time", "like", start_time)
                .into(ShowsDatabase.TABLE_NAME)
                return result[0]
        } catch (error:any) {
            throw new Error(error.sqlMessage || error.message)
        }

    }

    async checkDay(week_day: string) {

        try {
            
            const result = await this.getConnection()
                .select("*")
                .where("week_day", "like", week_day)
                .into(ShowsDatabase.TABLE_NAME)
                return result
        } catch (error:any) {
            throw new Error(error.sqlMessage || error.message)
        }

    }

    async showsOfTheDay(weekDay: string) {

        try {
            
            const result = await this.getConnection()
                .select("lama_bandas.name", "lama_bandas.music_genre", "lama_shows.start_time")
                .join("lama_shows", "lama_bandas.id", "lama_shows.band_id" )
                .where("lama_shows.week_day", "like", weekDay)
                .orderBy("start_time")
                .into("lama_bandas")
                return result
        } catch (error:any) {
            throw new Error(error.sqlMessage || error.message)
        }

    }
    


}