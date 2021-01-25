const histogram = (dizi, carpSayi) => {
    const kopyaDizi = Array.from(dizi);
    kopyaDizi.sort((a, b) => a - b);
    const elemanlar = [];
    const frekansDizi = [];
    let sayac = 1;
    elemanlar.push(kopyaDizi[0]);
    for (let i = 1; i < kopyaDizi.length; i++) {
        if (kopyaDizi[i] !== kopyaDizi[i - 1]) {
            elemanlar.push(kopyaDizi[i]);
            frekansDizi.push(sayac);
            sayac = 1;
        } else {
            ++sayac;
        }
        if (i === kopyaDizi.length - 1) {
            frekansDizi.push(sayac);
        }
    }

    console.log("TEKRARSIZ ELEMANLAR");
    console.log(elemanlar);
    console.log("TEKRARSIZ ELEMAN SAYILARI");
    console.log(frekansDizi);

    const olasilik = frekansDizi.map(sayi => Number((sayi / kopyaDizi.length)));
    console.log("OLASILIK ORANLARI");
    console.log(olasilik);

    const kumOlasilik = [];
    kumOlasilik.push(olasilik[0]);
    for (let i = 1; i < olasilik.length; i++) {
        kumOlasilik.push(kumOlasilik[i - 1] + olasilik[i]);
    }
    console.log("KUMULATIF OLASILIK");
    console.log(kumOlasilik);

    const dagilimOran = kumOlasilik.map(sayi => (sayi * carpSayi).toFixed(2));
    console.log("CARPILMIS HALI")
    console.log(dagilimOran);

    const sonuc = dizi.map(sayi => dagilimOran[elemanlar.indexOf(sayi)]);
    console.log("SONUC");
    console.log(sonuc);
}
// ilk dizi daha sonra çarpılacak değer girilir
histogram([3, 2, 4, 5, 7, 7, 8, 2, 3, 1, 2, 3, 5, 4, 6, 7], 20);