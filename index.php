<?php
/**
 * trade_controller
 * Created by PhpStorm.
 * User: Pashted
 * Date: 17.12.2017
 * Time: 17:15
 */

require('model/stats.php');

$lang = json_decode(file_get_contents(__DIR__. '/view/language.json'), true);

$currencies = [];

foreach($lang['currencies'] as $id => $name) {

    $currencies[] = new Moneta($id);
}


include('view/template.php');


?>