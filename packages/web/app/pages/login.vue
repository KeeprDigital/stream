<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui';
import { z } from 'zod';

definePageMeta({
	layout: 'auth',
});

useSeoMeta({
	title: 'Login',
	description: 'Login to your account to continue',
});

const toast = useToast();
const supabase = useSupabaseClient();

const fields = [{
	name: 'email',
	type: 'text' as const,
	label: 'Email',
	placeholder: 'Enter your email',
}];

const providers = [{
	label: 'Google',
	icon: 'i-simple-icons-google',
	onClick: () => {
		toast.add({ title: 'Google', description: 'Login with Google' });
	},
}, {
	label: 'GitHub',
	icon: 'i-simple-icons-github',
	onClick: () => {
		toast.add({ title: 'GitHub', description: 'Login with GitHub' });
	},
}];

const schema = z.object({
	email: z.email(),
});

type Schema = z.output<typeof schema>;

async function onSubmit(payload: FormSubmitEvent<Schema>) {
	const { error } = await supabase.auth.signInWithOtp({
		email: payload.data.email,
		options: {
			emailRedirectTo: 'http://localhost:3000/confirm',
		},
	});
	if (error)
		toast.add({ title: 'Error', description: error.message, color: 'error' });
	else
		toast.add({ title: 'Success', description: 'Check your email for a login link', color: 'success' });
}
</script>

<template>
	<UAuthForm
		:fields="fields"
		:schema="schema"
		:providers="providers"
		title="Login"
		icon="i-lucide-lock"
		:loading-auto="true"
		@submit="onSubmit"
	>
		<template #description>
			Use ae below or email below to login.
		</template>
	</UAuthForm>
</template>
