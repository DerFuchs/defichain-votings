<template>
	<q-drawer side="left" behavior="mobile" overlay>
		<q-list>
			<q-item-label header> All Voting Rounds </q-item-label>
			<q-item
				v-for="(round, index) in votingRounds"
				:key="round"
				clickable
				:to="{
					name: 'round',
					params: { roundCode: round.code },
				}"
			>
				<span v-if="!isNaN(round.code)">{{
					round.moment.format("MMMM YYYY")
				}}</span>
				<span v-else>Currently Running</span>
				<span v-if="index == 0" style="display: none">&nbsp;(Current)</span>
			</q-item>
		</q-list>
	</q-drawer>
</template>

<script>
import { defineComponent, computed } from "vue";
import { useProposalStore } from "stores/proposals";

export default defineComponent({
	name: "LeftDrawer",
	setup() {
		const proposals = useProposalStore();

		return {
			votingRounds: computed(() => proposals.votingRounds),
		};
	},
});
</script>
