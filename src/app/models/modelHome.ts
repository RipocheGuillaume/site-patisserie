export class ProductModel {
  constructor(
    public title: string,
    public image: string,
    public description: string,
    public type: string,
  ) {}
}

export class HomeModel {
  categories: ProductModel[] = [
    {
      title: 'Pâtisseries',
      image: 'images/patisseries.jpg',
      description:
        'Le plaisir du fait maison, du croquant de la pâte à la douceur de la crème. Découvrez nos créations au fil des saisons.',
      type: 'patisseries',
    },
    {
      title: 'Chocolats',
      image: 'images/chocolats/chocolats.jpg',
      description:
        'Un univers gourmand de chocolats, de pralinés et de textures délicates. Retrouvez notre collection en boutique.',
      type: 'chocolats',
    },
    {
      title: 'Macarons',
      image: 'images/macarons.jpg',
      description:
        'Des coques délicates, des couleurs tendres et des saveurs gourmandes. Découvrez les parfums disponibles en boutique.',
      type: 'macarons',
    },
  ];
}

export class ChocolatsModel {
  categories: ProductModel[] = [
    new ProductModel(
      'La Croix du Sud',
      '/images/chocolats/croix-du-sud.png',
      'Une création gourmande au chocolat et au praliné de noisettes.',
      'chocolats',
    ),
    new ProductModel(
      'rochers',
      '/images/chocolats/rochers.png',
      'Des bouchées chocolatées aux noisettes et aux textures croquantes.',
      'chocolats',
    ),
    new ProductModel(
      'Les palets de chocolat',
      '/images/chocolats/palets-de-chocolat.png',
      'De fins palets de chocolat parsemés de touches gourmandes.',
      'chocolats',
    ),
    new ProductModel(
      'Les éclats de chocolat',
      '/images/chocolats/eclats-de-chocolat.png',
      'Des éclats de chocolat généreux, garnis de fruits à coque.',
      '/chocolats',
    ),
  ];
}

export class PatisseriesModel {
  categories: ProductModel[] = [
    new ProductModel(
      'La tarte aux fraises',
      '/images/patisserie/Tarte-aux-fraise.png',
      'Une pâte dorée, une crème pâtissière onctueuse et des fraises fraîches pour une pause fruitée.',
      'patisseries',
    ),
    new ProductModel(
      'Les éclairs au chocolat',
      '/images/patisserie/Eclairs-au-chocolat.png',
      'Une pâte à choux délicate garnie de crème au chocolat et recouverte d’un glaçage gourmand.',
      'patisseries',
    ),
    new ProductModel(
      'Le mille-feuille',
      '/images/patisserie/Mille-feuille-vanille.png',
      'Un feuilletage croustillant et une crème à la vanille pour un grand classique de la pâtisserie.',
      'patisseries',
    ),
    new ProductModel(
      'Le Paris-Brest',
      '/images/patisserie/Paris-Brest.png',
      'Une couronne de pâte à choux aux amandes, généreusement garnie de crème au praliné.',
      'patisseries',
    ),
    new ProductModel(
      'La tarte au citron meringuée',
      '/images/patisserie/Tarte-au-citron.png',
      'Une crème au citron acidulée et une meringue légèrement dorée sur une pâte croustillante.',
      'patisseries',
    ),
    new ProductModel(
      'L’entremets aux framboises',
      '/images/patisserie/Entremets-framboise.png',
      'Un entremets gourmand au glaçage rose, décoré de framboises fraîches.',
      'patisseries',
    ),
  ];
}
