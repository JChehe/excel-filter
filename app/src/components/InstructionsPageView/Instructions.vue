<template>
	<div class="content">
		<h1>使用说明</h1>

		<p>这里将会介绍《用研数据清洗工具》的使用方法及一些名词解释。</p>
		<h2>软件用途</h2>
		<p>《用研数据清洗工具》	是一款面向运营的、通过可视化操作对Excel文档（.xls和.xlsx）进行过滤筛选的工具。</p>
		
		<h2>使用方法</h2>
		<p>本软件目前主要提供3种过滤方式：</p>
		<ol>
			<li>单列逻辑</li>
			<li>单列组合逻辑</li>
			<li>多列运算逻辑</li>
		</ol>
		
		<h3>单列逻辑</h3>
		<p>单列逻辑是对每一列进行筛选，添加的筛选条件出现先后是对筛选结果有影响的。每添加一个添加就是对前一个筛选结果（若有）进行再次筛选过滤，即相当于串联</p>
		<ul>
			<li><em>大于（或等于）</em>：</li>
			<li><em>小于（或等于）</em>：</li>
			<li><em>等于</em>：</li>
			<li><em>包含</em>：</li>
			<li><em>不包含</em>：</li>
			<li><em>开头字符</em>：</li>
			<li><em>结束字符</em>：</li>
			<li><em>正则表达式</em>：</li>
			<li><em>或</em>：</li>
			<li><em>与</em>：</li>
		</ul>	
		
		<h3>单列组合逻辑</h3>
		<p>单列组合逻辑是对您所选择的列进行一定运算后的再筛选过滤的操作。</p>
		<ul>
			<li><em>相加</em>：</li>
			<li><em>相减</em>：</li>
			<li><em>时间相减</em>：</li>
		</ul>

		<h3>多列运算逻辑</h3>
		<ul>
			<li></li>
		</ul>

		<h2>导出</h2>
		<p>点击“导出”按钮即可将过滤筛选后的Excel文件导出到本地。</p>

	</div>
		
</template>


<script>
	export default {

	}
</script>

<style scoped>
	.content{
		text-align: left;
		width: 100%;
	}
	.img_container{
		overflow: hidden;
		border-radius: 8px;
		width: 80%;
	}

	.img_container img{
		width: 100%;

	}
</style>