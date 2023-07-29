export async function getWhishListByUserId(userId: string) {
  return (await db('wishlist').select(
    'id',
    'name',
    'img',
    'price',
    'price',
    'description',
    'stock',
    'is_enabled as isEnabled',
    'average_rating as averageRating',
  )) as Products
}
