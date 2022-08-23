<template>
	<q-layout view="hHh lpR fff">
		<q-header>
			<q-toolbar>
				<q-btn
					flat
					dense
					round
					icon="fa-light fa-bars"
					aria-label="Menu"
					@click="toggleLeftDrawer"
				/>
				<q-toolbar-title> DeFiChain Votings </q-toolbar-title>
				<ProposalFilter />
			</q-toolbar>
		</q-header>

		<LeftDrawer v-model="leftDrawerOpen" />

		<q-page-container>
			<router-view />
		</q-page-container>

		<q-footer reveal>
			<q-toolbar style="min-height: 35px">
				<q-toolbar-title class="text-caption">
					<div>
						Powered by
						<a href="https://dfx.swiss/app?code=001-113" target="_blank">
							<q-avatar size="sm" style="background-color: #072440">
								<img
									src="https://dfx.swiss/wp-content/uploads/2022/07/Frame-1.svg"
								/>
							</q-avatar>
						</a>
						&amp;
						<a href="https://twitter.com/dt_buzzjoe" target="_blank">
							<q-chip size="sm">
								<q-avatar
									size="sm"
									icon="fa-brands fa-twitter"
									color="blue"
									text-color="white"
								/>
								@dt_buzzjoe
							</q-chip>
						</a>
					</div>
				</q-toolbar-title>
			</q-toolbar>
		</q-footer>
	</q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";

import { useQuasar } from "quasar";
import { useUserStore } from "stores/user";
import { useProposalStore } from "stores/proposals";

import LeftDrawer from "components/Layout/LeftDrawer.vue";
import ProposalFilter from "components/VotingRound/Filter.vue";

const linksList = [
	{
		title: "Docs",
		caption: "quasar.dev",
		icon: "school",
		link: "https://quasar.dev",
	},
];

export default defineComponent({
	name: "MainLayout",

	components: {
		LeftDrawer,
		ProposalFilter,
	},

	setup() {
		const $q = useQuasar();
		const user = useUserStore();
		const proposals = useProposalStore();

		proposals.fetchProposals();

		const leftDrawerOpen = ref(false);

		// set dark mode from user settings
		$q.dark.set(user.settings.uiAppearance);

		return {
			essentialLinks: linksList,
			leftDrawerOpen,
			toggleLeftDrawer() {
				leftDrawerOpen.value = !leftDrawerOpen.value;
			},
		};
	},
});
</script>
