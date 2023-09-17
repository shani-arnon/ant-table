import { TABLE_DATA } from "../utils/helper"

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getTableData() {
    await wait(800);
    return TABLE_DATA;
}
