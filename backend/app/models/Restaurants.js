import { sql } from "../database/Connect.js";

class Restaurants {
  async create(restaurant) {
    try {
      //   Desestruturando dados
      const {
        owner_id,
        name,
        price_range,
        description,
        phone,
        is_premium,
        avg_rating,
        views_count,
        country,
        city,
        street,
        neighborhood,
        latitude,
        longitude,
        category_id,
      } = restaurant;

      //   Função de rollback caso algo corra mal
      const transition = await sql.begin(async (query) => {
        //  Query para inserção da localizaçãp do restaurante
        const [locations] =
          await query`insert into locations (street, neighborhood, city, country, latitude, longitude, geom) values
	    (${street}, ${neighborhood}, ${city}, ${country}, ${latitude}, ${longitude},ST_SetSRID(ST_MakePoint(${longitude}, ${latitude}), 4326)) RETURNING id;`;

        //  Query para inserção dos restaurantes
        const [restaurants] =
          await query`insert into restaurants (owner_id, category_id, location_id, name, description, phone, price_range, is_premium,
	avg_rating, views_count, created_at, updated_at) values (${owner_id}, ${category_id}, ${locations.id}, ${name}, ${description}, ${phone}, ${price_range}
	, ${is_premium}, ${avg_rating}, ${views_count}, NOW(), NOW()) RETURNING id;`;

        // Retorno dos dados caso não haja erro algum
        return {
          success: true,
          location: locations.id,
          restaurant: restaurants.id,
        };
      });

      return transition;
    } catch (error) {
      console.log(error);
    }
  }

  async all() {
    try {
      const restaurants =
        await sql`select restaurants.*, locations.street, locations.neighborhood,  locations.city,  locations.country,  locations.latitude 
	   ,locations.longitude,  locations.geom from restaurants inner join locations on restaurants.location_id = locations.id`;

      return restaurants;
    } catch (error) {
      console.log(error);
    }
  }

  async findOne(id) {
    try {
      const restaurant =
        await sql`select restaurants.*, locations.street, locations.neighborhood,  locations.city,  locations.country,  locations.latitude 
	   ,locations.longitude,  locations.geom from restaurants inner join locations on restaurants.location_id = locations.id where restaurants.id = ${id}`;

      return restaurant;
    } catch (error) {
      console.log(error);
    }
  }

  async searchRestaurant(search = "") {
    try {
      const restaurant =
        await sql`select restaurants.*, locations.street, locations.neighborhood, locations.city, locations.country,
             locations.latitude, locations.longitude, locations.geom from restaurants inner join locations on restaurants.location_id = locations.id
		 where restaurants.name ilike ${"%" + search + "%"} or locations.city ilike ${
          "%" + search + "%"
        } or locations.neighborhood ilike ${
          "%" + search + "%"
        } or locations.country ilike ${
          "%" + search + "%"
        } order by restaurants.created_at`;

      return restaurant;
    } catch (error) {
      console.log(error);
    }
  }

  async update(id, restaurant) {}

  async destroyRestaurant(id) {
    try {
      const transition = await sql.begin(async (query) => {
        // Pegando o restaurante antes de apagar
        const [restaurant] =
          await query`select * from restaurants where id = ${id}`;
        if (!restaurant) {
          throw new Error("Restaurante não encontrado!");
        }

        // Query  que apaga o restaurante
        await query`delete from restaurants where id = ${id};`;

        // Query que apaga a localização do restaurante
        await query`delete from locations where id = ${restaurant.location_id}`;

        return {
          success: true,
        };
      });
      return transition;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new Restaurants();
