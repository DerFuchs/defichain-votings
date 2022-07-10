<template>
	<div class="col-sm-12 col-xs-12 col-md-6">
		<q-card>
			<q-card-section>
				<div class="text-h6">Votes history</div>
			</q-card-section>
			<q-card-section v-if="proposalVotingHistory.length > 0">
				<column-chart
					:data="proposalVotingHistory"
					:points="false"
					:colors="[
						color('positive'),
						color('negative'),
						color('grey-9'),
						color('info'),
					]"
					:download="true"
					:stacked="true"
					legend="bottom"
					style="height: 200px"
				/>
			</q-card-section>
			<q-card-section v-else>No data available :(</q-card-section>
		</q-card>
	</div>
</template>

<script>
import { defineComponent } from "vue";
import { colors } from "quasar";

import { useProposalStore } from "stores/proposals";

export default defineComponent({
	name: "ProposalVotingHistory",
	props: {
		proposal: {
			type: Object,
			required: true,
		},
	},
	setup(props) {
		const { getPaletteColor } = colors;
		const proposals = useProposalStore();
		return {
			color: (name) => getPaletteColor(name),
			proposalVotingHistory: proposals.proposalVotingHistory(props.proposal),
		};
	},
});
</script>
