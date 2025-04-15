import { Knex } from "knex";


type StudySpace = {
    room_id: number;
    room_name: string;
    occupied: boolean;
};

type OccupiedStudySpace = StudySpace & {
    occupied: true;
};

type CreateStudySpace = Pick<StudySpace, "room_id">

async function getStudySpaceById(
    db: Knex,
    id: number
): Promise<StudySpace | null> {
    const result = await db
    .select("*")
    .from("rooms")
    .where("id", "=", id)
    .first();
    return result as StudySpace | null;

}