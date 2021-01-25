const normalize = (...diziler) => {
    const ortalamalar = [];
    for (let i = 0; i < diziler[0].length; i++) {
        let ortalama = 0;
        for (let j = 0; j < diziler.length; j++) {
            ortalama += diziler[j][i] / diziler.length;
        }
        ortalamalar.push(ortalama.toFixed(2));
    }
    console.log(`Ortalamalar: ${ortalamalar.join(' | ')}`);

    const varyanslar = [];
    for (let i = 0; i < diziler[0].length; i++) {
        let islem = 0;
        for (let j = 0; j < diziler.length; j++) {
            islem += (Math.pow((diziler[j][i] - ortalamalar[i]), 2) / diziler[0].length);
        }
        varyanslar.push(islem);
    }
    console.log(`Varyanslar: ${varyanslar.join(' | ')}`);

    const normalizeDegerler = [];
    for (let i = 0; i < diziler.length; i++) {
        let normalize = 0;
        for (let j = 0; j < diziler[0].length; j++) {
            normalize = Math.sqrt(Math.pow((diziler[i][j] - ortalamalar[j]), 2) / varyanslar[j]);
            normalizeDegerler.push(normalize);
        }
    }
    let satir = "Normalize Değerler: \n\n";
    normalizeDegerler.forEach((sayi, index) => {
        satir += " | " + sayi;
        if (!((index + 1) % diziler[0].length)) {
            console.log(satir + " | \n");
            satir = "";
        }
    });
    console.log(satir);

    const uzakliklar = [];
    for (let i = 1; i < diziler.length; i++) {
        let uzaklik = 0;
        for (let j = 0; j < diziler[0].length; j++) {
            uzaklik += (Math.pow((normalizeDegerler[j] - normalizeDegerler[j + (i * diziler[0].length)]), 2));
        }
        uzakliklar.push(Math.sqrt(uzaklik));
    }
    console.log(`Uzaklıklar: ${uzakliklar.join(' | ')}`);
}
// ilk ana dizi daha sonra uzaklığı istenen diziler girilir
normalize([0.3, 500, 35000], [0.2, 700, 32000], [0.35, 450, 20000]);