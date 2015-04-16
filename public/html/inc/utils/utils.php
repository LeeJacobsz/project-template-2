<?php

//
// Helpers and Utilities
//

// Set project root of sensible including

$siteroot = $_SERVER['DOCUMENT_ROOT'] . '/html/';


// Include all files in directory

function include_all ($glob) {
  global $siteroot;

  foreach (glob($siteroot . $glob) as $file) {
    include_once($file);
  }
}

// Random entry from array

function random_from ($arr) {
  return $arr[array_rand($arr)];
}

?>