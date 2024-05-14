
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createCar(request):
    """Create car and handle image upload as well"""
    user = request.user
    data = request.data

    image_file = request.FILES.get('image')

    car = Car.objects.create(
        user=user,
        brand=data['brand'],
        model=data['model'],
        color=data['color'],
        price=data['price'],
        category=Category.objects.get(name=data['category']),
        location=data['location'],
        city=data['city'],
        power=data['power'],
        condition=data['condition'],
    )

    if image_file:
        car.img = image_file
        car.save()

    serializer = CarSerializer(car, many=False)
    return Response(serializer.data)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def uploadImage(request):
    data = request.data

    car_id = data['car_id']
    car = Car.objects.get(id=car_id)

    car.img = request.FILES.get('image')
    car.save()

    return Response('Image was uploaded')


const { Car, Category } = require('../models'); // adjust the path as needed

exports.createCar = async (req, res) => {
  const user = req.user; // assuming you have middleware that sets req.user
  const data = req.body;

  const category = await Category.findOne({ where: { name: data.category } });

  const car = await Car.create({
    userId: user.id,
    brand: data.brand,
    model: data.model,
    color: data.color,
    price: data.price,
    categoryId: category.id,
    location: data.location,
    city: data.city,
    power: data.power,
    condition: data.condition,
    img: req.file ? req.file.path : null, // req.file is set by Multer
  });

  res.json(car);
};

exports.uploadImage = async (req, res) => {
  const data = req.body;

  const car = await Car.findOne({ where: { id: data.car_id } });

  if (req.file) {
    car.img = req.file.path;
    await car.save();
  }

  res.json({ message: 'Image was uploaded' });
};

