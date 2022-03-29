export const createOrderObject = (order, pickupAddress, dropoffAddress) => ({
  id: order.id,
  userId: order.userId,
  delivererId: order.delivererId,
  isDelivered: order.isDelivered,
  isPaid: order.isPaid,
  isPickedup: order.isPickedup,
  totalPrice: order.totalPrice,
  pickupAddress: {
    city: pickupAddress.city,
    street: pickupAddress.street,
    nearestLandmark: pickupAddress.nearestLandmark,
    longitude: pickupAddress.longitude,
    latitude: pickupAddress.latitude,
  },
  dropoffAddress: {
    city: dropoffAddress.city,
    street: dropoffAddress.street,
    nearestLandmark: dropoffAddress.nearestLandmark,
    longitude: dropoffAddress.longitude,
    latitude: dropoffAddress.latitude,
  },
});

export const checkUpdateObject = {
  user: function (order) {
    return (
      order.isPaid || order.isDelivered || order.isPickedup || order.isAccepted
    );
  },
  deliverer: function (order) {
    return order.isCancelled;
  },
};
