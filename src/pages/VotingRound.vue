<template>
	<q-page v-if="proposals !== undefined">
		<div
			v-if="!compact"
			class="
				container
				full-width
				row
				justify-left
				q-col-gutter-md q-mt-none q-pr-md
				items-stretch
			"
		>
			<div v-if="proposals.length == 0">
				No data found for this voting round :(
			</div>
			<div
				v-if="proposals.length > 0"
				class="col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2"
			>
				<q-card flat :bordered="!dark" :class="{ 'bg-grey-2': !dark }">
					<q-card-section>
						<span class="text-h6">
							{{ proposals[0].totalVotes.possible.toLocaleString() }}
						</span>
						masternodes eligable to vote on
						<span class="text-h6">{{ proposals.length }}</span> proposals,
						ending
						<span class="text-h6">{{
							moment(proposals[0].endDate).fromNow()
						}}</span>
					</q-card-section>
					<q-card-actions align="right">
						<div>Discuss on:</div>
						<q-btn
							flat
							type="a"
							target="_blank"
							href="https://github.com/DeFiCh/dfips/issues"
							icon="fa-brands fa-github"
						/>
						<q-btn
							flat
							type="a"
							target="_blank"
							href="https://www.reddit.com/r/defiblockchain/?f=flair_name%3A%22Community%20Proposal%22"
							icon="fa-brands fa-reddit"
						/>
					</q-card-actions>
				</q-card>
			</div>

			<div
				v-if="proposals.length > 0"
				class="col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2"
			>
				<q-card flat :bordered="!dark" :class="{ 'bg-grey-2': !dark }">
					<q-card-section>
						Get informed automatically by
						<a
							href="https://twitter.com/adrian_schnell"
							:class="{ 'text-white': dark, 'text-black': !dark }"
							>@adrian_schnell</a
						>'s fantastic Telegram bot
					</q-card-section>
					<q-card-actions>
						<q-btn
							outline
							type="a"
							href="https://t.me/DFI_cfp_election_bot"
							label="DeFiChain Voting Bot on Telegram"
							icon="fa-brands fa-telegram"
							class="full-width"
						/>
					</q-card-actions>
				</q-card>
			</div>
		</div>
		<div
			class="
				container
				full-width
				row
				justify-left
				q-col-gutter-md q-mt-none q-pr-md q-mb-xl q-pb-xl
			"
		>
			<ProposalItem
				v-for="proposal in proposals"
				:key="proposal.number"
				:proposal="proposal"
			/>
		</div>
	</q-page>
</template>

<script>
import { defineComponent, computed, toRef } from "vue";
import { useQuasar } from "quasar";
import { useProposalStore } from "stores/proposals";
import { useUserStore } from "stores/user";
import { useRoute } from "vue-router";
import moment from "moment";

import ProposalItem from "components/VotingRound/ProposalItem.vue";

export default defineComponent({
	name: "CurrentVotingRound",
	components: {
		ProposalItem,
	},
	setup() {
		const $q = useQuasar();
		const proposals = useProposalStore();
		const user = useUserStore();
		const route = useRoute();

		return {
			moment: (date) => moment(date),
			dark: toRef($q.dark, "isActive"),
			compact: toRef(user.settings, "compactView"),
			proposals: computed(() =>
				proposals.filteredProposals(
					user.filters,
					user.sort,
					proposals.votingRound(route.params.roundCode)
				)
			),
		};
	},
});
</script>
