export default (ctx, inject) => {
  inject('constants', {
    routes: [
      {
        icon: 'mdi-account-circle',
        title: 'Профиль',
        to: '/'
      },
      {
        icon: 'mdi-gesture-double-tap',
        title: 'Тестирование',
        to: '/tests'
      },
      {
        icon: 'mdi-gesture-double-tap',
        title: 'Карьера',
        to: '/career'
      },
    ],
    allTests: [{
      name: 'golland',
      text: 'Профессиональный тип личности',
      link: '/tests/golland',
      icon: require('~/assets/golland-icon.png'),
    }, {
      name: 'klimov',
      text: 'Профессиональная область',
      link: '/tests/klimov',
      icon: require('~/assets/klimov-icon.png'),
    }, {
      name: 'belbin',
      text: 'Командные роли',
      link: '/tests/belbin',
      icon: require('~/assets/belbin-icon.png'),
    }, {
      name: 'disk',
      text: 'Характеристика личности',
      link: '/tests/disk',
      icon: require('~/assets/disk-icon.png'),
    }]
  });
};
