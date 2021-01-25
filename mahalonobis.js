const cokluMah = (hedefDizi, ...diziler) => {
    const ortalamalar = [];
    for (let i = 0; i < diziler[0].length; i++) {
        let ortalama = 0;
        for (let j = 0; j < diziler.length; j++) {
            ortalama += diziler[j][i] / diziler.length;
        }
        ortalamalar.push(ortalama);
    }
    console.log(`Ortalamalar: ${ortalamalar.join(' | ')}`);

    const cov = [];
    let geciciIndex = 0;
    let durdurmaSayaci = 0;
    for (let i = 0; i < diziler[0].length; i++, durdurmaSayaci++) {
        let covElements = 0;
        if (durdurmaSayaci === ((diziler[0].length * diziler[0].length))) {
            break;
        }
        for (let j = 0; j < diziler.length; j++) {
            covElements += (diziler[j][geciciIndex] - ortalamalar[geciciIndex]) * (diziler[j][i] - ortalamalar[geciciIndex]) / (diziler.length - 1);
        }
        if (i === (diziler[0].length - 1)) {
            i = -1;
            ++geciciIndex;
        }
        cov.push(covElements);
    }

    let hedefDiziCiktilar = [];
    hedefDizi.forEach((sayi, index) => {
        hedefDiziCiktilar.push((sayi - ortalamalar[index]));
    });

    let satir = "Cov Dizisi: ";
    cov.forEach((sayi, index) => {
        satir += " | " + sayi;
        if (!((index + 1) % diziler[0].length)) {
            console.log(satir + " | \n");
            satir = "";
        }

    });

    console.log("\nSonuç için aşağıda verilen komut satırının tamamını kopyala, MATLAB'da çalıştır!\n\n");
    let diziIciMetin = "";
    cov.forEach((sayi, index) => {
        diziIciMetin += " " + sayi;
        if (!((index + 1) % diziler[0].length)) {
            diziIciMetin += " ; ";
        }
    });
    console.log(`COV = [${diziIciMetin}] \n INVCOV = inv(COV) \n SXM = [${hedefDiziCiktilar.join(' ')}] \n sqrt(SONUC= SXM*INVCOV*transpose(SXM))`);
}
// ilk hedef dizi daha sonra kalan diziler girilir
cokluMah([160, 550, 35], [150, 580, 35], [170, 570, 38], [160, 590, 40], [165, 590, 29], [168, 550, 44]);