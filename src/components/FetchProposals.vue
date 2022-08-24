<template>
	<q-btn
		flat
		round
		dense
		color="white"
		icon="fa-duotone fa-rotate-right"
		@click="fetchProposals()"
	/>
</template>

<script>
import { defineComponent } from "vue";

import { useProposalStore } from "stores/proposals";

export default defineComponent({
	name: "FetchProposals",
	setup() {
		const proposals = useProposalStore();

		return {
			fetchProposals: () => {
				proposals.fetchProposals();
			},
		};
	},
});
</script>
