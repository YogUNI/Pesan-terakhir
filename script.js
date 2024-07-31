$(document).ready(function () {
    
    var content = [{
        title: "Sampai Bertemu Di Versi Terbaik Diri Kita Masing-Masing!!",
        desc: ""
    }, {
        title: "Bukan Terakhir Kalinya!!",
        desc: "Dari lubuk hatiku yang terdalam, aku ingin mengucapkan terima kasih karena telah menjadi sahabat terbaikku. Semoga perjalananmu mewujudkan mimpi baru akan tercapai. Tidak ada perpisahan di antara kita. Di mana pun kalian berada, kalian akan selalu ada di hatiku Sahabatku. Saat sebuah pertemuan berawal dengan kebaikan. Maka, akhiri sebuah pertemuan dengan perpisahan yang memiliki kenangan terindah."
    }, {
       title: "Yang Terbaik Untuk Kita Semuanya",
       desc: "Sahabat, perpisahan ini juga bukan akhir dari pertemuan. Kita pasti akan bertemu lagi suatu hari lagi. Suatu hari nanti aku bisa tersenyum apabila teringat tentang kisah persahabatan kita ber-sebelas. Banyak orang akan masuk dan keluar dari hidupmu, tapi hanya sahabat sejati yang akan meninggalkan jejak dalam hatimu."
    }, {
        title: "Kita Masih Selalu Satu Tujuan, Ingin Meraih Masa Depan Yang Cerah",
        desc: "Sahabat, perpisahan ini juga bukan akhir dari pertemuan. Kita pasti akan bertemu lagi suatu hari lagi. Suatu hari nanti aku bisa tersenyum apabila teringat tentang kisah persahabatan kita ber-sebelas. Setiap ada pertemuan pasti ada juga perpisahan, tetapi dengan perpisahan tersebut bukan menjadi alasan untuk kita saling melupakan. Manusia merencanakan pertemuan. Namun, Tuhan yang menentukan jika harus ada perpisahan dan pertemuan kembali. Jangan merasa kecewa dengan ucapan selamat tinggal. Sebuah perpisahan itu penting sebelum kita bisa bertemu lagi."
    }, {
        title: "Goodluck Untuk Kedepannya!!",
        desc: "Semoga Kita Semua Selalu Diberi Kemudahan Dan Kelancaran Untuk Meraih Cita-Cita Masing-Masing :)"
 }];
    var currentPage = 0;
    for (var i = 0; i < content.length; i++) {
        for (var obj in content[i]) {
            if (typeof content[i][obj] === "string") {
                content[i][obj] = content[i][obj].split("");
                continue;
            }
            else if (typeof content[i][obj] === "object") {
                var toPush = [];
                for (var j = 0; j < content[i][obj].length; j++) {
                    for (var k = 0; k < content[i][obj][j].length; k++) {
                        toPush.push(content[i][obj][j][k]);
                    }
                }
                content[i][obj] = toPush;
            }
        }
        $("#segments").append("<div class=\"letters-wrap mutable\"><div class=\"soup-title\"></div><div class=\"soup-desc\"></div></div>");
        setText();
        $("#segments").append("<div class=\"letters-wrap position-data\"><div class=\"soup-title\"></div><div class=\"soup-desc\"></div></div>");
        setText();
    }
    arrangeCurrentPage();
    scrambleOthers();
    $(window).resize(function () {
        arrangeCurrentPage();
        scrambleOthers();
    });
    $("#soup-prev").hide();
    $("#soup-prev").click(function () {
        $("#soup-next").show();
        currentPage--;
        if (currentPage === 0) {
            $("#soup-prev").hide();
        }
        arrangeCurrentPage();
        scrambleOthers();
    });
    $("#soup-next").click(function () {
        $("#soup-prev").show();
        currentPage++;
        if (currentPage === content.length - 1) {
            $("#soup-next").hide();
        }
        arrangeCurrentPage();
        scrambleOthers();
    });
    function arrangeCurrentPage() {
        for (var i = 0; i < content[currentPage].title.length; i++) {
            $(".mutable:eq(" + currentPage + ") > .soup-title > .letter").eq(i).css({
                left: $(".position-data:eq(" + currentPage + ") > .soup-title > .letter").eq(i).offset().left + "px",
                top: $(".position-data:eq(" + currentPage + ") > .soup-title > .letter").eq(i).offset().top + "px",
                color: "#111",
                zIndex: 9001
            });
        }
        for (var i = 0; i < content[currentPage].desc.length; i++) {
            $(".mutable:eq(" + currentPage + ") > .soup-desc > .letter").eq(i).css({
                left: $(".position-data:eq(" + currentPage + ") > .soup-desc > .letter").eq(i).offset().left + "px",
                top: $(".position-data:eq(" + currentPage + ") > .soup-desc > .letter").eq(i).offset().top + "px",
                color: "#111",
                zIndex: 9001
            });
        }
    }

    function setText() {
        var j;
        for (j = 0; j < content[i].title.length; j++) {
            $(".soup-title").last().append("<span class=\"letter\">" + content[i].title[j] + "</span>");
        }
        for (j = 0; j < content[i].desc.length; j++) {
            $(".soup-desc").last().append("<span class=\"letter\">" + content[i].desc[j] + "</span>");
        }
    }

    function scrambleOthers() {
        for (var i = 0; i < content.length; i++) {
            if (currentPage === i)
                continue;
            var parts = [
                ["title", ".soup-title"],
                ["desc", ".soup-desc"]
            ];
            for (var j = 0; j < parts.length; j++) {
                for (var k = 0; k < content[i][parts[j][0]].length; k++) {
                    var randLeft = Math.floor(Math.random() * $(window).width());
                    var randTop = Math.floor(Math.random() * $(window).height());
                    var offset = $(".position-data").eq(currentPage).offset();
                    var bounds = {
                        left: offset.left,
                        top: offset.top,
                        right: $(window).width() - offset.left,
                        bottom: $(window).height() - offset.top
                    };
                    var middleX = bounds.left + $(".position-data").eq(currentPage).width() / 2;
                    var middleY = bounds.top + $(".position-data").eq(currentPage).height() / 2;
                    $(".mutable:eq(" + i + ") > " + parts[j][1] + " > .letter").eq(k).css({
                        left: randLeft,
                        top: randTop,
                        color: "#DDD",
                        zIndex: "initial"
                    });
                }
            }
        }
    }
});