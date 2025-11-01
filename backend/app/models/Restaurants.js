import { sql } from "../database/Connect.js";

class Restaurants {
  async create(restaurant) {
    const {
      owner_id,
      name,
      address,
      cuisine_type,
      price_range,
      description,
      phone,
      is_premium,
      longitude,
      latitude,
      avg_rating,
      views_count,
    } = restaurant;
    await sql`insert into restaurants (owner_id, name, address, cuisine_type, price_range, description, phone, is_premium, geom, avg_rating, views_count, created_at, updated_at)
    values (${owner_id}, ${name}, ${address}, ${cuisine_type}, ${price_range}, ${description}, ${phone}, ${is_premium}, ST_SetSRID(ST_MakePoint(${longitude}, ${latitude}), 4326),
     ${avg_rating}, ${views_count}, NOW(), NOW())`;
  }

  async all() {}

  async findOne() {}

  async update(id, restaurant) {}

  async destroyRestaurant(id) {}
}

export default new Restaurants();
