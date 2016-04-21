angular.module('starter.constant', [])

.constant('AUTH_EVENTS', {
	notAuthenticated: 'auth-not-authenticated',
	notAuthorised: 'auth-not-authorised'
})

.constant('USER_ROLES', {
	business: 'business',
	public: 'public'
});