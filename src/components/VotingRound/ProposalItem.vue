<template>
	<div
		v-if="
			(user.isFavoriteProposal(proposal.number) &&
				user.settings.viewOnlyFavorites) ||
			!user.settings.viewOnlyFavorites
		"
		:class="{
			'col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2': !compact,
			'col-xs-6 col-sm-4 col-md-3 col-lg-2 col-xl-1': compact,
		}"
	>
		<q-card flat :bordered="!dark" :class="{ 'bg-grey-2': !dark }">
			<q-card-section v-if="!compact" class="vote-heading q-pt-xs">
				<div class="text-overline text-grey">
					{{ proposals.proposalCode(proposal) }}
					(#{{ proposal.number }} on GitHub)
				</div>
				<div v-if="proposal?.dfiAmount" class="text-caption text-grey">
					$DFI {{ proposal?.dfiAmount.toLocaleString() }}
				</div>
				<div v-else>&nbsp;</div>
				<div class="text-body1 q-mt-sm q-mb-xs ellipsis-3-lines" :class="{}">
					{{ proposals.proposalTitle(proposal) }}
				</div>
			</q-card-section>
			<q-card-section v-else class="text-caption vote-heading-compact">
				<span class="text-grey">({{ proposals.proposalCode(proposal) }}</span>
				<span v-if="proposal?.dfiAmount" class="text-grey">
					, $DFI {{ proposal?.dfiAmount.toLocaleString() }}
				</span>
				<span class="text-grey">)</span>
				<span class="ellipsis-2-lines">{{
					proposals.proposalTitle(proposal)
				}}</span>
			</q-card-section>

			<q-separator inset class="q-mb-sm" />

			<q-card-section v-if="!compact" class="row">
				<div class="text-center col-3">
					<p class="text-h6 q-mb-none">{{ proposal.totalVotes.total }}</p>
					Votes
				</div>
				<div class="text-center col-2">
					<p class="text-positive text-h6 q-mb-none">
						{{ proposal.totalVotes.yes }}
					</p>
					Yes
				</div>
				<div class="text-center col-2">
					<p class="text-negative text-h6 q-mb-none">
						{{ proposal.totalVotes.no }}
					</p>
					No
				</div>
				<div class="text-center col-2">
					<p class="text-h6 q-mb-none">{{ proposal.totalVotes.neutral }}</p>
					Neutral
				</div>
				<div class="text-center col-3">
					<p class="text-h6 q-mb-none">{{ proposal.totalVotes.turnout }} %</p>
					Turnout
				</div>
			</q-card-section>

			<q-card-section class="q-pt-xs text-center">
				<q-circular-progress
					:size="progressSize"
					show-value
					class="text-black"
					:value="
						(proposal.totalVotes.yes /
							(proposal.totalVotes.total - proposal.totalVotes.neutral)) *
						100
					"
					color="positive"
					track-color="negative"
					:thickness="0.5"
				>
					<div class="absolute-full flex flex-center">
						<q-badge
							v-if="proposal.totalVotes.total > 0"
							color="white"
							text-color="black"
							:label="
								Number(
									(proposal.totalVotes.yes /
										(proposal.totalVotes.total - proposal.totalVotes.neutral)) *
										100
								).toFixed(0) + ' % yes'
							"
						/>
						<q-badge
							v-if="proposal.totalVotes.total == 0"
							color="white"
							text-color="black"
							label="no votings yet"
						/>
					</div>
				</q-circular-progress>
			</q-card-section>
			<q-card-section class="q-pt-xs text-center">
				<q-chip
					v-if="proposal.totalVotes.total > 0"
					color="white"
					text-color="black"
				>
					<q-avatar
						:icon="
							proposal.currentResult == 'Approved'
								? 'fa-light fa-check'
								: 'fa-light fa-x'
						"
						:color="
							proposal.currentResult == 'Approved' ? 'positive' : 'negative'
						"
					/>
					{{ proposal.currentResult }}
				</q-chip>
				<q-badge
					v-if="proposal.totalVotes.total == 0"
					color="white"
					text-color="black"
					label="Waiting for votes"
				/>
			</q-card-section>

			<q-separator v-if="!compact" inset />

			<q-card-actions v-if="!compact" align="around">
				<q-btn
					flat
					dense
					icon="fa-light fa-magnifying-glass-chart"
					label="details"
					type="href"
					:to="{
						name: 'proposal',
						params: { proposalNumber: proposal.number },
					}"
				/>
				<q-btn
					flat
					dense
					icon="fa-brands fa-github"
					label="read proposal"
					@click="github(proposal.htmlUrl)"
				/>
				<Favorite :proposal="proposal" />
			</q-card-actions>
		</q-card>
	</div>
</template>

<script>
import { defineComponent, computed, toRef } from "vue";

import { useQuasar, openURL } from "quasar";
import { useUserStore } from "stores/user";
import { useProposalStore } from "stores/proposals";

import Favorite from "components/VotingRound/Proposal/Favorite.vue";

export default defineComponent({
	name: "ProposalItem",
	components: {
		Favorite,
	},
	props: {
		proposal: {
			type: Object,
			required: true,
		},
	},
	setup() {
		const $q = useQuasar();
		const user = useUserStore();

		const compact = toRef(user.settings, "compactView");

		const progressSize = computed(() => {
			if (compact.value) {
				switch ($q.screen.name) {
					case "xs":
						return "120px";
						break;
					case "sm":
						return "150px";
						break;
					case "md":
						return "200px";
						break;
					case "lg":
						return "180px";
						break;
					case "xl":
						return "110px";
						break;
				}
			}
			return "200px";
		});

		return {
			user: user,
			proposals: useProposalStore(),
			compact: compact,
			progressSize: progressSize,
			dark: toRef($q.dark, "isActive"),
			github: (url) => openURL(url),
		};
	},
});
</script>

<style>
.vote-heading {
	min-height: 11em;
}
.vote-heading-compact {
	min-height: 8em;
}
</style>
