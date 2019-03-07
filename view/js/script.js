(function ($) {
    var ws = new WebSocket("wss://api.bitfinex.com/ws/2", "protocolOne"),
        response_map = [
            /* 0 */ "bid",
            /* 1 */ "bid_size",
            /* 2 */ "ask",
            /* 3 */ "ask_size",
            /* 4 */ "day_change",
            /* 5 */ "day_change_percent",
            /* 6 */ "last_price",
            /* 7 */ "volume",
            /* 8 */ "day_max",
            /* 9 */ "day_min"
        ],
        channels = {},
        table = $('table.currencies'),
        body = table.find('tbody tr'),
        btc_chan = 0,
        btc_usd_price = 0,
        volume = $('#volume'),
        select_pair = $('#pair'),
        pair_type = select_pair.val(),
        vol_type = volume.val();

    function init_pairs() {
        var mess = {
            "event": "subscribe",
            "channel": "ticker"
        };

        $.each(body, function (i, obj) {
            // if (i > 1)
            //     return false;

            // setTimeout(function () {
            mess.symbol = 't' + $(obj).attr('id');
            ws.send(JSON.stringify(mess));
            // }, i * 30);
        });
    }

    function update_table(data) {
        console.log(channels[data[0]] + ': канал обновлен');
        // переход на строку с валютой, котировки которой нам прислал сервер
        var tr = body.filter('#' + channels[data[0]]);

        tr.addClass('update');

        if (data[0] === btc_chan)
            btc_usd_price = data[1][6];

        $.each(data[1], function (i, val) {

            // изменение цены в процентах
            if (i === 5) {
                val = ( val * 100 ).toFixed(2) + '%';
            }

            // объём торгов
            if (i === 7) {
                val = get_volume(data[0], val, data[1][6]);
            }

            tr.children('td.' + response_map[i]).text(val);
        });
        // console.log(event.data);
        // $.each(data[1], function (i, obj) {
        //     tr.eq(++i).find('td:last-child').text(obj);
        // })
        var min = data[1][8],
            max = data[1][9],
            range = 100 - ( max / ( min / 100 ) ),
            mid = (min + max) / 2,

            bid = data[1][0],
            spread = data[1][2] - bid,

            spread_perc = (spread / bid) * 100;

        tr.children('td.day_mid').text(mid.toFixed(data[0] !== btc_chan ? 10 : 2));
        tr.children('td.range').text(range.toFixed(2) + '%');
        tr.children('td.spread').text(spread_perc.toFixed(4) + '%');

        setTimeout(function () {
            tr.removeClass('update');
        }, 300);

    }

    function get_volume(chan, vol, price) {
        chan = parseInt(chan);
        vol = parseFloat(vol);
        price = parseFloat(price);

        var result = vol;

        if (pair_type === 'BTC') {
            switch (vol_type) {
                case 'BTC':
                    result = (chan === btc_chan)
                        ? vol
                        : vol * price;
                    break;

                case 'USD':
                    result = (chan === btc_chan)
                        ? vol * price
                        : vol * price * btc_usd_price;
            }

        } else {
            switch (vol_type) {
                case 'BTC':
                    result = (chan === btc_chan)
                        ? vol
                        : (vol * price) / btc_usd_price;
                    break;

                case 'USD':
                    result = (chan === btc_chan)
                        ? vol * price
                        : vol * price;
            }
        }

        return result.toFixed(2);
    }


    ws.onopen = init_pairs;

    ws.onmessage = function (event) {
        var data = JSON.parse(event.data);

        // подключение канала
        if (data.event === 'subscribed') {
            console.log(data.pair + ': подключен новый канал', data);

            if (data.pair === 'BTCUSD') {
                btc_chan = data.chanId;
            }
            channels[data.chanId] = data.pair;

        } else if (!data.event && typeof data[1] !== 'string') {
            // обновление котировок
            update_table(data);
            // console.log(data);
        }
    };

    volume.on({
        change: function () {
            vol_type = $(this).val();
            console.log("Теперь объём отображается в: " + vol_type);


            $.each(channels, function (id, pair) {
                var tr = body.filter('#' + pair),
                    vol = tr.children('td.volume'),
                    price = tr.children('td.last_price').text();


                vol.text(get_volume(id, vol.text(), price));
            });

        }
    });

    select_pair.on({
        change: function () {
            var $this = $(this),
                url = window.location.host === 'trade.localhost' ? '/' : '/bf/';


            console.log(window.location);
            if ($this.val() === 'USD') {
                url += '?pair=USD';
            }

            window.location.href = url;
        }
    });

}(jQuery));
