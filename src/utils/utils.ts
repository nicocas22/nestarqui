export class Utils {
  static formatDate(date: string | undefined | null, withHora: boolean = true) {
    try {
      if (date === undefined || date === null) return date;
      const arr = date.split('T');
      const fecha = arr[0];
      const hora = arr[1];

      const dma = fecha.split('-');
      if (withHora) {
        return dma[2] + '-' + dma[1] + '-' + dma[0] + ' ' + hora.split('.')[0];
      } else {
        return dma[2] + '-' + dma[1] + '-' + dma[0];
      }
    } catch (err) {
      // console.warn('Error al parsear fechas', err);
      return date;
    }
  }

  static formatWords(oracion: string) {
    if (oracion === null || oracion === undefined) {
      return '';
    }
    oracion = oracion.toLowerCase();
    let newText = '';
    const palabras = oracion.split(' ');
    for (const word of palabras) {
      const palabra =
        word.substr(0, 1).toUpperCase() + word.substr(1, word.length - 1);
      newText = newText + ' ' + palabra;
    }

    return newText
      ? newText
          .split('Null')
          .join('')
          .trim()
      : oracion;
  }

  static formatMoney(num: number): string {
    const money = num
      .toString()
      .split('')
      .reverse()
      .join('')
      .replace(/(?=\d*\.?)(\d{3})/g, '$1.');
    return money
      .split('')
      .reverse()
      .join('')
      .replace(/^[\.]/, '');
  }
}
