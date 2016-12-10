<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>react-dom</title>
</head>
<body>


<script src="https://fb.me/react-15.0.0.js"></script>
<script src="https://fb.me/react-dom-15.0.0.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.34/browser.min.js"></script>
<script type="text/babel">
	function Blog(props){
		const sidebar = (
			<ul>
				{props.posts.map((post) =>
					<li key={post.id}>{post.title}</li>)}
			</ul>
			);
		const content = props.posts.map((post) =>
				<div key={post.id}>
				<h3>{post.title}</h3>
				<p>{post.content}</p>
				</div>
				);
		return (
			<div>
			{sidebar}
			<hr/>
			{content}
			</div>)
	}

	const posts = [
	 {id: 1, title: 'Hello World', content: 'Welcome to learning React!'},
	  {id: 2, title: 'Installation', content: 'You can install React from npm.'}];

	ReactDOM.render(
		<Blog posts={posts} />, document.body);


</script>
</body>
</html>
