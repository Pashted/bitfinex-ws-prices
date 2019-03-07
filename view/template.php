<?php
/**
 * trade_view
 * Created by PhpStorm.
 * User: Pashted
 * Date: 24.12.2017
 * Time: 11:25
 */

?>
<link rel="stylesheet" href="view/css/style.css">


<h2><?= $lang['title'] ?>

    <? if (isset($_GET['pair']) && $_GET['pair'] === 'USD') {
        $selected = ['', ' selected'];
    } else {
        $selected = [' selected', ''];
    }
    ?>

    <select id="pair">
        <option value="BTC"<?= $selected[0] ?>>/ BTC</option>
        <option value="USD"<?= $selected[1] ?>>/ USD</option>
    </select>

</h2>

<table class="currencies">
    <thead>
    <tr>
        <th title="<?= $lang['pair'] ?>">Pair</th>
        <th title="<?= $lang['volume'] ?>">Volume
            <select id="volume" title="<?= $lang['change_volume'] ?>">
                <option value="SELF">Self</option>
                <option value="BTC" selected>BTC</option>
                <option value="USD">USD</option>
            </select>
        </th>
        <th title="<?= $lang['day_min'] ?>">Day min</th>
        <th title="<?= $lang['day_max'] ?>">Day max</th>
        <th title="<?= $lang['day_change'] ?>">Day change</th>
        <th title="<?= $lang['day_change_percent'] ?>">Day change %</th>
        <th title="<?= $lang['range'] ?>">Range</th>
        <th title="<?= $lang['day_mid'] ?>">Day middle</th>
        <th title="<?= $lang['last_price'] ?>">Last price</th>
        <th title="<?= $lang['bid_size'] ?>" style="text-align:right;">Bid size</th>
        <th title="<?= $lang['bid'] ?>" style="text-align:right;">Bid</th>
        <th title="<?= $lang['ask'] ?>">Ask</th>
        <th title="<?= $lang['ask_size'] ?>">Ask size</th>
        <th title="<?= $lang['spread'] ?>">Spread</th>
    </tr>
    </thead>

    <tbody>
    <? foreach ($currencies as $tr) { ?>

        <tr id="<?= $tr->name . $tr->pair ?>">
            <td><b><?= $tr->name ?>/<?= $tr->pair ?></b></td>
            <td class="volume"></td>
            <td class="day_min"></td>
            <td class="day_max"></td>
            <td class="day_change"></td>
            <td class="day_change_percent"></td>
            <td class="range"></td>
            <td class="day_mid"></td>
            <td class="last_price"></td>
            <td class="bid_size"></td>
            <td class="bid"></td>
            <td class="ask"></td>
            <td class="ask_size"></td>
            <td class="spread"></td>
        </tr>

    <? } ?>
    </tbody>
</table>

<?


?>

<script src="view/js/jquery-3.2.1.min.js" type="text/javascript"></script>
<!--<script src="/node_modules/highcharts/highstock.src.js"></script>-->
<!--<script src="/node_modules/highcharts/themes/grid.src.js"></script>-->
<script src="view/js/script.js" type="application/javascript"></script>
