export default (ctx, inject) => {
  inject('dynamicColor', (str = '', s = 90, l = 55) => {
    if (!str || !str.length) {
      return;
    }

    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    const h = hash % 360;
    return `hsl(${h}, ${s}%, ${l}%)`;
  });
};
