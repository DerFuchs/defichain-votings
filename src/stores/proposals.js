import {
	defineStore
} from 'pinia';

import moment from "moment";

export const useProposalStore = defineStore('proposals', {
	state: () => ({
		historicProposals: {},
		filters: {
			type: [
				false,
				'CFP',
				'DFIP'
			],
			currentResult: [
				false,
				'Approved',
				'Not approved',
			]
		},
		sort: [{
				keypath: false,
				title: 'No Sort',
			},
			{
				keypath: 'dfiAmount',
				title: 'DFI Amount',
			},
			{
				keypath: 'totalVotes.total',
				title: 'Total Votes',
			},
			{
				keypath: 'totalVotes.yes',
				title: 'Yes Votes',
			},
			{
				keypath: 'totalVotes.no',
				title: 'No Votes',
			},
		]
	}),
	persist: {
		paths: [
			'historicProposals',
		]
	},
	getters: {
		latestProposals: (state) => {
			return Object.values(state.historicProposals).pop()
		},

		proposal: (state) => {
			return (proposalNumber) => {
				for (const [votingRound, proposals] of Object.entries(state.historicProposals)) {
					for (const [id, proposal] of Object.entries(proposals)) {
						if (proposal.number == proposalNumber) {
							return proposal
						}
					}
				}
				return false
			}
		},

		proposalCode: () => {
			return (proposal) => {
				return proposal.title.substring(0, proposal.title.indexOf(':'))
			}
		},

		proposalTitle: () => {
			return (proposal) => {
				let title = proposal.title
				const cutPrice = title.lastIndexOf('(');
				if (cutPrice !== -1) {
					title = title.slice(0, cutPrice) // + str.slice(cutPrice + 1);
				}
				return title.substring(title.indexOf(":") + 1)
			}
		},

		filteredProposals: (state) => {
			return (filters, sort, proposals = false) => {
				if (!proposals) {
					proposals = state.latestProposals
				}
				for (const [filterName, filterValue] of Object.entries(filters)) {
					if (filterValue === false) continue
					proposals = proposals.filter((proposal) => {
						return proposal[filterName].toLowerCase() == filterValue.toLowerCase()
					})
				}
				if (sort.type !== false && proposals.length > 0) {
					const keypath = (path, target) => path.split('.').reduce((previous, current) => previous[current], target)
					proposals = proposals.sort((a, b) => {
						a = keypath(sort.type, a) || 0
						b = keypath(sort.type, b) || 0
						return (sort.direction == 'asc') ? a > b : a < b
					})
				}
				return proposals
			}
		},

		allVotings: () => {
			return (proposal) => {
				return proposal.voteDetails.yes.concat(proposal.voteDetails.no, proposal.voteDetails.neutral)
			}
		},

		proposalVotingHistory: () => {
			return (proposal) => {
				let history = {}

				let collection = []

				let overall = {
					name: 'total votes',
					data: {}
				}

				let yes = {
					name: 'yes',
					data: {}
				}
				proposal.voteDetails.yes.forEach((vote) => {
					const date = moment(vote.createdAt).format("YYYY-MM-DD");
					(!(date in yes['data'])) ? yes['data'][date] = 1: yes['data'][date]++;
					(!(date in overall['data'])) ? overall['data'][date] = 1: overall['data'][date]++;
				})

				let no = {
					name: 'no',
					data: {}
				}
				proposal.voteDetails.no.forEach((vote) => {
					const date = moment(vote.createdAt).format("YYYY-MM-DD");
					(!(date in no['data'])) ? no['data'][date] = 1: no['data'][date]++;
					(!(date in overall['data'])) ? overall['data'][date] = 1: overall['data'][date]++;
				})

				let neutral = {
					name: 'neutral',
					data: {}
				}
				proposal.voteDetails.neutral.forEach((vote) => {
					const date = moment(vote.createdAt).format("YYYY-MM-DD");
					(!(date in neutral['data'])) ? neutral['data'][date] = 1: neutral['data'][date]++;
					(!(date in overall['data'])) ? overall['data'][date] = 1: overall['data'][date]++;
				})
				collection.push(yes)
				collection.push(no)
				collection.push(neutral)
				//collection.push(overall)

				return collection
			}
		}
	},

	actions: {
		async fetchProposals() {
			/*
			if (!!Object.keys(this.historicProposals).length) {
				return
			}
			*/
			console.log("[DEBUG] starting fetching historic proposals");
			try {
				let votingRounds = []
				await this.api
					.get("")
					.then((result) => {
						votingRounds = result.data
						console.log("[DEBUG] found " + votingRounds.length + " voting rounds including current")
					})
				votingRounds.filter(code => !Object.keys(this.historicProposals).includes(code)).forEach((roundCode) => {
					console.log("[DEBUG] found new voting round: " + roundCode)
					this.api
						.get(roundCode)
						.then((result) => {
							this.historicProposals[roundCode] = result.data
							console.log("[DEBUG] fetched data for new voting round: " + roundCode)
						})
				})

				this.api
					.get(votingRounds[0])
					.then((result) => {
						this.historicProposals[votingRounds[0]] = result.data
						console.log("[DEBUG] re-fetched data for latest voting round: " + votingRounds[0])
					})

			} catch (error) {
				console.log(error);
			}
		}
	},
});
