const routes = [
	/*
	{
		path: '/',
		component: () => import('layouts/MainLayout.vue'),
		children: [{
			path: '',
			name: 'latestPropoal',
			component: () => import('src/pages/VotingRound.vue')
		}]
	},
	*/
	{ path: '/', redirect: '/round/latest' },
	{
		path: '/proposal/:proposalNumber',
		component: () => import('layouts/MainLayout.vue'),
		children: [{
			path: '',
			name: 'proposal',
			component: () => import('src/pages/ProposalDetails.vue')
		}]
	},
	{
		path: '/round/:roundCode',
		component: () => import('layouts/MainLayout.vue'),
		children: [{
			path: '',
			name: 'round',
			component: () => import('src/pages/VotingRound.vue')
		}]
	},

	// Always leave this as last one,
	// but you can also remove it
	{
		path: '/:catchAll(.*)*',
		component: () => import('pages/ErrorNotFound.vue')
	}
]

export default routes
