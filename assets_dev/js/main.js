jQuery.support.cors = true;

jQuery(function($) {

	function fbInit() {
		var loginButton = $("#login-button")
		, execButton = $("#exec-button")
		, shareButton = $("#share-button")
		, statusDisplay = $("#exec-status")
		, progress = $("#progress")
		, progressBar = $("#progress-bar")
		, result = $("#result")
		, resultText = $("#result-text")
		, accessToken, generated, myname

		, authResponseCallback = function(response) {
			console.log(response)
			switch(response.status) {
				case "connected":
				onConnect(response); break;

				case "not_authorized":
				default:
				onDisconnect(response); break;
			}
		}

		, onConnect = function(response) {
			accessToken = response.authResponse.accessToken;
			FB.api("/me", function(response) {
				myname = response.name;
			})
			execButton.show();
			progress.show();
			loginButton.hide();
		}

		, onDisconnect = function(response) {
			loginButton.show();
			execButton.hide();
			progress.hide();
		}

		, makeProgress = function(from, to) {
			var count, interval;
			count = from;
			interval = setInterval(function(){
				progressBar.css("width", (count++) + "%");
				if(count === to)
					clearInterval(interval);
			}, 100);
			return interval;
		}

		, resetProgressBar = function() {
			progressBar.remove().css("width", "0%");
			progress.addClass("active").append(progressBar);
		}

		, getFbApiUrl = function(apiBase) {
			return apiBase + "?fields=" + IsogashiFB.sentenceField.join(",") + "&limit=" + IsogashiFB.numberPosts + "&access_token" + accessToken;
		}

		, buildPostMessage = function(message) {
			return IsogashiFB.postMessageBefore.replace("{name}", myname) + message + IsogashiFB.postMessageAfter;
		};

		FB.init({
			appId      : IsogashiFB.appId, // App ID
			channelUrl : '', // Channel File
			status     : true, // check login status
			cookie     : true, // enable cookies to allow the server to access the session
			xfbml      : true  // parse XFBML
		})
		
		FB.Event.subscribe('auth.authResponseChange', authResponseCallback);
		
		loginButton.on("click", function(){
			FB.login(function(response){
				//console.log(response);
			}, {scope: "read_stream,publish_stream"})
		})

		shareButton.on("click", function(){
			shareButton.addClass("disabled")
			FB.api(
				'me/feed',
				'post',
				{
					message: IsogashiFB.postMessageBefore.replace("{name}", myname) + generated + IsogashiFB.postMessageAfter,
					access_token: accessToken,
					privacy: {
						value: "CUSTOM",
						friends: "SELF"
					}
				},
				function(response) {
					if(response.id) {
						shareButton.html("投稿しました")
					}
				}
			);
		})

		execButton.on("click", function(){
			var sentences = [], progressTimer;
			result.slideUp();
			execButton.addClass("disabled").html("タイムラインを取得しています");
			resetProgressBar();
			progressTimer = makeProgress(0, 60);
			FB.api(getFbApiUrl("/me/home"), function(response) {
				// console.log(response);
				clearInterval(progressTimer);
				progressTimer = makeProgress(60, 90);
				execButton.html("まとめています");
				_(response.data).each(function(el){
					_(IsogashiFB.sentenceField).each(function(s) {
						if(el[s]) {
							sentences.push(el[s]);
						};
					});
				});

				$.ajax({
					url: IsogashiFB.markovApi,
					crossDomain: true,
					type: "post",
					data: {
						sentences: JSON.stringify(sentences)
					}
				})
				.done(function(response) {
					// console.log(response);
					shareButton.html("この結果を投稿する").removeClass("disabled");
					clearInterval(progressTimer);
					progressBar.css("width", "100%");
					progress.removeClass("active");
					execButton.html("やりなおし").removeClass("disabled");
					resultText.html(response);
					generated = response;
					result.slideDown();
				})
			})
		})
	}

	if( window.FB ) {
		fbInit();
	} else {
		window.fbAsyncInit = fbInit;
	}
})
