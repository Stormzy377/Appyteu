import Restaurant from "../models/Restaurants.js";

class RestaurantController {
  static async create(request, response) {
    try {
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
      } = request.body;

      const restaurant = await Restaurant.create({
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
      });

      return response.status(201).json({
        message: "Restaurante salvo com sucesso!",
      });
    } catch (error) {
      console.log(error);
      return response.status(500).json({
        message: `Erro de servidor! `,
      });
    }
  }
  static async all(request, respose) {}
  static async findOne(request, respose) {}
  static async update(request, respose) {}
  static async destroy(request, respose) {}
}

export default RestaurantController;
