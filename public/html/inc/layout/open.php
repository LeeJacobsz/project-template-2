<!doctype html>
<!--[if IE 8 ]> <html class="ie8"> <![endif]-->
<!--[if IE 9 ]> <html class="ie9"> <![endif]-->
<!--[if (gt IE 9)|!(IE)]><!--> <html> <!--<![endif]-->
<head>
	<?php
		include('inc/utils/utils.php');
		$title = isset($title) ? $title : 'Pitch Studio Project Template';
		$pageName = isset($pageName) ? $pageName : 'default';
		$pageTheme = isset($pageTheme) ? $pageTheme : 'default';
	?>
	<title><?=$title?></title>

	<!-- meta -->
	<meta charset="utf-8" />
	<meta name="description" content="" />
	<meta name="robots" content="index, follow" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />

	<!-- modernizr -->
	<script src="/assets/js/modernizr.js"></script>

	<!-- stylesheets -->
	<link rel="stylesheet" href="/assets/css/style.css" media="screen" />

	<!-- javascript -->
	<!--[if lt IE 9]><script src="//html5shim.googlecode.com/svn/trunk/html5.js"></script><![endif]-->
</head>
<body data-view="<?=$pageName?>" data-page-theme="<?=$pageTheme?>">

	<?php include_all('inc/snippets/*'); ?>

	<!-- old browser warning -->
	<!--[if lt IE 8]>
		<p class="chromeframe">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> or
		<a href="http://www.google.com/chromeframe/?redirect=true">activate Google Chrome Frame</a> to improve your experience.</p>
	<![endif]-->