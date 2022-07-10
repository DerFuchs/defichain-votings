<template>
	<q-btn
		flat
		round
		dense
		color="primary"
		:icon="
			user.isFavoriteProposal(proposal.number)
				? 'fa-solid fa-star'
				: 'fa-light fa-star'
		"
		@click="toggleFavorite(proposal.number)"
	/>
</template>

<script>
import { defineComponent } from "vue";

import { useUserStore } from "stores/user";

export default defineComponent({
	name: "ProposalFavorite",
	props: {
		proposal: {
			type: Object,
			required: true,
		},
	},
	setup() {
		const user = useUserStore();

		const toggleFavorite = function (proposalNumber) {
			user.toggleFavoriteProposal(proposalNumber);
		};

		return {
			user: user,
			toggleFavorite: toggleFavorite,
		};
	},
});
</script>

<style>
</style>
