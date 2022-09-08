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

    async checkAvailable(start_time: number, end_time: number, week_day: string) {

        try {
            
             const result = await this.getConnection()
                .select("*")
                .where("start_time", "like", start_time )
                .where("end_time", "like", end_time)
                .where("week_day", "like", week_day)
                .into(ShowsDatabase.TABLE_NAME)

                return result
        } catch (error:any) {
            throw new Error(error.sqlMessage || error.message)
        }


    }


}