<template>
	<div class="col-12">
		<q-card>
			<q-card-section>
				<div class="text-h6">Masternodes</div>
			</q-card-section>
			<q-card-section v-if="allVotes.length > 0">
				<q-list>
					<q-item v-for="vote in allVotes" :key="vote.signature">
						<!-- { "address": "8VKs5jqADhwRTHVXsf8hhMmJm5r8FpWF7h", "signature": "H0S1ku4B1EbMZ+R+Wu8bl5LZVaPy7hfwzsr1iD4/zFDyJWByVGHMilMU+ES2ZRaQMV6l1y/qdkitjZUS/Hzv/9o=", "cfpId": "2207-17", "vote": "cfp-2207-17-yes", "createdAt": "2022-07-05T08:09:37Z", "isCake": false, "isDfx": false } -->
						{{ vote.address }} {{ vote.createdAt }}
					</q-item>
				</q-list>
			</q-card-section>
			<q-card-section v-else>No data available :(</q-card-section>
		</q-card>
	</div>
</template>

<script>
import { defineComponent } from "vue";
import { useProposalStore } from "stores/proposals";

export default defineComponent({
	name: "ProposalVotingList",
	props: {
		proposal: {
			type: Object,
			required: true,
		},
	},
	setup(props) {
		const proposals = useProposalStore();
		return {
			allVotes: proposals.allVotes(props.proposal),
		};
	},
});
</script>
