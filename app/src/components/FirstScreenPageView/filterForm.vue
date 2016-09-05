<template>
	<form @submit.prevent="addFilterHandler" :class="{mL32: !getSideBarStatus}">
		<table class="table">
			<!-- <caption>添加筛选条件：</caption> -->
			<thead>
				<tr>
					<th>选择列</th>
					<th>逻辑操作符</th>
					<th>逻辑操作的值</th>
					<th></th>
				</tr>
			</thead>
			<tbody >
				<tr>
					<td >
						<p class="select">
							<select v-model="operatorCol">
								<option v-for="col in selectCol" :value="$index">{{ col }}</option>
							</select>
						</p>
					</td>
					<td class="controls">
						<div class="select">
							<select class="select" v-model="operator">
								<option v-for="op in selectOperators" :value="$index"> {{op}} </option>
							</select>
						</div>
					</td>
					<td>
						<div class="">
							<input class="input" type="text" v-model="operatorVal">
						</div>
					</td>
					<td class="controls">
						<button class="button">确定</button>
					</td>
				</tr>
			</tbody>
		</table>
	</form>
</template>

<script>
	import {addFilter, decrementMain} from '../../vuex/actions'
	import { getSideBarStatus } from '../../vuex/getters'
	export default {
		data(){
			return {
				selectCol: 25,
				selectOperators: ['>（大于）','<（小于）','=（等于）','包含','开头字符','结束字符','正则表达式'],
				operatorVal: '',
				operatorCol: '1',
				operator: "0"
			}
		},
		vuex: {
			getters: {
				getSideBarStatus
			},
			actions: {
				addFilter,
				decrementMain
			}
		},
		created(){
			console.log(this.getSideBarStatus)
		},
		methods: {
			addFilterHandler(){
				var filterWords = ""
				var curCol = this.operatorCol
				var iOp = this.operator
				var cOp = this.selectOperators[iOp]
				var opVal = this.operatorVal

				if(opVal.trim().length === 0) return

				var preStr = `第${curCol}列的值`
				// 判断是选择哪个操作符
				switch(iOp){
					case 4: ;
					case 5: filterWords = preStr + `的${cOp}为“${opVal}”`;break;
					case 6: filterWords = preStr + `应用了正则表达式"${opVal}"`;break;
					default: filterWords = preStr + `${cOp}"${opVal}"`;
				}

				this.operatorVal = ""
				
				// 触发 action：目前只做了表述文字，还需要进行筛选的value值
				this.addFilter(filterWords)
				this.decrementMain()
			}
		}
	}
</script>

<style scoped>
	form{
		transition: transform .6s;
	}
	table{
		margin-bottom: 0
	}
	.mL32{
		transform:translateX(32px)
	}
	caption{
		text-align: left;
	}
</style>