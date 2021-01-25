const otsu = (dizi, thrsh) => {
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
    console.log(`RENKLER: ${elemanlar}`);
    console.log(`YOĞUNLUK: ${frekansDizi}`);

    const olasilik = frekansDizi.map(sayi => Number((sayi / kopyaDizi.length).toFixed(4)));
    console.log(`OLASILIK: ${olasilik}`);

    thrsh = elemanlar.indexOf(thrsh);

    const class1 = [];
    for (let i = 0; i <= thrsh; i++) {
        class1.push(elemanlar[i]);
    }

    const class2 = Array.from(elemanlar);
    class2.splice(0, thrsh + 1);
    console.log(`CLASS1: ${class1} - CLASS2: ${class2}`);

    let w1 = 0;
    for (let i = 0; i < thrsh + 1; i++) {
        w1 = w1 + olasilik[i];
    }
    let w2 = 0;
    for (let i = thrsh + 1; i < olasilik.length; i++) {
        w2 = w2 + olasilik[i];
    }
    console.log(`𝑤1: ${w1} - 𝑤2: ${w2}  *(ağırlıklar)`);

    let ort1 = 0;
    for (let i = 0; i < class1.length; i++) {
        ort1 += ((class1[i] * olasilik[i]) / w1);
    }
    let ort2 = 0;
    for (let i = 0; i < class2.length; i++) {
        ort2 += ((class2[i] * olasilik[i + thrsh + 1]) / w2);
    }
    console.log(`𝜇1: ${ort1} - 𝜇2: ${ort2}  *(ortalamalar)`);

    let sigma1 = 0;
    for (let i = 0; i < class1.length; i++) {
        sigma1 += Math.pow((class1[i] - ort1), 2) * (olasilik[i] / w1);
    }
    let sigma2 = 0;
    for (let i = 0; i < class2.length; i++) {
        sigma2 += Math.pow((class2[i] - ort2), 2) * (olasilik[i + thrsh + 1] / w2);
    }
    console.log(`𝜎1: ${sigma1} -  𝜎2 = ${sigma2}   *(sigmalar)`);

    let maksimize = w1 * w2 * Math.pow((ort1 - ort2), 2);
    let minimize = w1 * sigma1 + w2 * sigma2;
    console.log(`𝜎b: ${maksimize} - 𝜎w: ${minimize}  *(maks(𝜎b)=between class variance - min(𝜎w)=within class variance)`);

}
// ilk dizi daha sonra threshold değeri girilir
otsu([1, 2, 3, 3, 4, 0, 2, 0, 3], 0);