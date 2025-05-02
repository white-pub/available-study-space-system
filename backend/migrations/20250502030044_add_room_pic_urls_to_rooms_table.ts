// Add the picture links for room:
// room_pic is room picture
// building_map is the building map where the room is located with the room location marked out
// campus_map is the campus map with the room location marked out

import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.table('rooms', function (table) {
    table.string("room_pic_url").nullable();
    table.string("building_map_url").nullable();
    table.string("campus_map_url").nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.table('rooms', function (table) {
    table.dropColumn("room_pic_url");
    table.dropColumn("building_map_url");
    table.dropColumn("campus_map_url");
  });
}