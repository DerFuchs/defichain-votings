import {
	defineStore
} from 'pinia';

import {
	useQuasar
} from 'quasar'

export const useUserStore = defineStore('user', {
	state: () => ({
		settings: {
			uiAppearance: 'auto',
			viewOnlyFavorites: false,
			compactView: false,
		},
		favoriteProposals: [],
		filters: {
			type: false,
			currentResult: false,
		},
		sort: {
			type: false,
			direction: 'desc',
		}
	}),
	persist: true,
	getters: {
		isFavoriteProposal: (state) => {
			return (proposalNumber) => state.favoriteProposals.includes(proposalNumber)
		},
	},
	actions: {
		addFavoriteProposal(proposalNumber) {
			this.favoriteProposals.push(proposalNumber)
			console.log("[DEBUG] added proposal number " + proposalNumber + " to favorites")
		},
		removeFavoriteProposal(proposalNumber) {
			const newFavs = this.favoriteProposals.filter(favorite => favorite != proposalNumber)
			this.favoriteProposals = newFavs
			console.log("[DEBUG] removed proposal number " + proposalNumber + " from favorites")
		},
		toggleFavoriteProposal(proposalNumber) {
			if (this.isFavoriteProposal(proposalNumber)) {
				this.removeFavoriteProposal(proposalNumber)
			} else {
				this.addFavoriteProposal(proposalNumber)
			}
		},

		toggleViewOnyFavorites() {
			this.settings.viewOnlyFavorites = !this.settings.viewOnlyFavorites
		},

	},
});
