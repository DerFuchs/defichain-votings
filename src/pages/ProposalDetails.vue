<template>
	<q-page>
		<q-breadcrumbs class="q-ml-md q-mt-md">
			<q-breadcrumbs-el
				label="Proposal List"
				icon="fa-duotone fa-house"
				style="cursor: pointer"
				@click="$router.go(-1)"
			/>
			<q-breadcrumbs-el
				:label="
					proposals.proposalCode(proposal) +
					' (#' +
					proposal.number +
					' on GitHub)'
				"
				icon="fa-light fa-magnifying-glass-chart"
			/>
		</q-breadcrumbs>

		<div
			class="
				container
				full-width
				row
				justify-left
				q-col-gutter-md q-mt-none q-pr-md q-mb-xl q-pb-xl
			"
		>
			<div class="col-12">
				<div v-if="proposal?.dfiAmount" class="text-grey">
					$DFI {{ proposal?.dfiAmount.toLocaleString() }}
				</div>
				<div v-else>&nbsp;</div>
				<div class="text-h6 q-mt-sm q-mb-xs ellipsis-3-lines" :class="{}">
					{{ proposals.proposalTitle(proposal) }}
				</div>
			</div>

			<VotingHistory :proposal="proposal" />

			<VotingList v-if="false" :proposal="proposal" />
		</div>
	</q-page>
</template>

<script>
import { defineComponent, toRef } from "vue";
import { useQuasar, colors } from "quasar";
import { useProposalStore } from "stores/proposals";
import { useUserStore } from "stores/user";
import { useRoute } from "vue-router";
import moment from "moment";

import VotingHistory from "components/VotingRound/Proposal/Details/VotingHistory.vue";
import VotingList from "components/VotingRound/Proposal/Details/VotingList.vue";

export default defineComponent({
	name: "ProposalDetails",
	components: {
		VotingHistory,
		VotingList,
	},
	setup() {
		const $q = useQuasar();
		const proposals = useProposalStore();
		const user = useUserStore();
		const route = useRoute();
		const { getPaletteColor } = colors;
		const proposal = proposals.proposal(route.params.proposalNumber);

		return {
			moment: (date) => moment(date),
			color: (name) => getPaletteColor(name),
			dark: toRef($q.dark, "isActive"),
			proposals: proposals,
			proposal: proposal,
			proposalVotingHistory: proposals.proposalVotingHistory(proposal),
		};
	},
});
</script>
