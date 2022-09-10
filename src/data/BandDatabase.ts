import { BaseDatabase } from "./BaseDatabase";


export class BandDatabase extends BaseDatabase {

    private static TABLE_NAME = "lama_bandas";

    public async createBand(
        id: string,
        name: string,
        music_genre: string,
        responsible: string
    ): Promise<void> {
        try {
            await this.getConnection()
                .insert({
                    id,
                    name,
                    music_genre,
                    responsible
                })
                .into(BandDatabase.TABLE_NAME);
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    public async getDetails(
        id?: string,
        name?: string,
        band_id?: string
    ) {
        try {

            if (id) {
                const result = await this.getConnection()
                .select("name", "music_genre", "responsible")
                .where( {id} )
                .into(BandDatabase.TABLE_NAME)

                return result
            }

            if (name) {
                const result = await this.getConnection()
                .select("name", "music_genre", "responsible")
                .where( {name} )
                .into(BandDatabase.TABLE_NAME)

                return result
            }

            if (band_id) {
                const result = await this.getConnection()
                .select("name", "music_genre", "responsible")
                .where("id", "like", band_id )
                .into(BandDatabase.TABLE_NAME)

                return result
            }
            
        } catch (error:any) {
            throw new Error(error.sqlMessage || error.message)
        }
    }
}

//Maria - apagar depois
//Karolina