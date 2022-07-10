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
				<span>{{ round.moment.format("MMMM YYYY") }}</span>
				<span v-if="index == 0" style="display: none">&nbsp;(Current)</span>
			</q-item>
		</q-list>
	</q-drawer>
</template>

<script>
import { defineComponent } from "vue";
import { useProposalStore } from "stores/proposals";

export default defineComponent({
	name: "LeftDrawer",
	setup() {
		const proposals = useProposalStore();

		return {
			votingRounds: proposals.votingRounds,
		};
	},
});
</script>
