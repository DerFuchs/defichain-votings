const routes = [{
		path: '/',
		component: () => import('layouts/MainLayout.vue'),
		children: [{
			path: '',
			name: 'dashboard',
			component: () => import('src/pages/CurrentVotingRound.vue')
		}]
	},
	{
		path: '/proposal/:proposalNumber',
		component: () => import('layouts/MainLayout.vue'),
		children: [{
			path: '',
			name: 'proposal',
			component: () => import('src/pages/ProposalDetails.vue')
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
