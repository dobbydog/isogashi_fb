var IsogashiFB = {
	// facebookアプリID
	appId             : 'YOUR_APP_ID',

	// 文章組み立てに使用するフィールド
	sentenceField     : ["message", "description"],

	// facebookからの取得件数
	numberPosts       : 100,

	// 投稿時、生成文の前に表示する文
	postMessageBefore : "{name}さんのタイムラインはだいたいこんな感じ\n----------\n",
	
	// 投稿時、生成文の後に表示する文
	postMessageAfter  : "\n\n※この文章は「忙しい人のためのFacebook」で自動的に生成されました\nhttp://bit.ly/1dG6YQq",

	// 文章生成APIのURL
	markovApi         : "http://www18136ue.sakura.ne.jp/cgi-bin/api.rb"
};