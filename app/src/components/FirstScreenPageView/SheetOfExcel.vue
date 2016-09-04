<!-- Excel 中的 Sheet -->
<template>
	<div class="table-responsive">
		<table class="table is-bordered">
			<thead>
				<tr>
					<th v-for="col in 255">{{ getCharCol(col) }}</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="row in 100">
					<td v-for="col in 20" :title="row + '行' + getCharCol(col) + '列'">{{row + col}}</td>

				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		props: {
			sheetData: {
				type: [Array, Object],
				required: true,
				default() {
					return []
				}
			},
			cols: {
				type: Array,
				required: true,
				default() {
					return []
				}
			}
		},
		methods: {
			/* http://www.cnblogs.com/lavezhang/archive/2012/05/14/2499000.html */ 
			getCharCol(n){
				var temCol = "", s = "", m = 0

				while(n > 0){
					m = n % 26
					if(m === 0) m = 26
					s = String.fromCharCode(m + 64) + s
					n = (n - m) / 26
				}
				return s
			},
			getNumCol(s){
				if(!s) return 0

				var n = 0
			  for(var i = s.length - 1, j = 1; i >= 0; i--, j *= 26){
			  	var c = s[i].toUpperCase()
			  	if( c < 'A' || c > "Z") return 0
			  	n += (c.charCodeAt() - 64) * j
			  }

			  return n
			}
		}
	}

</script>

<style scoped>
	.table-responsive{
		width: calc(100vw - 295px);
		display: block;
		overflow: auto;
		height:calc(100vh - 226px);
	}

	.table-responsive table{
		width: 100%;
		max-width: 100%
	}
	table{
		margin-bottom: 0;
	}
	.first-col{
		background-color: #eee
	}
	table thead tr th, table thead th:hover,table tbody tr td:first-child, table tbody tr td:first-child:hover{
		background-color: #eee;
	}
</style>