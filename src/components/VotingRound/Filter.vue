<template>
	<q-btn flat round dense color="white" icon="fa-duotone fa-filters">
		<q-menu transition-show="jump-down" transition-hide="jump-up">
			<q-list padding>
				<q-item-label header>Filter</q-item-label>

				<q-item tag="label">
					<q-item-section>
						<q-item-label>Favorites</q-item-label>
						<q-item-label v-if="user.settings.viewOnlyFavorites" caption>
							showing favorite proposals
						</q-item-label>
						<q-item-label v-else caption> showing all proposals</q-item-label>
					</q-item-section>
					<q-item-section side>
						<q-toggle
							v-model="user.settings.viewOnlyFavorites"
							dense
							size="xl"
							color="accent"
							checked-icon="fa-solid fa-star"
							unchecked-icon="fa-light fa-star"
						/>
					</q-item-section>
				</q-item>

				<q-item>
					<q-radio
						v-for="type in proposals.filters.type"
						:key="type"
						v-model="user.filters.type"
						:val="type"
						:label="type || 'all'"
					/>
				</q-item>
				<q-item>
					<q-radio
						v-for="currentResult in proposals.filters.currentResult"
						:key="currentResult"
						v-model="user.filters.currentResult"
						:val="currentResult"
						:label="currentResult || 'all'"
					/>
				</q-item>

				<q-separator spaced />
				<!--<q-item-label header>Sort</q-item-label>-->

				<q-item>
					<q-btn-dropdown
						color="primary"
						no-caps
						:label="
							'Sort by: ' +
							proposals.sort.find((sort) => sort.keypath == user.sort.type)
								.title
						"
						class="full-width"
					>
						<q-list>
							<q-item
								v-for="sort in proposals.sort"
								:key="sort.title"
								v-close-popup
								tag="label"
							>
								<q-item-section avatar>
									<q-radio v-model="user.sort.type" :val="sort.keypath" dense />
								</q-item-section>
								<q-item-section>
									<q-item-label>{{ sort.title }}</q-item-label>
								</q-item-section>
							</q-item>
						</q-list>
					</q-btn-dropdown>
				</q-item>
				<q-item v-if="user.sort.type">
					<span class="q-mt-sm">Order: </span>
					<q-radio v-model="user.sort.direction" val="asc">
						<q-icon name="fa-duotone fa-arrow-down-small-big" />
					</q-radio>
					<q-radio v-model="user.sort.direction" val="desc">
						<q-icon name="fa-duotone fa-arrow-down-big-small" />
					</q-radio>
				</q-item>

				<q-separator spaced />
				<q-item-label header>Appearance</q-item-label>

				<q-item tag="label">
					<q-item-section>
						<q-item-label>Compact View</q-item-label>
						<q-item-label v-if="user.settings.compactView" caption>
							showing compact information
						</q-item-label>
						<q-item-label v-else caption>showing all information</q-item-label>
					</q-item-section>
					<q-item-section side>
						<q-toggle
							v-model="user.settings.compactView"
							dense
							size="xl"
							color="accent"
							checked-icon="fa-light fa-arrows-minimize"
							unchecked-icon="fa-light fa-arrows-maximize"
						/>
					</q-item-section>
				</q-item>

				<q-item tag="label">
					<q-item-section>
						<q-item-label>Dark Mode</q-item-label>
						<q-item-label v-if="dark.isActive" caption>
							dark mode active
						</q-item-label>
						<q-item-label v-else caption>light mode active</q-item-label>
					</q-item-section>
					<q-item-section side>
						<q-toggle
							v-model="darkMode"
							dense
							size="xl"
							color="accent"
							checked-icon="fa-duotone fa-light-switch-off"
							unchecked-icon="fa-duotone fa-light-switch-on"
						/>
					</q-item-section>
				</q-item>
			</q-list>
		</q-menu>
	</q-btn>
</template>

<script>
import { defineComponent, ref, watch, toRef } from "vue";

import { useQuasar } from "quasar";
import { useUserStore } from "stores/user";
import { useProposalStore } from "stores/proposals";

export default defineComponent({
	name: "ProposalFilter",
	setup() {
		const $q = useQuasar();
		const user = useUserStore();
		const darkMode = toRef(user.settings, "uiAppearance");
		const leftDrawerOpen = ref(false);

		watch(darkMode, (newMode) => {
			$q.dark.set(newMode);
		});

		return {
			dark: $q.dark,
			user: useUserStore(),
			proposals: useProposalStore(),
			darkMode: darkMode,
			toggleLeftDrawer() {
				leftDrawerOpen.value = !leftDrawerOpen.value;
			},
			toggleCompactView() {
				user.settings.compactView = !user.settings.compactView;
			},
		};
	},
});
</script>
