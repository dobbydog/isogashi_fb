<!DOCTYPE html>
	<html>
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width">
		<title>忙しい人のためのFacebook</title>
		<link rel="stylesheet" href="assets/css/bootstrap.min.css">
		<link rel="stylesheet" href="assets/css/bootstrap-theme.min.css">
		<link rel="stylesheet" href="assets/css/app.min.css">
	</head>
	<body>
		<div id="fb-root"></div>
		<script>
		(function(d){
		 var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
		 if (d.getElementById(id)) {return;}
		 js = d.createElement('script'); js.id = id; js.async = true;
		 js.src = "//connect.facebook.net/ja_JP/all.js";
		 ref.parentNode.insertBefore(js, ref);
		}(document));
		</script>

		<div class="jumbotron">
			<div class="container">
				<h1>忙しい人のためのFacebook</h1>
				<p>時間がないあなたのためにタイムラインを超圧縮してお届けします</p>
			</div>
		</div>
		<div id="content-area">
			<div class="container">
				<div id="result" style="display:none">
					<h2>最近のタイムラインのまとめ</h2>
					<p id="result-text"></p>
					<a href="javascript:;" title="" id="share-button" class="btn btn-default">この結果を投稿する</a>
				</div>
				<p>
					<a href="javascript:;" title="" id="login-button" class="btn btn-default btn-block btn-lg" style="display:none">Facebookでログイン</a>
					<a href="javascript:;" title="" id="exec-button" class="btn btn-success btn-block btn-lg" style="display:none">タイムラインをまとめる</a>
				</p>
				<div class="progress progress-striped" id="progress" style="display:none">
					<div class="progress-bar progress-bar-success" id="progress-bar" style="width:0%"></div>
				</div>
			</div>
		</div>
		<script src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.js"></script>
		<script src="//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.5.2/underscore-min.js"></script>
		<script src="assets/js/isogashi_fb.js" type="text/javascript"></script>
	</body>
</html>