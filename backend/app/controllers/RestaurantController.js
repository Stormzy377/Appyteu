import Restaurant from "../models/Restaurants.js";

class RestaurantController {
  static async create(request, response) {
    try {
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
      } = request.body;

      const restaurant = await Restaurant.create({
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
      });
      if (!restaurant.success) {
        return response.status(400).json({
          message: "Falha ao registrar restaurante!",
        });
      }

      return response.status(201).json({
        message: "Restaurante salvo com sucesso!",
      });
    } catch (error) {
      console.log(error);
      return response.status(500).json({
        message: `Erro de servidor! `,
        error: error.message, // opcional para depurar
      });
    }
  }
  static async all(request, response) {
    try {
      const restaurants = await Restaurant.all();

      if (restaurants.length === 0) {
        return response.status(404).json({
          message: "Não foram encontrados restaurante!",
        });
      }
      return response.status(200).json({
        message: "Restaurantes encontrados!",
        restaurants,
      });
    } catch (error) {
      console.log(error);
      return response.status(500).json({
        message: `Erro de servidor! `,
        error: error.message, // opcional para depurar
      });
    }
  }
  static async findOne(request, response) {
    try {
      const { id } = request.params;
      const restaurant = await Restaurant.findOne(id);
      if (restaurant.length === 0) {
        return response.status(404).json({
          message: "Restaurante não encontrado!",
        });
      }

      return response.status(200).json({
        message: "Restaurante encontrado!",
        restaurant,
      });
    } catch (error) {
      console.log(error);
      return response.status(500).json({
        message: `Erro de servidor! `,
        error: error.message, // opcional para depurar
      });
    }
  }

  static async search(request, response) {
    try {
      const { search } = request.query;
      const restaurant = await Restaurant.searchRestaurant(search);

      if (!restaurant || restaurant.length === 0) {
        return response.status(404).json({
          message: "Restaurante não encontrado!",
        });
      }
      return response.status(200).json({
        message: "Restaurante encontrado!",
        restaurant,
      });
    } catch (error) {
      console.log(error);
      return response.status(500).json({
        message: `Erro de servidor! `,
        error: error.message, // opcional para depurar
      });
    }
  }
  static async update(request, response) {}
  static async destroy(request, response) {
    try {
      const { id } = request.params;
      const restaurant = await Restaurant.destroyRestaurant(id);
      if (!restaurant.success) {
        return response.status(404).json({
          message: "Falha ao apagar restaurante!",
        });
      }

      return response.status(200).json({
        message: "Restaurante apagado com sucesso!",
        restaurant,
      });
    } catch (error) {
      console.log(error);
      return response.status(500).json({
        message: `Erro de servidor! `,
        error: error.message, // opcional para depurar
      });
    }
  }
}

export default RestaurantController;
