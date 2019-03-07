<?php
/**
 * trade_model
 * Created by PhpStorm.
 * User: Pashted
 * Date: 24.12.2017
 * Time: 11:26
 */

Class Moneta
{
    public $name;
    public $pair;


    function __construct($name)
    {
        $this->name = $name;
        $this->pair = ($name == 'BTC') ? 'USD' : 'BTC';

        if (isset($_GET['pair']) && $_GET['pair'] === 'USD')
            $this->pair = 'USD';
    }

}
