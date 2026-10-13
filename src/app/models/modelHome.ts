export class HomeModel {
  categories: {
    title: string;
    image: string;
    description: string;
    link: string;
  }[] = [
    {
      title: 'Pâtisseries',
      image: 'images/patisseries.jpg',
      description:
        'Le plaisir du fait maison, du croquant de la pâte à la douceur de la crème. Découvrez nos créations au fil des saisons.',
      link: '/patisseries',
    },
    {
      title: 'Chocolats',
      image: 'images/chocolats/chocolats.jpg',
      description:
        'Un univers gourmand de chocolats, de pralinés et de textures délicates. Retrouvez notre collection en boutique.',
      link: '/chocolats',
    },
    {
      title: 'Macarons',
      image: 'images/macarons.jpg',
      description:
        'Des coques délicates, des couleurs tendres et des saveurs gourmandes. Découvrez les parfums disponibles en boutique.',
      link: '/macarons',
    },
  ];
}

export class ChocolatsModel {
  categories: {
    title: string;
    image: string;
    description: string;
    link: string;
  }[] = [
    {
      title: 'La Croix du Sud',
      image: '/images/chocolats/croix-du-sud.png',
      description:
        'Une création gourmande au chocolat et au praliné de noisettes.',
      link: '/chocolats/croix-du-sud',
    },
    {
      title: 'rochers',
      image: '/images/chocolats/rochers.png',
      description:
        'Des bouchées chocolatées aux noisettes et aux textures croquantes.',
      link: '/chocolats/rochers',
    },
    {
      title: 'Les palets de chocolat',
      image: '/images/chocolats/palets-de-chocolat.png',
      description: 'De fins palets de chocolat parsemés de touches gourmandes.',
      link: '/chocolats/palets-de-chocolat',
    },
    {
      title: 'Les éclats de chocolat',
      image: '/images/chocolats/eclats-de-chocolat.png',
      description: 'Des éclats de chocolat généreux, garnis de fruits à coque.',
      link: '/chocolats/eclats',
    },
  ];
}
